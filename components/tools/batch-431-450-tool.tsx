"use client";

import { useMemo, useState } from "react";

export type Batch431450Kind =
 | "days-from-today-calculator" | "weeks-from-today-calculator" | "months-from-today-calculator" | "hours-from-now-calculator" | "minutes-from-now-calculator"
 | "week-number-calculator" | "day-of-week-calculator" | "day-of-year-calculator" | "leap-year-calculator" | "business-date-calculator"
 | "time-zone-difference-calculator" | "meeting-time-planner" | "iso-week-date-converter" | "julian-date-converter" | "epoch-milliseconds-converter"
 | "unix-time-to-iso-8601-converter" | "iso-8601-to-unix-time-converter" | "time-zone-offset-converter" | "working-days-from-today-calculator" | "weekend-days-calculator";

type Field={key:string;label:string;type:"number"|"date"|"datetime-local"|"input"|"select";defaultValue:string;options?:{label:string;value:string}[]};
type Result={output:string;items:{label:string;value:string}[]};
const inputClass="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const buttonClass="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondary="rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";
const fmt=(n:number,d=4)=>new Intl.NumberFormat(undefined,{maximumFractionDigits:d}).format(n);
const num=(v:string,l:string)=>{const n=Number(v);if(!Number.isFinite(n))throw new Error(`${l} must be valid.`);return n;};
const parseDate=(v:string,l:string)=>{if(!v)throw new Error(`${l} is required.`);const d=new Date(v.length===10?`${v}T00:00:00`:v);if(Number.isNaN(d.getTime()))throw new Error(`${l} is invalid.`);return d;};
const isoDate=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const isoUtc=(d:Date)=>d.toISOString();
const R=(output:string,pairs:[string,string][]):Result=>({output,items:pairs.map(([label,value])=>({label,value}))});
const todayString=()=>isoDate(new Date());
const localDateTime=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)};
const zones=["UTC","America/New_York","America/Chicago","America/Denver","America/Los_Angeles","Europe/London","Europe/Paris","Asia/Tokyo","Asia/Singapore","Australia/Sydney"];
const zoneOptions=zones.map(z=>({label:z,value:z}));
function zoneParts(date:Date,zone:string){const p=new Intl.DateTimeFormat("en-US",{timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,timeZoneName:"shortOffset"}).formatToParts(date);return Object.fromEntries(p.map(x=>[x.type,x.value])) as Record<string,string>;}
function offsetMinutes(date:Date,zone:string){const p=zoneParts(date,zone);const m=(p.timeZoneName||"GMT").match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);if(!m)return 0;const total=Number(m[2])*60+Number(m[3]||0);return m[1]==="-"?-total:total;}
function formatZone(date:Date,zone:string){return new Intl.DateTimeFormat(undefined,{timeZone:zone,year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(date)+` (${zone})`;}
function isoWeek(date:Date){const d=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()));const day=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-day);const yearStart=new Date(Date.UTC(d.getUTCFullYear(),0,1));const week=Math.ceil((((d.getTime()-yearStart.getTime())/86400000)+1)/7);return {year:d.getUTCFullYear(),week,day};}
function addBusinessDays(start:Date,count:number){const d=new Date(start);const dir=count<0?-1:1;let left=Math.abs(Math.trunc(count));while(left>0){d.setDate(d.getDate()+dir);const day=d.getDay();if(day!==0&&day!==6)left--;}return d;}

