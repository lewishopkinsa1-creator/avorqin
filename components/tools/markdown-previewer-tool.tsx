"use client";
import { useState } from "react";
import { renderMarkdown } from "@/lib/tool-utils/markdown-utils";
export function MarkdownPreviewerTool(){const[input,setInput]=useState("# Avorqin\n\n**Fast** browser-based developer tools.");return <div className="grid gap-4 lg:grid-cols-2"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={18} className="w-full rounded-lg border p-3 font-mono text-sm"/><div className="min-h-[28rem] rounded-lg border bg-white p-5 prose max-w-none" dangerouslySetInnerHTML={{__html:renderMarkdown(input)}} /></div>}