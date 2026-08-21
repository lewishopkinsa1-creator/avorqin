export type MetaTagInput = {
  title: string;
  description: string;
  canonicalUrl?: string;
  robots?: string;
  author?: string;
};

export type SerpPreviewInput = {
  title: string;
  description: string;
  url: string;
};

export type OpenGraphInput = {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  siteName?: string;
  type?: string;
};

export type RobotsRule = {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
};

export type SitemapEntry = {
  url: string;
  lastModified?: string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export type HreflangEntry = {
  language: string;
  url: string;
};

export type UtmInput = {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
};

export type KeywordDensityResult = {
  keyword: string;
  count: number;
  density: number;
  totalWords: number;
};

export type HeadingItem = {
  level: number;
  text: string;
};

export type HeadingAnalysis = {
  headings: HeadingItem[];
  counts: Record<string, number>;
  issues: string[];
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error("Enter a valid URL.");
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    throw new Error(
      "Enter a complete URL including http:// or https://."
    );
  }
}

export function generateMetaTags(
  input: MetaTagInput
): string {
  const title = input.title.trim();
  const description =
    input.description.trim();

  if (!title) {
    throw new Error("Enter a page title.");
  }

  if (!description) {
    throw new Error(
      "Enter a meta description."
    );
  }

  const lines = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(
      description
    )}">`,
  ];

  if (input.canonicalUrl?.trim()) {
    lines.push(
      `<link rel="canonical" href="${escapeHtml(
        normalizeUrl(
          input.canonicalUrl
        )
      )}">`
    );
  }

  if (input.robots?.trim()) {
    lines.push(
      `<meta name="robots" content="${escapeHtml(
        input.robots.trim()
      )}">`
    );
  }

  if (input.author?.trim()) {
    lines.push(
      `<meta name="author" content="${escapeHtml(
        input.author.trim()
      )}">`
    );
  }

  return lines.join("\n");
}

export function getSerpPreview(
  input: SerpPreviewInput
) {
  const title = input.title.trim();
  const description =
    input.description.trim();
  const url = normalizeUrl(input.url);

  if (!title) {
    throw new Error("Enter a title.");
  }

  if (!description) {
    throw new Error(
      "Enter a description."
    );
  }

  return {
    title,
    description,
    url,
    titleLength: title.length,
    descriptionLength:
      description.length,
    titleGuidance:
      title.length >= 30 &&
      title.length <= 60
        ? "Good length"
        : title.length < 30
          ? "Title may be short"
          : "Title may be truncated",
    descriptionGuidance:
      description.length >= 120 &&
      description.length <= 160
        ? "Good length"
        : description.length < 120
          ? "Description may be short"
          : "Description may be truncated",
  };
}

export function generateOpenGraphTags(
  input: OpenGraphInput
): string {
  const title = input.title.trim();
  const description =
    input.description.trim();
  const url = normalizeUrl(input.url);

  if (!title) {
    throw new Error(
      "Enter an Open Graph title."
    );
  }

  if (!description) {
    throw new Error(
      "Enter an Open Graph description."
    );
  }

  const lines = [
    `<meta property="og:title" content="${escapeHtml(
      title
    )}">`,
    `<meta property="og:description" content="${escapeHtml(
      description
    )}">`,
    `<meta property="og:url" content="${escapeHtml(
      url
    )}">`,
    `<meta property="og:type" content="${escapeHtml(
      input.type?.trim() ||
        "website"
    )}">`,
  ];

  if (input.siteName?.trim()) {
    lines.push(
      `<meta property="og:site_name" content="${escapeHtml(
        input.siteName.trim()
      )}">`
    );
  }

  if (input.imageUrl?.trim()) {
    lines.push(
      `<meta property="og:image" content="${escapeHtml(
        normalizeUrl(
          input.imageUrl
        )
      )}">`
    );
  }

  return lines.join("\n");
}

