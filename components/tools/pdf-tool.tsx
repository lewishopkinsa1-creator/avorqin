"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  Download,
  FileText,
  Loader2,
} from "lucide-react";

import {
  FileUploadZone,
  type SelectedFile,
} from "@/components/tools/file-upload-zone";

import {
  downloadFile,
  makeOutputFilename,
  readFileAsArrayBuffer,
} from "@/lib/tool-utils/file-utils";

import {
  addPdfPageNumbers,
  addPdfWatermark,
  extractPdfPages,
  getPdfInfo,
  imagesToPdf,
  mergePdfs,
  removePdfMetadata,
  removePdfPages,
  reorderPdfPages,
  rotatePdf,
} from "@/lib/tool-utils/pdf-utils";

type PdfToolKind =
  | "merge-pdf"
  | "split-pdf"
  | "extract-pdf-pages"
  | "remove-pdf-pages"
  | "reorder-pdf-pages"
  | "rotate-pdf"
  | "pdf-page-counter"
  | "pdf-metadata-viewer"
  | "pdf-metadata-remover"
  | "pdf-page-size-checker"
  | "pdf-orientation-checker"
  | "pdf-info"
  | "add-page-numbers-to-pdf"
  | "add-watermark-to-pdf"
  | "images-to-pdf"
  | "jpg-to-pdf"
  | "png-to-pdf";

type Props = {
  kind: PdfToolKind;
};

type Result = {
  name: string;
  bytes: Uint8Array;
};

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50";

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

function parsePages(
  value: string
): number[] {
  const clean = value.trim();

  if (!clean) {
    throw new Error(
      "Enter at least one page number."
    );
  }

  const pages = new Set<number>();

  for (const part of clean.split(",")) {
    const token = part.trim();

    if (!token) {
      continue;
    }

    if (token.includes("-")) {
      const [startRaw, endRaw] =
        token.split("-");

      const start = Number(startRaw);
      const end = Number(endRaw);

      if (
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 1 ||
        end < start
      ) {
        throw new Error(
          `Invalid page range: ${token}`
        );
      }

      for (
        let page = start;
        page <= end;
        page += 1
      ) {
        pages.add(page);
      }

      continue;
    }

    const page = Number(token);

    if (
      !Number.isInteger(page) ||
      page < 1
    ) {
      throw new Error(
        `Invalid page number: ${token}`
      );
    }

    pages.add(page);
  }

  return Array.from(pages);
}

function parsePageOrder(
  value: string
): number[] {
  const clean = value.trim();

  if (!clean) {
    throw new Error(
      "Enter the new page order."
    );
  }

  return clean
    .split(",")
    .map((item) => {
      const page = Number(
        item.trim()
      );

      if (
        !Number.isInteger(page) ||
        page < 1
      ) {
        throw new Error(
          "Page order must contain valid page numbers separated by commas."
        );
      }

      return page;
    });
}

function getAccept(
  kind: PdfToolKind
): string {
  if (kind === "jpg-to-pdf") {
    return ".jpg,.jpeg,image/jpeg";
  }

  if (kind === "png-to-pdf") {
    return ".png,image/png";
  }

  if (kind === "images-to-pdf") {
    return ".jpg,.jpeg,.png,image/jpeg,image/png";
  }

  return ".pdf,application/pdf";
}

function allowsMultiple(
  kind: PdfToolKind
): boolean {
  return [
    "merge-pdf",
    "images-to-pdf",
    "jpg-to-pdf",
    "png-to-pdf",
  ].includes(kind);
}

function actionLabel(
  kind: PdfToolKind
): string {
  const labels: Record<
    PdfToolKind,
    string
  > = {
    "merge-pdf": "Merge PDFs",
    "split-pdf": "Split PDF",
    "extract-pdf-pages":
      "Extract Pages",
    "remove-pdf-pages":
      "Remove Pages",
    "reorder-pdf-pages":
      "Reorder Pages",
    "rotate-pdf": "Rotate PDF",
    "pdf-page-counter":
      "Count Pages",
    "pdf-metadata-viewer":
      "View Metadata",
    "pdf-metadata-remover":
      "Remove Metadata",
    "pdf-page-size-checker":
      "Check Page Sizes",
    "pdf-orientation-checker":
      "Check Orientation",
    "pdf-info":
      "View PDF Information",
    "add-page-numbers-to-pdf":
      "Add Page Numbers",
    "add-watermark-to-pdf":
      "Add Watermark",
    "images-to-pdf":
      "Create PDF",
    "jpg-to-pdf":
      "Convert JPG to PDF",
    "png-to-pdf":
      "Convert PNG to PDF",
  };

  return labels[kind];
}

