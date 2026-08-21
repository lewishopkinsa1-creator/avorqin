import { ToolConfig } from "@/types";

const localSeoFaq = [
  {
    question: "Does Avorqin send my SEO data to a server?",
    answer:
      "No. These SEO utilities process the information you enter directly in your browser unless a tool explicitly states otherwise.",
  },
  {
    question: "Do I need an account to use these SEO tools?",
    answer:
      "No. Avorqin SEO tools can be used without creating an account.",
  },
  {
    question: "Do these tools guarantee higher search rankings?",
    answer:
      "No. These tools help create, inspect, and organize technical SEO information, but search rankings depend on many factors including content quality, relevance, authority, site performance, and search engine systems.",
  },
];

function seoTool(
  config: Omit<ToolConfig, "category" | "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    category: "SEO & Marketing",
    faq: config.faq ?? localSeoFaq,
  };
}

export const seoTools: ToolConfig[] = [
  seoTool({
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description:
      "Generate title, description, canonical, robots, and author HTML meta tags for a web page.",
    longDescription:
      "Create common HTML metadata for websites without writing each tag manually. Enter a page title, meta description, canonical URL, robots directive, and optional author information to generate clean HTML markup you can copy into a page head.",
    keywords: [
      "meta tag generator",
      "SEO meta tag generator",
      "generate meta tags",
      "HTML meta tags",
      "meta description generator",
      "canonical tag generator",
    ],
    icon: "Tags",
    howToUse: [
      "Enter the page title and meta description.",
      "Add a canonical URL and robots directive if needed.",
      "Optionally enter an author name.",
      "Click 'Run Tool' and copy the generated HTML tags.",
    ],
  }),

  seoTool({
    id: "serp-preview",
    name: "SERP Snippet Preview",
    slug: "serp-preview",
    description:
      "Preview how a page title, URL, and meta description may appear in search results.",
    longDescription:
      "Preview a simplified search result snippet using your page title, URL, and meta description. The tool also reports title and description character lengths to help you identify copy that may be unusually short or potentially truncated.",
    keywords: [
      "SERP preview",
      "SERP snippet preview",
      "Google search preview",
      "meta title preview",
      "meta description preview",
      "search result preview",
    ],
    icon: "Search",
    howToUse: [
      "Enter a page title.",
      "Enter the page meta description.",
      "Enter the full page URL.",
      "Run the tool to preview the search snippet and review character-length guidance.",
    ],
    faq: [
      {
        question: "Will Google display my snippet exactly like this?",
        answer:
          "Not necessarily. Search engines can rewrite titles and descriptions and may display snippets differently depending on the search query, device, and other factors.",
      },
      {
        question: "What title length should I use?",
        answer:
          "There is no guaranteed character limit because search results are constrained visually. The tool provides practical character guidance rather than a ranking rule.",
      },
      {
        question: "Does this tool check a live Google result?",
        answer:
          "No. It creates a local preview from the title, description, and URL you enter.",
      },
    ],
  }),

  seoTool({
    id: "open-graph-preview",
    name: "Open Graph Preview",
    slug: "open-graph-preview",
    description:
      "Generate Open Graph tags and preview how page information may look when shared.",
    longDescription:
      "Create common Open Graph metadata for web pages and preview the title, description, image, site name, and URL. Open Graph tags are commonly used by social platforms and messaging services when generating link previews.",
    keywords: [
      "open graph preview",
      "open graph generator",
      "OG tag generator",
      "social share preview",
      "og title generator",
      "og image preview",
    ],
    icon: "Share2",
    howToUse: [
      "Enter the Open Graph title and description.",
      "Enter the page URL.",
      "Optionally provide an image URL and site name.",
      "Run the tool to preview the card and copy the generated Open Graph tags.",
    ],
    faq: [
      {
        question: "What are Open Graph tags?",
        answer:
          "Open Graph tags are metadata fields that can help social platforms understand how a webpage should be represented when its URL is shared.",
      },
      {
        question: "Will every social platform use this exact preview?",
        answer:
          "No. Platforms can cache, crop, rewrite, or otherwise display metadata differently.",
      },
      {
        question: "Does Avorqin upload my Open Graph image?",
        answer:
          "No. The tool uses the image URL you enter for the browser preview and does not upload the image to Avorqin.",
      },
    ],
  }),

  seoTool({
    id: "robots-txt-generator",
    name: "Robots.txt Generator",
    slug: "robots-txt-generator",
    description:
      "Generate robots.txt rules for user agents, allowed paths, blocked paths, and a sitemap URL.",
    longDescription:
      "Create a basic robots.txt file for a website by specifying user agents, allowed paths, disallowed paths, and an optional XML sitemap location. The generated text can be reviewed and copied before publishing it at the root of a website.",
    keywords: [
      "robots txt generator",
      "robots.txt generator",
      "create robots txt",
      "SEO robots generator",
      "robots file generator",
      "crawler rules generator",
    ],
    icon: "Bot",
    howToUse: [
      "Enter paths you want crawlers to disallow.",
      "Enter any explicitly allowed paths.",
      "Choose a user agent or use * for all crawlers.",
      "Optionally provide a sitemap URL, then generate and copy the robots.txt file.",
    ],
    faq: [
      {
        question: "Does robots.txt prevent a URL from appearing in search results?",
        answer:
          "Not necessarily. Robots.txt primarily controls crawling. A URL can sometimes still be discovered or indexed through links even when crawling is blocked.",
      },
      {
        question: "Where should robots.txt be placed?",
        answer:
          "It is normally served from the root of a host, such as https://example.com/robots.txt.",
      },
      {
        question: "Can a robots.txt mistake affect crawling?",
        answer:
          "Yes. Incorrect rules can block important sections of a site, so generated rules should be reviewed before publishing.",
      },
    ],
  }),

  seoTool({
    id: "robots-txt-tester",
    name: "Robots.txt Tester",
    slug: "robots-txt-tester",
    description:
      "Test a path against basic Allow and Disallow rules in robots.txt.",
    longDescription:
      "Inspect how a basic robots.txt configuration applies to a specific path and user agent. The tester looks for matching Allow and Disallow directives and reports whether the selected path is allowed based on the most specific matching rule.",
    keywords: [
      "robots txt tester",
      "robots.txt tester",
      "test robots txt",
      "robots checker",
      "crawler access checker",
      "robots rule tester",
    ],
    icon: "ShieldCheck",
    howToUse: [
      "Paste your robots.txt content.",
      "Enter the path you want to test.",
      "Enter a user agent or use *.",
      "Run the tester to review the matching rule and result.",
    ],
    faq: [
      {
        question: "Is this an official search engine robots.txt tester?",
        answer:
          "No. It is a browser-based utility for testing common Allow and Disallow behavior and should not be treated as an official crawler implementation.",
      },
      {
        question: "Does it fetch my live robots.txt file?",
        answer:
          "No. It tests the robots.txt text that you paste into the tool.",
      },
      {
        question: "Why might a real crawler behave differently?",
        answer:
          "Individual crawlers can implement additional parsing details, wildcard behavior, caching, and crawler-specific rules.",
      },
    ],
  }),

  seoTool({
    id: "xml-sitemap-generator",
    name: "XML Sitemap Generator",
    slug: "xml-sitemap-generator",
    description:
      "Generate an XML sitemap from a list of website URLs.",
    longDescription:
      "Turn a list of page URLs into XML sitemap markup that follows the common sitemap URL structure. You can also specify a change frequency and priority value for the generated entries before copying the XML.",
    keywords: [
      "XML sitemap generator",
      "sitemap generator",
      "generate sitemap",
      "SEO sitemap creator",
      "create sitemap xml",
      "website sitemap generator",
    ],
    icon: "FileCode2",
    howToUse: [
      "Enter one complete page URL per line.",
      "Choose a change frequency.",
      "Enter a priority value between 0 and 1.",
      "Run the tool and copy the generated XML sitemap.",
    ],
    faq: [
      {
        question: "Does adding a URL to a sitemap guarantee indexing?",
        answer:
          "No. A sitemap helps search engines discover URLs but does not guarantee that they will be crawled or indexed.",
      },
      {
        question: "Can I submit the generated sitemap to Google Search Console?",
        answer:
          "Yes, after publishing a valid sitemap on your own website you can submit its URL through supported search engine webmaster tools.",
      },
      {
        question: "Does Avorqin crawl my website to find URLs?",
        answer:
          "No. This version generates sitemap XML from the URLs you provide.",
      },
    ],
  }),

  seoTool({
    id: "schema-markup-generator",
    name: "Schema Markup Generator",
    slug: "schema-markup-generator",
    description:
      "Generate JSON-LD structured data from a Schema.org type and JSON properties.",
    longDescription:
      "Create basic JSON-LD structured data by choosing a Schema.org type and entering the properties you want included. The tool automatically adds the Schema.org context and selected type, then formats the resulting JSON-LD for copying.",
    keywords: [
      "schema markup generator",
      "structured data generator",
      "JSON-LD generator",
      "schema.org generator",
      "SEO schema generator",
      "generate schema markup",
    ],
    icon: "Braces",
    howToUse: [
      "Enter a Schema.org type such as WebPage, Organization, or Article.",
      "Enter the remaining properties as a JSON object.",
      "Run the tool.",
      "Review and copy the generated JSON-LD.",
    ],
    faq: [
      {
        question: "Does generated schema guarantee a rich result?",
        answer:
          "No. Search engines decide whether structured data is eligible for or displayed as enhanced search features.",
      },
      {
        question: "Should I validate the generated JSON-LD?",
        answer:
          "Yes. Review the properties for the schema type you are using and validate production markup with an appropriate structured data testing tool.",
      },
      {
        question: "Does this tool automatically know which properties my page needs?",
        answer:
          "No. You choose the Schema.org type and supply the properties that apply to your page.",
      },
    ],
  }),

  seoTool({
    id: "faq-schema-generator",
    name: "FAQ Schema Generator",
    slug: "faq-schema-generator",
    description:
      "Generate FAQPage JSON-LD from questions and answers.",
    longDescription:
      "Turn a set of questions and answers into formatted FAQPage JSON-LD structured data. Enter one question and answer per line using the provided separator and copy the resulting schema markup for use on an appropriate page.",
    keywords: [
      "FAQ schema generator",
      "FAQPage schema",
      "FAQ structured data",
      "FAQ JSON-LD generator",
      "schema FAQ generator",
      "SEO FAQ schema",
    ],
    icon: "CircleHelp",
    howToUse: [
      "Enter one FAQ per line.",
      "Separate each question and answer with a vertical bar.",
      "Run the tool.",
      "Copy the generated FAQPage JSON-LD.",
    ],
    faq: [
      {
        question: "Does FAQ schema guarantee FAQ rich results?",
        answer:
          "No. Search engines control eligibility and display of search features and can change their policies over time.",
      },
      {
        question: "Should the FAQ content also appear on the page?",
        answer:
          "Structured data should accurately represent the content and purpose of the page where it is used.",
      },
      {
        question: "Can I add multiple FAQ items?",
        answer:
          "Yes. Enter each question and answer on a separate line using the tool's question | answer format.",
      },
    ],
  }),

  seoTool({
    id: "hreflang-generator",
    name: "Hreflang Generator",
    slug: "hreflang-generator",
    description:
      "Generate alternate-language hreflang link tags for international pages.",
    longDescription:
      "Create HTML hreflang link elements for alternate language or regional versions of a webpage. Enter a language or locale code and its corresponding URL on each line, including x-default when appropriate.",
    keywords: [
      "hreflang generator",
      "hreflang tag generator",
      "international SEO tool",
      "alternate language tags",
      "hreflang code generator",
      "x-default generator",
    ],
    icon: "Languages",
    howToUse: [
      "Enter a language or locale code followed by a vertical bar.",
      "Enter the corresponding complete URL.",
      "Add one alternate page per line.",
      "Run the tool and copy the generated hreflang link tags.",
    ],
    faq: [
      {
        question: "What is hreflang used for?",
        answer:
          "Hreflang can help search engines understand alternate language or regional versions of similar pages.",
      },
      {
        question: "What is x-default?",
        answer:
          "x-default can identify a fallback or non-language-specific version of a page.",
      },
      {
        question: "Do hreflang pages normally reference each other?",
        answer:
          "International SEO implementations commonly use reciprocal alternate references between equivalent pages, so production setups should be reviewed carefully.",
      },
    ],
  }),

  seoTool({
    id: "utm-builder",
    name: "UTM Builder",
    slug: "utm-builder",
    description:
      "Build campaign tracking URLs with UTM source, medium, campaign, and content parameters.",
    longDescription:
      "Create campaign tracking URLs without manually editing query strings. Enter a destination URL and common UTM campaign values to generate a properly encoded URL for analytics, advertising, email, social, and marketing links.",
    keywords: [
      "UTM builder",
      "UTM generator",
      "campaign URL builder",
      "Google Analytics UTM builder",
      "UTM link generator",
      "campaign tracking URL",
    ],
    icon: "Link",
    howToUse: [
      "Enter the destination page URL.",
      "Enter the campaign source, medium, and campaign name.",
      "Optionally add campaign content.",
      "Run the tool and copy the generated tracking URL.",
    ],
    faq: [
      {
        question: "What are UTM parameters?",
        answer:
          "UTM parameters are query-string values commonly added to campaign URLs so analytics systems can identify traffic sources, media, campaigns, and related variations.",
      },
      {
        question: "Which UTM values are required by this tool?",
        answer:
          "Campaign source, medium, and campaign name are required. Campaign content is optional.",
      },
      {
        question: "Does Avorqin track the URL I generate?",
        answer:
          "No. The URL is assembled locally in your browser.",
      },
    ],
  }),

  seoTool({
    id: "keyword-density-checker",
    name: "Keyword Density Checker",
    slug: "keyword-density-checker",
    description:
      "Count keyword or phrase occurrences and calculate their density within a block of text.",
    longDescription:
      "Analyze text to see how often a keyword or multi-word phrase appears. The tool reports the number of matches, total word count, and a simple keyword density percentage based on the words in the supplied text.",
    keywords: [
      "keyword density checker",
      "keyword density calculator",
      "SEO keyword checker",
      "keyword frequency checker",
      "keyword percentage checker",
      "content keyword analyzer",
    ],
    icon: "BarChart3",
    howToUse: [
      "Paste the text you want to analyze.",
      "Enter a keyword or phrase.",
      "Run the tool.",
      "Review the occurrence count, total words, and calculated density.",
    ],
    faq: [
      {
        question: "Is there an ideal keyword density percentage?",
        answer:
          "There is no universal percentage that guarantees better rankings. Content should primarily be useful, relevant, and written naturally for its audience.",
      },
      {
        question: "Can I check multi-word phrases?",
        answer:
          "Yes. The checker supports both single keywords and phrases.",
      },
      {
        question: "Does the tool evaluate search intent or content quality?",
        answer:
          "No. It measures occurrences and density only.",
      },
    ],
  }),

  seoTool({
    id: "heading-structure-analyzer",
    name: "Heading Structure Analyzer",
    slug: "heading-structure-analyzer",
    description:
      "Inspect H1-H6 headings in HTML and identify basic hierarchy issues.",
    longDescription:
      "Analyze HTML heading structure without loading the page in a browser. The tool extracts H1 through H6 headings, counts each heading level, identifies missing or multiple H1 headings, and flags basic jumps in heading hierarchy.",
    keywords: [
      "heading structure analyzer",
      "heading checker",
      "H1 checker",
      "HTML heading analyzer",
      "SEO heading checker",
      "heading hierarchy checker",
    ],
    icon: "Heading1",
    howToUse: [
      "Paste HTML containing the headings you want to inspect.",
      "Run the analyzer.",
      "Review the extracted H1-H6 headings and counts.",
      "Check the reported hierarchy issues and update your markup when appropriate.",
    ],
    faq: [
      {
        question: "Does heading order directly determine Google rankings?",
        answer:
          "No. Heading structure is useful for document organization and accessibility, but ranking systems consider many signals.",
      },
      {
        question: "What does a heading-level jump mean?",
        answer:
          "A jump occurs when the markup moves from one heading level to a much deeper level, such as H2 directly to H4. The tool flags these cases for review.",
      },
      {
        question: "Does the analyzer fetch my live webpage?",
        answer:
          "No. It analyzes the HTML you paste into the browser.",
      },
    ],
  }),
];