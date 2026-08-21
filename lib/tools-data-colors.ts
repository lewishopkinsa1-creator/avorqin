import { ToolConfig } from "@/types";

const colorFaq = [
  {
    question: "Does Avorqin send my color values to a server?",
    answer:
      "No. These color and design tools process the values you enter directly in your browser.",
  },
  {
    question: "Do I need an account to use these color tools?",
    answer:
      "No. Avorqin color tools can be used without creating an account.",
  },
  {
    question: "Can I use the generated values in CSS?",
    answer:
      "Yes. HEX, RGB, HSL, and generated gradient values can be copied into CSS and other design or development workflows as appropriate.",
  },
];

function colorTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "Color & Design",
    faq: config.faq ?? colorFaq,
  };
}

export const colorTools: ToolConfig[] = [
  colorTool({
    id: "color-picker",
    name: "Color Picker",
    slug: "color-picker",
    description:
      "Pick a color visually and instantly view its HEX, RGB, HSL, and CMYK values.",
    longDescription:
      "Choose a color with the browser color picker or enter a HEX value manually. Avorqin instantly converts the selected color into HEX, RGB, HSL, and CMYK representations for use in websites, applications, design systems, graphics, and other creative workflows.",
    keywords: [
      "color picker",
      "online color picker",
      "hex color picker",
      "RGB color picker",
      "HSL color picker",
      "pick a color",
    ],
    icon: "Pipette",
    howToUse: [
      "Choose a color using the visual picker or enter a HEX color.",
      "Click 'Run Tool'.",
      "Review the HEX, RGB, HSL, and CMYK values.",
      "Copy the result for use in your project.",
    ],
  }),

  colorTool({
    id: "color-converter",
    name: "Color Converter",
    slug: "color-converter",
    description:
      "Convert a color between HEX, RGB, HSL, and CMYK formats.",
    longDescription:
      "Convert a HEX color into several common color representations in one step. The Color Converter displays equivalent HEX, RGB, HSL, and CMYK values so designers and developers can move between web, interface, and print-oriented color formats quickly.",
    keywords: [
      "color converter",
      "HEX RGB HSL converter",
      "convert color values",
      "HEX to RGB converter",
      "HEX to HSL converter",
      "HEX to CMYK converter",
    ],
    icon: "ArrowRightLeft",
    howToUse: [
      "Enter or select a HEX color.",
      "Click 'Run Tool'.",
      "Review the equivalent HEX, RGB, HSL, and CMYK values.",
      "Copy the converted values you need.",
    ],
  }),

  colorTool({
    id: "hex-to-hsl",
    name: "HEX to HSL Converter",
    slug: "hex-to-hsl",
    description:
      "Convert hexadecimal color codes to HSL hue, saturation, and lightness values.",
    longDescription:
      "Convert 3-digit or 6-digit HEX colors into HSL values directly in your browser. HSL represents color using hue, saturation, and lightness, which can be convenient when adjusting themes, generating variations, and working with CSS.",
    keywords: [
      "hex to hsl",
      "hex to hsl converter",
      "convert hex to hsl",
      "hex color to hsl",
      "HEX HSL converter",
    ],
    icon: "Palette",
    howToUse: [
      "Enter a 3-digit or 6-digit HEX color.",
      "Click 'Run Tool'.",
      "Review the HSL result.",
      "Copy the HSL value when finished.",
    ],
  }),

  colorTool({
    id: "hsl-to-hex",
    name: "HSL to HEX Converter",
    slug: "hsl-to-hex",
    description:
      "Convert HSL hue, saturation, and lightness values to a hexadecimal color code.",
    longDescription:
      "Convert HSL color values into a standard 6-digit HEX color. Enter hue in degrees plus saturation and lightness percentages, then generate the corresponding hexadecimal value for CSS, design systems, and graphics workflows.",
    keywords: [
      "hsl to hex",
      "hsl to hex converter",
      "convert hsl to hex",
      "HSL color to HEX",
      "HSL HEX converter",
    ],
    icon: "Palette",
    howToUse: [
      "Enter hue, saturation, and lightness values.",
      "Click 'Run Tool'.",
      "Review the generated HEX color and preview.",
      "Copy the HEX value when finished.",
    ],
  }),

  colorTool({
    id: "rgb-to-hsl",
    name: "RGB to HSL Converter",
    slug: "rgb-to-hsl",
    description:
      "Convert red, green, and blue color values to HSL.",
    longDescription:
      "Convert RGB color channels from 0 to 255 into HSL hue, saturation, and lightness values. This is useful when translating colors between RGB-based interfaces and HSL-based CSS or design workflows.",
    keywords: [
      "rgb to hsl",
      "rgb to hsl converter",
      "convert RGB to HSL",
      "RGB color to HSL",
      "RGB HSL converter",
    ],
    icon: "Palette",
    howToUse: [
      "Enter red, green, and blue values from 0 to 255.",
      "Click 'Run Tool'.",
      "Review the converted HSL value and color preview.",
      "Copy the result when finished.",
    ],
  }),

  colorTool({
    id: "hsl-to-rgb",
    name: "HSL to RGB Converter",
    slug: "hsl-to-rgb",
    description:
      "Convert HSL hue, saturation, and lightness values to RGB.",
    longDescription:
      "Convert HSL colors into red, green, and blue channel values. Enter hue, saturation, and lightness to generate the equivalent RGB color for CSS, image editing, design tools, and application interfaces.",
    keywords: [
      "hsl to rgb",
      "hsl to rgb converter",
      "convert HSL to RGB",
      "HSL color to RGB",
      "HSL RGB converter",
    ],
    icon: "Palette",
    howToUse: [
      "Enter hue, saturation, and lightness values.",
      "Click 'Run Tool'.",
      "Review the generated RGB value and color preview.",
      "Copy the RGB result when finished.",
    ],
  }),

  colorTool({
    id: "rgb-to-cmyk",
    name: "RGB to CMYK Converter",
    slug: "rgb-to-cmyk",
    description:
      "Convert RGB color values to approximate CMYK percentages.",
    longDescription:
      "Convert RGB color values into an approximate CMYK representation. The tool translates red, green, and blue channels into cyan, magenta, yellow, and black percentages for quick comparison between screen-oriented RGB colors and CMYK-style values.",
    keywords: [
      "rgb to cmyk",
      "rgb to cmyk converter",
      "convert RGB to CMYK",
      "RGB color to CMYK",
      "CMYK converter",
    ],
    icon: "Palette",
    howToUse: [
      "Enter red, green, and blue values from 0 to 255.",
      "Click 'Run Tool'.",
      "Review the calculated CMYK percentages.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Is this conversion a replacement for professional print color management?",
        answer:
          "No. The tool provides a mathematical RGB-to-CMYK conversion for quick reference. Professional printing can depend on ICC profiles, inks, paper, devices, and other color-management settings.",
      },
      {
        question: "Are the values calculated in my browser?",
        answer:
          "Yes. The conversion runs locally in your browser.",
      },
      {
        question: "What RGB range can I enter?",
        answer:
          "Use values from 0 to 255 for red, green, and blue.",
      },
    ],
  }),

  colorTool({
    id: "cmyk-to-rgb",
    name: "CMYK to RGB Converter",
    slug: "cmyk-to-rgb",
    description:
      "Convert CMYK percentages to approximate RGB color values.",
    longDescription:
      "Convert cyan, magenta, yellow, and black percentages into an approximate RGB color. This browser-based utility is useful for quickly translating CMYK-style values into screen-oriented red, green, and blue channels.",
    keywords: [
      "cmyk to rgb",
      "cmyk to rgb converter",
      "convert CMYK to RGB",
      "CMYK color to RGB",
      "RGB converter",
    ],
    icon: "Palette",
    howToUse: [
      "Enter cyan, magenta, yellow, and black percentages.",
      "Click 'Run Tool'.",
      "Review the RGB result and color preview.",
      "Copy the RGB value when finished.",
    ],
    faq: [
      {
        question: "Is CMYK to RGB conversion exact for printed colors?",
        answer:
          "No. This is a mathematical conversion for quick reference. Real printed color depends on color profiles, inks, paper, printers, and other production conditions.",
      },
      {
        question: "What CMYK range can I enter?",
        answer:
          "Use percentages from 0 to 100 for cyan, magenta, yellow, and black.",
      },
      {
        question: "Does this tool upload my color values?",
        answer:
          "No. Conversion is performed locally in your browser.",
      },
    ],
  }),

  colorTool({
    id: "color-contrast-checker",
    name: "Color Contrast Checker",
    slug: "color-contrast-checker",
    description:
      "Check the contrast ratio between foreground and background colors against common WCAG thresholds.",
    longDescription:
      "Measure the contrast ratio between a foreground color and a background color. The checker reports the calculated ratio and indicates whether the combination meets common WCAG contrast thresholds for normal and large text at AA and AAA levels.",
    keywords: [
      "color contrast checker",
      "contrast ratio checker",
      "WCAG contrast checker",
      "accessibility color checker",
      "text contrast checker",
      "AA AAA contrast",
    ],
    icon: "Contrast",
    howToUse: [
      "Choose or enter a foreground color.",
      "Choose or enter a background color.",
      "Click 'Run Tool'.",
      "Review the contrast ratio and AA/AAA pass or fail results.",
    ],
    faq: [
      {
        question: "What contrast ratio does WCAG use for normal text?",
        answer:
          "The tool checks the commonly used thresholds of 4.5:1 for normal-text AA and 7:1 for normal-text AAA.",
      },
      {
        question: "What contrast ratio does the tool use for large text?",
        answer:
          "The tool checks 3:1 for large-text AA and 4.5:1 for large-text AAA.",
      },
      {
        question: "Does passing a contrast check guarantee full accessibility?",
        answer:
          "No. Contrast is only one accessibility consideration. A complete accessibility review includes many additional requirements.",
      },
    ],
  }),

  colorTool({
    id: "color-palette-generator",
    name: "Color Palette Generator",
    slug: "color-palette-generator",
    description:
      "Generate complementary, analogous, triadic, tetradic, split-complementary, or monochromatic color palettes.",
    longDescription:
      "Generate a coordinated color palette from a single base color. Choose from complementary, analogous, triadic, split-complementary, tetradic, or monochromatic relationships and view the resulting HEX, RGB, and HSL values.",
    keywords: [
      "color palette generator",
      "palette generator",
      "color scheme generator",
      "complementary color generator",
      "analogous color palette",
      "triadic color palette",
    ],
    icon: "Palette",
    howToUse: [
      "Choose or enter a base HEX color.",
      "Select a palette relationship.",
      "Click 'Run Tool'.",
      "Review and copy the generated palette colors.",
    ],
  }),

  colorTool({
    id: "gradient-generator",
    name: "CSS Gradient Generator",
    slug: "gradient-generator",
    description:
      "Create a two-color CSS linear gradient and copy the generated background declaration.",
    longDescription:
      "Build a CSS linear gradient using two colors and a custom angle. Preview the gradient immediately and copy the generated CSS background declaration for websites, interfaces, buttons, banners, cards, and other design elements.",
    keywords: [
      "CSS gradient generator",
      "gradient generator",
      "linear gradient generator",
      "CSS background gradient",
      "color gradient generator",
      "online gradient maker",
    ],
    icon: "Palette",
    howToUse: [
      "Choose the first and second gradient colors.",
      "Enter the gradient angle in degrees.",
      "Click 'Run Tool'.",
      "Preview the gradient and copy the generated CSS.",
    ],
  }),

  colorTool({
    id: "shades-and-tints-generator",
    name: "Shades & Tints Generator",
    slug: "shades-and-tints-generator",
    description:
      "Generate lighter tints and darker shades from a base color.",
    longDescription:
      "Create a scale of darker shades and lighter tints from any HEX color. Choose how many steps you want and generate reusable color variations with HEX, RGB, and HSL values for design systems, UI states, charts, themes, and branding.",
    keywords: [
      "shades and tints generator",
      "color shades generator",
      "color tints generator",
      "HEX shades generator",
      "color scale generator",
      "lighter darker colors",
    ],
    icon: "Palette",
    howToUse: [
      "Choose or enter a base HEX color.",
      "Choose the number of steps.",
      "Click 'Run Tool'.",
      "Review the generated shades, base color, and tints.",
    ],
  }),
];