export function generateRobotsTxt(
  rules: RobotsRule[],
  sitemapUrl?: string
): string {
  if (rules.length === 0) {
    throw new Error(
      "Add at least one robots rule."
    );
  }

  const sections = rules.map(
    (rule) => {
      const userAgent =
        rule.userAgent.trim() || "*";

      const lines = [
        `User-agent: ${userAgent}`,
      ];

      for (const path of
        rule.allow ?? []) {
        if (path.trim()) {
          lines.push(
            `Allow: ${path.trim()}`
          );
        }
      }

      for (const path of
        rule.disallow ?? []) {
        if (path.trim()) {
          lines.push(
            `Disallow: ${path.trim()}`
          );
        }
      }

      return lines.join("\n");
    }
  );

  if (sitemapUrl?.trim()) {
    sections.push(
      `Sitemap: ${normalizeUrl(
        sitemapUrl
      )}`
    );
  }

  return sections.join("\n\n");
}

export function testRobotsTxt(
  robotsText: string,
  path: string,
  userAgent = "*"
) {
  const targetPath =
    path.trim() || "/";

  const lines = robotsText
    .split(/\r?\n/)
    .map((line) =>
      line.replace(/#.*$/, "").trim()
    )
    .filter(Boolean);

  let activeAgents: string[] = [];
  const applicableRules: Array<{
    type: "allow" | "disallow";
    path: string;
  }> = [];

  for (const line of lines) {
    const separator =
      line.indexOf(":");

    if (separator === -1) {
      continue;
    }

    const key = line
      .slice(0, separator)
      .trim()
      .toLowerCase();

    const value = line
      .slice(separator + 1)
      .trim();

    if (key === "user-agent") {
      activeAgents = [value];
      continue;
    }

    const applies =
      activeAgents.some(
        (agent) =>
          agent === "*" ||
          agent.toLowerCase() ===
            userAgent.toLowerCase()
      );

    if (!applies) {
      continue;
    }

    if (
      key === "allow" ||
      key === "disallow"
    ) {
      applicableRules.push({
        type: key,
        path: value,
      });
    }
  }

  const matches =
    applicableRules
      .filter(
        (rule) =>
          rule.path &&
          targetPath.startsWith(
            rule.path
          )
      )
      .sort(
        (a, b) =>
          b.path.length -
          a.path.length
      );

  if (matches.length === 0) {
    return {
      allowed: true,
      matchedRule: null,
      message:
        "Allowed because no matching rule was found.",
    };
  }

  const winner = matches[0];

  return {
    allowed:
      winner.type === "allow",
    matchedRule: winner,
    message:
      winner.type === "allow"
        ? `Allowed by: Allow: ${winner.path}`
        : `Blocked by: Disallow: ${winner.path}`,
  };
}

export function generateXmlSitemap(
  entries: SitemapEntry[]
): string {
  if (entries.length === 0) {
    throw new Error(
      "Add at least one URL."
    );
  }

  const urls = entries.map(
    (entry) => {
      const url = normalizeUrl(
        entry.url
      );

      const lines = [
        "  <url>",
        `    <loc>${escapeXml(
          url
        )}</loc>`,
      ];

      if (
        entry.lastModified?.trim()
      ) {
        lines.push(
          `    <lastmod>${escapeXml(
            entry.lastModified.trim()
          )}</lastmod>`
        );
      }

      if (entry.changeFrequency) {
        lines.push(
          `    <changefreq>${entry.changeFrequency}</changefreq>`
        );
      }

      if (
        typeof entry.priority ===
        "number"
      ) {
        const priority =
          Math.min(
            1,
            Math.max(
              0,
              entry.priority
            )
          );

        lines.push(
          `    <priority>${priority.toFixed(
            1
          )}</priority>`
        );
      }

      lines.push("  </url>");

      return lines.join("\n");
    }
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

export function generateSchemaMarkup(
  type: string,
  properties: Record<
    string,
    unknown
  >
): string {
  const schemaType =
    type.trim();

  if (!schemaType) {
    throw new Error(
      "Enter a schema type."
    );
  }

  return JSON.stringify(
    {
      "@context":
        "https://schema.org",
      "@type": schemaType,
      ...properties,
    },
    null,
    2
  );
}

export function generateFaqSchema(
  items: Array<{
    question: string;
    answer: string;
  }>
): string {
  const validItems = items.filter(
    (item) =>
      item.question.trim() &&
      item.answer.trim()
  );

  if (validItems.length === 0) {
    throw new Error(
      "Add at least one question and answer."
    );
  }

  return JSON.stringify(
    {
      "@context":
        "https://schema.org",
      "@type": "FAQPage",
      mainEntity: validItems.map(
        (item) => ({
          "@type": "Question",
          name: item.question.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.trim(),
          },
        })
      ),
    },
    null,
    2
  );
}

export function generateHreflangTags(
  entries: HreflangEntry[]
): string {
  const valid = entries.filter(
    (entry) =>
      entry.language.trim() &&
      entry.url.trim()
  );

  if (valid.length === 0) {
    throw new Error(
      "Add at least one language and URL."
    );
  }

  return valid
    .map(
      (entry) =>
        `<link rel="alternate" hreflang="${escapeHtml(
          entry.language.trim()
        )}" href="${escapeHtml(
          normalizeUrl(entry.url)
        )}">`
    )
    .join("\n");
}

export function buildUtmUrl(
  input: UtmInput
): string {
  const url = new URL(
    normalizeUrl(input.url)
  );

  const values: Array<
    [string, string | undefined]
  > = [
    ["utm_source", input.source],
    ["utm_medium", input.medium],
    [
      "utm_campaign",
      input.campaign,
    ],
    ["utm_term", input.term],
    [
      "utm_content",
      input.content,
    ],
  ];

  for (const [key, value] of values) {
    if (value?.trim()) {
      url.searchParams.set(
        key,
        value.trim()
      );
    }
  }

  if (
    !input.source.trim() ||
    !input.medium.trim() ||
    !input.campaign.trim()
  ) {
    throw new Error(
      "Source, medium, and campaign are required."
    );
  }

  return url.toString();
}

function tokenizeText(
  text: string
): string[] {
  return text
    .toLowerCase()
    .replace(
      /[^\p{L}\p{N}'-]+/gu,
      " "
    )
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function calculateKeywordDensity(
  text: string,
  keyword: string
): KeywordDensityResult {
  const words =
    tokenizeText(text);

  const keywordWords =
    tokenizeText(keyword);

  if (words.length === 0) {
    throw new Error(
      "Enter text to analyze."
    );
  }

  if (
    keywordWords.length === 0
  ) {
    throw new Error(
      "Enter a keyword or phrase."
    );
  }

  let count = 0;

  for (
    let i = 0;
    i <=
    words.length -
      keywordWords.length;
    i += 1
  ) {
    const match =
      keywordWords.every(
        (word, index) =>
          words[i + index] ===
          word
      );

    if (match) {
      count += 1;
    }
  }

  const density =
    Math.round(
      ((count *
        keywordWords.length) /
        words.length) *
        10000
    ) / 100;

  return {
    keyword:
      keywordWords.join(" "),
    count,
    density,
    totalWords: words.length,
  };
}

export function analyzeHeadings(
  html: string
): HeadingAnalysis {
  const source = html.trim();

  if (!source) {
    throw new Error(
      "Enter HTML to analyze."
    );
  }

  const headings: HeadingItem[] = [];

  const expression =
    /<h([1-6])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi;

  let match:
    | RegExpExecArray
    | null;

  while (
    (match =
      expression.exec(source)) !==
    null
  ) {
    const level = Number(
      match[1]
    );

    const text = match[2]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    headings.push({
      level,
      text,
    });
  }

  const counts: Record<
    string,
    number
  > = {
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  };

  headings.forEach(
    (heading) => {
      counts[
        `h${heading.level}`
      ] += 1;
    }
  );

  const issues: string[] = [];

  if (counts.h1 === 0) {
    issues.push(
      "No H1 heading was found."
    );
  }

  if (counts.h1 > 1) {
    issues.push(
      `Multiple H1 headings were found (${counts.h1}).`
    );
  }

  for (
    let i = 1;
    i < headings.length;
    i += 1
  ) {
    const previous =
      headings[i - 1];

    const current =
      headings[i];

    if (
      current.level >
      previous.level + 1
    ) {
      issues.push(
        `Heading level jumps from H${previous.level} to H${current.level} near "${current.text}".`
      );
    }
  }

  if (headings.length === 0) {
    issues.push(
      "No H1-H6 headings were found."
    );
  }

  return {
    headings,
    counts,
    issues,
  };
}