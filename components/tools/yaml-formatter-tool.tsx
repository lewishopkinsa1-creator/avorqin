"use client";
import { useState } from "react";
import { formatYaml } from "@/lib/tool-utils/yaml-utils";
export function YAMLFormatterTool() {
  const [input,setInput]=useState("name: Avorqin\ntools:\n  - JSON Formatter\n  - UUID Generator");
  const [output,setOutput]=useState(""); const [error,setError]=useState("");
  const run=()=>{try{setOutput(formatYaml(input));setError("")}catch(e){setError(e instanceof Error?e.message:"Unable to format YAML");setOutput("")}};
  return <div className="space-y-4"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={12} className="w-full rounded-lg border p-3 font-mono text-sm"/><div className="flex gap-2"><button onClick={run} className="rounded-lg bg-slate-950 px-4 py-2 text-white">Format YAML</button><button onClick={()=>{setInput("");setOutput("");setError("")}} className="rounded-lg border px-4 py-2">Clear</button></div>{error&&<p className="text-sm text-red-600">{error}</p>}<textarea value={output} readOnly rows={12} className="w-full rounded-lg border bg-slate-50 p-3 font-mono text-sm"/>{output&&<button onClick={()=>navigator.clipboard.writeText(output)} className="rounded-lg border px-4 py-2">Copy</button>}</div>;
}