function config(kind:Batch431450Kind):Field[]{
 const n=(label:string,def="30"):Field=>({key:"value",label,type:"number",defaultValue:def});
 switch(kind){
 case "days-from-today-calculator":return [n("Days from today","30")];
 case "weeks-from-today-calculator":return [n("Weeks from today","4")];
 case "months-from-today-calculator":return [n("Months from today","3")];
 case "hours-from-now-calculator":return [n("Hours from now","24")];
 case "minutes-from-now-calculator":return [n("Minutes from now","90")];
 case "week-number-calculator":case "day-of-week-calculator":case "day-of-year-calculator":case "iso-week-date-converter":return [{key:"date",label:"Date",type:"date",defaultValue:todayString()}];
 case "leap-year-calculator":return [{key:"year",label:"Year",type:"number",defaultValue:String(new Date().getFullYear())}];
 case "business-date-calculator":return [{key:"date",label:"Starting date",type:"date",defaultValue:todayString()},{key:"days",label:"Business days to add (negative subtracts)",type:"number",defaultValue:"10"}];
 case "time-zone-difference-calculator":return [{key:"from",label:"First time zone",type:"select",defaultValue:"America/New_York",options:zoneOptions},{key:"to",label:"Second time zone",type:"select",defaultValue:"Europe/London",options:zoneOptions}];
 case "meeting-time-planner":return [{key:"datetime",label:"Meeting date and time",type:"datetime-local",defaultValue:localDateTime()},{key:"from",label:"Source time zone",type:"select",defaultValue:"America/New_York",options:zoneOptions},{key:"to",label:"Target time zone",type:"select",defaultValue:"Europe/London",options:zoneOptions}];
 case "julian-date-converter":return [{key:"datetime",label:"UTC / ISO date-time",type:"input",defaultValue:new Date().toISOString()}];
 case "epoch-milliseconds-converter":return [{key:"value",label:"Epoch milliseconds or ISO date-time",type:"input",defaultValue:String(Date.now())}];
 case "unix-time-to-iso-8601-converter":return [{key:"seconds",label:"Unix time (seconds)",type:"number",defaultValue:String(Math.floor(Date.now()/1000))}];
 case "iso-8601-to-unix-time-converter":return [{key:"iso",label:"ISO 8601 date-time",type:"input",defaultValue:new Date().toISOString()}];
 case "time-zone-offset-converter":return [{key:"datetime",label:"Date and time",type:"datetime-local",defaultValue:localDateTime()},{key:"from",label:"Source UTC offset (hours)",type:"number",defaultValue:"-5"},{key:"to",label:"Target UTC offset (hours)",type:"number",defaultValue:"0"}];
 case "working-days-from-today-calculator":return [n("Working days from today","10")];
 case "weekend-days-calculator":return [{key:"start",label:"Start date",type:"date",defaultValue:todayString()},{key:"end",label:"End date",type:"date",defaultValue:isoDate(new Date(Date.now()+30*86400000))}];
 }
}

function run(kind:Batch431450Kind,v:Record<string,string>):Result{
 const now=new Date();
 switch(kind){
 case "days-from-today-calculator":{const d=new Date();d.setDate(d.getDate()+num(v.value,"Days"));return R(isoDate(d),[["Result date",d.toLocaleDateString()],["ISO date",isoDate(d)]]);}
 case "weeks-from-today-calculator":{const d=new Date();d.setDate(d.getDate()+num(v.value,"Weeks")*7);return R(isoDate(d),[["Result date",d.toLocaleDateString()]]);}
 case "months-from-today-calculator":{const d=new Date();d.setMonth(d.getMonth()+num(v.value,"Months"));return R(isoDate(d),[["Result date",d.toLocaleDateString()]]);}
 case "hours-from-now-calculator":{const d=new Date(now.getTime()+num(v.value,"Hours")*3600000);return R(d.toLocaleString(),[["ISO date-time",isoUtc(d)]]);}
 case "minutes-from-now-calculator":{const d=new Date(now.getTime()+num(v.value,"Minutes")*60000);return R(d.toLocaleString(),[["ISO date-time",isoUtc(d)]]);}
 case "week-number-calculator":{const d=parseDate(v.date,"Date"),w=isoWeek(d);return R(`Week ${w.week}`,[["ISO week",`${w.year}-W${String(w.week).padStart(2,"0")}`],["ISO weekday",String(w.day)]]);}
 case "day-of-week-calculator":{const d=parseDate(v.date,"Date");return R(d.toLocaleDateString(undefined,{weekday:"long"}),[["Date",d.toLocaleDateString()]]);}
 case "day-of-year-calculator":{const d=parseDate(v.date,"Date"),start=new Date(d.getFullYear(),0,0),day=Math.floor((d.getTime()-start.getTime())/86400000);return R(`Day ${day}`,[["Day of year",String(day)],["Days in year",String(((d.getFullYear()%4===0&&d.getFullYear()%100!==0)||d.getFullYear()%400===0)?366:365)]]);}
 case "leap-year-calculator":{const y=Math.trunc(num(v.year,"Year")),leap=(y%4===0&&y%100!==0)||y%400===0;return R(leap?"Leap year":"Common year",[["Year",String(y)],["Days",leap?"366":"365"]]);}
 case "business-date-calculator":{const d=addBusinessDays(parseDate(v.date,"Starting date"),num(v.days,"Business days"));return R(isoDate(d),[["Result date",d.toLocaleDateString()]]);}
 case "time-zone-difference-calculator":{const a=offsetMinutes(now,v.from),b=offsetMinutes(now,v.to),diff=(b-a)/60;return R(`${diff>=0?"+":""}${fmt(diff,2)} hours`,[[v.from,`UTC${a>=0?"+":""}${fmt(a/60,2)}`],[v.to,`UTC${b>=0?"+":""}${fmt(b/60,2)}`]]);}
 case "meeting-time-planner":{const local=parseDate(v.datetime,"Meeting time"),parts={y:local.getFullYear(),m:local.getMonth(),d:local.getDate(),h:local.getHours(),min:local.getMinutes()};let guess=new Date(Date.UTC(parts.y,parts.m,parts.d,parts.h,parts.min));for(let i=0;i<2;i++){guess=new Date(guess.getTime()-offsetMinutes(guess,v.from)*60000);}return R(formatZone(guess,v.to),[["Source",formatZone(guess,v.from)],["Target",formatZone(guess,v.to)],["UTC",guess.toISOString()]]);}
 case "iso-week-date-converter":{const d=parseDate(v.date,"Date"),w=isoWeek(d),out=`${w.year}-W${String(w.week).padStart(2,"0")}-${w.day}`;return R(out,[["ISO week date",out]]);}
 case "julian-date-converter":{const d=parseDate(v.datetime,"Date-time"),jd=d.getTime()/86400000+2440587.5;return R(fmt(jd,6),[["Julian Date",fmt(jd,6)],["UTC",d.toISOString()]]);}
 case "epoch-milliseconds-converter":{const raw=v.value.trim();const numeric=/^-?\d+(\.\d+)?$/.test(raw);if(numeric){const ms=Number(raw);if(!Number.isFinite(ms))throw new Error("Invalid epoch milliseconds.");const d=new Date(ms);if(Number.isNaN(d.getTime()))throw new Error("Epoch value is outside the supported date range.");return R(d.toISOString(),[["Epoch milliseconds",String(Math.trunc(ms))],["ISO 8601",d.toISOString()]]);}const d=parseDate(raw,"ISO date-time");return R(String(d.getTime()),[["Epoch milliseconds",String(d.getTime())],["ISO 8601",d.toISOString()]]);}
 case "unix-time-to-iso-8601-converter":{const d=new Date(num(v.seconds,"Unix time")*1000);if(Number.isNaN(d.getTime()))throw new Error("Unix time is outside the supported range.");return R(d.toISOString(),[["ISO 8601",d.toISOString()],["Unix seconds",v.seconds]]);}
 case "iso-8601-to-unix-time-converter":{const d=parseDate(v.iso,"ISO 8601 date-time"),s=Math.floor(d.getTime()/1000);return R(String(s),[["Unix seconds",String(s)],["Epoch milliseconds",String(d.getTime())]]);}
 case "time-zone-offset-converter":{const d=parseDate(v.datetime,"Date-time"),from=num(v.from,"Source offset"),to=num(v.to,"Target offset");if(Math.abs(from)>14||Math.abs(to)>14)throw new Error("UTC offsets should be between -14 and +14 hours.");const utc=d.getTime()-from*3600000,target=new Date(utc+to*3600000);return R(target.toLocaleString(),[["Target clock time",target.toLocaleString()],["UTC instant",new Date(utc).toISOString()]]);}
 case "working-days-from-today-calculator":{const d=addBusinessDays(new Date(),num(v.value,"Working days"));return R(isoDate(d),[["Result date",d.toLocaleDateString()]]);}
 case "weekend-days-calculator":{let a=parseDate(v.start,"Start date"),b=parseDate(v.end,"End date");if(b<a)[a,b]=[b,a];let sats=0,suns=0;const d=new Date(a);while(d<=b){if(d.getDay()===6)sats++;if(d.getDay()===0)suns++;d.setDate(d.getDate()+1);}return R(String(sats+suns),[["Weekend days",String(sats+suns)],["Saturdays",String(sats)],["Sundays",String(suns)]]);}
 }
}

