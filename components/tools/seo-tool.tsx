"use client";

import { useState } from "react";
import {
  analyzeHeadings,
  buildUtmUrl,
  calculateKeywordDensity,
  generateFaqSchema,
  generateHreflangTags,
  generateMetaTags,
  generateOpenGraphTags,
  generateRobotsTxt,
  generateSchemaMarkup,
  generateXmlSitemap,
  getSerpPreview,
  testRobotsTxt,
} from "@/lib/tool-utils/seo-utils";

type SeoToolKind =
  | "meta-tag-generator"
  | "serp-preview"
  | "open-graph-preview"
  | "robots-txt-generator"
  | "robots-txt-tester"
  | "xml-sitemap-generator"
  | "schema-markup-generator"
  | "faq-schema-generator"
  | "hreflang-generator"
  | "utm-builder"
  | "keyword-density-checker"
  | "heading-structure-analyzer";

type SeoToolProps = {
  kind: SeoToolKind;
};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const textareaClass =
  "w-full rounded-lg border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground";

const buttonClass =
  "rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90";

const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 7,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        className={textareaClass}
      />
    </label>
  );
}

export function SeoTool({
  kind,
}: SeoToolProps) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");

  const [output, setOutput] =
    useState("");

  const [error, setError] =
    useState("");

  const [preview, setPreview] =
    useState<Record<
      string,
      unknown
    > | null>(null);

  const clearResult = () => {
    setOutput("");
    setError("");
    setPreview(null);
  };

  const copyOutput = async () => {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(
      output
    );
  };

  const run = () => {
    clearResult();

    try {
      switch (kind) {
        case "meta-tag-generator": {
          setOutput(
            generateMetaTags({
              title: a,
              description: b,
              canonicalUrl: c,
              robots:
                d || "index, follow",
              author: e,
            })
          );

          break;
        }

        case "serp-preview": {
          const result =
            getSerpPreview({
              title: a,
              description: b,
              url:
                c ||
                "https://example.com/page",
            });

          setPreview(result);

          break;
        }

        case "open-graph-preview": {
          const tags =
            generateOpenGraphTags({
              title: a,
              description: b,
              url:
                c ||
                "https://example.com/page",
              imageUrl: d,
              siteName: e,
              type: "website",
            });

          setOutput(tags);

          setPreview({
            title: a,
            description: b,
            url:
              c ||
              "https://example.com/page",
            imageUrl: d,
            siteName: e,
          });

          break;
        }

        case "robots-txt-generator": {
          const disallow = a
            .split(/\r?\n/)
            .map((value) =>
              value.trim()
            )
            .filter(Boolean);

          const allow = b
            .split(/\r?\n/)
            .map((value) =>
              value.trim()
            )
            .filter(Boolean);

          setOutput(
            generateRobotsTxt(
              [
                {
                  userAgent:
                    c || "*",
                  allow,
                  disallow,
                },
              ],
              d
            )
          );

          break;
        }

        case "robots-txt-tester": {
          const result =
            testRobotsTxt(
              a,
              b || "/",
              c || "*"
            );

          setPreview(result);

          break;
        }

        case "xml-sitemap-generator": {
          const urls = a
            .split(/\r?\n/)
            .map((value) =>
              value.trim()
            )
            .filter(Boolean);

          setOutput(
            generateXmlSitemap(
              urls.map((url) => ({
                url,
                changeFrequency:
                  (b ||
                    "weekly") as
                    | "always"
                    | "hourly"
                    | "daily"
                    | "weekly"
                    | "monthly"
                    | "yearly"
                    | "never",
                priority:
                  c.trim() !== ""
                    ? Number(c)
                    : 0.8,
              }))
            )
          );

          break;
        }

        case "schema-markup-generator": {
          let properties: Record<
            string,
            unknown
          > = {};

          if (b.trim()) {
            const parsed =
              JSON.parse(b);

            if (
              !parsed ||
              typeof parsed !==
                "object" ||
              Array.isArray(parsed)
            ) {
              throw new Error(
                "Schema properties must be a JSON object."
              );
            }

            properties =
              parsed as Record<
                string,
                unknown
              >;
          }

          setOutput(
            generateSchemaMarkup(
              a || "WebPage",
              properties
            )
          );

          break;
        }

        case "faq-schema-generator": {
          const items = a
            .split(/\r?\n/)
            .map((line) => {
              const separator =
                line.indexOf("|");

              if (
                separator === -1
              ) {
                return {
                  question: "",
                  answer: "",
                };
              }

              return {
                question: line
                  .slice(
                    0,
                    separator
                  )
                  .trim(),

                answer: line
                  .slice(
                    separator + 1
                  )
                  .trim(),
              };
            });

          setOutput(
            generateFaqSchema(items)
          );

          break;
        }

        case "hreflang-generator": {
          const entries = a
            .split(/\r?\n/)
            .map((line) => {
              const separator =
                line.indexOf("|");

              if (
                separator === -1
              ) {
                return {
                  language: "",
                  url: "",
                };
              }

              return {
                language: line
                  .slice(
                    0,
                    separator
                  )
                  .trim(),

                url: line
                  .slice(
                    separator + 1
                  )
                  .trim(),
              };
            });

          setOutput(
            generateHreflangTags(
              entries
            )
          );

          break;
        }

        case "utm-builder": {
          setOutput(
            buildUtmUrl({
              url:
                a ||
                "https://example.com",
              source: b,
              medium: c,
              campaign: d,
              content: e,
            })
          );

          break;
        }

        case "keyword-density-checker": {
          const result =
            calculateKeywordDensity(
              a,
              b
            );

          setPreview(result);

          break;
        }

        case "heading-structure-analyzer": {
          const result =
            analyzeHeadings(a);

          setPreview(
            result as unknown as Record<
              string,
              unknown
            >
          );

          break;
        }

        default:
          throw new Error(
            "This SEO tool is not configured."
          );
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to process the input."
      );
    }
  };

  return (
    <div className="space-y-5">
      {kind ===
        "meta-tag-generator" && (
        <>
          <Field
            label="Page title"
            value={a}
            onChange={setA}
            placeholder="Free Online Utility Tools | Avorqin"
          />

          <TextAreaField
            label="Meta description"
            value={b}
            onChange={setB}
            placeholder="Describe the page in a clear sentence."
            rows={4}
          />

          <Field
            label="Canonical URL"
            value={c}
            onChange={setC}
            placeholder="https://example.com/page/"
          />

          <Field
            label="Robots directive"
            value={d}
            onChange={setD}
            placeholder="index, follow"
          />

          <Field
            label="Author (optional)"
            value={e}
            onChange={setE}
            placeholder="Site or author name"
          />
        </>
      )}

      {kind === "serp-preview" && (
        <>
          <Field
            label="Page title"
            value={a}
            onChange={setA}
            placeholder="Free Online Utility Tools"
          />

          <TextAreaField
            label="Meta description"
            value={b}
            onChange={setB}
            placeholder="Enter the description you want to preview."
            rows={4}
          />

          <Field
            label="Page URL"
            value={c}
            onChange={setC}
            placeholder="https://example.com/page/"
          />
        </>
      )}

      {kind ===
        "open-graph-preview" && (
        <>
          <Field
            label="Open Graph title"
            value={a}
            onChange={setA}
            placeholder="Page title"
          />

          <TextAreaField
            label="Description"
            value={b}
            onChange={setB}
            placeholder="Description shown when shared."
            rows={4}
          />

          <Field
            label="Page URL"
            value={c}
            onChange={setC}
            placeholder="https://example.com/page/"
          />

          <Field
            label="Image URL (optional)"
            value={d}
            onChange={setD}
            placeholder="https://example.com/image.jpg"
          />

          <Field
            label="Site name (optional)"
            value={e}
            onChange={setE}
            placeholder="Example"
          />
        </>
      )}

      {kind ===
        "robots-txt-generator" && (
        <>
          <TextAreaField
            label="Disallow paths"
            value={a}
            onChange={setA}
            placeholder={"/admin/\n/private/"}
            rows={5}
          />

          <TextAreaField
            label="Allow paths"
            value={b}
            onChange={setB}
            placeholder="/public/"
            rows={4}
          />

          <Field
            label="User agent"
            value={c}
            onChange={setC}
            placeholder="*"
          />

          <Field
            label="Sitemap URL (optional)"
            value={d}
            onChange={setD}
            placeholder="https://example.com/sitemap.xml"
          />
        </>
      )}

      {kind ===
        "robots-txt-tester" && (
        <>
          <TextAreaField
            label="robots.txt"
            value={a}
            onChange={setA}
            placeholder={
              "User-agent: *\nDisallow: /admin/\nAllow: /"
            }
            rows={10}
          />

          <Field
            label="Path to test"
            value={b}
            onChange={setB}
            placeholder="/admin/page/"
          />

          <Field
            label="User agent"
            value={c}
            onChange={setC}
            placeholder="*"
          />
        </>
      )}

      {kind ===
        "xml-sitemap-generator" && (
        <>
          <TextAreaField
            label="URLs — one per line"
            value={a}
            onChange={setA}
            placeholder={
              "https://example.com/\nhttps://example.com/about/\nhttps://example.com/contact/"
            }
            rows={10}
          />

          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Change frequency
            </span>

            <select
              value={b || "weekly"}
              onChange={(event) =>
                setB(
                  event.target.value
                )
              }
              className={inputClass}
            >
              <option value="always">
                Always
              </option>
              <option value="hourly">
                Hourly
              </option>
              <option value="daily">
                Daily
              </option>
              <option value="weekly">
                Weekly
              </option>
              <option value="monthly">
                Monthly
              </option>
              <option value="yearly">
                Yearly
              </option>
              <option value="never">
                Never
              </option>
            </select>
          </label>

          <Field
            label="Priority"
            value={c}
            onChange={setC}
            placeholder="0.8"
          />
        </>
      )}

      {kind ===
        "schema-markup-generator" && (
        <>
          <Field
            label="Schema type"
            value={a}
            onChange={setA}
            placeholder="WebPage"
          />

          <TextAreaField
            label="Properties as JSON"
            value={b}
            onChange={setB}
            placeholder={`{
  "name": "Example Page",
  "description": "Example description"
}`}
            rows={10}
          />
        </>
      )}

      {kind ===
        "faq-schema-generator" && (
        <TextAreaField
          label="FAQ entries"
          value={a}
          onChange={setA}
          placeholder={
            "What is Avorqin? | Avorqin provides free browser-based tools.\nAre the tools free? | Yes."
          }
          rows={10}
        />
      )}

      {kind ===
        "hreflang-generator" && (
        <TextAreaField
          label="Languages and URLs"
          value={a}
          onChange={setA}
          placeholder={
            "en | https://example.com/en/\nes | https://example.com/es/\nx-default | https://example.com/"
          }
          rows={10}
        />
      )}

      {kind === "utm-builder" && (
        <>
          <Field
            label="Destination URL"
            value={a}
            onChange={setA}
            placeholder="https://example.com/landing-page"
          />

          <Field
            label="Campaign source"
            value={b}
            onChange={setB}
            placeholder="google"
          />

          <Field
            label="Campaign medium"
            value={c}
            onChange={setC}
            placeholder="cpc"
          />

          <Field
            label="Campaign name"
            value={d}
            onChange={setD}
            placeholder="summer-sale"
          />

          <Field
            label="Campaign content (optional)"
            value={e}
            onChange={setE}
            placeholder="blue-button"
          />
        </>
      )}

      {kind ===
        "keyword-density-checker" && (
        <>
          <TextAreaField
            label="Text to analyze"
            value={a}
            onChange={setA}
            placeholder="Paste your article, page copy, or other text here."
            rows={12}
          />

          <Field
            label="Keyword or phrase"
            value={b}
            onChange={setB}
            placeholder="online tools"
          />
        </>
      )}

      {kind ===
        "heading-structure-analyzer" && (
        <TextAreaField
          label="HTML"
          value={a}
          onChange={setA}
          placeholder={
            "<h1>Main title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>"
          }
          rows={12}
        />
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={run}
          className={buttonClass}
        >
          Run Tool
        </button>

        {(output ||
          preview ||
          error) && (
          <button
            type="button"
            onClick={clearResult}
            className={
              secondaryButtonClass
            }
          >
            Clear result
          </button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {kind === "serp-preview" &&
        preview && (
          <div className="rounded-xl border bg-background p-5">
            <div className="mb-1 truncate text-sm text-muted-foreground">
              {String(
                preview.url ?? ""
              )}
            </div>

            <div className="text-xl font-medium text-blue-700">
              {String(
                preview.title ?? ""
              )}
            </div>

            <div className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              {String(
                preview.description ??
                  ""
              )}
            </div>

            <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
              <div>
                Title:{" "}
                {String(
                  preview.titleLength ??
                    ""
                )}{" "}
                characters —{" "}
                {String(
                  preview.titleGuidance ??
                    ""
                )}
              </div>

              <div>
                Description:{" "}
                {String(
                  preview.descriptionLength ??
                    ""
                )}{" "}
                characters —{" "}
                {String(
                  preview.descriptionGuidance ??
                    ""
                )}
              </div>
            </div>
          </div>
        )}

      {kind ===
        "open-graph-preview" &&
        preview && (
          <div className="overflow-hidden rounded-xl border bg-background">
            {preview.imageUrl && (
              <div className="aspect-[1.91/1] bg-muted">
                <img
                  src={String(
                    preview.imageUrl
                  )}
                  alt="Open Graph preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-5">
              {preview.siteName && (
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {String(
                    preview.siteName
                  )}
                </div>
              )}

              <div className="mt-1 text-lg font-semibold">
                {String(
                  preview.title ?? ""
                )}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {String(
                  preview.description ??
                    ""
                )}
              </p>

              <div className="mt-3 truncate text-xs text-muted-foreground">
                {String(
                  preview.url ?? ""
                )}
              </div>
            </div>
          </div>
        )}

      {preview &&
        kind !== "serp-preview" &&
        kind !==
          "open-graph-preview" && (
          <div className="space-y-2">
            <h3 className="font-semibold">
              Result
            </h3>

            <pre className="max-h-[500px] overflow-auto rounded-xl border bg-muted/30 p-4 text-sm">
              {JSON.stringify(
                preview,
                null,
                2
              )}
            </pre>
          </div>
        )}

      {output && (
        <div className="space-y-3">
          <h3 className="font-semibold">
            Generated output
          </h3>

          <textarea
            value={output}
            readOnly
            rows={12}
            className={textareaClass}
          />

          <button
            type="button"
            onClick={copyOutput}
            className={
              secondaryButtonClass
            }
          >
            Copy output
          </button>
        </div>
      )}
    </div>
  );
}