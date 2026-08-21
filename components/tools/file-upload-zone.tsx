"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  File,
  FileCheck2,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SelectedFile = {
  id: string;
  file: File;
};

type FileUploadZoneProps = {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeMB?: number;
  files: SelectedFile[];
  onFilesChange: (files: SelectedFile[]) => void;
  title?: string;
  description?: string;
  disabled?: boolean;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value =
    bytes / Math.pow(1024, unitIndex);

  return `${value.toFixed(
    unitIndex === 0 ? 0 : 2
  )} ${units[unitIndex]}`;
}

function createFileId(file: File): string {
  return [
    file.name,
    file.size,
    file.lastModified,
    crypto.randomUUID(),
  ].join("-");
}

export function FileUploadZone({
  accept,
  multiple = false,
  maxFiles = 1,
  maxFileSizeMB = 50,
  files,
  onFilesChange,
  title = "Choose a file",
  description = "Drag and drop a file here, or browse your device.",
  disabled = false,
}: FileUploadZoneProps) {
  const inputId = useId();
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [error, setError] =
    useState("");

  const maxBytes =
    maxFileSizeMB * 1024 * 1024;

  const validateAndAddFiles =
    useCallback(
      (incomingFiles: File[]) => {
        setError("");

        if (incomingFiles.length === 0) {
          return;
        }

        const validFiles =
          incomingFiles.filter((file) => {
            if (file.size > maxBytes) {
              setError(
                `${file.name} is larger than the ${maxFileSizeMB} MB limit.`
              );

              return false;
            }

            return true;
          });

        if (validFiles.length === 0) {
          return;
        }

        if (!multiple) {
          const file = validFiles[0];

          onFilesChange([
            {
              id: createFileId(file),
              file,
            },
          ]);

          return;
        }

        const existingKeys = new Set(
          files.map(
            ({ file }) =>
              `${file.name}-${file.size}-${file.lastModified}`
          )
        );

        const additions = validFiles
          .filter(
            (file) =>
              !existingKeys.has(
                `${file.name}-${file.size}-${file.lastModified}`
              )
          )
          .map((file) => ({
            id: createFileId(file),
            file,
          }));

        const combined = [
          ...files,
          ...additions,
        ];

        if (combined.length > maxFiles) {
          setError(
            `You can select up to ${maxFiles} files at a time.`
          );
        }

        onFilesChange(
          combined.slice(0, maxFiles)
        );
      },
      [
        files,
        maxBytes,
        maxFileSizeMB,
        maxFiles,
        multiple,
        onFilesChange,
      ]
    );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    validateAndAddFiles(
      Array.from(
        event.target.files ?? []
      )
    );

    event.target.value = "";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    if (disabled) {
      return;
    }

    validateAndAddFiles(
      Array.from(event.dataTransfer.files)
    );
  };

  const removeFile = (id: string) => {
    setError("");

    onFilesChange(
      files.filter(
        (selectedFile) =>
          selectedFile.id !== id
      )
    );
  };

  const clearFiles = () => {
    setError("");
    onFilesChange([]);
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="sr-only"
      />

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div
            onDragEnter={(event) => {
              event.preventDefault();

              if (!disabled) {
                setIsDragging(true);
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();

              if (!disabled) {
                setIsDragging(true);
              }
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            className={cn(
              "flex min-h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
              isDragging
                ? "border-foreground bg-muted/60"
                : "border-border bg-muted/20",
              disabled &&
                "cursor-not-allowed opacity-60"
            )}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-background shadow-sm">
              <Upload className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              {title}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <Button
              type="button"
              className="mt-5"
              disabled={disabled}
              onClick={() =>
                inputRef.current?.click()
              }
            >
              <Upload className="mr-2 h-4 w-4" />
              Browse files
            </Button>

            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {accept && (
                <span>
                  Accepted: {accept}
                </span>
              )}

              <span>
                Max size: {maxFileSizeMB} MB
              </span>

              {multiple && (
                <span>
                  Up to {maxFiles} files
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium">
              {files.length}{" "}
              {files.length === 1
                ? "file"
                : "files"}{" "}
              selected
            </p>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFiles}
            >
              Clear all
            </Button>
          </div>

          <div className="space-y-2">
            {files.map(
              ({ id, file }) => (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-lg border bg-background p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    {file.size > 0 ? (
                      <FileCheck2 className="h-5 w-5" />
                    ) : (
                      <File className="h-5 w-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {file.name}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatBytes(
                        file.size
                      )}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      removeFile(id)
                    }
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className="rounded-lg border bg-muted/20 px-4 py-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Files are selected from your device.
          Avorqin tools can process supported
          files locally in your browser without
          uploading them to an Avorqin server.
        </p>
      </div>
    </div>
  );
}