export function Batch431450Tool({kind}:{kind:Batch431450Kind}){
 const fields=useMemo(()=>config(kind),[kind]);const initial=useMemo(()=>Object.fromEntries(fields.map(f=>[f.key,f.defaultValue])),[fields]);const [values,setValues]=useState<Record<string,string>>(initial);const [result,setResult]=useState<Result|null>(null);const [error,setError]=useState("");
 const calculate=()=>{try{setError("");setResult(run(kind,values));}catch(e){setResult(null);setError(e instanceof Error?e.message:"Unable to calculate.");}};const reset=()=>{setValues(initial);setResult(null);setError("");};
 return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2">{fields.map(f=><label key={f.key} className="space-y-2"><span className="text-sm font-medium">{f.label}</span>{f.type==="select"?<select className={inputClass} value={values[f.key]} onChange={e=>setValues({...values,[f.key]:e.target.value})}>{f.options?.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>:<input type={f.type==="input"?"text":f.type} step={f.type==="number"?"any":undefined} className={inputClass} value={values[f.key]} onChange={e=>setValues({...values,[f.key]:e.target.value})}/>}</label>)}</div><div className="flex gap-2"><button type="button" className={buttonClass} onClick={calculate}>Calculate</button><button type="button" className={secondary} onClick={reset}>Reset</button></div>{error&&<div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}{result&&<div className="space-y-3 rounded-xl border bg-muted/20 p-5"><div className="break-words text-2xl font-semibold">{result.output}</div><div className="grid gap-3 sm:grid-cols-2">{result.items.map(x=><div key={x.label} className="rounded-lg border bg-background p-3"><div className="text-xs text-muted-foreground">{x.label}</div><div className="break-words font-medium">{x.value}</div></div>)}</div></div>}</div>;
}
