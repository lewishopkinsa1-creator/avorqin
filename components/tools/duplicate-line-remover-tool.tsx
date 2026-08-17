"use client";
import { useState } from "react";
import { removeDuplicateLines } from "@/lib/tool-utils/text-tool-utils";
export function DuplicateLineRemoverTool(){const[input,setInput]=useState("apple\nbanana\napple\ncherry\nbanana");const output=removeDuplicateLines(input);return <div className="space-y-4"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={10} className="w-full rounded-lg border p-3 font-mono"/><textarea value={output} readOnly rows={10} className="w-full rounded-lg border bg-slate-50 p-3 font-mono"/></div>}