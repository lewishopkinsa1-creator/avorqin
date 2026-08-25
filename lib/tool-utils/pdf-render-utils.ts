import { PDFDocument } from "pdf-lib";

export type PdfImageFormat = "png" | "jpeg";

export type RenderedPdfPage = {
  pageNumber: number;
  width: number;
  height: number;
  blob: Blob;
  fileName: string;
};

export type PdfTextResult = {
  pageCount: number;
  text: string;
  pages: {
    pageNumber: number;
    text: string;
  }[];
};

export type PdfFileInfo = {
  fileName: string;
  bytes: number;
  kilobytes: number;
  megabytes: number;
  pageCount: number;
};

type RasterizeOptions = {
  scale?: number;
  jpegQuality?: number;
  grayscale?: boolean;
};

let pdfJsPromise: Promise<typeof import("pdfjs-dist")> | null = null;

async function getPdfJs() {
  if (typeof window === "undefined") {
    throw new Error("PDF rendering is only available in the browser.");
  }

  if (!pdfJsPromise) {
    pdfJsPromise = import("pdfjs-dist");
  }

  const pdfjs = await pdfJsPromise;

  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
  }

  return pdfjs;
}

async function loadPdf(file: File) {
  if (!file) {
    throw new Error("Select a PDF file.");
  }

  if (
    file.type &&
    file.type !== "application/pdf" &&
    !file.name.toLowerCase().endsWith(".pdf")
  ) {
    throw new Error("Select a valid PDF file.");
  }

  const pdfjs = await getPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());

  const loadingTask = pdfjs.getDocument({ data });

  try {
    const document = await loadingTask.promise;

    return {
      document,
      loadingTask,
    };
  } catch (error) {
    await loadingTask.destroy().catch(() => undefined);

    throw new Error(
      error instanceof Error && error.message
        ? `Unable to read this PDF: ${error.message}`
        : "Unable to read this PDF."
    );
  }
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: PdfImageFormat,
  quality = 0.9
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const mimeType =
      format === "png" ? "image/png" : "image/jpeg";

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to create the page image."));
          return;
        }

        resolve(blob);
      },
      mimeType,
      format === "jpeg" ? quality : undefined
    );
  });
}

function applyGrayscale(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!context) {
    throw new Error("Unable to process the PDF page.");
  }

  const imageData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const { data } = imageData;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];

    const gray = Math.round(
      red * 0.2126 +
        green * 0.7152 +
        blue * 0.0722
    );

    data[index] = gray;
    data[index + 1] = gray;
    data[index + 2] = gray;
  }

  context.putImageData(imageData, 0, 0);
}

async function renderPageToCanvas(
  page: Awaited<
    ReturnType<
      Awaited<ReturnType<typeof loadPdf>>["document"]["getPage"]
    >
  >,
  scale: number
): Promise<HTMLCanvasElement> {
  if (!Number.isFinite(scale) || scale <= 0 || scale > 5) {
    throw new Error("Render scale must be greater than 0 and no more than 5.");
  }

  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Your browser could not create a drawing canvas.");
  }

  canvas.width = Math.max(1, Math.ceil(viewport.width));
  canvas.height = Math.max(1, Math.ceil(viewport.height));

  context.save();
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  return canvas;
}

export async function renderPdfPages(
  file: File,
  options: {
    format: PdfImageFormat;
    scale?: number;
    jpegQuality?: number;
  }
): Promise<RenderedPdfPage[]> {
  const {
    format,
    scale = 2,
    jpegQuality = 0.9,
  } = options;

  if (
    !Number.isFinite(jpegQuality) ||
    jpegQuality < 0.1 ||
    jpegQuality > 1
  ) {
    throw new Error("JPEG quality must be between 0.1 and 1.");
  }

  const { document: pdf, loadingTask } = await loadPdf(file);
  const pages: RenderedPdfPage[] = [];
  const baseName =
    file.name.replace(/\.pdf$/i, "") || "pdf";

  try {
    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber += 1
    ) {
      const page = await pdf.getPage(pageNumber);
      const canvas = await renderPageToCanvas(page, scale);
      const blob = await canvasToBlob(
        canvas,
        format,
        jpegQuality
      );

      pages.push({
        pageNumber,
        width: canvas.width,
        height: canvas.height,
        blob,
        fileName: `${baseName}-page-${pageNumber}.${
          format === "jpeg" ? "jpg" : "png"
        }`,
      });

      page.cleanup();
      canvas.width = 1;
      canvas.height = 1;
    }

    return pages;
  } finally {
    await loadingTask.destroy().catch(() => undefined);
  }
}

function textItemToString(item: unknown): string {
  if (
    typeof item === "object" &&
    item !== null &&
    "str" in item
  ) {
    const value = (item as { str?: unknown }).str;
    return typeof value === "string" ? value : "";
  }

  return "";
}

