export type DownloadableData =
  | Blob
  | ArrayBuffer
  | Uint8Array
  | string;

export function formatFileSize(
  bytes: number
): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0 B";
  }

  if (bytes === 0) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const index = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    ),
    units.length - 1
  );

  const value =
    bytes / Math.pow(1024, index);

  const decimals =
    index === 0 ? 0 : value >= 100 ? 0 : 2;

  return `${value.toFixed(decimals)} ${
    units[index]
  }`;
}

export function getFileExtension(
  filename: string
): string {
  const cleanName = filename
    .split("?")[0]
    .split("#")[0];

  const lastDot =
    cleanName.lastIndexOf(".");

  if (
    lastDot <= 0 ||
    lastDot === cleanName.length - 1
  ) {
    return "";
  }

  return cleanName
    .slice(lastDot + 1)
    .toLowerCase();
}

export function getBaseFilename(
  filename: string
): string {
  const cleanName = filename
    .split("/")
    .pop()
    ?.split("\\")
    .pop();

  if (!cleanName) {
    return "file";
  }

  const lastDot =
    cleanName.lastIndexOf(".");

  if (lastDot <= 0) {
    return cleanName;
  }

  return cleanName.slice(0, lastDot);
}

export function replaceFileExtension(
  filename: string,
  extension: string
): string {
  const base =
    getBaseFilename(filename);

  const cleanExtension =
    extension.replace(/^\./, "");

  if (!cleanExtension) {
    return base;
  }

  return `${base}.${cleanExtension}`;
}

export function createDownloadBlob(
  data: DownloadableData,
  mimeType = "application/octet-stream"
): Blob {
  if (data instanceof Blob) {
    return data;
  }

  if (typeof data === "string") {
    return new Blob([data], {
      type: mimeType,
    });
  }

  if (data instanceof ArrayBuffer) {
    return new Blob([data], {
      type: mimeType,
    });
  }

  const copy = new Uint8Array(data);
  return new Blob([copy.buffer], {
    type: mimeType,
  });
}

export function downloadFile(
  data: DownloadableData,
  filename: string,
  mimeType = "application/octet-stream"
): void {
  if (typeof window === "undefined") {
    return;
  }

  const blob =
    createDownloadBlob(data, mimeType);

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";

  document.body.appendChild(anchor);

  anchor.click();
  anchor.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

export async function readFileAsArrayBuffer(
  file: File
): Promise<ArrayBuffer> {
  return file.arrayBuffer();
}

export async function readFileAsUint8Array(
  file: File
): Promise<Uint8Array> {
  const buffer =
    await file.arrayBuffer();

  return new Uint8Array(buffer);
}

export async function readFileAsText(
  file: File
): Promise<string> {
  return file.text();
}

export function readFileAsDataUrl(
  file: File
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        if (
          typeof reader.result ===
          "string"
        ) {
          resolve(reader.result);
          return;
        }

        reject(
          new Error(
            "Unable to read the file."
          )
        );
      };

      reader.onerror = () => {
        reject(
          reader.error ??
            new Error(
              "Unable to read the file."
            )
        );
      };

      reader.readAsDataURL(file);
    }
  );
}

export function fileMatchesExtension(
  file: File,
  extensions: string[]
): boolean {
  const extension =
    getFileExtension(file.name);

  return extensions
    .map((value) =>
      value
        .replace(/^\./, "")
        .toLowerCase()
    )
    .includes(extension);
}

export function fileMatchesMimeType(
  file: File,
  mimeTypes: string[]
): boolean {
  if (!file.type) {
    return false;
  }

  return mimeTypes.some(
    (mimeType) => {
      if (mimeType.endsWith("/*")) {
        const prefix =
          mimeType.slice(0, -1);

        return file.type.startsWith(
          prefix
        );
      }

      return (
        file.type.toLowerCase() ===
        mimeType.toLowerCase()
      );
    }
  );
}

export function validateFileSize(
  file: File,
  maxFileSizeMB: number
): void {
  const maxBytes =
    maxFileSizeMB * 1024 * 1024;

  if (file.size > maxBytes) {
    throw new Error(
      `${file.name} exceeds the ${maxFileSizeMB} MB file size limit.`
    );
  }
}

export function validateFileType(
  file: File,
  options: {
    extensions?: string[];
    mimeTypes?: string[];
  }
): void {
  const {
    extensions = [],
    mimeTypes = [],
  } = options;

  if (
    extensions.length === 0 &&
    mimeTypes.length === 0
  ) {
    return;
  }

  const extensionMatch =
    extensions.length > 0 &&
    fileMatchesExtension(
      file,
      extensions
    );

  const mimeMatch =
    mimeTypes.length > 0 &&
    fileMatchesMimeType(
      file,
      mimeTypes
    );

  if (
    !extensionMatch &&
    !mimeMatch
  ) {
    throw new Error(
      `${file.name} is not a supported file type.`
    );
  }
}

export function makeOutputFilename(
  originalFilename: string,
  suffix: string,
  extension?: string
): string {
  const base =
    getBaseFilename(
      originalFilename
    );

  const originalExtension =
    getFileExtension(
      originalFilename
    );

  const outputExtension =
    extension
      ?.replace(/^\./, "")
      .toLowerCase() ||
    originalExtension;

  const cleanSuffix =
    suffix
      .trim()
      .replace(/\s+/g, "-");

  const name =
    cleanSuffix.length > 0
      ? `${base}-${cleanSuffix}`
      : base;

  return outputExtension
    ? `${name}.${outputExtension}`
    : name;
}