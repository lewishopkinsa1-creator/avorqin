"use client";

import { useMemo, useState } from "react";

export type Batch351400Kind =
  | "watts-to-amps-calculator"
  | "amps-to-watts-calculator"
  | "volts-to-watts-calculator"
  | "watts-to-volts-calculator"
  | "amps-to-volts-calculator"
  | "volts-to-amps-calculator"
  | "kw-to-amps-calculator"
  | "amps-to-kw-calculator"
  | "kw-to-kwh-calculator"
  | "kwh-to-kw-calculator"
  | "watts-to-kwh-calculator"
  | "kwh-to-watts-calculator"
  | "mah-to-wh-calculator"
  | "wh-to-mah-calculator"
  | "battery-life-calculator"
  | "battery-capacity-calculator"
  | "power-factor-calculator"
  | "voltage-drop-calculator"
  | "wire-gauge-calculator"
  | "series-resistor-calculator"
  | "parallel-resistor-calculator"
  | "capacitor-series-calculator"
  | "capacitor-parallel-calculator"
  | "rc-time-constant-calculator"
  | "transformer-calculator"
  | "joules-to-watts-calculator"
  | "watts-to-joules-calculator"
  | "lumens-to-watts-calculator"
  | "watts-to-lumens-calculator"
  | "lux-to-lumens-calculator"
  | "gpa-calculator"
  | "weighted-gpa-calculator"
  | "high-school-gpa-calculator"
  | "college-gpa-calculator"
  | "grade-calculator"
  | "final-grade-calculator"
  | "weighted-grade-calculator"
  | "test-grade-calculator"
  | "semester-gpa-calculator"
  | "cumulative-gpa-calculator"
  | "matrix-determinant-calculator"
  | "matrix-multiplication-calculator"
  | "matrix-inverse-calculator"
  | "linear-equation-solver"
  | "system-of-equations-solver"
  | "logarithm-calculator"
  | "exponent-calculator"
  | "square-root-calculator"
  | "cube-root-calculator"
  | "factorial-calculator";

type ResultItem={label:string;value:string;note?:string};
type Field={key:string;label:string;type?:"number"|"input"|"select";defaultValue?:string;placeholder?:string;options?:{label:string;value:string}[]};
type Config={fields:Field[];button?:string;note?:string};
type ToolResult={output:string;summary:ResultItem[]};
const inputClass="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const textareaClass="min-h-36 w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm outline-none transition focus:border-primary";
const buttonClass="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondaryButtonClass="rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";
const num=(x:string,l:string)=>{const n=Number(x);if(!Number.isFinite(n))throw new Error(`${l} must be a valid number.`);return n;};
const pos=(x:string,l:string)=>{const n=num(x,l);if(n<=0)throw new Error(`${l} must be greater than zero.`);return n;};
const pct=(x:string,l:string)=>{const n=num(x,l);if(n<0)throw new Error(`${l} cannot be negative.`);return n;};
const fmt=(n:number,d=4)=>new Intl.NumberFormat(undefined,{maximumFractionDigits:d}).format(n);
const R=(output:string,pairs:[string,string][]):ToolResult=>({output,summary:pairs.map(([label,value])=>({label,value}))});
const list=(s:string,l:string)=>{const a=s.split(/[,\n]/).map(x=>x.trim()).filter(Boolean).map(Number);if(!a.length||a.some(x=>!Number.isFinite(x)))throw new Error(`${l} must contain valid comma-separated numbers.`);return a;};
const sameLen=(...a:number[][])=>{if(a.some(x=>x.length!==a[0].length))throw new Error("The entered lists must contain the same number of values.");};
const powerFactor=(s:string)=>{const pf=pos(s,"Power factor");if(pf>1)throw new Error("Power factor must be between 0 and 1.");return pf;};
const AWG:Record<string,number>={"18":6.385,"16":4.016,"14":2.525,"12":1.588,"10":0.999,"8":0.6282,"6":0.3951,"4":0.2485,"3":0.197,"2":0.1563,"1":0.1239,"0":0.0983};
const AWG_ORDER=["18","16","14","12","10","8","6","4","3","2","1","0"];
const GRADE:Record<string,number>={"A+":4,"A":4,"A-":3.7,"B+":3.3,"B":3,"B-":2.7,"C+":2.3,"C":2,"C-":1.7,"D+":1.3,"D":1,"D-":0.7,"F":0};
function letterGpa(gradesText:string,creditsText:string,label:string){const grades=gradesText.split(/[,\n]/).map(x=>x.trim().toUpperCase()).filter(Boolean),credits=list(creditsText,"Credits");if(grades.length!==credits.length)throw new Error("Grades and credits must contain the same number of entries.");let pts=0,total=0;grades.forEach((g,i)=>{if(GRADE[g]===undefined)throw new Error(`Unknown letter grade: ${g}`);if(credits[i]<=0)throw new Error("Credits must be greater than zero.");pts+=GRADE[g]*credits[i];total+=credits[i];});const gpa=pts/total;return R(fmt(gpa,4),[[label,fmt(gpa,4)],["Total credits",fmt(total)]]);}
function numericGpa(gradesText:string,creditsText:string,label:string){const grades=list(gradesText,"Grade points"),credits=list(creditsText,"Credits");sameLen(grades,credits);if(credits.some(x=>x<=0))throw new Error("Credits must be greater than zero.");const total=credits.reduce((a,b)=>a+b,0),gpa=grades.reduce((s,g,i)=>s+g*credits[i],0)/total;return R(fmt(gpa,4),[[label,fmt(gpa,4)],["Total credits",fmt(total)]]);}

