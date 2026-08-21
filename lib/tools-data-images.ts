import { ToolConfig } from "@/types";

const localImageFaq = [
  {
    question: "Are my images uploaded to Avorqin?",
    answer:
      "No. This tool processes supported images directly in your browser rather than intentionally uploading them to an Avorqin server.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. The tool runs directly in a modern web browser.",
  },
  {
    question: "Will processing reduce image quality?",
    answer:
      "Some conversions and compression operations can reduce quality depending on the output format and quality setting. Lossless formats such as PNG generally preserve image detail.",
  },
];

function imageTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "Images",
    faq: config.faq ?? localImageFaq,
  };
}

export const imageTools: ToolConfig[] = [
  imageTool({
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    description:
      "Compress images in your browser to reduce file size for websites, email, sharing, and storage.",
    longDescription:
      "Reduce the file size of an image directly in your browser. Adjust the quality level and create a smaller image for websites, uploads, email attachments, social media, or storage without intentionally sending the original image to Avorqin.",
    keywords: [
      "image compressor",
      "compress image",
      "reduce image size",
      "image size reducer",
      "compress image online",
    ],
    icon: "Minimize2",
    howToUse: [
      "Choose an image from your device.",
      "Select the desired quality level.",
      "Click 'Run Tool' to compress the image.",
      "Download the compressed image.",
    ],
  }),

  imageTool({
    id: "image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    description:
      "Resize an image to custom pixel dimensions directly in your browser.",
    longDescription:
      "Change an image's width and height to custom pixel dimensions. Use the Image Resizer for websites, profile images, presentations, product images, documents, thumbnails, and other workflows requiring specific dimensions.",
    keywords: [
      "image resizer",
      "resize image",
      "resize photo",
      "change image dimensions",
      "resize image online",
    ],
    icon: "Scaling",
    howToUse: [
      "Choose an image.",
      "Enter the desired width and height in pixels.",
      "Adjust the quality if needed.",
      "Run the tool and download the resized image.",
    ],
  }),

  imageTool({
    id: "image-cropper",
    name: "Image Cropper",
    slug: "image-cropper",
    description:
      "Crop an image to a specific rectangular area using pixel coordinates.",
    longDescription:
      "Crop unwanted areas from an image by specifying the starting position, width, and height. Processing takes place directly in your browser and produces a new downloadable image.",
    keywords: [
      "image cropper",
      "crop image",
      "crop photo",
      "image cropping tool",
      "crop picture online",
    ],
    icon: "Crop",
    howToUse: [
      "Choose an image.",
      "Enter the X and Y starting positions.",
      "Enter the crop width and height.",
      "Run the tool and download the cropped image.",
    ],
  }),

  imageTool({
    id: "image-rotator",
    name: "Image Rotator",
    slug: "image-rotator",
    description:
      "Rotate images by 90, 180, or 270 degrees directly in your browser.",
    longDescription:
      "Correct sideways or upside-down photos and images by rotating them clockwise. Choose from 90, 180, or 270 degree rotations and download the resulting image.",
    keywords: [
      "image rotator",
      "rotate image",
      "rotate photo",
      "turn image",
      "rotate picture online",
    ],
    icon: "RotateCw",
    howToUse: [
      "Choose an image.",
      "Select the rotation angle.",
      "Click 'Run Tool'.",
      "Download the rotated image.",
    ],
  }),

  imageTool({
    id: "jpg-to-png",
    name: "JPG to PNG Converter",
    slug: "jpg-to-png",
    description:
      "Convert JPG and JPEG images to PNG format directly in your browser.",
    longDescription:
      "Convert JPEG or JPG images into PNG files without intentionally uploading the image to Avorqin. PNG is useful when you need a lossless image format for editing, graphics, screenshots, or web workflows.",
    keywords: [
      "jpg to png",
      "jpeg to png",
      "convert jpg to png",
      "jpg png converter",
      "image converter",
    ],
    icon: "Image",
    howToUse: [
      "Choose a JPG or JPEG image.",
      "Click 'Run Tool'.",
      "Wait for the browser conversion to finish.",
      "Download the PNG image.",
    ],
  }),

  imageTool({
    id: "png-to-jpg",
    name: "PNG to JPG Converter",
    slug: "png-to-jpg",
    description:
      "Convert PNG images to JPG format with adjustable output quality.",
    longDescription:
      "Convert PNG images into JPEG files directly in your browser. Choose the output quality to balance image detail and file size. Transparent areas are placed on a white background because JPEG does not support transparency.",
    keywords: [
      "png to jpg",
      "png to jpeg",
      "convert png to jpg",
      "png jpg converter",
      "image converter",
    ],
    icon: "Image",
    howToUse: [
      "Choose a PNG image.",
      "Select the desired image quality.",
      "Click 'Run Tool'.",
      "Download the JPG image.",
    ],
  }),

  imageTool({
    id: "webp-to-png",
    name: "WebP to PNG Converter",
    slug: "webp-to-png",
    description:
      "Convert WebP images to PNG format directly in your browser.",
    longDescription:
      "Convert modern WebP images into widely supported PNG files. This can be useful for editing software, applications, and workflows that do not accept WebP files.",
    keywords: [
      "webp to png",
      "convert webp to png",
      "webp png converter",
      "webp converter",
      "image format converter",
    ],
    icon: "Image",
    howToUse: [
      "Choose a WebP image.",
      "Click 'Run Tool'.",
      "Wait for the conversion to complete.",
      "Download the PNG result.",
    ],
  }),

  imageTool({
    id: "png-to-webp",
    name: "PNG to WebP Converter",
    slug: "png-to-webp",
    description:
      "Convert PNG images to WebP with adjustable output quality.",
    longDescription:
      "Convert PNG files into WebP images directly in your browser. WebP can provide significantly smaller files for websites and applications while maintaining useful image quality.",
    keywords: [
      "png to webp",
      "convert png to webp",
      "png webp converter",
      "webp converter",
      "image compression",
    ],
    icon: "Image",
    howToUse: [
      "Choose a PNG image.",
      "Set the desired quality.",
      "Click 'Run Tool'.",
      "Download the WebP image.",
    ],
  }),

  imageTool({
    id: "jpg-to-webp",
    name: "JPG to WebP Converter",
    slug: "jpg-to-webp",
    description:
      "Convert JPG and JPEG images to WebP with adjustable quality.",
    longDescription:
      "Convert JPG or JPEG images into WebP format directly in your browser. WebP is commonly used on modern websites because it can reduce image file sizes while maintaining good visual quality.",
    keywords: [
      "jpg to webp",
      "jpeg to webp",
      "convert jpg to webp",
      "jpg webp converter",
      "webp image converter",
    ],
    icon: "Image",
    howToUse: [
      "Choose a JPG or JPEG image.",
      "Select the output quality.",
      "Run the conversion.",
      "Download the WebP image.",
    ],
  }),

  imageTool({
    id: "webp-to-jpg",
    name: "WebP to JPG Converter",
    slug: "webp-to-jpg",
    description:
      "Convert WebP images into JPG files with adjustable image quality.",
    longDescription:
      "Convert WebP images into standard JPEG files for greater compatibility with applications, upload forms, editing software, and older systems.",
    keywords: [
      "webp to jpg",
      "webp to jpeg",
      "convert webp to jpg",
      "webp jpg converter",
      "webp converter",
    ],
    icon: "Image",
    howToUse: [
      "Choose a WebP image.",
      "Select the desired JPG quality.",
      "Click 'Run Tool'.",
      "Download the JPG image.",
    ],
  }),

  imageTool({
    id: "svg-to-png",
    name: "SVG to PNG Converter",
    slug: "svg-to-png",
    description:
      "Render an SVG file as a PNG image directly in your browser.",
    longDescription:
      "Convert scalable vector graphics into PNG images for presentations, documents, websites, image editors, and applications that require raster images rather than SVG files.",
    keywords: [
      "svg to png",
      "convert svg to png",
      "svg png converter",
      "svg image converter",
      "vector to png",
    ],
    icon: "FileImage",
    howToUse: [
      "Choose an SVG file.",
      "Click 'Run Tool'.",
      "Allow the browser to render the SVG.",
      "Download the resulting PNG image.",
    ],
  }),

  imageTool({
    id: "image-dimensions-checker",
    name: "Image Dimensions Checker",
    slug: "image-dimensions-checker",
    description:
      "Check an image's width, height, megapixels, and aspect ratio.",
    longDescription:
      "Inspect the pixel dimensions of an image without opening an image editor. Avorqin reports the image width, height, megapixel count, and aspect ratio directly in your browser.",
    keywords: [
      "image dimensions checker",
      "check image size",
      "image width height",
      "image resolution checker",
      "image pixel dimensions",
    ],
    icon: "Ruler",
    howToUse: [
      "Choose an image.",
      "Click 'Run Tool'.",
      "Review its width, height, megapixels, and aspect ratio.",
    ],
  }),

  imageTool({
    id: "image-dpi-calculator",
    name: "Image DPI Calculator",
    slug: "image-dpi-calculator",
    description:
      "Calculate image DPI from pixel dimensions and intended print size.",
    longDescription:
      "Estimate the effective print resolution of an image by combining its pixel dimensions with a physical print width and height. The calculator reports horizontal and vertical dots per inch values.",
    keywords: [
      "image dpi calculator",
      "dpi calculator",
      "photo dpi calculator",
      "print resolution calculator",
      "image print dpi",
    ],
    icon: "Gauge",
    howToUse: [
      "Choose an image.",
      "Enter the intended printed width in inches.",
      "Enter the intended printed height in inches.",
      "Run the calculator and review the DPI values.",
    ],
    faq: [
      {
        question: "What does DPI mean?",
        answer:
          "DPI describes how many image pixels are placed within each inch of the intended printed output. Higher effective DPI generally provides more detail when printed.",
      },
      {
        question: "Does changing this calculator value modify my image?",
        answer:
          "No. The tool only calculates effective DPI from the image dimensions and the print size you enter.",
      },
      {
        question: "Is my image uploaded?",
        answer:
          "No. Image dimensions are inspected locally in your browser.",
      },
    ],
  }),

  imageTool({
    id: "image-to-base64",
    name: "Image to Base64 Encoder",
    slug: "image-to-base64",
    description:
      "Convert an image into a Base64 data URL directly in your browser.",
    longDescription:
      "Encode an image as a Base64 data URL for HTML, CSS, prototypes, APIs, development workflows, and embedded assets. The image is read locally by your browser and the resulting encoded string can be copied.",
    keywords: [
      "image to base64",
      "base64 image encoder",
      "convert image to base64",
      "image data url",
      "base64 image converter",
    ],
    icon: "Binary",
    howToUse: [
      "Choose an image.",
      "Click 'Run Tool'.",
      "Review the generated Base64 data URL.",
      "Use 'Copy Base64' to copy the result.",
    ],
    faq: [
      {
        question: "What is an image data URL?",
        answer:
          "A data URL contains an encoded representation of the image directly inside a text string, typically beginning with data:image/ followed by the image type and Base64 content.",
      },
      {
        question: "Does Base64 make an image smaller?",
        answer:
          "No. Base64 encoding usually increases the amount of text needed to represent the original binary image.",
      },
      {
        question: "Is my image sent to a server?",
        answer:
          "No. Encoding is performed locally by your browser.",
      },
    ],
  }),
];