import type { Metadata } from "next";
import { ToolLayout } from "@/components/shared/tool-layout";
import { FlexboxGeneratorTool } from "@/components/tools/css-flexbox-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";
import type { ToolConfig } from "@/types";

const baseTool = getToolBySlug("css-flexbox-generator")!;

const flexboxTool: ToolConfig = {
  ...baseTool,
  description:
    "Build CSS Flexbox layouts visually with a live preview. Adjust direction, alignment, wrapping, align-content, and gap, then copy ready-to-use CSS.",
  longDescription:
    "Use this CSS Flexbox Generator to build flex container layouts without memorizing every property. Change flex-direction, justify-content, align-items, flex-wrap, align-content, and gap while watching a live preview update instantly. Start from common presets such as centered content, navbars, wrapping cards, or column stacks, then copy clean CSS for your project. The generator runs locally in your browser and is useful for navigation bars, card rows, responsive UI sections, centered layouts, toolbars, and other one-dimensional layouts.",
  keywords: [
    "css flexbox generator",
    "flexbox generator",
    "css flex generator",
    "flexbox layout generator",
    "visual flexbox generator",
    "flexbox playground",
    "justify content generator",
    "align items css",
  ],
  howToUse: [
    "Choose a preset or set the flex direction, justification, alignment, wrapping, align-content, and gap values yourself.",
    "Watch the live preview update as you change the controls and adjust the number of demo items when you want to test wrapping.",
    "Review the generated .flex-container CSS to confirm the layout properties match what you want.",
    "Click Copy CSS and paste the generated flexbox rules into your stylesheet or component.",
  ],
  faq: [
    {
      question: "What is CSS Flexbox used for?",
      answer:
        "CSS Flexbox is a one-dimensional layout system for arranging items in a row or column. It is commonly used for navigation bars, button groups, cards, toolbars, centered content, forms, headers, and responsive interface sections.",
    },
    {
      question: "What is the difference between justify-content and align-items?",
      answer:
        "justify-content controls alignment along the main axis, while align-items controls alignment along the cross axis. With flex-direction: row, the main axis is horizontal; with flex-direction: column, it is vertical.",
    },
    {
      question: "When does align-content affect a flexbox layout?",
      answer:
        "align-content matters when flex-wrap creates multiple flex lines and the container has extra space on the cross axis. If everything stays on one line, changing align-content usually has no visible effect.",
    },
    {
      question: "Should I use Flexbox or CSS Grid?",
      answer:
        "Use Flexbox when the layout is mainly one-dimensional, such as a row or a column. CSS Grid is usually a better fit when you need to control rows and columns at the same time.",
    },
    {
      question: "Does this Flexbox Generator upload my layout or CSS?",
      answer:
        "No. The controls, live preview, and generated CSS run directly in your browser, so your settings do not need to be sent to an external service.",
    },
  ],
};

export const metadata: Metadata = {
  title: "CSS Flexbox Generator – Live Preview & Copy CSS",
  description:
    "Build CSS Flexbox layouts visually. Adjust direction, justify-content, align-items, wrapping, align-content and gap, preview instantly, then copy clean CSS.",
  keywords: flexboxTool.keywords,
  alternates: {
    canonical: "/tools/css-flexbox-generator/",
  },
  openGraph: {
    title: "CSS Flexbox Generator – Live Preview & Copy CSS",
    description:
      "Build Flexbox layouts visually with instant preview controls for direction, alignment, wrapping, align-content, and gap, then copy the generated CSS.",
    type: "website",
    url: "/tools/css-flexbox-generator/",
  },
  twitter: {
    card: "summary",
    title: "CSS Flexbox Generator – Live Preview & Copy CSS",
    description:
      "Build Flexbox layouts visually, preview them instantly, and copy ready-to-use CSS.",
  },
};

export default function Page() {
  return (
    <ToolLayout tool={flexboxTool}>
      <FlexboxGeneratorTool />
    </ToolLayout>
  );
}
