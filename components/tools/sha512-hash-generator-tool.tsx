"use client";
import { useState } from "react";
import { digestText } from "@/lib/tool-utils/hash-utils";
export function SHA512HashGeneratorTool() {
  const [input,setInput]=useState("Avorqin");
  const [output,setOutput]=useState("");
  const [error,setError]=useState("");
  const run=async()=>{try{setOutput(await digestText(input,"SHA-512"));setError("")}catch(e){setError(e instanceof Error?e.message:"Hashing failed");}};
  return <div className="space-y-4"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={10} className="w-full rounded-lg border p-3 font-mono text-sm"/><button onClick={run} className="rounded-lg bg-slate-950 px-4 py-2 text-white">Generate SHA-512</button>{error&&<p className="text-sm text-red-600">{error}</p>}<textarea value={output} readOnly rows={4} className="w-full rounded-lg border bg-slate-50 p-3 font-mono text-sm"/>{output&&<button onClick={()=>navigator.clipboard.writeText(output)} className="rounded-lg border px-4 py-2">Copy</button>}</div>;
}