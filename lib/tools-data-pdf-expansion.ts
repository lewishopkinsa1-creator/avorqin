import { ToolConfig } from "@/types";

const pdfExpansionFaq = [
  {
    question: "Does Avorqin upload my PDF to a server?",
    answer:
      "No. These PDF tools are designed to process files locally in your browser, so the selected document does not need to be uploaded to an external conversion service.",
  },
  {
    question: "Can very large PDFs take longer to process?",
    answer:
      "Yes. PDF rendering and conversion use your device's memory and processor, so large or image-heavy documents can take longer and may require more memory.",
  },
  {
    question: "Do I need an account to use these PDF tools?",
    answer:
      "No. Avorqin PDF and document tools can be used without creating an account.",
  },
];

function pdfExpansionTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "PDF & Documents",
    faq: config.faq ?? pdfExpansionFaq,
  };
}

export const pdfExpansionTools: ToolConfig[] = [
  pdfExpansionTool({
    id: "pdf-to-jpg",
    name: "PDF to JPG Converter",
    slug: "pdf-to-jpg",
    description:
      "Convert every page of a PDF into downloadable JPG images directly in your browser.",
    longDescription:
      "Convert PDF pages to JPG images without uploading the document to an external conversion service. Choose a rendering quality, convert the document in your browser, and download each page as an individual JPG file.",
    keywords: [
      "PDF to JPG",
      "PDF to JPEG converter",
      "convert PDF to JPG",
      "PDF page to image",
      "PDF image converter",
      "PDF to picture",
    ],
    icon: "Image",
    howToUse: [
      "Select a PDF file.",
      "Choose the rendering quality and JPG quality.",
      "Click 'Convert to JPG'.",
      "Download the JPG image created for each PDF page.",
    ],
    faq: [
      {
        question: "Does PDF to JPG convert every page?",
        answer:
          "Yes. Each page is rendered as a separate JPG image that you can download individually.",
      },
      {
        question: "Can I control JPG quality?",
        answer:
          "Yes. The tool provides multiple JPG quality settings and rendering-resolution options.",
      },
      {
        question: "Will links or selectable text remain in the JPG?",
        answer:
          "No. JPG is an image format, so the rendered page becomes a flat image rather than an interactive PDF page.",
      },
    ],
  }),

  pdfExpansionTool({
    id: "pdf-to-png",
    name: "PDF to PNG Converter",
    slug: "pdf-to-png",
    description:
      "Convert PDF pages into high-quality PNG images locally in your browser.",
    longDescription:
      "Render every page of a PDF as a PNG image directly in the browser. Choose the rendering resolution, process the document locally, and download each page as an individual PNG file.",
    keywords: [
      "PDF to PNG",
      "PDF to PNG converter",
      "convert PDF to PNG",
      "PDF page to PNG",
      "PDF image converter",
      "PDF to image",
    ],
    icon: "Image",
    howToUse: [
      "Select a PDF file.",
      "Choose the desired rendering quality.",
      "Click 'Convert to PNG'.",
      "Download each converted PNG page.",
    ],
    faq: [
      {
        question: "Does PDF to PNG convert all pages?",
        answer:
          "Yes. The converter renders each PDF page as its own PNG image.",
      },
      {
        question: "What is the difference between PDF to PNG and PDF to JPG?",
        answer:
          "PNG uses lossless image compression and can produce larger files, while JPG uses lossy compression and is often smaller for photographic or scanned content.",
      },
      {
        question: "Does conversion happen locally?",
        answer:
          "Yes. PDF rendering is performed in the browser.",
      },
    ],
  }),

  pdfExpansionTool({
    id: "pdf-to-text",
    name: "PDF to Text Converter",
    slug: "pdf-to-text",
    description:
      "Extract selectable text from PDF pages and copy or download the result as a TXT file.",
    longDescription:
      "Extract text that is embedded in a PDF and combine it into a readable plain-text result. View the extracted text in the browser, copy it to the clipboard, or download it as a TXT file. Image-only scanned PDFs require OCR and are not automatically recognized by this tool.",
    keywords: [
      "PDF to text",
      "PDF text extractor",
      "extract text from PDF",
      "PDF to TXT",
      "convert PDF to text",
      "copy text from PDF",
    ],
    icon: "FileText",
    howToUse: [
      "Select a PDF file.",
      "Click 'Extract text'.",
      "Review the text extracted from each page.",
      "Copy the result or download it as a TXT file.",
    ],
    faq: [
      {
        question: "Can this tool extract text from scanned PDFs?",
        answer:
          "Only if the PDF already contains a selectable text layer. Image-only scans require OCR, which this tool does not perform.",
      },
      {
        question: "Why can extracted text formatting differ from the PDF?",
        answer:
          "PDF files store positioned text rather than normal document paragraphs, so complex layouts, columns, tables, and spacing may not convert perfectly to plain text.",
      },
      {
        question: "Can I download the extracted text?",
        answer:
          "Yes. You can copy the result or download it as a TXT file.",
      },
    ],
  }),

  pdfExpansionTool({
    id: "compress-pdf",
    name: "Compress PDF",
    slug: "compress-pdf",
    description:
      "Reduce some PDF file sizes by rasterizing and recompressing pages with selectable compression presets.",
    longDescription:
      "Create a smaller rasterized version of a PDF using browser-based page rendering and JPEG recompression. Choose maximum, balanced, or higher-quality compression. This approach can work especially well for scanned or image-heavy PDFs, but it flattens selectable text, links, form fields, and other interactive content.",
    keywords: [
      "compress PDF",
      "PDF compressor",
      "reduce PDF file size",
      "shrink PDF",
      "make PDF smaller",
      "PDF size reducer",
    ],
    icon: "Minimize2",
    howToUse: [
      "Select a PDF file.",
      "Choose a compression preset.",
      "Click 'Compress PDF'.",
      "Compare the original and output sizes, then download the compressed PDF.",
    ],
    faq: [
      {
        question: "How does this PDF compressor work?",
        answer:
          "It renders each page as an image, recompresses the rendered page, and rebuilds the PDF from those page images.",
      },
      {
        question: "Will text remain selectable after compression?",
        answer:
          "No. Because the pages are rasterized, selectable text, links, forms, and other interactive PDF content are flattened.",
      },
      {
        question: "Will every PDF become smaller?",
        answer:
          "No. Image-heavy or scanned PDFs can often shrink, but PDFs that are already optimized may stay similar in size or even become larger.",
      },
    ],
  }),

  pdfExpansionTool({
    id: "html-to-pdf",
    name: "HTML to PDF Converter",
    slug: "html-to-pdf",
    description:
      "Convert readable HTML content into a clean downloadable PDF document in your browser.",
    longDescription:
      "Convert HTML content into a simple printable PDF without uploading it to an external service. The converter extracts readable document content and creates a clean text-based PDF. It is intended for content conversion rather than pixel-perfect webpage or CSS reproduction.",
    keywords: [
      "HTML to PDF",
      "HTML to PDF converter",
      "convert HTML to PDF",
      "HTML document to PDF",
      "code to PDF",
      "web content to PDF",
    ],
    icon: "Code2",
    howToUse: [
      "Paste or type HTML into the editor.",
      "Click 'Create PDF'.",
      "Review the generated file information.",
      "Download the resulting PDF.",
    ],
    faq: [
      {
        question: "Does HTML to PDF reproduce CSS exactly?",
        answer:
          "No. This tool extracts readable content and creates a clean PDF rather than reproducing a webpage pixel for pixel.",
      },
      {
        question: "Are scripts executed?",
        answer:
          "No. Script and style content is ignored during document-content extraction.",
      },
      {
        question: "What is this converter best for?",
        answer:
          "It is useful for turning simple HTML content, notes, articles, and structured text into a portable PDF document.",
      },
    ],
  }),

  pdfExpansionTool({
    id: "text-to-pdf",
    name: "Text to PDF Converter",
    slug: "text-to-pdf",
    description:
      "Turn plain text into a clean multi-page PDF document directly in your browser.",
    longDescription:
      "Convert plain text into a downloadable PDF with automatic line wrapping, multi-page layout, margins, and page numbers. The PDF is generated locally in your browser and does not require an external document conversion service.",
    keywords: [
      "text to PDF",
      "TXT to PDF",
      "text to PDF converter",
      "convert text to PDF",
      "plain text PDF generator",
      "create PDF from text",
    ],
    icon: "Type",
    howToUse: [
      "Type or paste plain text into the editor.",
      "Click 'Create PDF'.",
      "Wait for the browser to generate the document.",
      "Download the resulting PDF.",
    ],
  }),

  pdfExpansionTool({
    id: "markdown-to-pdf",
    name: "Markdown to PDF Converter",
    slug: "markdown-to-pdf",
    description:
      "Convert Markdown headings, lists, quotes, code blocks, links, and text into a downloadable PDF.",
    longDescription:
      "Turn common Markdown syntax into a clean printable PDF document in your browser. The converter recognizes headings, ordered and unordered lists, blockquotes, fenced code blocks, links, inline formatting, and regular paragraphs, then builds a paginated PDF.",
    keywords: [
      "Markdown to PDF",
      "MD to PDF",
      "Markdown PDF converter",
      "convert Markdown to PDF",
      "Markdown document to PDF",
      "create PDF from Markdown",
    ],
    icon: "FileCode2",
    howToUse: [
      "Paste or type Markdown into the editor.",
      "Use common Markdown syntax for headings, lists, quotes, links, and code.",
      "Click 'Create PDF'.",
      "Download the generated PDF document.",
    ],
    faq: [
      {
        question: "What Markdown features are supported?",
        answer:
          "The converter handles common headings, ordered and unordered lists, blockquotes, fenced code blocks, links, common inline emphasis markers, and regular paragraphs.",
      },
      {
        question: "Does it support every Markdown extension?",
        answer:
          "No. The tool focuses on common Markdown syntax rather than every platform-specific extension.",
      },
      {
        question: "Does Markdown conversion happen locally?",
        answer:
          "Yes. The PDF is generated in your browser.",
      },
    ],
  }),

  pdfExpansionTool({
    id: "pdf-to-grayscale",
    name: "PDF to Grayscale Converter",
    slug: "pdf-to-grayscale",
    description:
      "Convert color PDF pages to grayscale and download a rebuilt grayscale PDF.",
    longDescription:
      "Convert a PDF to grayscale entirely in your browser. Each page is rendered, converted to grayscale, and rebuilt into a new PDF. Because this process rasterizes pages, text, links, forms, and other interactive content are flattened into page images.",
    keywords: [
      "PDF to grayscale",
      "grayscale PDF converter",
      "convert PDF to black and white",
      "make PDF grayscale",
      "remove color from PDF",
      "black and white PDF",
    ],
    icon: "Contrast",
    howToUse: [
      "Select a PDF file.",
      "Click 'Convert to grayscale'.",
      "Wait while each page is rendered and converted.",
      "Download the new grayscale PDF.",
    ],
    faq: [
      {
        question: "Does grayscale conversion preserve selectable text?",
        answer:
          "No. The document pages are rasterized, so selectable text and interactive elements are flattened into images.",
      },
      {
        question: "Is grayscale the same as pure black and white?",
        answer:
          "No. Grayscale preserves shades of gray rather than converting every pixel to only black or white.",
      },
      {
        question: "Can the output file size change?",
        answer:
          "Yes. Rasterization can make the output smaller or larger depending on the source document.",
      },
    ],
  }),

  pdfExpansionTool({
    id: "pdf-file-size-checker",
    name: "PDF File Size Checker",
    slug: "pdf-file-size-checker",
    description:
      "Check a PDF's file size in bytes, KB, and MB along with its total page count.",
    longDescription:
      "Inspect the size of a PDF directly in your browser. The tool reports file size in human-readable form, kilobytes, megabytes, and the total number of pages, making it useful before uploading, emailing, or compressing a document.",
    keywords: [
      "PDF file size checker",
      "check PDF size",
      "PDF size calculator",
      "PDF megabytes",
      "PDF page count and size",
      "PDF file information",
    ],
    icon: "HardDrive",
    howToUse: [
      "Select a PDF file.",
      "Click 'Check PDF'.",
      "Review the file size and page count.",
      "Use the results to decide whether the document needs compression or another adjustment.",
    ],
    faq: [
      {
        question: "What file-size units are shown?",
        answer:
          "The tool displays a human-readable file size plus the size in kilobytes and megabytes.",
      },
      {
        question: "Does it also count PDF pages?",
        answer:
          "Yes. The result includes the total number of pages in the selected PDF.",
      },
      {
        question: "Does checking the file modify it?",
        answer:
          "No. The tool only reads basic file and PDF information and does not alter the selected document.",
      },
    ],
  }),
];