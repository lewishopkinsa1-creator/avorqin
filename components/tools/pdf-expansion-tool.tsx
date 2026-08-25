"use client";

import { useMemo, useState } from "react";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import {
  calculateSizeReduction,
  compressPdfRasterized,
  convertPdfToGrayscale,
  extractPdfText,
  formatFileSize,
  getPdfFileInfo,
  renderPdfPages,
  type PdfFileInfo,
  type PdfTextResult,
  type RenderedPdfPage,
} from "@/lib/tool-utils/pdf-render-utils";

type PdfExpansionKind =
  | "pdf-to-jpg"
  | "pdf-to-png"
  | "pdf-to-text"
  | "compress-pdf"
  | "html-to-pdf"
  | "text-to-pdf"
  | "markdown-to-pdf"
  | "pdf-to-grayscale"
  | "pdf-file-size-checker";

type PdfExpansionToolProps = {
  kind: PdfExpansionKind;
};

type GeneratedFile = {
  bytes: Uint8Array;
  fileName: string;
  mimeType: string;
};

type DocumentLine = {
  text: string;
  size: number;
  font: "regular" | "bold" | "mono";
  indent?: number;
  spacingAfter?: number;
};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const textareaClass =
  "min-h-72 w-full resize-y rounded-lg border bg-background px-3 py-3 font-mono text-sm leading-6 text-foreground placeholder:text-muted-foreground";

const buttonClass =
  "rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50";

function baseName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "") || "document";
}

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadBytes(
  bytes: Uint8Array,
  fileName: string,
  mimeType: string
): void {
  const copy = new Uint8Array(bytes);
  downloadBlob(new Blob([copy], { type: mimeType }), fileName);
}

function downloadText(text: string, fileName: string): void {
  downloadBlob(
    new Blob([text], {
      type: "text/plain;charset=utf-8",
    }),
    fileName
  );
}

function FilePicker({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block space-y-2">
        <span className="text-sm font-medium">PDF file</span>
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => {
            const nextFile = event.target.files?.[0] ?? null;
            onChange(nextFile);
            event.currentTarget.value = "";
          }}
          className={inputClass}
        />
      </label>

      {file && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/20 p-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {file.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange(null)}
            className={secondaryButtonClass}
          >
            Remove
          </button>
        </div>
      )}

      <p className="text-xs leading-relaxed text-muted-foreground">
        Processing happens in your browser. Large PDFs may require
        significant memory and can take longer to process.
      </p>
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 break-words text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}

function replaceUnsupportedText(text: string): string {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/•/g, "-")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "?");
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/~~(.*?)~~/g, "$1");
}

