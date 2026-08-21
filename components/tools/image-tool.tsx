"use client";

import { useEffect, useState } from "react";
import {
  calculateImageDpi,
  compressImage,
  convertImage,
  cropImage,
  getImageDimensions,
  imageToBase64,
  resizeImage,
  rotateImage,
  svgToPng,
} from "@/lib/tool-utils/image-utils";

type ImageToolProps = {
  kind: string;
};

type ResultFile = {
  blob: Blob;
  filename: string;
};

function outputName(
  originalName: string,
  suffix: string,
  extension: string
) {
  const base =
    originalName.replace(/\.[^.]+$/, "") ||
    "image";

  return `${base}-${suffix}.${extension}`;
}

function downloadBlob(
  blob: Blob,
  filename: string
) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(2)} MB`;
}

export function ImageTool({
  kind,
}: ImageToolProps) {
  const [file, setFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [result, setResult] =
    useState<ResultFile | null>(null);

  const [textResult, setTextResult] =
    useState("");

  const [error, setError] =
    useState("");

  const [busy, setBusy] =
    useState(false);

  const [width, setWidth] =
    useState("800");

  const [height, setHeight] =
    useState("600");

  const [cropX, setCropX] =
    useState("0");

  const [cropY, setCropY] =
    useState("0");

  const [cropWidth, setCropWidth] =
    useState("500");

  const [cropHeight, setCropHeight] =
    useState("500");

  const [quality, setQuality] =
    useState("75");

  const [rotation, setRotation] =
    useState<"90" | "180" | "270">(
      "90"
    );

  const [physicalWidth, setPhysicalWidth] =
    useState("6");

  const [
    physicalHeight,
    setPhysicalHeight,
  ] = useState("4");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const box =
    "w-full rounded-lg border bg-background p-3 text-foreground placeholder:text-muted-foreground";

  const btn =
    "rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

  const secondaryBtn =
    "rounded-lg border bg-background px-4 py-2 font-medium text-foreground transition hover:bg-muted";

  const resetOutput = () => {
    setResult(null);
    setTextResult("");
    setError("");
  };

  const selectFile = (
    selected: File | null
  ) => {
    setFile(selected);
    resetOutput();
  };

  const run = async () => {
    if (!file) {
      setError(
        "Choose an image file first."
      );
      return;
    }

    setBusy(true);
    setError("");
    setResult(null);
    setTextResult("");

    try {
      switch (kind) {
        case "image-compressor": {
          const blob =
            await compressImage(
              file,
              Number(quality) / 100
            );

          const extension =
            blob.type === "image/webp"
              ? "webp"
              : "jpg";

          setResult({
            blob,
            filename: outputName(
              file.name,
              "compressed",
              extension
            ),
          });

          break;
        }

        case "image-resizer": {
          const blob =
            await resizeImage(file, {
              width: Number(width),
              height: Number(height),
              quality:
                Number(quality) / 100,
            });

          const extension =
            blob.type === "image/png"
              ? "png"
              : blob.type ===
                  "image/webp"
                ? "webp"
                : "jpg";

          setResult({
            blob,
            filename: outputName(
              file.name,
              "resized",
              extension
            ),
          });

          break;
        }

        case "image-cropper": {
          const blob =
            await cropImage(file, {
              x: Number(cropX),
              y: Number(cropY),
              width: Number(cropWidth),
              height: Number(cropHeight),
              quality:
                Number(quality) / 100,
            });

          const extension =
            blob.type === "image/png"
              ? "png"
              : blob.type ===
                  "image/webp"
                ? "webp"
                : "jpg";

          setResult({
            blob,
            filename: outputName(
              file.name,
              "cropped",
              extension
            ),
          });

          break;
        }

        case "image-rotator": {
          const blob =
            await rotateImage(file, {
              degrees: Number(
                rotation
              ) as 90 | 180 | 270,
              quality:
                Number(quality) / 100,
            });

          const extension =
            blob.type === "image/png"
              ? "png"
              : blob.type ===
                  "image/webp"
                ? "webp"
                : "jpg";

          setResult({
            blob,
            filename: outputName(
              file.name,
              "rotated",
              extension
            ),
          });

          break;
        }

        case "jpg-to-png": {
          const blob =
            await convertImage(
              file,
              "image/png",
              1
            );

          setResult({
            blob,
            filename: outputName(
              file.name,
              "converted",
              "png"
            ),
          });

          break;
        }

        case "png-to-jpg": {
          const blob =
            await convertImage(
              file,
              "image/jpeg",
              Number(quality) / 100
            );

          setResult({
            blob,
            filename: outputName(
              file.name,
              "converted",
              "jpg"
            ),
          });

          break;
        }

        case "webp-to-png": {
          const blob =
            await convertImage(
              file,
              "image/png",
              1
            );

          setResult({
            blob,
            filename: outputName(
              file.name,
              "converted",
              "png"
            ),
          });

          break;
        }

        case "png-to-webp": {
          const blob =
            await convertImage(
              file,
              "image/webp",
              Number(quality) / 100
            );

          setResult({
            blob,
            filename: outputName(
              file.name,
              "converted",
              "webp"
            ),
          });

          break;
        }

        case "jpg-to-webp": {
          const blob =
            await convertImage(
              file,
              "image/webp",
              Number(quality) / 100
            );

          setResult({
            blob,
            filename: outputName(
              file.name,
              "converted",
              "webp"
            ),
          });

          break;
        }

        case "webp-to-jpg": {
          const blob =
            await convertImage(
              file,
              "image/jpeg",
              Number(quality) / 100
            );

          setResult({
            blob,
            filename: outputName(
              file.name,
              "converted",
              "jpg"
            ),
          });

          break;
        }

        case "svg-to-png": {
          const blob =
            await svgToPng(file);

          setResult({
            blob,
            filename: outputName(
              file.name,
              "converted",
              "png"
            ),
          });

          break;
        }

        case "image-dimensions-checker": {
          const dimensions =
            await getImageDimensions(
              file
            );

          setTextResult(
            [
              `Width: ${dimensions.width} px`,
              `Height: ${dimensions.height} px`,
              `Megapixels: ${dimensions.megapixels} MP`,
              `Aspect ratio: ${dimensions.aspectRatio}`,
            ].join("\n")
          );

          break;
        }

        case "image-dpi-calculator": {
          const dpi =
            await calculateImageDpi(
              file,
              Number(physicalWidth),
              Number(physicalHeight)
            );

          setTextResult(
            [
              `Horizontal DPI: ${dpi.horizontalDpi}`,
              `Vertical DPI: ${dpi.verticalDpi}`,
            ].join("\n")
          );

          break;
        }

        case "image-to-base64": {
          const encoded =
            await imageToBase64(file);

          setTextResult(encoded);
          break;
        }

        default:
          throw new Error(
            "This image tool is not configured."
          );
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to process the image."
      );
    } finally {
      setBusy(false);
    }
  };

  const accepts =
    kind === "svg-to-png"
      ? ".svg,image/svg+xml"
      : kind === "jpg-to-png" ||
          kind === "jpg-to-webp"
        ? ".jpg,.jpeg,image/jpeg"
        : kind === "png-to-jpg" ||
            kind === "png-to-webp"
          ? ".png,image/png"
          : kind === "webp-to-png" ||
              kind === "webp-to-jpg"
            ? ".webp,image/webp"
            : "image/*";

  const needsQuality = [
    "image-compressor",
    "image-resizer",
    "image-cropper",
    "image-rotator",
    "png-to-jpg",
    "png-to-webp",
    "jpg-to-webp",
    "webp-to-jpg",
  ].includes(kind);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-dashed p-6">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Choose image
          </span>

          <input
            type="file"
            accept={accepts}
            onChange={(event) =>
              selectFile(
                event.target.files?.[0] ??
                  null
              )
            }
            className={box}
          />
        </label>

        {file && (
          <div className="mt-4 rounded-lg border bg-muted/20 p-4">
            <p className="font-medium">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {formatBytes(file.size)} ·{" "}
              {file.type ||
                "Unknown image type"}
            </p>
          </div>
        )}
      </div>

      {file &&
        previewUrl &&
        kind !== "svg-to-png" && (
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="mb-3 text-sm font-medium">
              Preview
            </p>

            <img
              src={previewUrl}
              alt="Selected image preview"
              className="max-h-80 max-w-full rounded-lg object-contain"
            />
          </div>
        )}

      {kind === "image-resizer" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium">
              Width (pixels)
            </span>

            <input
              type="number"
              min="1"
              value={width}
              onChange={(event) =>
                setWidth(
                  event.target.value
                )
              }
              className={box}
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium">
              Height (pixels)
            </span>

            <input
              type="number"
              min="1"
              value={height}
              onChange={(event) =>
                setHeight(
                  event.target.value
                )
              }
              className={box}
            />
          </label>
        </div>
      )}

      {kind === "image-cropper" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium">
              X position
            </span>

            <input
              type="number"
              min="0"
              value={cropX}
              onChange={(event) =>
                setCropX(
                  event.target.value
                )
              }
              className={box}
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium">
              Y position
            </span>

            <input
              type="number"
              min="0"
              value={cropY}
              onChange={(event) =>
                setCropY(
                  event.target.value
                )
              }
              className={box}
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium">
              Crop width
            </span>

            <input
              type="number"
              min="1"
              value={cropWidth}
              onChange={(event) =>
                setCropWidth(
                  event.target.value
                )
              }
              className={box}
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium">
              Crop height
            </span>

            <input
              type="number"
              min="1"
              value={cropHeight}
              onChange={(event) =>
                setCropHeight(
                  event.target.value
                )
              }
              className={box}
            />
          </label>
        </div>
      )}

      {kind === "image-rotator" && (
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Rotation
          </span>

          <select
            value={rotation}
            onChange={(event) =>
              setRotation(
                event.target.value as
                  | "90"
                  | "180"
                  | "270"
              )
            }
            className={box}
          >
            <option value="90">
              90° clockwise
            </option>

            <option value="180">
              180°
            </option>

            <option value="270">
              270° clockwise
            </option>
          </select>
        </label>
      )}

      {kind ===
        "image-dpi-calculator" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium">
              Printed width (inches)
            </span>

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={physicalWidth}
              onChange={(event) =>
                setPhysicalWidth(
                  event.target.value
                )
              }
              className={box}
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium">
              Printed height (inches)
            </span>

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={physicalHeight}
              onChange={(event) =>
                setPhysicalHeight(
                  event.target.value
                )
              }
              className={box}
            />
          </label>
        </div>
      )}

      {needsQuality && (
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Quality: {quality}%
          </span>

          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(event) =>
              setQuality(
                event.target.value
              )
            }
            className="w-full"
          />
        </label>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={run}
          disabled={!file || busy}
          className={btn}
        >
          {busy
            ? "Processing..."
            : "Run Tool"}
        </button>

        {(result ||
          textResult ||
          error) && (
          <button
            type="button"
            onClick={resetOutput}
            className={secondaryBtn}
          >
            Clear result
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

      {result && (
        <div className="rounded-xl border bg-muted/20 p-5">
          <h3 className="font-semibold">
            Image ready
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Output size:{" "}
            {formatBytes(
              result.blob.size
            )}
          </p>

          <button
            type="button"
            onClick={() =>
              downloadBlob(
                result.blob,
                result.filename
              )
            }
            className={`${btn} mt-4`}
          >
            Download image
          </button>
        </div>
      )}

      {textResult && (
        <div className="space-y-3">
          <textarea
            value={textResult}
            readOnly
            rows={
              kind ===
              "image-to-base64"
                ? 12
                : 6
            }
            className={`${box} font-mono text-sm`}
          />

          {kind ===
            "image-to-base64" && (
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  textResult
                )
              }
              className={secondaryBtn}
            >
              Copy Base64
            </button>
          )}
        </div>
      )}
    </div>
  );
}