function textItemHasEol(item: unknown): boolean {
  if (
    typeof item === "object" &&
    item !== null &&
    "hasEOL" in item
  ) {
    return Boolean(
      (item as { hasEOL?: unknown }).hasEOL
    );
  }

  return false;
}

export async function extractPdfText(
  file: File
): Promise<PdfTextResult> {
  const { document: pdf, loadingTask } = await loadPdf(file);
  const pages: PdfTextResult["pages"] = [];

  try {
    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber += 1
    ) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      let pageText = "";

      for (const item of content.items) {
        const text = textItemToString(item);

        if (!text) {
          continue;
        }

        if (
          pageText &&
          !pageText.endsWith("\n") &&
          !pageText.endsWith(" ")
        ) {
          pageText += " ";
        }

        pageText += text;

        if (textItemHasEol(item)) {
          pageText += "\n";
        }
      }

      const cleaned = pageText
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      pages.push({
        pageNumber,
        text: cleaned,
      });

      page.cleanup();
    }

    const text = pages
      .map(
        (page) =>
          `--- Page ${page.pageNumber} ---\n${page.text}`
      )
      .join("\n\n")
      .trim();

    return {
      pageCount: pdf.numPages,
      text,
      pages,
    };
  } finally {
    await loadingTask.destroy().catch(() => undefined);
  }
}

export async function getPdfFileInfo(
  file: File
): Promise<PdfFileInfo> {
  const { document: pdf, loadingTask } = await loadPdf(file);

  try {
    return {
      fileName: file.name,
      bytes: file.size,
      kilobytes: file.size / 1024,
      megabytes: file.size / (1024 * 1024),
      pageCount: pdf.numPages,
    };
  } finally {
    await loadingTask.destroy().catch(() => undefined);
  }
}

async function rasterizePdfToPdf(
  file: File,
  options: RasterizeOptions = {}
): Promise<Uint8Array> {
  const {
    scale = 1.35,
    jpegQuality = 0.76,
    grayscale = false,
  } = options;

  if (
    !Number.isFinite(jpegQuality) ||
    jpegQuality < 0.1 ||
    jpegQuality > 1
  ) {
    throw new Error("JPEG quality must be between 0.1 and 1.");
  }

  const { document: sourcePdf, loadingTask } =
    await loadPdf(file);

  const outputPdf = await PDFDocument.create();

  try {
    for (
      let pageNumber = 1;
      pageNumber <= sourcePdf.numPages;
      pageNumber += 1
    ) {
      const page = await sourcePdf.getPage(pageNumber);

      /*
       * A scale-1 viewport provides the page's base display dimensions.
       * We preserve that aspect ratio in the generated PDF.
       */
      const baseViewport = page.getViewport({ scale: 1 });
      const canvas = await renderPageToCanvas(page, scale);

      if (grayscale) {
        applyGrayscale(canvas);
      }

      const imageBlob = await canvasToBlob(
        canvas,
        "jpeg",
        jpegQuality
      );

      const imageBytes = new Uint8Array(
        await imageBlob.arrayBuffer()
      );

      const image = await outputPdf.embedJpg(imageBytes);
      const outputPage = outputPdf.addPage([
        baseViewport.width,
        baseViewport.height,
      ]);

      outputPage.drawImage(image, {
        x: 0,
        y: 0,
        width: baseViewport.width,
        height: baseViewport.height,
      });

      page.cleanup();
      canvas.width = 1;
      canvas.height = 1;
    }

    return await outputPdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
    });
  } finally {
    await loadingTask.destroy().catch(() => undefined);
  }
}

export async function compressPdfRasterized(
  file: File,
  options: {
    scale?: number;
    jpegQuality?: number;
  } = {}
): Promise<Uint8Array> {
  return rasterizePdfToPdf(file, {
    scale: options.scale ?? 1.25,
    jpegQuality: options.jpegQuality ?? 0.72,
    grayscale: false,
  });
}

export async function convertPdfToGrayscale(
  file: File,
  options: {
    scale?: number;
    jpegQuality?: number;
  } = {}
): Promise<Uint8Array> {
  return rasterizePdfToPdf(file, {
    scale: options.scale ?? 1.5,
    jpegQuality: options.jpegQuality ?? 0.86,
    grayscale: true,
  });
}

export function calculateSizeReduction(
  originalBytes: number,
  outputBytes: number
): {
  originalBytes: number;
  outputBytes: number;
  bytesSaved: number;
  percentChange: number;
} {
  if (
    !Number.isFinite(originalBytes) ||
    originalBytes <= 0 ||
    !Number.isFinite(outputBytes) ||
    outputBytes < 0
  ) {
    throw new Error("Invalid file-size values.");
  }

  const bytesSaved = originalBytes - outputBytes;

  return {
    originalBytes,
    outputBytes,
    bytesSaved,
    percentChange:
      (bytesSaved / originalBytes) * 100,
  };
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0 B";
  }

  if (bytes < 1024) {
    return `${Math.round(bytes)} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}