function markdownToDocumentLines(source: string): DocumentLine[] {
  const normalized = source.replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");
  const result: DocumentLine[] = [];
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (/^```/.test(trimmed)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      result.push({
        text: rawLine || " ",
        size: 9,
        font: "mono",
        indent: 12,
        spacingAfter: 2,
      });
      continue;
    }

    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);

    if (headingMatch) {
      const level = headingMatch[1].length;
      const sizes = [22, 18, 16, 14, 12, 11];

      result.push({
        text: stripInlineMarkdown(headingMatch[2]),
        size: sizes[level - 1],
        font: "bold",
        spacingAfter: level <= 2 ? 10 : 7,
      });
      continue;
    }

    const unordered = /^[-*+]\s+(.+)$/.exec(trimmed);

    if (unordered) {
      result.push({
        text: `- ${stripInlineMarkdown(unordered[1])}`,
        size: 11,
        font: "regular",
        indent: 14,
        spacingAfter: 4,
      });
      continue;
    }

    const ordered = /^(\d+)[.)]\s+(.+)$/.exec(trimmed);

    if (ordered) {
      result.push({
        text: `${ordered[1]}. ${stripInlineMarkdown(ordered[2])}`,
        size: 11,
        font: "regular",
        indent: 14,
        spacingAfter: 4,
      });
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(trimmed);

    if (quote) {
      result.push({
        text: stripInlineMarkdown(quote[1]),
        size: 10,
        font: "regular",
        indent: 18,
        spacingAfter: 5,
      });
      continue;
    }

    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      result.push({
        text: "----------------------------------------",
        size: 9,
        font: "regular",
        spacingAfter: 7,
      });
      continue;
    }

    if (!trimmed) {
      result.push({
        text: "",
        size: 11,
        font: "regular",
        spacingAfter: 7,
      });
      continue;
    }

    result.push({
      text: stripInlineMarkdown(trimmed),
      size: 11,
      font: "regular",
      spacingAfter: 5,
    });
  }

  return result;
}

function plainTextToDocumentLines(source: string): DocumentLine[] {
  return source
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => ({
      text: line,
      size: 11,
      font: "regular" as const,
      spacingAfter: line.trim() ? 3 : 7,
    }));
}

function htmlToTextSource(source: string): string {
  if (typeof window === "undefined") {
    return source;
  }

  const parser = new DOMParser();
  const documentNode = parser.parseFromString(source, "text/html");

  documentNode
    .querySelectorAll("script, style, noscript")
    .forEach((element) => element.remove());

  const blockSelectors = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "div",
    "section",
    "article",
    "header",
    "footer",
    "main",
    "aside",
    "blockquote",
    "pre",
    "li",
    "tr",
  ];

  for (const selector of blockSelectors) {
    for (const element of documentNode.querySelectorAll(selector)) {
      if (selector === "li") {
        element.prepend("- ");
      }

      element.append("\n");
    }
  }

  for (const element of documentNode.querySelectorAll("br")) {
    element.replaceWith("\n");
  }

  return (documentNode.body.textContent ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getLineFont(
  line: DocumentLine,
  fonts: {
    regular: PDFFont;
    bold: PDFFont;
    mono: PDFFont;
  }
): PDFFont {
  return fonts[line.font];
}

function wrapLine(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const safeText = replaceUnsupportedText(text);

  if (!safeText) {
    return [""];
  }

  const words = safeText.split(/\s+/);
  const output: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      current = candidate;
      continue;
    }

    if (current) {
      output.push(current);
      current = "";
    }

    if (font.widthOfTextAtSize(word, fontSize) <= maxWidth) {
      current = word;
      continue;
    }

    let chunk = "";

    for (const character of word) {
      const candidateChunk = chunk + character;

      if (
        chunk &&
        font.widthOfTextAtSize(candidateChunk, fontSize) > maxWidth
      ) {
        output.push(chunk);
        chunk = character;
      } else {
        chunk = candidateChunk;
      }
    }

    current = chunk;
  }

  if (current) {
    output.push(current);
  }

  return output.length > 0 ? output : [""];
}

function addPageNumber(
  page: PDFPage,
  font: PDFFont,
  pageNumber: number
): void {
  const label = String(pageNumber);
  const size = 9;
  const width = font.widthOfTextAtSize(label, size);

  page.drawText(label, {
    x: page.getWidth() - 48 - width,
    y: 24,
    size,
    font,
    color: rgb(0.45, 0.45, 0.45),
  });
}

async function createDocumentPdf(
  source: string,
  mode: "text" | "markdown" | "html"
): Promise<Uint8Array> {
  if (!source.trim()) {
    throw new Error("Enter content to convert.");
  }

  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const mono = await pdf.embedFont(StandardFonts.Courier);

  const fonts = { regular, bold, mono };

  const lines =
    mode === "markdown"
      ? markdownToDocumentLines(source)
      : mode === "html"
        ? plainTextToDocumentLines(htmlToTextSource(source))
        : plainTextToDocumentLines(source);

  const pageWidth = 612;
  const pageHeight = 792;
  const marginX = 54;
  const topMargin = 58;
  const bottomMargin = 50;
  const usableWidth = pageWidth - marginX * 2;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - topMargin;
  let pageNumber = 1;

  const newPage = () => {
    addPageNumber(page, regular, pageNumber);
    pageNumber += 1;
    page = pdf.addPage([pageWidth, pageHeight]);
    y = pageHeight - topMargin;
  };

  for (const line of lines) {
    const font = getLineFont(line, fonts);
    const indent = line.indent ?? 0;
    const availableWidth = usableWidth - indent;
    const wrapped = wrapLine(
      line.text,
      font,
      line.size,
      availableWidth
    );

    const lineHeight = Math.max(12, line.size * 1.35);

    for (const wrappedLine of wrapped) {
      if (y - lineHeight < bottomMargin) {
        newPage();
      }

      if (wrappedLine) {
        page.drawText(wrappedLine, {
          x: marginX + indent,
          y,
          size: line.size,
          font,
          color: rgb(0.08, 0.08, 0.08),
        });
      }

      y -= lineHeight;
    }

    y -= line.spacingAfter ?? 3;
  }

  addPageNumber(page, regular, pageNumber);

  return pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
    updateFieldAppearances: false,
  });
}

export function PdfExpansionTool({
  kind,
}: PdfExpansionToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState("");
  const [scale, setScale] = useState("2");
  const [jpegQuality, setJpegQuality] = useState("0.9");
  const [compressionPreset, setCompressionPreset] =
    useState<"maximum" | "balanced" | "quality">("balanced");

  const [renderedPages, setRenderedPages] =
    useState<RenderedPdfPage[] | null>(null);
  const [textResult, setTextResult] =
    useState<PdfTextResult | null>(null);
  const [fileInfo, setFileInfo] =
    useState<PdfFileInfo | null>(null);
  const [generatedFile, setGeneratedFile] =
    useState<GeneratedFile | null>(null);
  const [sizeResult, setSizeResult] = useState<{
    originalBytes: number;
    outputBytes: number;
    bytesSaved: number;
    percentChange: number;
  } | null>(null);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const isSourceTool =
    kind === "html-to-pdf" ||
    kind === "text-to-pdf" ||
    kind === "markdown-to-pdf";

  const clearResults = () => {
    setRenderedPages(null);
    setTextResult(null);
    setFileInfo(null);
    setGeneratedFile(null);
    setSizeResult(null);
    setError("");
    setCopied(false);
  };

  const chooseFile = (nextFile: File | null) => {
    setFile(nextFile);
    clearResults();
  };

  const reset = () => {
    setFile(null);
    setSource("");
    setScale("2");
    setJpegQuality("0.9");
    setCompressionPreset("balanced");
    clearResults();
  };

  const processTool = async () => {
    clearResults();
    setProcessing(true);

    try {
      if (kind === "pdf-to-jpg" || kind === "pdf-to-png") {
        if (!file) {
          throw new Error("Select a PDF file.");
        }

        const pages = await renderPdfPages(file, {
          format: kind === "pdf-to-jpg" ? "jpeg" : "png",
          scale: Number(scale),
          jpegQuality: Number(jpegQuality),
        });

        setRenderedPages(pages);
        return;
      }

      if (kind === "pdf-to-text") {
        if (!file) {
          throw new Error("Select a PDF file.");
        }

        setTextResult(await extractPdfText(file));
        return;
      }

      if (kind === "pdf-file-size-checker") {
        if (!file) {
          throw new Error("Select a PDF file.");
        }

        setFileInfo(await getPdfFileInfo(file));
        return;
      }

      if (kind === "compress-pdf") {
        if (!file) {
          throw new Error("Select a PDF file.");
        }

        const settings = {
          maximum: { scale: 1, jpegQuality: 0.58 },
          balanced: { scale: 1.25, jpegQuality: 0.72 },
          quality: { scale: 1.6, jpegQuality: 0.86 },
        }[compressionPreset];

        const bytes = await compressPdfRasterized(
          file,
          settings
        );

        setGeneratedFile({
          bytes,
          fileName: `${baseName(file.name)}-compressed.pdf`,
          mimeType: "application/pdf",
        });

        setSizeResult(
          calculateSizeReduction(file.size, bytes.length)
        );
        return;
      }

      if (kind === "pdf-to-grayscale") {
        if (!file) {
          throw new Error("Select a PDF file.");
        }

        const bytes = await convertPdfToGrayscale(file);

        setGeneratedFile({
          bytes,
          fileName: `${baseName(file.name)}-grayscale.pdf`,
          mimeType: "application/pdf",
        });

        setSizeResult(
          calculateSizeReduction(file.size, bytes.length)
        );
        return;
      }

      if (kind === "text-to-pdf") {
        const bytes = await createDocumentPdf(source, "text");

        setGeneratedFile({
          bytes,
          fileName: "text-document.pdf",
          mimeType: "application/pdf",
        });
        return;
      }

      if (kind === "markdown-to-pdf") {
        const bytes = await createDocumentPdf(
          source,
          "markdown"
        );

        setGeneratedFile({
          bytes,
          fileName: "markdown-document.pdf",
          mimeType: "application/pdf",
        });
        return;
      }

      if (kind === "html-to-pdf") {
        const bytes = await createDocumentPdf(source, "html");

        setGeneratedFile({
          bytes,
          fileName: "html-document.pdf",
          mimeType: "application/pdf",
        });
        return;
      }

      throw new Error("This PDF tool is not configured.");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to process the PDF."
      );
    } finally {
      setProcessing(false);
    }
  };

  const copyExtractedText = async () => {
    if (!textResult) {
      return;
    }

    try {
      await navigator.clipboard.writeText(textResult.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Unable to copy the extracted text.");
    }
  };

  const sourcePlaceholder = useMemo(() => {
    switch (kind) {
      case "html-to-pdf":
        return "<h1>Example document</h1>\n<p>Paste HTML here.</p>";
      case "markdown-to-pdf":
        return "# Example document\n\nPaste Markdown here.\n\n- Item one\n- Item two";
      case "text-to-pdf":
      default:
        return "Type or paste the text you want to convert to PDF.";
    }
  }, [kind]);

  return (
    <div className="space-y-5">
      {!isSourceTool && (
        <FilePicker file={file} onChange={chooseFile} />
      )}

      {(kind === "pdf-to-jpg" || kind === "pdf-to-png") && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Render quality
            </span>
            <select
              value={scale}
              onChange={(event) => setScale(event.target.value)}
              className={inputClass}
            >
              <option value="1">Standard (1×)</option>
              <option value="1.5">High (1.5×)</option>
              <option value="2">Very high (2×)</option>
              <option value="2.5">Extra high (2.5×)</option>
            </select>
          </label>

          {kind === "pdf-to-jpg" && (
            <label className="block space-y-2">
              <span className="text-sm font-medium">
                JPG quality
              </span>
              <select
                value={jpegQuality}
                onChange={(event) =>
                  setJpegQuality(event.target.value)
                }
                className={inputClass}
              >
                <option value="0.7">Smaller file</option>
                <option value="0.85">Balanced</option>
                <option value="0.9">High quality</option>
                <option value="0.96">Maximum quality</option>
              </select>
            </label>
          )}
        </div>
      )}

      {kind === "compress-pdf" && (
        <>
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Compression preset
            </span>
            <select
              value={compressionPreset}
              onChange={(event) =>
                setCompressionPreset(
                  event.target.value as
                    | "maximum"
                    | "balanced"
                    | "quality"
                )
              }
              className={inputClass}
            >
              <option value="maximum">
                Maximum compression
              </option>
              <option value="balanced">
                Balanced compression
              </option>
              <option value="quality">
                Higher visual quality
              </option>
            </select>
          </label>

          <div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
            Compression rasterizes each page before rebuilding the
            PDF. This can reduce image-heavy or scanned PDFs, but it
            also flattens selectable text, links, forms, and other
            interactive PDF content. Some already-optimized PDFs can
            become larger instead of smaller.
          </div>
        </>
      )}

      {kind === "pdf-to-grayscale" && (
        <div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
          Grayscale conversion rasterizes each page, converts its
          pixels to grayscale, and rebuilds the document. Selectable
          text, links, form fields, and other interactive content are
          flattened.
        </div>
      )}

      {isSourceTool && (
        <>
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              {kind === "html-to-pdf"
                ? "HTML"
                : kind === "markdown-to-pdf"
                  ? "Markdown"
                  : "Text"}
            </span>
            <textarea
              value={source}
              onChange={(event) => {
                setSource(event.target.value);
                clearResults();
              }}
              placeholder={sourcePlaceholder}
              className={textareaClass}
            />
          </label>

          {kind === "html-to-pdf" && (
            <div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
              This converter extracts readable document content from
              HTML and creates a clean PDF. Scripts and styles are
              ignored, so it is intended for content conversion rather
              than pixel-perfect webpage reproduction.
            </div>
          )}

          {kind === "markdown-to-pdf" && (
            <div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
              Headings, lists, quotes, code blocks, links, and common
              inline Markdown are converted into a clean printable
              document. Advanced Markdown extensions are not required.
            </div>
          )}
        </>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={processTool}
          disabled={processing}
          className={buttonClass}
        >
          {processing
            ? "Processing..."
            : kind === "pdf-to-jpg"
              ? "Convert to JPG"
              : kind === "pdf-to-png"
                ? "Convert to PNG"
                : kind === "pdf-to-text"
                  ? "Extract text"
                  : kind === "compress-pdf"
                    ? "Compress PDF"
                    : kind === "pdf-to-grayscale"
                      ? "Convert to grayscale"
                      : kind === "pdf-file-size-checker"
                        ? "Check PDF"
                        : "Create PDF"}
        </button>

        {(file ||
          source ||
          renderedPages ||
          textResult ||
          generatedFile ||
          fileInfo ||
          error) && (
          <button
            type="button"
            onClick={reset}
            disabled={processing}
            className={secondaryButtonClass}
          >
            Reset
          </button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {renderedPages && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">
              Converted pages
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {renderedPages.length} page
              {renderedPages.length === 1 ? "" : "s"} converted.
              Download the page images below.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {renderedPages.map((page) => (
              <div
                key={page.pageNumber}
                className="flex items-center justify-between gap-3 rounded-xl border bg-background p-4"
              >
                <div>
                  <div className="font-medium">
                    Page {page.pageNumber}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {page.width} × {page.height} px ·{" "}
                    {formatFileSize(page.blob.size)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    downloadBlob(page.blob, page.fileName)
                  }
                  className={secondaryButtonClass}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {textResult && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Pages processed"
              value={String(textResult.pageCount)}
            />
            <ResultCard
              label="Characters extracted"
              value={textResult.text.length.toLocaleString("en-US")}
            />
          </div>

          {textResult.text ? (
            <>
              <textarea
                readOnly
                value={textResult.text}
                className={textareaClass}
                aria-label="Extracted PDF text"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyExtractedText}
                  className={secondaryButtonClass}
                >
                  {copied ? "Copied" : "Copy text"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    downloadText(
                      textResult.text,
                      `${baseName(file?.name ?? "pdf")}.txt`
                    )
                  }
                  className={secondaryButtonClass}
                >
                  Download TXT
                </button>
              </div>
            </>
          ) : (
            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              No selectable text was found. Scanned image-only PDFs
              usually require OCR, which this tool does not perform.
            </div>
          )}
        </div>
      )}

      {fileInfo && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultCard
            label="File size"
            value={formatFileSize(fileInfo.bytes)}
          />
          <ResultCard
            label="Pages"
            value={fileInfo.pageCount.toLocaleString("en-US")}
          />
          <ResultCard
            label="Kilobytes"
            value={fileInfo.kilobytes.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          />
          <ResultCard
            label="Megabytes"
            value={fileInfo.megabytes.toLocaleString("en-US", {
              maximumFractionDigits: 3,
            })}
          />
        </div>
      )}

      {generatedFile && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-medium">
                  {generatedFile.fileName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(generatedFile.bytes.length)}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  downloadBytes(
                    generatedFile.bytes,
                    generatedFile.fileName,
                    generatedFile.mimeType
                  )
                }
                className={buttonClass}
              >
                Download PDF
              </button>
            </div>
          </div>

          {sizeResult && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard
                label="Original size"
                value={formatFileSize(sizeResult.originalBytes)}
              />
              <ResultCard
                label="Output size"
                value={formatFileSize(sizeResult.outputBytes)}
              />
              <ResultCard
                label={
                  sizeResult.bytesSaved >= 0
                    ? "Space saved"
                    : "Size increase"
                }
                value={formatFileSize(
                  Math.abs(sizeResult.bytesSaved)
                )}
              />
              <ResultCard
                label="Size change"
                value={`${
                  sizeResult.percentChange >= 0 ? "-" : "+"
                }${Math.abs(sizeResult.percentChange).toFixed(1)}%`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}