import {
  degrees,
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

export type PdfPageInfo = {
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
  orientation: "portrait" | "landscape" | "square";
};

export type PdfInfo = {
  pageCount: number;
  title: string;
  author: string;
  subject: string;
  creator: string;
  producer: string;
  creationDate: string;
  modificationDate: string;
  pages: PdfPageInfo[];
};

async function loadPdf(
  data: ArrayBuffer | Uint8Array
): Promise<PDFDocument> {
  return PDFDocument.load(data, {
    updateMetadata: false,
  });
}

function dateToString(
  value: Date | undefined
): string {
  return value
    ? value.toISOString()
    : "";
}

function normalizeRotation(
  angle: number
): number {
  const normalized =
    ((angle % 360) + 360) % 360;

  return normalized;
}

export async function getPdfInfo(
  data: ArrayBuffer | Uint8Array
): Promise<PdfInfo> {
  const pdf = await loadPdf(data);

  const pages = pdf
    .getPages()
    .map((page, index) => {
      const { width, height } =
        page.getSize();

      const rotation =
        normalizeRotation(
          page.getRotation().angle
        );

      let orientation:
        | "portrait"
        | "landscape"
        | "square";

      if (width === height) {
        orientation = "square";
      } else if (width > height) {
        orientation = "landscape";
      } else {
        orientation = "portrait";
      }

      return {
        pageNumber: index + 1,
        width,
        height,
        rotation,
        orientation,
      };
    });

  return {
    pageCount: pdf.getPageCount(),
    title: pdf.getTitle() ?? "",
    author: pdf.getAuthor() ?? "",
    subject: pdf.getSubject() ?? "",
    creator: pdf.getCreator() ?? "",
    producer: pdf.getProducer() ?? "",
    creationDate: dateToString(
      pdf.getCreationDate()
    ),
    modificationDate: dateToString(
      pdf.getModificationDate()
    ),
    pages,
  };
}

export async function mergePdfs(
  pdfFiles: Array<
    ArrayBuffer | Uint8Array
  >
): Promise<Uint8Array> {
  if (pdfFiles.length < 2) {
    throw new Error(
      "Select at least two PDF files to merge."
    );
  }

  const output =
    await PDFDocument.create();

  for (const file of pdfFiles) {
    const source =
      await loadPdf(file);

    const copiedPages =
      await output.copyPages(
        source,
        source.getPageIndices()
      );

    copiedPages.forEach((page) => {
      output.addPage(page);
    });
  }

  return output.save();
}

export async function extractPdfPages(
  data: ArrayBuffer | Uint8Array,
  pageNumbers: number[]
): Promise<Uint8Array> {
  const source =
    await loadPdf(data);

  const pageCount =
    source.getPageCount();

  if (pageNumbers.length === 0) {
    throw new Error(
      "Select at least one page."
    );
  }

  const indexes = pageNumbers.map(
    (pageNumber) => {
      if (
        !Number.isInteger(pageNumber) ||
        pageNumber < 1 ||
        pageNumber > pageCount
      ) {
        throw new Error(
          `Page ${pageNumber} is outside the PDF page range.`
        );
      }

      return pageNumber - 1;
    }
  );

  const output =
    await PDFDocument.create();

  const pages =
    await output.copyPages(
      source,
      indexes
    );

  pages.forEach((page) => {
    output.addPage(page);
  });

  return output.save();
}

export async function removePdfPages(
  data: ArrayBuffer | Uint8Array,
  pageNumbers: number[]
): Promise<Uint8Array> {
  const source =
    await loadPdf(data);

  const pageCount =
    source.getPageCount();

  const removeSet =
    new Set(
      pageNumbers.map((pageNumber) => {
        if (
          !Number.isInteger(
            pageNumber
          ) ||
          pageNumber < 1 ||
          pageNumber > pageCount
        ) {
          throw new Error(
            `Page ${pageNumber} is outside the PDF page range.`
          );
        }

        return pageNumber - 1;
      })
    );

  const keepIndexes =
    source
      .getPageIndices()
      .filter(
        (index) =>
          !removeSet.has(index)
      );

  if (keepIndexes.length === 0) {
    throw new Error(
      "A PDF must contain at least one page."
    );
  }

  const output =
    await PDFDocument.create();

  const pages =
    await output.copyPages(
      source,
      keepIndexes
    );

  pages.forEach((page) => {
    output.addPage(page);
  });

  return output.save();
}

export async function reorderPdfPages(
  data: ArrayBuffer | Uint8Array,
  pageNumbers: number[]
): Promise<Uint8Array> {
  const source =
    await loadPdf(data);

  const pageCount =
    source.getPageCount();

  if (
    pageNumbers.length !== pageCount
  ) {
    throw new Error(
      "The new page order must include every page exactly once."
    );
  }

  const unique =
    new Set(pageNumbers);

  if (unique.size !== pageCount) {
    throw new Error(
      "Each page must appear exactly once."
    );
  }

  const indexes =
    pageNumbers.map(
      (pageNumber) => {
        if (
          !Number.isInteger(
            pageNumber
          ) ||
          pageNumber < 1 ||
          pageNumber > pageCount
        ) {
          throw new Error(
            `Page ${pageNumber} is outside the PDF page range.`
          );
        }

        return pageNumber - 1;
      }
    );

  const output =
    await PDFDocument.create();

  const pages =
    await output.copyPages(
      source,
      indexes
    );

  pages.forEach((page) => {
    output.addPage(page);
  });

  return output.save();
}

export async function rotatePdf(
  data: ArrayBuffer | Uint8Array,
  angle: 90 | 180 | 270
): Promise<Uint8Array> {
  const pdf =
    await loadPdf(data);

  pdf.getPages().forEach((page) => {
    const current =
      page.getRotation().angle;

    page.setRotation(
      degrees(
        normalizeRotation(
          current + angle
        )
      )
    );
  });

  return pdf.save();
}

export async function removePdfMetadata(
  data: ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const pdf =
    await loadPdf(data);

  pdf.setTitle("");
  pdf.setAuthor("");
  pdf.setSubject("");
  pdf.setKeywords([]);
  pdf.setCreator("");
  pdf.setProducer("");

  return pdf.save();
}

export async function addPdfPageNumbers(
  data: ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const pdf =
    await loadPdf(data);

  const font =
    await pdf.embedFont(
      StandardFonts.Helvetica
    );

  const pages =
    pdf.getPages();

  pages.forEach(
    (page, index) => {
      const { width } =
        page.getSize();

      const text =
        String(index + 1);

      const fontSize = 10;

      const textWidth =
        font.widthOfTextAtSize(
          text,
          fontSize
        );

      page.drawText(text, {
        x:
          width / 2 -
          textWidth / 2,
        y: 18,
        size: fontSize,
        font,
        color: rgb(
          0.25,
          0.25,
          0.25
        ),
      });
    }
  );

  return pdf.save();
}

export async function addPdfWatermark(
  data: ArrayBuffer | Uint8Array,
  text: string
): Promise<Uint8Array> {
  const watermark =
    text.trim();

  if (!watermark) {
    throw new Error(
      "Enter watermark text."
    );
  }

  const pdf =
    await loadPdf(data);

  const font =
    await pdf.embedFont(
      StandardFonts.Helvetica
    );

  pdf.getPages().forEach((page) => {
    const {
      width,
      height,
    } = page.getSize();

    const fontSize =
      Math.max(
        24,
        Math.min(width, height) / 10
      );

    const textWidth =
      font.widthOfTextAtSize(
        watermark,
        fontSize
      );

    page.drawText(watermark, {
      x:
        width / 2 -
        textWidth / 2,
      y: height / 2,
      size: fontSize,
      font,
      rotate: degrees(45),
      color: rgb(
        0.65,
        0.65,
        0.65
      ),
      opacity: 0.3,
    });
  });

  return pdf.save();
}

export async function imagesToPdf(
  images: Array<{
    bytes: ArrayBuffer | Uint8Array;
    type: "image/jpeg" | "image/png";
  }>
): Promise<Uint8Array> {
  if (images.length === 0) {
    throw new Error(
      "Select at least one image."
    );
  }

  const pdf =
    await PDFDocument.create();

  for (const image of images) {
    const embedded =
      image.type === "image/png"
        ? await pdf.embedPng(
            image.bytes
          )
        : await pdf.embedJpg(
            image.bytes
          );

    const {
      width,
      height,
    } = embedded.scale(1);

    const page =
      pdf.addPage([
        width,
        height,
      ]);

    page.drawImage(
      embedded,
      {
        x: 0,
        y: 0,
        width,
        height,
      }
    );
  }

  return pdf.save();
}