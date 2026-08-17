"use client";
import { useState } from "react";
import { cleanWhitespace } from "@/lib/tool-utils/text-tool-utils";
export function WhitespaceCleanerTool(){const[input,setInput]=useState("  Avorqin    tools  \n\n  fast   and   simple ");const output=cleanWhitespace(input,true);return <div className="space-y-4"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={10} className="w-full rounded-lg border p-3 font-mono"/><textarea value={output} readOnly rows={10} className="w-full rounded-lg border bg-slate-50 p-3 font-mono"/></div>}