const CONFIG:Record<Batch351400Kind,Config>={
  "watts-to-amps-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"}],button:"Calculate"},
  "amps-to-watts-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"}],button:"Calculate"},
  "volts-to-watts-calculator":{fields:[{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "watts-to-volts-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"8"}],button:"Calculate"},
  "amps-to-volts-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"8"},{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"}],button:"Calculate"},
  "volts-to-amps-calculator":{fields:[{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"},{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"}],button:"Calculate"},
  "kw-to-amps-calculator":{fields:[{key:"kw",label:"Power (kW)",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:[{label:"Single phase",value:"single"},{label:"Three phase",value:"three"}]}],button:"Calculate"},
  "amps-to-kw-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"40"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:[{label:"Single phase",value:"single"},{label:"Three phase",value:"three"}]}],button:"Calculate"},
  "kw-to-kwh-calculator":{fields:[{key:"kw",label:"Power (kW)",type:"number",defaultValue:"2"},{key:"hours",label:"Time (hours)",type:"number",defaultValue:"5"}],button:"Calculate"},
  "kwh-to-kw-calculator":{fields:[{key:"kwh",label:"Energy (kWh)",type:"number",defaultValue:"10"},{key:"hours",label:"Time (hours)",type:"number",defaultValue:"5"}],button:"Calculate"},
  "watts-to-kwh-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"},{key:"hours",label:"Time (hours)",type:"number",defaultValue:"5"}],button:"Calculate"},
  "kwh-to-watts-calculator":{fields:[{key:"kwh",label:"Energy (kWh)",type:"number",defaultValue:"5"},{key:"hours",label:"Time (hours)",type:"number",defaultValue:"5"}],button:"Calculate"},
  "mah-to-wh-calculator":{fields:[{key:"mah",label:"Capacity (mAh)",type:"number",defaultValue:"5000"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"3.7"}],button:"Calculate"},
  "wh-to-mah-calculator":{fields:[{key:"wh",label:"Energy (Wh)",type:"number",defaultValue:"18.5"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"3.7"}],button:"Calculate"},
  "battery-life-calculator":{fields:[{key:"capacity",label:"Battery capacity (mAh)",type:"number",defaultValue:"5000"},{key:"load",label:"Average load (mA)",type:"number",defaultValue:"500"},{key:"efficiency",label:"Usable capacity (%)",type:"number",defaultValue:"90"}],button:"Calculate"},
  "battery-capacity-calculator":{fields:[{key:"ah",label:"Capacity (Ah)",type:"number",defaultValue:"100"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"12"}],button:"Calculate"},
  "power-factor-calculator":{fields:[{key:"kw",label:"Real power (kW)",type:"number",defaultValue:"8"},{key:"kva",label:"Apparent power (kVA)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "voltage-drop-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"20"},{key:"length",label:"One-way length (ft)",type:"number",defaultValue:"100"},{key:"volts",label:"System voltage (V)",type:"number",defaultValue:"120"},{key:"awg",label:"Copper wire gauge",type:"select",defaultValue:"12",options:[{label:"18 AWG",value:"18"},{label:"16 AWG",value:"16"},{label:"14 AWG",value:"14"},{label:"12 AWG",value:"12"},{label:"10 AWG",value:"10"},{label:"8 AWG",value:"8"},{label:"6 AWG",value:"6"},{label:"4 AWG",value:"4"},{label:"3 AWG",value:"3"},{label:"2 AWG",value:"2"},{label:"1 AWG",value:"1"},{label:"1/0 AWG",value:"0"}]}],button:"Calculate"},
  "wire-gauge-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"20"},{key:"length",label:"One-way length (ft)",type:"number",defaultValue:"100"},{key:"volts",label:"System voltage (V)",type:"number",defaultValue:"120"},{key:"drop",label:"Maximum voltage drop (%)",type:"number",defaultValue:"3"}],button:"Calculate"},
  "series-resistor-calculator":{fields:[{key:"values",label:"Resistance values (Ω)",type:"input",defaultValue:"100, 220, 330"}],button:"Calculate"},
  "parallel-resistor-calculator":{fields:[{key:"values",label:"Resistance values (Ω)",type:"input",defaultValue:"100, 220, 330"}],button:"Calculate"},
  "capacitor-series-calculator":{fields:[{key:"values",label:"Capacitance values (µF)",type:"input",defaultValue:"10, 22, 47"}],button:"Calculate"},
  "capacitor-parallel-calculator":{fields:[{key:"values",label:"Capacitance values (µF)",type:"input",defaultValue:"10, 22, 47"}],button:"Calculate"},
  "rc-time-constant-calculator":{fields:[{key:"resistance",label:"Resistance (Ω)",type:"number",defaultValue:"10000"},{key:"capacitance",label:"Capacitance (µF)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "transformer-calculator":{fields:[{key:"primaryV",label:"Primary voltage (V)",type:"number",defaultValue:"120"},{key:"secondaryV",label:"Secondary voltage (V)",type:"number",defaultValue:"12"},{key:"primaryA",label:"Primary current (A)",type:"number",defaultValue:"1"}],button:"Calculate"},
  "joules-to-watts-calculator":{fields:[{key:"joules",label:"Energy (J)",type:"number",defaultValue:"1000"},{key:"seconds",label:"Time (seconds)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "watts-to-joules-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"100"},{key:"seconds",label:"Time (seconds)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "lumens-to-watts-calculator":{fields:[{key:"lumens",label:"Light output (lm)",type:"number",defaultValue:"800"},{key:"efficacy",label:"Efficacy (lm/W)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "watts-to-lumens-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"8"},{key:"efficacy",label:"Efficacy (lm/W)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "lux-to-lumens-calculator":{fields:[{key:"lux",label:"Illuminance (lux)",type:"number",defaultValue:"500"},{key:"area",label:"Area (m²)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "gpa-calculator":{fields:[{key:"grades",label:"Grade points",type:"input",defaultValue:"4, 3.3, 3.7, 3"},{key:"credits",label:"Credits",type:"input",defaultValue:"3, 3, 4, 3"}],button:"Calculate"},
  "weighted-gpa-calculator":{fields:[{key:"grades",label:"Base grade points",type:"input",defaultValue:"4, 3.3, 3.7, 3"},{key:"weights",label:"Added course weights",type:"input",defaultValue:"1, 0.5, 1, 0"},{key:"credits",label:"Credits",type:"input",defaultValue:"3, 3, 4, 3"}],button:"Calculate"},
  "high-school-gpa-calculator":{fields:[{key:"grades",label:"Letter grades",type:"input",defaultValue:"A, B+, A-, B"},{key:"credits",label:"Credits",type:"input",defaultValue:"1, 1, 1, 1"}],button:"Calculate"},
  "college-gpa-calculator":{fields:[{key:"grades",label:"Letter grades",type:"input",defaultValue:"A, B+, A-, B"},{key:"credits",label:"Credit hours",type:"input",defaultValue:"3, 3, 4, 3"}],button:"Calculate"},
  "grade-calculator":{fields:[{key:"earned",label:"Points earned",type:"number",defaultValue:"87"},{key:"possible",label:"Points possible",type:"number",defaultValue:"100"}],button:"Calculate"},
  "final-grade-calculator":{fields:[{key:"current",label:"Current course grade (%)",type:"number",defaultValue:"85"},{key:"weight",label:"Final exam weight (%)",type:"number",defaultValue:"20"},{key:"desired",label:"Desired course grade (%)",type:"number",defaultValue:"90"}],button:"Calculate"},
  "weighted-grade-calculator":{fields:[{key:"grades",label:"Category grades (%)",type:"input",defaultValue:"90, 82, 95"},{key:"weights",label:"Category weights (%)",type:"input",defaultValue:"40, 30, 30"}],button:"Calculate"},
  "test-grade-calculator":{fields:[{key:"correct",label:"Correct answers",type:"number",defaultValue:"42"},{key:"total",label:"Total questions",type:"number",defaultValue:"50"}],button:"Calculate"},
  "semester-gpa-calculator":{fields:[{key:"grades",label:"Letter grades",type:"input",defaultValue:"A, B+, A-, B"},{key:"credits",label:"Credits",type:"input",defaultValue:"3, 3, 4, 3"}],button:"Calculate"},
  "cumulative-gpa-calculator":{fields:[{key:"currentGpa",label:"Current cumulative GPA",type:"number",defaultValue:"3.4"},{key:"currentCredits",label:"Completed credits",type:"number",defaultValue:"60"},{key:"semesterGpa",label:"New semester GPA",type:"number",defaultValue:"3.8"},{key:"semesterCredits",label:"New semester credits",type:"number",defaultValue:"15"}],button:"Calculate"},
  "matrix-determinant-calculator":{fields:[{key:"a",label:"a₁₁",type:"number",defaultValue:"1"},{key:"b",label:"a₁₂",type:"number",defaultValue:"2"},{key:"c",label:"a₁₃",type:"number",defaultValue:"3"},{key:"d",label:"a₂₁",type:"number",defaultValue:"0"},{key:"e",label:"a₂₂",type:"number",defaultValue:"1"},{key:"f",label:"a₂₃",type:"number",defaultValue:"4"},{key:"g",label:"a₃₁",type:"number",defaultValue:"5"},{key:"h",label:"a₃₂",type:"number",defaultValue:"6"},{key:"i",label:"a₃₃",type:"number",defaultValue:"0"}],button:"Calculate"},
  "matrix-multiplication-calculator":{fields:[{key:"a",label:"A₁₁",type:"number",defaultValue:"1"},{key:"b",label:"A₁₂",type:"number",defaultValue:"2"},{key:"c",label:"A₂₁",type:"number",defaultValue:"3"},{key:"d",label:"A₂₂",type:"number",defaultValue:"4"},{key:"e",label:"B₁₁",type:"number",defaultValue:"5"},{key:"f",label:"B₁₂",type:"number",defaultValue:"6"},{key:"g",label:"B₂₁",type:"number",defaultValue:"7"},{key:"h",label:"B₂₂",type:"number",defaultValue:"8"}],button:"Calculate"},
  "matrix-inverse-calculator":{fields:[{key:"a",label:"a₁₁",type:"number",defaultValue:"4"},{key:"b",label:"a₁₂",type:"number",defaultValue:"7"},{key:"c",label:"a₂₁",type:"number",defaultValue:"2"},{key:"d",label:"a₂₂",type:"number",defaultValue:"6"}],button:"Calculate"},
  "linear-equation-solver":{fields:[{key:"a",label:"a",type:"number",defaultValue:"2"},{key:"b",label:"b",type:"number",defaultValue:"4"},{key:"c",label:"c",type:"number",defaultValue:"10"}],button:"Calculate"},
  "system-of-equations-solver":{fields:[{key:"a1",label:"a₁",type:"number",defaultValue:"2"},{key:"b1",label:"b₁",type:"number",defaultValue:"1"},{key:"c1",label:"c₁",type:"number",defaultValue:"5"},{key:"a2",label:"a₂",type:"number",defaultValue:"1"},{key:"b2",label:"b₂",type:"number",defaultValue:"-1"},{key:"c2",label:"c₂",type:"number",defaultValue:"1"}],button:"Calculate"},
  "logarithm-calculator":{fields:[{key:"value",label:"Value",type:"number",defaultValue:"100"},{key:"base",label:"Base",type:"number",defaultValue:"10"}],button:"Calculate"},
  "exponent-calculator":{fields:[{key:"base",label:"Base",type:"number",defaultValue:"2"},{key:"exponent",label:"Exponent",type:"number",defaultValue:"10"}],button:"Calculate"},
  "square-root-calculator":{fields:[{key:"value",label:"Value",type:"number",defaultValue:"144"}],button:"Calculate"},
  "cube-root-calculator":{fields:[{key:"value",label:"Value",type:"number",defaultValue:"27"}],button:"Calculate"},
  "factorial-calculator":{fields:[{key:"n",label:"Whole number n",type:"number",defaultValue:"10"}],button:"Calculate"},
};

export function runBatch351400(kind:Batch351400Kind,v:Record<string,string>):ToolResult{

  switch(kind){
    case "watts-to-amps-calculator": { const a=pos(v.watts,"Watts")/pos(v.volts,"Volts"); return R(`${fmt(a)} A`,[["Current",`${fmt(a)} A`]]); }
    case "amps-to-watts-calculator": { const w=pos(v.amps,"Amps")*pos(v.volts,"Volts"); return R(`${fmt(w)} W`,[["Power",`${fmt(w)} W`]]); }
    case "volts-to-watts-calculator": { const w=pos(v.volts,"Volts")*pos(v.amps,"Amps"); return R(`${fmt(w)} W`,[["Power",`${fmt(w)} W`]]); }
    case "watts-to-volts-calculator": { const volts=pos(v.watts,"Watts")/pos(v.amps,"Amps"); return R(`${fmt(volts)} V`,[["Voltage",`${fmt(volts)} V`]]); }
    case "amps-to-volts-calculator": { const volts=pos(v.watts,"Watts")/pos(v.amps,"Amps"); return R(`${fmt(volts)} V`,[["Voltage",`${fmt(volts)} V`]]); }
    case "volts-to-amps-calculator": { const amps=pos(v.watts,"Watts")/pos(v.volts,"Volts"); return R(`${fmt(amps)} A`,[["Current",`${fmt(amps)} A`]]); }
    case "kw-to-amps-calculator": { const kw=pos(v.kw,"kW"),volts=pos(v.volts,"Volts"),pf=powerFactor(v.pf),factor=v.phase==="three"?Math.sqrt(3):1,amps=kw*1000/(volts*pf*factor); return R(`${fmt(amps)} A`,[["Current",`${fmt(amps)} A`],["Phase",v.phase==="three"?"Three phase":"Single phase"]]); }
    case "amps-to-kw-calculator": { const amps=pos(v.amps,"Amps"),volts=pos(v.volts,"Volts"),pf=powerFactor(v.pf),factor=v.phase==="three"?Math.sqrt(3):1,kw=amps*volts*pf*factor/1000; return R(`${fmt(kw)} kW`,[["Real power",`${fmt(kw)} kW`],["Phase",v.phase==="three"?"Three phase":"Single phase"]]); }
    case "kw-to-kwh-calculator": { const e=pos(v.kw,"kW")*pos(v.hours,"Hours"); return R(`${fmt(e)} kWh`,[["Energy",`${fmt(e)} kWh`]]); }
    case "kwh-to-kw-calculator": { const p=pos(v.kwh,"kWh")/pos(v.hours,"Hours"); return R(`${fmt(p)} kW`,[["Average power",`${fmt(p)} kW`]]); }
    case "watts-to-kwh-calculator": { const e=pos(v.watts,"Watts")*pos(v.hours,"Hours")/1000; return R(`${fmt(e)} kWh`,[["Energy",`${fmt(e)} kWh`]]); }
    case "kwh-to-watts-calculator": { const w=pos(v.kwh,"kWh")*1000/pos(v.hours,"Hours"); return R(`${fmt(w)} W`,[["Average power",`${fmt(w)} W`]]); }
    case "mah-to-wh-calculator": { const wh=pos(v.mah,"mAh")/1000*pos(v.volts,"Volts"); return R(`${fmt(wh)} Wh`,[["Energy",`${fmt(wh)} Wh`]]); }
    case "wh-to-mah-calculator": { const mah=pos(v.wh,"Wh")/pos(v.volts,"Volts")*1000; return R(`${fmt(mah)} mAh`,[["Capacity",`${fmt(mah)} mAh`]]); }
    case "battery-life-calculator": { const cap=pos(v.capacity,"Capacity"),load=pos(v.load,"Load"),eff=pct(v.efficiency,"Usable capacity"); if(eff>100)throw new Error("Usable capacity cannot exceed 100%."); const h=cap*(eff/100)/load; return R(`${fmt(h)} hours`,[["Estimated runtime",`${fmt(h)} hours`],["Minutes",`${fmt(h*60)} min`]]); }
    case "battery-capacity-calculator": { const ah=pos(v.ah,"Ah"),volts=pos(v.volts,"Volts"),wh=ah*volts; return R(`${fmt(wh)} Wh`,[["Watt-hours",`${fmt(wh)} Wh`],["Amp-hours",`${fmt(ah)} Ah`],["Milliamp-hours",`${fmt(ah*1000)} mAh`]]); }
    case "power-factor-calculator": { const kw=pos(v.kw,"Real power"),kva=pos(v.kva,"Apparent power"),pf=kw/kva; if(pf>1)throw new Error("Real power cannot exceed apparent power."); return R(fmt(pf,5),[["Power factor",fmt(pf,5)],["Percent",`${fmt(pf*100)}%`]]); }
    case "voltage-drop-calculator": { const amps=pos(v.amps,"Current"),len=pos(v.length,"Length"),volts=pos(v.volts,"Voltage"),r=AWG[v.awg]; if(r===undefined)throw new Error("Choose a valid wire gauge."); const drop=amps*r*(2*len)/1000,p=drop/volts*100; return R(`${fmt(drop)} V`,[["Voltage drop",`${fmt(drop)} V`],["Percent drop",`${fmt(p)}%`],["Estimated load voltage",`${fmt(volts-drop)} V`]]); }
    case "wire-gauge-calculator": { const amps=pos(v.amps,"Current"),len=pos(v.length,"Length"),volts=pos(v.volts,"Voltage"),maxPct=pos(v.drop,"Maximum drop"),allowed=volts*maxPct/100; let selected:string|undefined; for(const gauge of AWG_ORDER){const drop=amps*AWG[gauge]*(2*len)/1000;if(drop<=allowed){selected=gauge;break;}} if(!selected)throw new Error("The required conductor is larger than the gauges included in this estimator."); const actual=amps*AWG[selected]*(2*len)/1000; return R(`${selected==="0"?"1/0":selected} AWG`,[["Estimated minimum gauge",`${selected==="0"?"1/0":selected} AWG`],["Estimated voltage drop",`${fmt(actual)} V`],["Percent drop",`${fmt(actual/volts*100)}%`]]); }
    case "series-resistor-calculator": { const a=list(v.values,"Resistance values"); if(a.some(x=>x<0))throw new Error("Resistance cannot be negative."); const r=a.reduce((x,y)=>x+y,0); return R(`${fmt(r)} Ω`,[["Equivalent resistance",`${fmt(r)} Ω`],["Resistors",String(a.length)]]); }
    case "parallel-resistor-calculator": { const a=list(v.values,"Resistance values"); if(a.some(x=>x<=0))throw new Error("Parallel resistance values must be greater than zero."); const r=1/a.reduce((s,x)=>s+1/x,0); return R(`${fmt(r)} Ω`,[["Equivalent resistance",`${fmt(r)} Ω`],["Resistors",String(a.length)]]); }
    case "capacitor-series-calculator": { const a=list(v.values,"Capacitance values"); if(a.some(x=>x<=0))throw new Error("Capacitance values must be greater than zero."); const c=1/a.reduce((s,x)=>s+1/x,0); return R(`${fmt(c)} µF`,[["Equivalent capacitance",`${fmt(c)} µF`],["Capacitors",String(a.length)]]); }
    case "capacitor-parallel-calculator": { const a=list(v.values,"Capacitance values"); if(a.some(x=>x<0))throw new Error("Capacitance cannot be negative."); const c=a.reduce((x,y)=>x+y,0); return R(`${fmt(c)} µF`,[["Equivalent capacitance",`${fmt(c)} µF`],["Capacitors",String(a.length)]]); }
    case "rc-time-constant-calculator": { const r=pos(v.resistance,"Resistance"),c=pos(v.capacitance,"Capacitance")*1e-6,tau=r*c; return R(`${fmt(tau,6)} s`,[["Time constant (τ)",`${fmt(tau,6)} s`],["Approx. 5τ settling time",`${fmt(tau*5,6)} s`]]); }
    case "transformer-calculator": { const vp=pos(v.primaryV,"Primary voltage"),vs=pos(v.secondaryV,"Secondary voltage"),ip=pos(v.primaryA,"Primary current"),ratio=vp/vs,isec=ip*ratio; return R(`${fmt(ratio)} : 1`,[["Primary-to-secondary turns ratio",`${fmt(ratio)} : 1`],["Ideal secondary current",`${fmt(isec)} A`],["Ideal apparent power",`${fmt(vp*ip)} VA`]]); }
    case "joules-to-watts-calculator": { const w=pos(v.joules,"Joules")/pos(v.seconds,"Seconds"); return R(`${fmt(w)} W`,[["Average power",`${fmt(w)} W`]]); }
    case "watts-to-joules-calculator": { const j=pos(v.watts,"Watts")*pos(v.seconds,"Seconds"); return R(`${fmt(j)} J`,[["Energy",`${fmt(j)} J`]]); }
    case "lumens-to-watts-calculator": { const w=pos(v.lumens,"Lumens")/pos(v.efficacy,"Efficacy"); return R(`${fmt(w)} W`,[["Estimated power",`${fmt(w)} W`]]); }
    case "watts-to-lumens-calculator": { const lm=pos(v.watts,"Watts")*pos(v.efficacy,"Efficacy"); return R(`${fmt(lm)} lm`,[["Estimated luminous flux",`${fmt(lm)} lm`]]); }
    case "lux-to-lumens-calculator": { const lm=pos(v.lux,"Lux")*pos(v.area,"Area"); return R(`${fmt(lm)} lm`,[["Luminous flux",`${fmt(lm)} lm`]]); }
    case "gpa-calculator": { return numericGpa(v.grades,v.credits,"GPA"); }
    case "weighted-gpa-calculator": { const grades=list(v.grades,"Grade points"),weights=list(v.weights,"Weights"),credits=list(v.credits,"Credits"); sameLen(grades,weights,credits); if(credits.some(x=>x<=0))throw new Error("Credits must be greater than zero."); const total=credits.reduce((a,b)=>a+b,0),gpa=grades.reduce((s,g,i)=>s+(g+weights[i])*credits[i],0)/total; return R(fmt(gpa,4),[["Weighted GPA",fmt(gpa,4)],["Total credits",fmt(total)]]); }
    case "high-school-gpa-calculator": { return letterGpa(v.grades,v.credits,"High school GPA"); }
    case "college-gpa-calculator": { return letterGpa(v.grades,v.credits,"College GPA"); }
    case "grade-calculator": { const earned=num(v.earned,"Points earned"),possible=pos(v.possible,"Points possible"); if(earned<0)throw new Error("Points earned cannot be negative."); const p=earned/possible*100; return R(`${fmt(p)}%`,[["Grade",`${fmt(p)}%`],["Points",`${fmt(earned)} / ${fmt(possible)}`]]); }
    case "final-grade-calculator": { const current=num(v.current,"Current grade"),weight=pos(v.weight,"Final weight"),desired=num(v.desired,"Desired grade"); if(weight>100)throw new Error("Final weight cannot exceed 100%."); const w=weight/100,needed=(desired-current*(1-w))/w; return R(`${fmt(needed)}%`,[["Required final exam grade",`${fmt(needed)}%`],["Final exam weight",`${fmt(weight)}%`]]); }
    case "weighted-grade-calculator": { const grades=list(v.grades,"Grades"),weights=list(v.weights,"Weights"); sameLen(grades,weights); const tw=weights.reduce((a,b)=>a+b,0); if(tw<=0)throw new Error("Total weight must be greater than zero."); const result=grades.reduce((s,g,i)=>s+g*weights[i],0)/tw; return R(`${fmt(result)}%`,[["Weighted grade",`${fmt(result)}%`],["Total entered weight",`${fmt(tw)}%`]]); }
    case "test-grade-calculator": { const correct=num(v.correct,"Correct answers"),total=pos(v.total,"Total questions"); if(correct<0||correct>total)throw new Error("Correct answers must be between 0 and the total questions."); const p=correct/total*100; return R(`${fmt(p)}%`,[["Test grade",`${fmt(p)}%`],["Correct",fmt(correct)],["Missed",fmt(total-correct)]]); }
    case "semester-gpa-calculator": { return letterGpa(v.grades,v.credits,"Semester GPA"); }
    case "cumulative-gpa-calculator": { const cg=num(v.currentGpa,"Current GPA"),cc=pos(v.currentCredits,"Completed credits"),sg=num(v.semesterGpa,"Semester GPA"),sc=pos(v.semesterCredits,"Semester credits"),result=(cg*cc+sg*sc)/(cc+sc); return R(fmt(result,4),[["Estimated cumulative GPA",fmt(result,4)],["Total credits",fmt(cc+sc)]]); }
    case "matrix-determinant-calculator": { const a=num(v.a,"a11"),b=num(v.b,"a12"),c=num(v.c,"a13"),d=num(v.d,"a21"),e=num(v.e,"a22"),f=num(v.f,"a23"),g=num(v.g,"a31"),h=num(v.h,"a32"),i=num(v.i,"a33"),det=a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g); return R(fmt(det,8),[["Determinant",fmt(det,8)]]); }
    case "matrix-multiplication-calculator": { const a=num(v.a,"A11"),b=num(v.b,"A12"),c=num(v.c,"A21"),d=num(v.d,"A22"),e=num(v.e,"B11"),f=num(v.f,"B12"),g=num(v.g,"B21"),h=num(v.h,"B22"); const r1=a*e+b*g,r2=a*f+b*h,r3=c*e+d*g,r4=c*f+d*h; return R(`[[${fmt(r1)}, ${fmt(r2)}], [${fmt(r3)}, ${fmt(r4)}]]`,[["Result row 1",`${fmt(r1)}, ${fmt(r2)}`],["Result row 2",`${fmt(r3)}, ${fmt(r4)}`]]); }
    case "matrix-inverse-calculator": { const a=num(v.a,"a11"),b=num(v.b,"a12"),c=num(v.c,"a21"),d=num(v.d,"a22"),det=a*d-b*c; if(Math.abs(det)<1e-12)throw new Error("This matrix is singular and has no inverse."); const vals=[d/det,-b/det,-c/det,a/det]; return R(`[[${fmt(vals[0],8)}, ${fmt(vals[1],8)}], [${fmt(vals[2],8)}, ${fmt(vals[3],8)}]]`,[["Determinant",fmt(det,8)]]); }
    case "linear-equation-solver": { const a=num(v.a,"a"),b=num(v.b,"b"),c=num(v.c,"c"); if(a===0)throw new Error("a cannot be zero for a unique linear solution."); const x=(c-b)/a; return R(`x = ${fmt(x,8)}` ,[["Solution",`x = ${fmt(x,8)}`]]); }
    case "system-of-equations-solver": { const a1=num(v.a1,"a1"),b1=num(v.b1,"b1"),c1=num(v.c1,"c1"),a2=num(v.a2,"a2"),b2=num(v.b2,"b2"),c2=num(v.c2,"c2"),det=a1*b2-a2*b1; if(Math.abs(det)<1e-12)throw new Error("The system does not have one unique solution."); const x=(c1*b2-c2*b1)/det,y=(a1*c2-a2*c1)/det; return R(`x = ${fmt(x,8)}, y = ${fmt(y,8)}`,[["x",fmt(x,8)],["y",fmt(y,8)]]); }
    case "logarithm-calculator": { const x=pos(v.value,"Value"),base=pos(v.base,"Base"); if(base===1)throw new Error("Logarithm base cannot equal 1."); const r=Math.log(x)/Math.log(base); return R(fmt(r,10),[["Logarithm",fmt(r,10)]]); }
    case "exponent-calculator": { const base=num(v.base,"Base"),exp=num(v.exponent,"Exponent"),r=base**exp; if(!Number.isFinite(r))throw new Error("The result is outside the supported numeric range."); return R(fmt(r,10),[["Result",fmt(r,10)]]); }
    case "square-root-calculator": { const x=num(v.value,"Value"); if(x<0)throw new Error("Enter a nonnegative value for a real square root."); const r=Math.sqrt(x); return R(fmt(r,10),[["Square root",fmt(r,10)]]); }
    case "cube-root-calculator": { const r=Math.cbrt(num(v.value,"Value")); return R(fmt(r,10),[["Cube root",fmt(r,10)]]); }
    case "factorial-calculator": { const n=num(v.n,"n"); if(!Number.isInteger(n)||n<0||n>170)throw new Error("Enter a whole number from 0 through 170."); let r=1; for(let i=2;i<=n;i++)r*=i; const out=n<=20?new Intl.NumberFormat(undefined,{maximumFractionDigits:0,useGrouping:false}).format(r):r.toExponential(12); return R(out,[["Factorial",out],["n",String(n)]]); }
    default: throw new Error("This calculator is not configured.");
  }

}

function ResultGrid({items}:{items:ResultItem[]}){return <div className="grid gap-3 sm:grid-cols-2">{items.map((item,i)=><div key={`${item.label}-${i}`} className="rounded-xl border bg-background p-4"><div className="text-sm text-muted-foreground">{item.label}</div><div className="mt-1 break-words text-xl font-semibold">{item.value}</div></div>)}</div>}
export function Batch351400Tool({kind}:{kind:Batch351400Kind}){const config=CONFIG[kind];const initial=useMemo(()=>Object.fromEntries(config.fields.map(f=>[f.key,f.defaultValue||""])),[config]);const[values,setValues]=useState<Record<string,string>>(initial);const[output,setOutput]=useState("");const[summary,setSummary]=useState<ResultItem[]>([]);const[error,setError]=useState("");const[copied,setCopied]=useState(false);const clear=()=>{setOutput("");setSummary([]);setError("");setCopied(false)};const run=()=>{setError("");setCopied(false);try{const r=runBatch351400(kind,values);setOutput(r.output);setSummary(r.summary)}catch(e){setOutput("");setSummary([]);setError(e instanceof Error?e.message:"Unable to calculate.")}};const reset=()=>{setValues(initial);clear()};const copy=async()=>{if(!output)return;try{await navigator.clipboard.writeText(output);setCopied(true);window.setTimeout(()=>setCopied(false),1500)}catch{setError("Unable to copy result.")}};return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2">{config.fields.map(f=><label key={f.key} className="block space-y-2"><span className="text-sm font-medium">{f.label}</span>{f.type==="select"?<select value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));clear()}} className={inputClass}>{(f.options||[]).map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>:<input type={f.type==="input"?"text":"number"} step="any" value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));clear()}} placeholder={f.placeholder} className={inputClass}/>}</label>)}</div>{config.note&&<div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">{config.note}</div>}<div className="flex flex-wrap gap-3"><button type="button" onClick={run} className={buttonClass}>{config.button||"Calculate"}</button><button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button></div>{error&&<div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}{summary.length>0&&<ResultGrid items={summary}/>}{output&&<div className="space-y-2"><div className="flex items-center justify-between gap-3"><span className="text-sm font-medium">Result</span><button type="button" onClick={copy} className={secondaryButtonClass}>{copied?"Copied":"Copy"}</button></div><textarea readOnly value={output} className={textareaClass} aria-label="Result"/></div>}</div>;}
