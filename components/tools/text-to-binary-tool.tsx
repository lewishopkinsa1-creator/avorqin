"use client";
import { useState } from "react";
import { textToBinary } from "@/lib/tool-utils/conversion-utils";
export function TextToBinaryTool(){const[input,setInput]=useState("Avorqin");const output=textToBinary(input);return <div className="space-y-4"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={8} className="w-full rounded-lg border p-3"/><textarea value={output} readOnly rows={8} className="w-full rounded-lg border bg-slate-50 p-3 font-mono"/></div>}