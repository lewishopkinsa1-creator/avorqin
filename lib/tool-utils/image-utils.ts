export type ImageFormat =
  | "image/jpeg"
  | "image/png"
  | "image/webp";

export type ImageDimensions = {
  width: number;
  height: number;
  megapixels: number;
  aspectRatio: number;
};

export type ResizeOptions = {
  width: number;
  height: number;
  maintainAspectRatio?: boolean;
  format?: ImageFormat;
  quality?: number;
};

export type CropOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  format?: ImageFormat;
  quality?: number;
};

export type RotateOptions = {
  degrees: 90 | 180 | 270;
  format?: ImageFormat;
  quality?: number;
};

function ensureBrowser(): void {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    throw new Error(
      "Image processing is only available in the browser."
    );
  }
}

function clampQuality(
  quality = 0.9
): number {
  if (!Number.isFinite(quality)) {
    return 0.9;
  }

  return Math.min(
    1,
    Math.max(0.1, quality)
  );
}

export function imageFileToUrl(
  file: File
): string {
  ensureBrowser();

  return URL.createObjectURL(file);
}

export function revokeImageUrl(
  url: string
): void {
  if (
    typeof URL !== "undefined"
  ) {
    URL.revokeObjectURL(url);
  }
}

export async function loadImageFromFile(
  file: File
): Promise<HTMLImageElement> {
  ensureBrowser();

  const url =
    imageFileToUrl(file);

  try {
    const image =
      await new Promise<HTMLImageElement>(
        (resolve, reject) => {
          const img =
            new Image();

          img.onload = () =>
            resolve(img);

          img.onerror = () =>
            reject(
              new Error(
                "Unable to load the selected image."
              )
            );

          img.src = url;
        }
      );

    return image;
  } finally {
    revokeImageUrl(url);
  }
}

export async function getImageDimensions(
  file: File
): Promise<ImageDimensions> {
  const image =
    await loadImageFromFile(file);

  const width =
    image.naturalWidth;

  const height =
    image.naturalHeight;

  if (
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(
      "Unable to determine image dimensions."
    );
  }

  return {
    width,
    height,
    megapixels:
      Math.round(
        ((width * height) /
          1_000_000) *
          100
      ) / 100,
    aspectRatio:
      Math.round(
        (width / height) *
          10000
      ) / 10000,
  };
}

function createCanvas(
  width: number,
  height: number
): HTMLCanvasElement {
  ensureBrowser();

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(
      "Canvas dimensions must be greater than zero."
    );
  }

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    Math.round(width);

  canvas.height =
    Math.round(height);

  return canvas;
}

function getContext(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D {
  const context =
    canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "Your browser could not create an image processing canvas."
    );
  }

  return context;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: ImageFormat,
  quality = 0.9
): Promise<Blob> {
  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Unable to create the output image."
              )
            );

            return;
          }

          resolve(blob);
        },
        format,
        clampQuality(quality)
      );
    }
  );
}

