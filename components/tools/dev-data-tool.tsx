"use client";

import { useMemo, useState } from "react";
import {
  diffJson,
  evaluateJsonPath,
  htmlToMarkdown,
  jsonToTypeScript,
  markdownToHtml,
  type JsonDiffResult,
  type JsonPathResult,
  type JsonToTypeScriptResult,
} from "@/lib/tool-utils/dev-data-utils";

type DevDataToolKind =
  | "json-to-typescript"
  | "jsonpath-tester"
  | "json-diff"
  | "markdown-to-html"
  | "html-to-markdown";

type DevDataToolProps = {
  kind: DevDataToolKind;
};

const textareaClass =
  "min-h-64 w-full resize-y rounded-lg border bg-background px-3 py-3 font-mono text-sm leading-6 text-foreground placeholder:text-muted-foreground";

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground";

const buttonClass =
  "rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90";

const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

function CodeOutput({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">{label}</h3>

        <button
          type="button"
          onClick={onCopy}
          className={secondaryButtonClass}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <textarea
        readOnly
        value={value}
        className={textareaClass}
        aria-label={label}
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 break-words text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}

function formatJsonValue(value: unknown): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  return JSON.stringify(value, null, 2) ?? String(value);
}

export function DevDataTool({
  kind,
}: DevDataToolProps) {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [jsonPath, setJsonPath] = useState("$.store.book[*].title");

  const [typeScriptResult, setTypeScriptResult] =
    useState<JsonToTypeScriptResult | null>(null);
  const [jsonPathResult, setJsonPathResult] =
    useState<JsonPathResult | null>(null);
  const [jsonDiffResult, setJsonDiffResult] =
    useState<JsonDiffResult | null>(null);
  const [textResult, setTextResult] = useState("");

  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const clearResults = () => {
    setTypeScriptResult(null);
    setJsonPathResult(null);
    setJsonDiffResult(null);
    setTextResult("");
    setError("");
    setCopied(false);
  };

  const reset = () => {
    setInputA("");
    setInputB("");
    setRootName("Root");
    setJsonPath("$.store.book[*].title");
    clearResults();
  };

  const run = () => {
    clearResults();

    try {
      switch (kind) {
        case "json-to-typescript":
          setTypeScriptResult(
            jsonToTypeScript(inputA, rootName)
          );
          break;

        case "jsonpath-tester":
          setJsonPathResult(
            evaluateJsonPath(inputA, jsonPath)
          );
          break;

        case "json-diff":
          setJsonDiffResult(diffJson(inputA, inputB));
          break;

        case "markdown-to-html":
          setTextResult(markdownToHtml(inputA));
          break;

        case "html-to-markdown":
          setTextResult(htmlToMarkdown(inputA));
          break;

        default:
          throw new Error(
            "This developer/data tool is not configured."
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

  const outputText = useMemo(() => {
    if (typeScriptResult) {
      return typeScriptResult.code;
    }

    if (textResult) {
      return textResult;
    }

    return "";
  }, [typeScriptResult, textResult]);

  const copyOutput = async () => {
    if (!outputText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Unable to copy the output.");
    }
  };

  const hasInput = Boolean(
    inputA ||
      inputB ||
      (kind === "json-to-typescript" &&
        rootName !== "Root") ||
      (kind === "jsonpath-tester" &&
        jsonPath !== "$.store.book[*].title")
  );

  return (
    <div className="space-y-5">
      {kind === "json-to-typescript" && (
        <>
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Root type name
            </span>
            <input
              type="text"
              value={rootName}
              onChange={(event) => {
                setRootName(event.target.value);
                clearResults();
              }}
              placeholder="Root"
              className={inputClass}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">
              JSON
            </span>
            <textarea
              value={inputA}
              onChange={(event) => {
                setInputA(event.target.value);
                clearResults();
              }}
              placeholder={`{
  "id": 123,
  "name": "Avorqin",
  "active": true
}`}
              className={textareaClass}
            />
          </label>
        </>
      )}

      {kind === "jsonpath-tester" && (
        <>
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              JSONPath expression
            </span>
            <input
              type="text"
              value={jsonPath}
              onChange={(event) => {
                setJsonPath(event.target.value);
                clearResults();
              }}
              placeholder="$.store.book[*].title"
              className={inputClass}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">
              JSON
            </span>
            <textarea
              value={inputA}
              onChange={(event) => {
                setInputA(event.target.value);
                clearResults();
              }}
              placeholder={`{
  "store": {
    "book": [
      { "title": "One" },
      { "title": "Two" }
    ]
  }
}`}
              className={textareaClass}
            />
          </label>

          <div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
            Supported JSONPath features include dot notation,
            bracket notation, array indexes, wildcards, negative
            indexes, and recursive descent. Filters, slices, and
            unions are not supported in this version.
          </div>
        </>
      )}

      {kind === "json-diff" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Left JSON
            </span>
            <textarea
              value={inputA}
              onChange={(event) => {
                setInputA(event.target.value);
                clearResults();
              }}
              placeholder={`{
  "name": "Avorqin",
  "version": 1
}`}
              className={textareaClass}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Right JSON
            </span>
            <textarea
              value={inputB}
              onChange={(event) => {
                setInputB(event.target.value);
                clearResults();
              }}
              placeholder={`{
  "name": "Avorqin",
  "version": 2
}`}
              className={textareaClass}
            />
          </label>
        </div>
      )}

      {kind === "markdown-to-html" && (
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            Markdown
          </span>
          <textarea
            value={inputA}
            onChange={(event) => {
              setInputA(event.target.value);
              clearResults();
            }}
            placeholder={`# Heading

This is **bold** and this is *italic*.

- Item one
- Item two`}
            className={textareaClass}
          />
        </label>
      )}

      {kind === "html-to-markdown" && (
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            HTML
          </span>
          <textarea
            value={inputA}
            onChange={(event) => {
              setInputA(event.target.value);
              clearResults();
            }}
            placeholder={`<h1>Heading</h1>
<p>This is <strong>bold</strong>.</p>
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>`}
            className={textareaClass}
          />
        </label>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={run}
          className={buttonClass}
        >
          {kind === "json-to-typescript"
            ? "Generate TypeScript"
            : kind === "jsonpath-tester"
              ? "Run JSONPath"
              : kind === "json-diff"
                ? "Compare JSON"
                : "Convert"}
        </button>

        {hasInput && (
          <button
            type="button"
            onClick={reset}
            className={secondaryButtonClass}
          >
            Reset
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

      {typeScriptResult && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Root type"
              value={typeScriptResult.rootType}
            />
            <ResultCard
              label="Generated types"
              value={typeScriptResult.typeCount.toLocaleString(
                "en-US"
              )}
            />
          </div>

          <CodeOutput
            label="TypeScript"
            value={typeScriptResult.code}
            copied={copied}
            onCopy={copyOutput}
          />
        </div>
      )}

      {jsonPathResult && (
        <div className="space-y-4">
          <ResultCard
            label="Matches"
            value={jsonPathResult.count.toLocaleString(
              "en-US"
            )}
          />

          {jsonPathResult.count === 0 ? (
            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              No values matched this JSONPath expression.
            </div>
          ) : (
            <div className="space-y-3">
              {jsonPathResult.matches.map((match, index) => (
                <div
                  key={`${match.path}-${index}`}
                  className="rounded-xl border bg-background p-4"
                >
                  <div className="font-mono text-xs text-muted-foreground">
                    {match.path}
                  </div>

                  <pre className="mt-2 overflow-auto whitespace-pre-wrap break-words font-mono text-sm">
                    {formatJsonValue(match.value)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {jsonDiffResult && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Differences"
              value={jsonDiffResult.count.toLocaleString(
                "en-US"
              )}
            />

            <ResultCard
              label="Status"
              value={
                jsonDiffResult.identical
                  ? "Identical"
                  : "Different"
              }
            />
          </div>

          {jsonDiffResult.identical ? (
            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              The two JSON documents are structurally identical.
            </div>
          ) : (
            <div className="space-y-3">
              {jsonDiffResult.differences.map(
                (difference, index) => (
                  <div
                    key={`${difference.path}-${index}`}
                    className="rounded-xl border bg-background p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="text-xs font-medium">
                        {difference.path}
                      </code>

                      <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                        {difference.type.replace("-", " ")}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-3 lg:grid-cols-2">
                      {difference.type !== "added" && (
                        <div>
                          <div className="mb-1 text-xs font-medium text-muted-foreground">
                            Left
                          </div>
                          <pre className="overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted/30 p-3 font-mono text-xs">
                            {formatJsonValue(
                              difference.left
                            )}
                          </pre>
                        </div>
                      )}

                      {difference.type !== "removed" && (
                        <div>
                          <div className="mb-1 text-xs font-medium text-muted-foreground">
                            Right
                          </div>
                          <pre className="overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted/30 p-3 font-mono text-xs">
                            {formatJsonValue(
                              difference.right
                            )}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {textResult && (
        <CodeOutput
          label={
            kind === "markdown-to-html"
              ? "HTML"
              : "Markdown"
          }
          value={textResult}
          copied={copied}
          onCopy={copyOutput}
        />
      )}
    </div>
  );
}