export function PdfTool({
  kind,
}: Props) {
  const [files, setFiles] =
    useState<SelectedFile[]>([]);

  const [pageInput, setPageInput] =
    useState("");

  const [watermark, setWatermark] =
    useState("Avorqin");

  const [rotation, setRotation] =
    useState<90 | 180 | 270>(90);

  const [busy, setBusy] =
    useState(false);

  const [error, setError] =
    useState("");

  const [info, setInfo] =
    useState<unknown>(null);

  const [results, setResults] =
    useState<Result[]>([]);

  const accept = useMemo(
    () => getAccept(kind),
    [kind]
  );

  const multiple = useMemo(
    () => allowsMultiple(kind),
    [kind]
  );

  const clearResults = () => {
    setError("");
    setInfo(null);
    setResults([]);
  };

  const handleFiles = (
    nextFiles: SelectedFile[]
  ) => {
    setFiles(nextFiles);
    clearResults();
  };

  const requireFile = () => {
    if (files.length === 0) {
      throw new Error(
        "Select a file first."
      );
    }

    return files[0].file;
  };

  const run = async () => {
    setBusy(true);
    clearResults();

    try {
      if (kind === "merge-pdf") {
        if (files.length < 2) {
          throw new Error(
            "Select at least two PDF files."
          );
        }

        const buffers =
          await Promise.all(
            files.map(({ file }) =>
              readFileAsArrayBuffer(
                file
              )
            )
          );

        const bytes =
          await mergePdfs(buffers);

        setResults([
          {
            name: "merged.pdf",
            bytes,
          },
        ]);

        return;
      }

      if (
        kind === "images-to-pdf" ||
        kind === "jpg-to-pdf" ||
        kind === "png-to-pdf"
      ) {
        if (files.length === 0) {
          throw new Error(
            "Select at least one image."
          );
        }

        const images =
          await Promise.all(
            files.map(
              async ({ file }) => {
                const bytes =
                  await readFileAsArrayBuffer(
                    file
                  );

                let type:
                  | "image/jpeg"
                  | "image/png";

                if (
                  file.type ===
                    "image/png" ||
                  file.name
                    .toLowerCase()
                    .endsWith(".png")
                ) {
                  type = "image/png";
                } else {
                  type =
                    "image/jpeg";
                }

                return {
                  bytes,
                  type,
                };
              }
            )
          );

        const bytes =
          await imagesToPdf(images);

        const firstName =
          files[0].file.name;

        setResults([
          {
            name:
              makeOutputFilename(
                firstName,
                "converted",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      const file =
        requireFile();

      const data =
        await readFileAsArrayBuffer(
          file
        );

      if (
        kind ===
          "pdf-page-counter" ||
        kind ===
          "pdf-metadata-viewer" ||
        kind ===
          "pdf-page-size-checker" ||
        kind ===
          "pdf-orientation-checker" ||
        kind === "pdf-info"
      ) {
        const pdfInfo =
          await getPdfInfo(data);

        if (
          kind ===
          "pdf-page-counter"
        ) {
          setInfo({
            pageCount:
              pdfInfo.pageCount,
          });

          return;
        }

        if (
          kind ===
          "pdf-metadata-viewer"
        ) {
          setInfo({
            title: pdfInfo.title,
            author:
              pdfInfo.author,
            subject:
              pdfInfo.subject,
            creator:
              pdfInfo.creator,
            producer:
              pdfInfo.producer,
            creationDate:
              pdfInfo.creationDate,
            modificationDate:
              pdfInfo.modificationDate,
          });

          return;
        }

        if (
          kind ===
          "pdf-page-size-checker"
        ) {
          setInfo(
            pdfInfo.pages.map(
              (page) => ({
                page:
                  page.pageNumber,
                width:
                  Math.round(
                    page.width * 100
                  ) / 100,
                height:
                  Math.round(
                    page.height * 100
                  ) / 100,
              })
            )
          );

          return;
        }

        if (
          kind ===
          "pdf-orientation-checker"
        ) {
          setInfo(
            pdfInfo.pages.map(
              (page) => ({
                page:
                  page.pageNumber,
                orientation:
                  page.orientation,
                rotation:
                  page.rotation,
              })
            )
          );

          return;
        }

        setInfo(pdfInfo);

        return;
      }

      if (
        kind ===
        "extract-pdf-pages"
      ) {
        const pages =
          parsePages(pageInput);

        const bytes =
          await extractPdfPages(
            data,
            pages
          );

        setResults([
          {
            name:
              makeOutputFilename(
                file.name,
                "extracted",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      if (
        kind ===
        "remove-pdf-pages"
      ) {
        const pages =
          parsePages(pageInput);

        const bytes =
          await removePdfPages(
            data,
            pages
          );

        setResults([
          {
            name:
              makeOutputFilename(
                file.name,
                "pages-removed",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      if (
        kind ===
        "reorder-pdf-pages"
      ) {
        const order =
          parsePageOrder(
            pageInput
          );

        const bytes =
          await reorderPdfPages(
            data,
            order
          );

        setResults([
          {
            name:
              makeOutputFilename(
                file.name,
                "reordered",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      if (
        kind === "rotate-pdf"
      ) {
        const bytes =
          await rotatePdf(
            data,
            rotation
          );

        setResults([
          {
            name:
              makeOutputFilename(
                file.name,
                "rotated",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      if (
        kind ===
        "pdf-metadata-remover"
      ) {
        const bytes =
          await removePdfMetadata(
            data
          );

        setResults([
          {
            name:
              makeOutputFilename(
                file.name,
                "metadata-removed",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      if (
        kind ===
        "add-page-numbers-to-pdf"
      ) {
        const bytes =
          await addPdfPageNumbers(
            data
          );

        setResults([
          {
            name:
              makeOutputFilename(
                file.name,
                "numbered",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      if (
        kind ===
        "add-watermark-to-pdf"
      ) {
        const bytes =
          await addPdfWatermark(
            data,
            watermark
          );

        setResults([
          {
            name:
              makeOutputFilename(
                file.name,
                "watermarked",
                "pdf"
              ),
            bytes,
          },
        ]);

        return;
      }

      if (kind === "split-pdf") {
        const pdfInfo =
          await getPdfInfo(data);

        const splitResults:
          Result[] = [];

        for (
          let page = 1;
          page <=
          pdfInfo.pageCount;
          page += 1
        ) {
          const bytes =
            await extractPdfPages(
              data,
              [page]
            );

          splitResults.push({
            name: `${makeOutputFilename(
              file.name,
              `page-${page}`,
              "pdf"
            )}`,
            bytes,
          });
        }

        setResults(splitResults);

        return;
      }

      throw new Error(
        "This PDF tool is not configured yet."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to process the file."
      );
    } finally {
      setBusy(false);
    }
  };

  const showPageInput = [
    "extract-pdf-pages",
    "remove-pdf-pages",
    "reorder-pdf-pages",
  ].includes(kind);

  return (
    <div className="space-y-5">
      <FileUploadZone
        accept={accept}
        multiple={multiple}
        files={files}
        onFilesChange={
          handleFiles
        }
        maxFiles={
          multiple ? 50 : 1
        }
        maxFileSizeMB={50}
      />

      {showPageInput && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {kind ===
            "reorder-pdf-pages"
              ? "New page order"
              : "Pages"}
          </label>

          <input
            value={pageInput}
            onChange={(event) =>
              setPageInput(
                event.target.value
              )
            }
            placeholder={
              kind ===
              "reorder-pdf-pages"
                ? "3,1,2,4"
                : "1,3,5-8"
            }
            className={
              inputClass
            }
          />

          <p className="text-xs text-muted-foreground">
            {kind ===
            "reorder-pdf-pages"
              ? "Enter every page exactly once, separated by commas."
              : "Use commas or ranges, such as 1,3,5-8."}
          </p>
        </div>
      )}

      {kind === "rotate-pdf" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Rotation
          </label>

          <select
            value={rotation}
            onChange={(event) =>
              setRotation(
                Number(
                  event.target.value
                ) as
                  | 90
                  | 180
                  | 270
              )
            }
            className={
              inputClass
            }
          >
            <option value={90}>
              90° clockwise
            </option>

            <option value={180}>
              180°
            </option>

            <option value={270}>
              270° clockwise
            </option>
          </select>
        </div>
      )}

      {kind ===
        "add-watermark-to-pdf" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Watermark text
          </label>

          <input
            value={watermark}
            onChange={(event) =>
              setWatermark(
                event.target.value
              )
            }
            placeholder="Watermark"
            className={
              inputClass
            }
          />
        </div>
      )}

      <button
        type="button"
        onClick={run}
        disabled={
          busy ||
          files.length === 0
        }
        className={buttonClass}
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <FileText className="h-4 w-4" />
            {actionLabel(kind)}
          </>
        )}
      </button>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {info !== null && (
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">
            Result
          </h3>

          <pre className="max-h-[500px] overflow-auto rounded-xl border bg-muted/30 p-4 text-sm text-foreground">
            {JSON.stringify(
              info,
              null,
              2
            )}
          </pre>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">
            {results.length === 1
              ? "Your file is ready"
              : `${results.length} files are ready`}
          </h3>

          <div className="space-y-2">
            {results.map(
              (result, index) => (
                <div
                  key={`${result.name}-${index}`}
                  className="flex flex-col gap-3 rounded-xl border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-foreground">
                      {result.name}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      PDF output
                    </div>
                  </div>

                  <button
                    type="button"
                    className={
                      secondaryButtonClass
                    }
                    onClick={() =>
                      downloadFile(
                        result.bytes,
                        result.name,
                        "application/pdf"
                      )
                    }
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <p className="text-xs leading-5 text-muted-foreground">
        Files are processed in your
        browser for this tool and are
        not intentionally uploaded to
        Avorqin for processing.
      </p>
    </div>
  );
}