export async function convertImage(
  file: File,
  format: ImageFormat,
  quality = 0.9
): Promise<Blob> {
  const image =
    await loadImageFromFile(file);

  const canvas =
    createCanvas(
      image.naturalWidth,
      image.naturalHeight
    );

  const context =
    getContext(canvas);

  if (format === "image/jpeg") {
    context.fillStyle =
      "#ffffff";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  context.drawImage(
    image,
    0,
    0
  );

  return canvasToBlob(
    canvas,
    format,
    quality
  );
}

export async function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<Blob> {
  const image =
    await loadImageFromFile(file);

  const sourceWidth =
    image.naturalWidth;

  const sourceHeight =
    image.naturalHeight;

  let width =
    Math.round(options.width);

  let height =
    Math.round(options.height);

  if (
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(
      "Width and height must be greater than zero."
    );
  }

  if (
    options.maintainAspectRatio
  ) {
    const ratio =
      sourceWidth /
      sourceHeight;

    if (
      options.width &&
      !options.height
    ) {
      height =
        Math.round(
          width / ratio
        );
    } else if (
      options.height &&
      !options.width
    ) {
      width =
        Math.round(
          height * ratio
        );
    }
  }

  const canvas =
    createCanvas(
      width,
      height
    );

  const context =
    getContext(canvas);

  const format =
    options.format ??
    (file.type === "image/png"
      ? "image/png"
      : "image/jpeg");

  if (format === "image/jpeg") {
    context.fillStyle =
      "#ffffff";

    context.fillRect(
      0,
      0,
      width,
      height
    );
  }

  context.imageSmoothingEnabled =
    true;

  context.imageSmoothingQuality =
    "high";

  context.drawImage(
    image,
    0,
    0,
    width,
    height
  );

  return canvasToBlob(
    canvas,
    format,
    options.quality
  );
}

export async function cropImage(
  file: File,
  options: CropOptions
): Promise<Blob> {
  const image =
    await loadImageFromFile(file);

  const {
    x,
    y,
    width,
    height,
  } = options;

  if (
    x < 0 ||
    y < 0 ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(
      "Crop dimensions are invalid."
    );
  }

  if (
    x + width >
      image.naturalWidth ||
    y + height >
      image.naturalHeight
  ) {
    throw new Error(
      "The crop area extends beyond the image."
    );
  }

  const canvas =
    createCanvas(
      width,
      height
    );

  const context =
    getContext(canvas);

  const format =
    options.format ??
    (file.type === "image/png"
      ? "image/png"
      : "image/jpeg");

  if (format === "image/jpeg") {
    context.fillStyle =
      "#ffffff";

    context.fillRect(
      0,
      0,
      width,
      height
    );
  }

  context.drawImage(
    image,
    x,
    y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  return canvasToBlob(
    canvas,
    format,
    options.quality
  );
}

export async function rotateImage(
  file: File,
  options: RotateOptions
): Promise<Blob> {
  const image =
    await loadImageFromFile(file);

  const angle =
    options.degrees;

  const swapsDimensions =
    angle === 90 ||
    angle === 270;

  const width =
    swapsDimensions
      ? image.naturalHeight
      : image.naturalWidth;

  const height =
    swapsDimensions
      ? image.naturalWidth
      : image.naturalHeight;

  const canvas =
    createCanvas(
      width,
      height
    );

  const context =
    getContext(canvas);

  const format =
    options.format ??
    (file.type === "image/png"
      ? "image/png"
      : "image/jpeg");

  if (format === "image/jpeg") {
    context.fillStyle =
      "#ffffff";

    context.fillRect(
      0,
      0,
      width,
      height
    );
  }

  context.translate(
    width / 2,
    height / 2
  );

  context.rotate(
    (angle * Math.PI) /
      180
  );

  context.drawImage(
    image,
    -image.naturalWidth / 2,
    -image.naturalHeight / 2
  );

  return canvasToBlob(
    canvas,
    format,
    options.quality
  );
}

export async function compressImage(
  file: File,
  quality = 0.75
): Promise<Blob> {
  const mimeType:
    ImageFormat =
    file.type === "image/png"
      ? "image/webp"
      : file.type ===
          "image/webp"
        ? "image/webp"
        : "image/jpeg";

  return convertImage(
    file,
    mimeType,
    quality
  );
}

export async function svgToPng(
  file: File,
  width?: number,
  height?: number
): Promise<Blob> {
  ensureBrowser();

  const text =
    await file.text();

  const svgBlob =
    new Blob([text], {
      type: "image/svg+xml",
    });

  const url =
    URL.createObjectURL(
      svgBlob
    );

  try {
    const image =
      await new Promise<HTMLImageElement>(
        (resolve, reject) => {
          const img =
            new Image();

          img.onload = () =>
            resolve(img);

          img.onerror = () =>
            reject(
              new Error(
                "Unable to render the SVG."
              )
            );

          img.src = url;
        }
      );

    const outputWidth =
      width ??
      image.naturalWidth ??
      image.width;

    const outputHeight =
      height ??
      image.naturalHeight ??
      image.height;

    if (
      !outputWidth ||
      !outputHeight
    ) {
      throw new Error(
        "Unable to determine SVG dimensions."
      );
    }

    const canvas =
      createCanvas(
        outputWidth,
        outputHeight
      );

    const context =
      getContext(canvas);

    context.drawImage(
      image,
      0,
      0,
      outputWidth,
      outputHeight
    );

    return canvasToBlob(
      canvas,
      "image/png",
      1
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function calculateImageDpi(
  file: File,
  physicalWidthInches: number,
  physicalHeightInches: number
): Promise<{
  horizontalDpi: number;
  verticalDpi: number;
}> {
  if (
    !Number.isFinite(
      physicalWidthInches
    ) ||
    !Number.isFinite(
      physicalHeightInches
    ) ||
    physicalWidthInches <= 0 ||
    physicalHeightInches <= 0
  ) {
    throw new Error(
      "Physical dimensions must be greater than zero."
    );
  }

  const dimensions =
    await getImageDimensions(
      file
    );

  return {
    horizontalDpi:
      Math.round(
        (dimensions.width /
          physicalWidthInches) *
          100
      ) / 100,

    verticalDpi:
      Math.round(
        (dimensions.height /
          physicalHeightInches) *
          100
      ) / 100,
  };
}

export async function imageToBase64(
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
          resolve(
            reader.result
          );

          return;
        }

        reject(
          new Error(
            "Unable to encode the image."
          )
        );
      };

      reader.onerror = () =>
        reject(
          reader.error ??
            new Error(
              "Unable to encode the image."
            )
        );

      reader.readAsDataURL(
        file
      );
    }
  );
}