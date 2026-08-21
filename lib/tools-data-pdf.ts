import { ToolConfig } from "@/types";

const localPdfFaq = [
  {
    question: "Are my PDF files uploaded to Avorqin?",
    answer:
      "No. This tool processes supported PDF files locally in your browser rather than intentionally uploading them to an Avorqin server.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. The tool runs directly in a modern web browser.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "The current browser tool accepts files up to 50 MB. Very large or complex PDFs may also be limited by the memory available on your device.",
  },
];

function pdfTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "PDF & Documents",
    faq: config.faq ?? localPdfFaq,
  };
}

export const pdfTools: ToolConfig[] = [
  pdfTool({
    id: "merge-pdf",
    name: "Merge PDF",
    slug: "merge-pdf",
    description:
      "Combine multiple PDF files into one PDF directly in your browser.",
    longDescription:
      "Merge two or more PDF documents into a single file while preserving the order in which you selected them. This browser-based PDF merger is useful for combining reports, forms, invoices, scanned documents, and other multi-file workflows without intentionally uploading the documents to Avorqin.",
    keywords: [
      "merge pdf",
      "combine pdf",
      "pdf merger",
      "join pdf files",
      "merge pdf online",
    ],
    icon: "Files",
    howToUse: [
      "Select two or more PDF files.",
      "Choose the files in the order you want them combined.",
      "Click 'Merge PDFs'.",
      "Download the merged PDF when processing finishes.",
    ],
  }),

  pdfTool({
    id: "split-pdf",
    name: "Split PDF",
    slug: "split-pdf",
    description:
      "Split a PDF into separate single-page PDF files in your browser.",
    longDescription:
      "Separate a multi-page PDF into individual PDF documents, with one output file for each page. Use the PDF splitter when you need to separate forms, reports, scanned documents, contracts, or other multi-page files.",
    keywords: [
      "split pdf",
      "pdf splitter",
      "separate pdf pages",
      "split pdf pages",
      "pdf page splitter",
    ],
    icon: "Split",
    howToUse: [
      "Select a PDF file.",
      "Click 'Split PDF'.",
      "Wait while each page is separated.",
      "Download the individual PDF pages you need.",
    ],
  }),

  pdfTool({
    id: "extract-pdf-pages",
    name: "Extract PDF Pages",
    slug: "extract-pdf-pages",
    description:
      "Extract selected pages from a PDF and save them as a new PDF.",
    longDescription:
      "Create a new PDF containing only the pages you choose from an existing document. Enter individual page numbers or page ranges such as 1,3,5-8 and Avorqin will create a new browser-processed PDF containing those pages.",
    keywords: [
      "extract pdf pages",
      "save pdf pages",
      "pdf page extractor",
      "extract pages from pdf",
      "select pdf pages",
    ],
    icon: "FileOutput",
    howToUse: [
      "Select a PDF file.",
      "Enter page numbers such as 1,3,5-8.",
      "Click 'Extract Pages'.",
      "Download the new PDF.",
    ],
  }),

  pdfTool({
    id: "remove-pdf-pages",
    name: "Remove PDF Pages",
    slug: "remove-pdf-pages",
    description:
      "Delete selected pages from a PDF and download the remaining document.",
    longDescription:
      "Remove unwanted pages from a PDF without changing the pages you keep. Enter page numbers or ranges and Avorqin will generate a new PDF containing the remaining pages.",
    keywords: [
      "remove pdf pages",
      "delete pdf pages",
      "pdf page remover",
      "remove pages from pdf",
      "delete pages from pdf",
    ],
    icon: "FileMinus2",
    howToUse: [
      "Select a PDF file.",
      "Enter the pages you want removed.",
      "Click 'Remove Pages'.",
      "Download the updated PDF.",
    ],
  }),

  pdfTool({
    id: "reorder-pdf-pages",
    name: "Reorder PDF Pages",
    slug: "reorder-pdf-pages",
    description:
      "Change the order of pages in a PDF using a custom page sequence.",
    longDescription:
      "Rearrange a PDF by entering the complete page sequence in the order you want it to appear. For example, a four-page PDF can be reordered with a sequence such as 3,1,2,4.",
    keywords: [
      "reorder pdf pages",
      "rearrange pdf pages",
      "change pdf page order",
      "organize pdf pages",
      "pdf page reorder",
    ],
    icon: "ListOrdered",
    howToUse: [
      "Select a PDF file.",
      "Enter every page in the desired new order.",
      "Click 'Reorder Pages'.",
      "Download the reordered PDF.",
    ],
  }),

  pdfTool({
    id: "rotate-pdf",
    name: "Rotate PDF",
    slug: "rotate-pdf",
    description:
      "Rotate all pages in a PDF by 90, 180, or 270 degrees.",
    longDescription:
      "Correct sideways or upside-down PDF documents by rotating their pages. Choose a 90, 180, or 270 degree rotation and generate a corrected PDF directly in your browser.",
    keywords: [
      "rotate pdf",
      "rotate pdf pages",
      "turn pdf",
      "pdf rotation",
      "rotate pdf online",
    ],
    icon: "RotateCw",
    howToUse: [
      "Select a PDF file.",
      "Choose the rotation angle.",
      "Click 'Rotate PDF'.",
      "Download the rotated document.",
    ],
  }),

  pdfTool({
    id: "pdf-page-counter",
    name: "PDF Page Counter",
    slug: "pdf-page-counter",
    description:
      "Count the number of pages in a PDF instantly.",
    longDescription:
      "Check how many pages a PDF contains without manually opening and counting the document. The file is inspected directly in your browser and the total page count is displayed immediately.",
    keywords: [
      "pdf page counter",
      "count pdf pages",
      "how many pages in pdf",
      "pdf page count",
      "pdf counter",
    ],
    icon: "FileDigit",
    howToUse: [
      "Select a PDF file.",
      "Click 'Count Pages'.",
      "Review the total page count.",
    ],
  }),

  pdfTool({
    id: "pdf-metadata-viewer",
    name: "PDF Metadata Viewer",
    slug: "pdf-metadata-viewer",
    description:
      "View common PDF metadata including title, author, creator, and dates.",
    longDescription:
      "Inspect common metadata stored inside a PDF, including its title, author, subject, creator, producer, creation date, and modification date. Results are displayed without intentionally uploading the PDF to Avorqin.",
    keywords: [
      "pdf metadata viewer",
      "view pdf metadata",
      "pdf properties",
      "pdf information",
      "pdf metadata checker",
    ],
    icon: "FileSearch",
    howToUse: [
      "Select a PDF file.",
      "Click 'View Metadata'.",
      "Review the metadata stored in the document.",
    ],
  }),

  pdfTool({
    id: "pdf-metadata-remover",
    name: "PDF Metadata Remover",
    slug: "pdf-metadata-remover",
    description:
      "Remove common descriptive metadata fields from a PDF.",
    longDescription:
      "Create a new copy of a PDF with common metadata fields such as title, author, subject, keywords, creator, and producer cleared. This is useful when preparing documents for sharing or reducing unnecessary descriptive information.",
    keywords: [
      "remove pdf metadata",
      "pdf metadata remover",
      "clear pdf metadata",
      "delete pdf properties",
      "clean pdf metadata",
    ],
    icon: "Eraser",
    howToUse: [
      "Select a PDF file.",
      "Click 'Remove Metadata'.",
      "Download the cleaned PDF.",
    ],
  }),

  pdfTool({
    id: "pdf-page-size-checker",
    name: "PDF Page Size Checker",
    slug: "pdf-page-size-checker",
    description:
      "Inspect the width and height of every page in a PDF.",
    longDescription:
      "Check the dimensions of PDF pages and identify documents containing mixed page sizes. Avorqin reports each page's width and height using the PDF's internal point measurements.",
    keywords: [
      "pdf page size checker",
      "pdf dimensions",
      "check pdf page size",
      "pdf width height",
      "pdf paper size",
    ],
    icon: "Ruler",
    howToUse: [
      "Select a PDF file.",
      "Click 'Check Page Sizes'.",
      "Review the dimensions of each page.",
    ],
  }),

  pdfTool({
    id: "pdf-orientation-checker",
    name: "PDF Orientation Checker",
    slug: "pdf-orientation-checker",
    description:
      "Check whether PDF pages are portrait, landscape, or square.",
    longDescription:
      "Inspect the orientation and rotation of every page in a PDF. This is useful for finding sideways pages, mixed portrait and landscape documents, and unexpected page rotations.",
    keywords: [
      "pdf orientation checker",
      "pdf portrait landscape",
      "check pdf orientation",
      "pdf rotation checker",
      "pdf page orientation",
    ],
    icon: "Scan",
    howToUse: [
      "Select a PDF file.",
      "Click 'Check Orientation'.",
      "Review the orientation and rotation reported for each page.",
    ],
  }),

  pdfTool({
    id: "pdf-info",
    name: "PDF Information Viewer",
    slug: "pdf-info",
    description:
      "View PDF page count, metadata, dimensions, rotations, and orientations.",
    longDescription:
      "Inspect a PDF in one place and review its page count, common metadata fields, individual page sizes, rotations, and orientations. The information is extracted directly in your browser.",
    keywords: [
      "pdf information viewer",
      "pdf info",
      "pdf inspector",
      "pdf details",
      "pdf properties viewer",
    ],
    icon: "Info",
    howToUse: [
      "Select a PDF file.",
      "Click 'View PDF Information'.",
      "Review the document and page information.",
    ],
  }),

  pdfTool({
    id: "add-page-numbers-to-pdf",
    name: "Add Page Numbers to PDF",
    slug: "add-page-numbers-to-pdf",
    description:
      "Add centered page numbers to the bottom of every PDF page.",
    longDescription:
      "Add simple page numbering to an existing PDF. Avorqin places sequential page numbers along the bottom center of each page and creates a new downloadable PDF.",
    keywords: [
      "add page numbers to pdf",
      "number pdf pages",
      "pdf page numbering",
      "add page number pdf",
      "pdf page numbers",
    ],
    icon: "ListOrdered",
    howToUse: [
      "Select a PDF file.",
      "Click 'Add Page Numbers'.",
      "Download the numbered PDF.",
    ],
  }),

  pdfTool({
    id: "add-watermark-to-pdf",
    name: "Add Watermark to PDF",
    slug: "add-watermark-to-pdf",
    description:
      "Add a text watermark across every page of a PDF.",
    longDescription:
      "Add custom text across every page of a PDF for drafts, internal documents, review copies, or other labeling workflows. The watermark is applied diagonally with partial transparency.",
    keywords: [
      "add watermark to pdf",
      "pdf watermark",
      "watermark pdf online",
      "add text to pdf",
      "pdf watermark tool",
    ],
    icon: "Stamp",
    howToUse: [
      "Select a PDF file.",
      "Enter your watermark text.",
      "Click 'Add Watermark'.",
      "Download the watermarked PDF.",
    ],
  }),

  pdfTool({
    id: "images-to-pdf",
    name: "Images to PDF",
    slug: "images-to-pdf",
    description:
      "Combine JPG and PNG images into a single PDF document.",
    longDescription:
      "Turn one or more JPG or PNG images into a PDF. Each selected image becomes its own PDF page, making the tool useful for scans, receipts, screenshots, photographs, and document images.",
    keywords: [
      "images to pdf",
      "image to pdf",
      "convert images to pdf",
      "photos to pdf",
      "picture to pdf",
    ],
    icon: "Images",
    howToUse: [
      "Select one or more JPG or PNG images.",
      "Arrange your selection in the desired order.",
      "Click 'Create PDF'.",
      "Download the generated PDF.",
    ],
  }),

  pdfTool({
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    slug: "jpg-to-pdf",
    description:
      "Convert one or more JPG images into a PDF document.",
    longDescription:
      "Convert JPEG and JPG images into a PDF directly in your browser. Multiple images can be combined so each image becomes a separate page in the finished document.",
    keywords: [
      "jpg to pdf",
      "jpeg to pdf",
      "convert jpg to pdf",
      "image to pdf",
      "jpg pdf converter",
    ],
    icon: "FileImage",
    howToUse: [
      "Select one or more JPG or JPEG images.",
      "Click 'Convert JPG to PDF'.",
      "Download the generated PDF.",
    ],
  }),

  pdfTool({
    id: "png-to-pdf",
    name: "PNG to PDF",
    slug: "png-to-pdf",
    description:
      "Convert one or more PNG images into a PDF document.",
    longDescription:
      "Convert PNG images into a PDF directly in your browser. Add multiple PNG files to create a multi-page document while keeping the conversion local to your device.",
    keywords: [
      "png to pdf",
      "convert png to pdf",
      "png pdf converter",
      "image to pdf",
      "png images to pdf",
    ],
    icon: "FileImage",
    howToUse: [
      "Select one or more PNG images.",
      "Click 'Convert PNG to PDF'.",
      "Download the generated PDF.",
    ],
  }),
];