export type Batch501550Kind =
  | "va-to-watts-calculator"
  | "watts-to-va-calculator"
  | "kva-to-amps-calculator"
  | "amps-to-kva-calculator"
  | "kva-to-watts-calculator"
  | "watts-to-kva-calculator"
  | "kva-to-kw-calculator"
  | "kw-to-kva-calculator"
  | "volts-to-kw-calculator"
  | "kw-to-volts-calculator"
  | "ohms-to-amps-calculator"
  | "amps-to-ohms-calculator"
  | "volts-to-ohms-calculator"
  | "ohms-to-volts-calculator"
  | "watts-to-ohms-calculator"
  | "ohms-to-watts-calculator"
  | "ah-to-wh-calculator"
  | "wh-to-ah-calculator"
  | "amp-hour-calculator"
  | "battery-runtime-calculator"
  | "kwh-cost-calculator"
  | "electricity-cost-calculator"
  | "appliance-energy-cost-calculator"
  | "power-consumption-calculator"
  | "generator-size-calculator"
  | "generator-wattage-calculator"
  | "generator-fuel-consumption-calculator"
  | "extension-cord-gauge-calculator"
  | "cable-size-calculator"
  | "dc-wire-size-calculator"
  | "ac-wire-size-calculator"
  | "12v-wire-size-calculator"
  | "24v-wire-size-calculator"
  | "48v-wire-size-calculator"
  | "wire-resistance-calculator"
  | "breaker-size-calculator"
  | "fuse-size-calculator"
  | "transformer-sizing-calculator"
  | "current-transformer-calculator"
  | "transformer-turns-ratio-calculator"
  | "motor-full-load-amps-calculator"
  | "motor-horsepower-to-amps-calculator"
  | "horsepower-to-watts-calculator"
  | "watts-to-horsepower-calculator"
  | "ac-power-calculator"
  | "dc-power-calculator"
  | "three-phase-power-calculator"
  | "single-phase-power-calculator"
  | "reactive-power-calculator"
  | "apparent-power-calculator";

export type Batch501550Field = {
  key: string;
  label: string;
  type?: "number" | "input" | "select";
  defaultValue?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export type Batch501550Config = {
  fields: Batch501550Field[];
  button?: string;
  note?: string;
};

export type Batch501550ResultItem = { label: string; value: string; note?: string };
export type Batch501550Result = { output: string; summary: Batch501550ResultItem[] };

const num=(x:string,l:string)=>{const n=Number(x);if(!Number.isFinite(n))throw new Error(`${l} must be a valid number.`);return n;};
const pos=(x:string,l:string)=>{const n=num(x,l);if(n<=0)throw new Error(`${l} must be greater than zero.`);return n;};
const nonneg=(x:string,l:string)=>{const n=num(x,l);if(n<0)throw new Error(`${l} cannot be negative.`);return n;};
const pf=(x:string)=>{const n=pos(x,"Power factor");if(n>1)throw new Error("Power factor must be between 0 and 1.");return n;};
const fmt=(n:number,d=4)=>new Intl.NumberFormat(undefined,{maximumFractionDigits:d}).format(n);
const R=(output:string,pairs:[string,string][]):Batch501550Result=>({output,summary:pairs.map(([label,value])=>({label,value}))});
const phaseFactor=(phase:string)=>phase==="three"?Math.sqrt(3):1;
const phaseOptions=[{label:"Single phase",value:"single"},{label:"Three phase",value:"three"}];
const materialOptions=[{label:"Copper",value:"copper"},{label:"Aluminum",value:"aluminum"}];
const rho=(material:string)=>material==="aluminum"?0.0282:0.0175; // ohm mm² / m
const ftToM=(ft:number)=>ft*0.3048;
const standardRatings=[1,2,3,4,5,6,7.5,10,12,15,20,25,30,35,40,45,50,60,70,80,90,100,110,125,150,175,200,225,250,300,350,400,450,500,600];
const nextRating=(amps:number)=>standardRatings.find(x=>x>=amps)??Math.ceil(amps/50)*50;
const awgResistance:Record<string,number>={"18":6.385,"16":4.016,"14":2.525,"12":1.588,"10":0.999,"8":0.6282,"6":0.3951,"4":0.2485,"3":0.197,"2":0.1563,"1":0.1239,"0":0.0983,"00":0.0779,"000":0.0618,"0000":0.049};
const awgOrder=["18","16","14","12","10","8","6","4","3","2","1","0","00","000","0000"];
const awgLabel=(g:string)=>g==="0"?"1/0 AWG":g==="00"?"2/0 AWG":g==="000"?"3/0 AWG":g==="0000"?"4/0 AWG":`${g} AWG`;
function chooseAwg(amps:number,lengthFt:number,volts:number,dropPct:number){
  const allowed=volts*dropPct/100;
  for(const g of awgOrder){
    const vd=amps*(awgResistance[g]/1000)*(2*lengthFt);
    if(vd<=allowed)return {g,vd,pct:vd/volts*100};
  }
  const g="0000";const vd=amps*(awgResistance[g]/1000)*(2*lengthFt);
  return {g,vd,pct:vd/volts*100};
}
function conductorAreaMm2(amps:number,lengthFt:number,volts:number,dropPct:number,material:string){
  const allowed=volts*dropPct/100;
  return (2*rho(material)*ftToM(lengthFt)*amps)/allowed;
}
function listNumbers(text:string,label:string){
  const a=text.split(/[,\n]/).map(x=>x.trim()).filter(Boolean).map(Number);
  if(!a.length||a.some(x=>!Number.isFinite(x)))throw new Error(`${label} must contain valid comma-separated numbers.`);
  return a;
}
function safeNote(){return "Planning estimate only — verify ampacity, protection, equipment ratings, installation conditions, and applicable electrical codes.";}
function kwFromAc(volts:number,amps:number,powerFactor:number,phase:string){return phaseFactor(phase)*volts*amps*powerFactor/1000;}
function ampsFromKva(kva:number,volts:number,phase:string){return kva*1000/(phaseFactor(phase)*volts);}
function wireConfig(voltage?:string):Batch501550Config{
  const fields:Batch501550Field[]=[
    {key:"amps",label:"Current (A)",type:"number",defaultValue:"20"},
    {key:"length",label:"One-way run length (ft)",type:"number",defaultValue:"25"},
  ];
  if(!voltage){fields.push({key:"volts",label:"System voltage (V)",type:"number",defaultValue:"12"});}
  fields.push({key:"drop",label:"Maximum voltage drop (%)",type:"number",defaultValue:"3"});
  return {fields,button:"Estimate wire size",note:safeNote()};
}

export const BATCH501550_CONFIG:Record<Batch501550Kind,Batch501550Config> = {
  "va-to-watts-calculator":{fields:[{key:"va",label:"Apparent power (VA)",type:"number",defaultValue:"1000"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "watts-to-va-calculator":{fields:[{key:"watts",label:"Real power (W)",type:"number",defaultValue:"900"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "kva-to-amps-calculator":{fields:[{key:"kva",label:"Apparent power (kVA)",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:phaseOptions}]},
  "amps-to-kva-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"40"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:phaseOptions}]},
  "kva-to-watts-calculator":{fields:[{key:"kva",label:"Apparent power (kVA)",type:"number",defaultValue:"10"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "watts-to-kva-calculator":{fields:[{key:"watts",label:"Real power (W)",type:"number",defaultValue:"9000"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "kva-to-kw-calculator":{fields:[{key:"kva",label:"Apparent power (kVA)",type:"number",defaultValue:"10"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "kw-to-kva-calculator":{fields:[{key:"kw",label:"Real power (kW)",type:"number",defaultValue:"9"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "volts-to-kw-calculator":{fields:[{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"40"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:phaseOptions}]},
  "kw-to-volts-calculator":{fields:[{key:"kw",label:"Power (kW)",type:"number",defaultValue:"8.64"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"40"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:phaseOptions}]},
  "ohms-to-amps-calculator":{fields:[{key:"ohms",label:"Resistance (Ω)",type:"number",defaultValue:"12"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"}]},
  "amps-to-ohms-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"}]},
  "volts-to-ohms-calculator":{fields:[{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"}]},
  "ohms-to-volts-calculator":{fields:[{key:"ohms",label:"Resistance (Ω)",type:"number",defaultValue:"12"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"}]},
  "watts-to-ohms-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1200"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"}]},
  "ohms-to-watts-calculator":{fields:[{key:"ohms",label:"Resistance (Ω)",type:"number",defaultValue:"12"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"}]},
  "ah-to-wh-calculator":{fields:[{key:"ah",label:"Capacity (Ah)",type:"number",defaultValue:"100"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"12"}]},
  "wh-to-ah-calculator":{fields:[{key:"wh",label:"Energy (Wh)",type:"number",defaultValue:"1200"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"12"}]},
  "amp-hour-calculator":{fields:[{key:"amps",label:"Average current (A)",type:"number",defaultValue:"5"},{key:"hours",label:"Runtime (hours)",type:"number",defaultValue:"10"}]},
  "battery-runtime-calculator":{fields:[{key:"ah",label:"Battery capacity (Ah)",type:"number",defaultValue:"100"},{key:"amps",label:"Average load (A)",type:"number",defaultValue:"10"},{key:"usable",label:"Usable capacity (%)",type:"number",defaultValue:"80"}]},
  "kwh-cost-calculator":{fields:[{key:"kwh",label:"Energy used (kWh)",type:"number",defaultValue:"100"},{key:"rate",label:"Electricity rate ($/kWh)",type:"number",defaultValue:"0.15"}]},
  "electricity-cost-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"},{key:"hours",label:"Hours per day",type:"number",defaultValue:"5"},{key:"days",label:"Days",type:"number",defaultValue:"30"},{key:"rate",label:"Electricity rate ($/kWh)",type:"number",defaultValue:"0.15"}]},
  "appliance-energy-cost-calculator":{fields:[{key:"watts",label:"Appliance power (W)",type:"number",defaultValue:"1500"},{key:"hours",label:"Hours per day",type:"number",defaultValue:"2"},{key:"days",label:"Days",type:"number",defaultValue:"30"},{key:"rate",label:"Electricity rate ($/kWh)",type:"number",defaultValue:"0.15"}]},
  "power-consumption-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"500"},{key:"hours",label:"Runtime (hours)",type:"number",defaultValue:"8"}]},
  "generator-size-calculator":{fields:[{key:"running",label:"Total running watts",type:"number",defaultValue:"4000"},{key:"surge",label:"Largest additional starting surge (W)",type:"number",defaultValue:"1500"},{key:"margin",label:"Reserve margin (%)",type:"number",defaultValue:"20"}],note:safeNote()},
  "generator-wattage-calculator":{fields:[{key:"running",label:"Appliance running watts (comma separated)",type:"input",defaultValue:"700, 1200, 500"},{key:"starting",label:"Appliance starting watts (comma separated)",type:"input",defaultValue:"2200, 1200, 700"}],note:"Enter matching running and starting watt values for each appliance. Starting watts should include the appliance's total starting draw."},
  "generator-fuel-consumption-calculator":{fields:[{key:"kw",label:"Electrical output (kW)",type:"number",defaultValue:"5"},{key:"eff",label:"Overall efficiency (%)",type:"number",defaultValue:"25"},{key:"fuel",label:"Fuel energy (kWh per gallon)",type:"number",defaultValue:"33.7"}],note:"This is an energy-balance estimate. Actual generator fuel consumption varies substantially by engine, load, fuel, altitude, temperature, and manufacturer."},
  "extension-cord-gauge-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"length",label:"One-way cord length (ft)",type:"number",defaultValue:"100"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"120"},{key:"drop",label:"Maximum voltage drop (%)",type:"number",defaultValue:"3"}],note:safeNote()},
  "cable-size-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"30"},{key:"length",label:"One-way length (ft)",type:"number",defaultValue:"100"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"drop",label:"Maximum voltage drop (%)",type:"number",defaultValue:"3"},{key:"material",label:"Conductor material",type:"select",defaultValue:"copper",options:materialOptions}],note:safeNote()},
  "dc-wire-size-calculator":wireConfig(),
  "ac-wire-size-calculator":wireConfig(),
  "12v-wire-size-calculator":wireConfig("12"),
  "24v-wire-size-calculator":wireConfig("24"),
  "48v-wire-size-calculator":wireConfig("48"),
  "wire-resistance-calculator":{fields:[{key:"length",label:"Conductor length (m)",type:"number",defaultValue:"100"},{key:"area",label:"Cross-sectional area (mm²)",type:"number",defaultValue:"2.5"},{key:"material",label:"Conductor material",type:"select",defaultValue:"copper",options:materialOptions}]},
  "breaker-size-calculator":{fields:[{key:"amps",label:"Calculated load current (A)",type:"number",defaultValue:"16"},{key:"multiplier",label:"Sizing multiplier (%)",type:"number",defaultValue:"125"}],note:safeNote()},
  "fuse-size-calculator":{fields:[{key:"amps",label:"Normal load current (A)",type:"number",defaultValue:"8"},{key:"margin",label:"Sizing margin (%)",type:"number",defaultValue:"25"}],note:safeNote()},
  "transformer-sizing-calculator":{fields:[{key:"volts",label:"Secondary voltage (V)",type:"number",defaultValue:"120"},{key:"amps",label:"Load current (A)",type:"number",defaultValue:"20"},{key:"margin",label:"Reserve margin (%)",type:"number",defaultValue:"25"}],note:safeNote()},
  "current-transformer-calculator":{fields:[{key:"primaryRated",label:"CT primary rating (A)",type:"number",defaultValue:"200"},{key:"secondaryRated",label:"CT secondary rating (A)",type:"number",defaultValue:"5"},{key:"primaryActual",label:"Actual primary current (A)",type:"number",defaultValue:"120"}]},
  "transformer-turns-ratio-calculator":{fields:[{key:"vp",label:"Primary voltage (V)",type:"number",defaultValue:"240"},{key:"vs",label:"Secondary voltage (V)",type:"number",defaultValue:"120"},{key:"np",label:"Primary turns",type:"number",defaultValue:"1000"}]},
  "motor-full-load-amps-calculator":{fields:[{key:"hp",label:"Motor horsepower",type:"number",defaultValue:"5"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"230"},{key:"eff",label:"Efficiency (%)",type:"number",defaultValue:"90"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.85"},{key:"phase",label:"AC phase",type:"select",defaultValue:"three",options:phaseOptions}],note:"Calculated current is an estimate from power equations, not a replacement for motor nameplate current or code tables."},
  "motor-horsepower-to-amps-calculator":{fields:[{key:"hp",label:"Motor horsepower",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"460"},{key:"eff",label:"Efficiency (%)",type:"number",defaultValue:"90"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.85"},{key:"phase",label:"AC phase",type:"select",defaultValue:"three",options:phaseOptions}],note:"Calculated current is an estimate from power equations. Use motor nameplate data and applicable code tables for equipment sizing."},
  "horsepower-to-watts-calculator":{fields:[{key:"hp",label:"Mechanical horsepower",type:"number",defaultValue:"1"}]},
  "watts-to-horsepower-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"745.7"}]},
  "ac-power-calculator":{fields:[{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"20"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:phaseOptions}]},
  "dc-power-calculator":{fields:[{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"12"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"}]},
  "three-phase-power-calculator":{fields:[{key:"volts",label:"Line voltage (V)",type:"number",defaultValue:"400"},{key:"amps",label:"Line current (A)",type:"number",defaultValue:"20"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "single-phase-power-calculator":{fields:[{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"amps",label:"Current (A)",type:"number",defaultValue:"20"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}]},
  "reactive-power-calculator":{fields:[{key:"kw",label:"Real power (kW)",type:"number",defaultValue:"10"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.8"}]},
  "apparent-power-calculator":{fields:[{key:"kw",label:"Real power (kW)",type:"number",defaultValue:"8"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.8"}]}
};

export function runBatch501550(kind:Batch501550Kind,v:Record<string,string>):Batch501550Result {
  switch(kind) {
    case "va-to-watts-calculator": {const w=pos(v.va,"VA")*pf(v.pf);return R(`${fmt(w)} W`,[["Real power",`${fmt(w)} W`]]);}
    case "watts-to-va-calculator": {const va=pos(v.watts,"Watts")/pf(v.pf);return R(`${fmt(va)} VA`,[["Apparent power",`${fmt(va)} VA`]]);}
    case "kva-to-amps-calculator": {const a=ampsFromKva(pos(v.kva,"kVA"),pos(v.volts,"Voltage"),v.phase);return R(`${fmt(a)} A`,[["Current",`${fmt(a)} A`],["Phase",v.phase==="three"?"Three phase":"Single phase"]]);}
    case "amps-to-kva-calculator": {const kva=phaseFactor(v.phase)*pos(v.volts,"Voltage")*pos(v.amps,"Current")/1000;return R(`${fmt(kva)} kVA`,[["Apparent power",`${fmt(kva)} kVA`]]);}
    case "kva-to-watts-calculator": {const w=pos(v.kva,"kVA")*1000*pf(v.pf);return R(`${fmt(w)} W`,[["Real power",`${fmt(w)} W`]]);}
    case "watts-to-kva-calculator": {const kva=pos(v.watts,"Watts")/(1000*pf(v.pf));return R(`${fmt(kva)} kVA`,[["Apparent power",`${fmt(kva)} kVA`]]);}
    case "kva-to-kw-calculator": {const kw=pos(v.kva,"kVA")*pf(v.pf);return R(`${fmt(kw)} kW`,[["Real power",`${fmt(kw)} kW`]]);}
    case "kw-to-kva-calculator": {const kva=pos(v.kw,"kW")/pf(v.pf);return R(`${fmt(kva)} kVA`,[["Apparent power",`${fmt(kva)} kVA`]]);}
    case "volts-to-kw-calculator": {const kw=kwFromAc(pos(v.volts,"Voltage"),pos(v.amps,"Current"),pf(v.pf),v.phase);return R(`${fmt(kw)} kW`,[["Real power",`${fmt(kw)} kW`]]);}
    case "kw-to-volts-calculator": {const volts=pos(v.kw,"kW")*1000/(phaseFactor(v.phase)*pos(v.amps,"Current")*pf(v.pf));return R(`${fmt(volts)} V`,[["Voltage",`${fmt(volts)} V`]]);}
    case "ohms-to-amps-calculator": {const a=pos(v.volts,"Voltage")/pos(v.ohms,"Resistance");return R(`${fmt(a)} A`,[["Current",`${fmt(a)} A`]]);}
    case "amps-to-ohms-calculator": {const r=pos(v.volts,"Voltage")/pos(v.amps,"Current");return R(`${fmt(r)} Ω`,[["Resistance",`${fmt(r)} Ω`]]);}
    case "volts-to-ohms-calculator": {const r=pos(v.volts,"Voltage")/pos(v.amps,"Current");return R(`${fmt(r)} Ω`,[["Resistance",`${fmt(r)} Ω`]]);}
    case "ohms-to-volts-calculator": {const volts=pos(v.ohms,"Resistance")*pos(v.amps,"Current");return R(`${fmt(volts)} V`,[["Voltage",`${fmt(volts)} V`]]);}
    case "watts-to-ohms-calculator": {const volts=pos(v.volts,"Voltage"),r=volts*volts/pos(v.watts,"Power");return R(`${fmt(r)} Ω`,[["Resistance",`${fmt(r)} Ω`]]);}
    case "ohms-to-watts-calculator": {const volts=pos(v.volts,"Voltage"),w=volts*volts/pos(v.ohms,"Resistance");return R(`${fmt(w)} W`,[["Power",`${fmt(w)} W`]]);}
    case "ah-to-wh-calculator": {const wh=pos(v.ah,"Amp-hours")*pos(v.volts,"Voltage");return R(`${fmt(wh)} Wh`,[["Energy",`${fmt(wh)} Wh`]]);}
    case "wh-to-ah-calculator": {const ah=pos(v.wh,"Watt-hours")/pos(v.volts,"Voltage");return R(`${fmt(ah)} Ah`,[["Capacity",`${fmt(ah)} Ah`]]);}
    case "amp-hour-calculator": {const ah=pos(v.amps,"Current")*pos(v.hours,"Runtime");return R(`${fmt(ah)} Ah`,[["Required capacity",`${fmt(ah)} Ah`]]);}
    case "battery-runtime-calculator": {const usable=pos(v.usable,"Usable capacity");if(usable>100)throw new Error("Usable capacity cannot exceed 100%.");const h=pos(v.ah,"Capacity")*(usable/100)/pos(v.amps,"Load");return R(`${fmt(h)} hours`,[["Estimated runtime",`${fmt(h)} hours`],["Usable capacity",`${fmt(usable)}%`]]);}
    case "kwh-cost-calculator": {const cost=nonneg(v.kwh,"Energy")*nonneg(v.rate,"Rate");return R(`$${fmt(cost,2)}`,[["Estimated cost",`$${fmt(cost,2)}`]]);}
    case "electricity-cost-calculator":
    case "appliance-energy-cost-calculator": {const kwh=pos(v.watts,"Power")*nonneg(v.hours,"Hours")*pos(v.days,"Days")/1000,cost=kwh*nonneg(v.rate,"Rate");return R(`$${fmt(cost,2)}`,[["Energy",`${fmt(kwh)} kWh`],["Estimated cost",`$${fmt(cost,2)}`]]);}
    case "power-consumption-calculator": {const wh=pos(v.watts,"Power")*nonneg(v.hours,"Runtime"),kwh=wh/1000;return R(`${fmt(kwh)} kWh`,[["Energy",`${fmt(kwh)} kWh`],["Watt-hours",`${fmt(wh)} Wh`]]);}
    case "generator-size-calculator": {const peak=pos(v.running,"Running watts")+nonneg(v.surge,"Starting surge"),req=peak*(1+nonneg(v.margin,"Margin")/100);return R(`${fmt(req,0)} W`,[["Peak load before margin",`${fmt(peak,0)} W`],["Estimated generator capacity",`${fmt(req,0)} W`]]);}
    case "generator-wattage-calculator": {const running=listNumbers(v.running,"Running watts"),starting=listNumbers(v.starting,"Starting watts");if(running.length!==starting.length)throw new Error("Running and starting watt lists must have the same number of values.");if(running.some(x=>x<0)||starting.some(x=>x<0))throw new Error("Watt values cannot be negative.");const total=running.reduce((a,b)=>a+b,0),extra=Math.max(0,...starting.map((x,i)=>Math.max(0,x-running[i]))),peak=total+extra;return R(`${fmt(peak,0)} W`,[["Total running load",`${fmt(total,0)} W`],["Largest additional starting surge",`${fmt(extra,0)} W`],["Estimated peak wattage",`${fmt(peak,0)} W`]]);}
    case "generator-fuel-consumption-calculator": {const eff=pos(v.eff,"Efficiency");if(eff>100)throw new Error("Efficiency cannot exceed 100%.");const gph=pos(v.kw,"Output")/(eff/100)/pos(v.fuel,"Fuel energy");return R(`${fmt(gph)} gal/hour`,[["Estimated fuel use",`${fmt(gph)} gal/hour`]]);}
    case "extension-cord-gauge-calculator": {const r=chooseAwg(pos(v.amps,"Current"),pos(v.length,"Length"),pos(v.volts,"Voltage"),pos(v.drop,"Voltage drop"));return R(awgLabel(r.g),[["Estimated gauge",awgLabel(r.g)],["Estimated voltage drop",`${fmt(r.vd)} V (${fmt(r.pct)}%)`],["Important",safeNote()]]);}
    case "cable-size-calculator": {const area=conductorAreaMm2(pos(v.amps,"Current"),pos(v.length,"Length"),pos(v.volts,"Voltage"),pos(v.drop,"Voltage drop"),v.material);return R(`${fmt(area)} mm²`,[["Minimum area by voltage-drop math",`${fmt(area)} mm²`],["Material",v.material==="aluminum"?"Aluminum":"Copper"],["Important",safeNote()]]);}
    case "dc-wire-size-calculator":
    case "ac-wire-size-calculator":
    case "12v-wire-size-calculator":
    case "24v-wire-size-calculator":
    case "48v-wire-size-calculator": {
      const volts=kind.startsWith("12v-")?12:kind.startsWith("24v-")?24:kind.startsWith("48v-")?48:pos(v.volts,"Voltage");
      const r=chooseAwg(pos(v.amps,"Current"),pos(v.length,"Length"),volts,pos(v.drop,"Voltage drop"));
      return R(awgLabel(r.g),[["Estimated copper gauge",awgLabel(r.g)],["Estimated voltage drop",`${fmt(r.vd)} V (${fmt(r.pct)}%)`],["Important",safeNote()]]);
    }
    case "wire-resistance-calculator": {const r=rho(v.material)*pos(v.length,"Length")/pos(v.area,"Area");return R(`${fmt(r,6)} Ω`,[["Resistance",`${fmt(r,6)} Ω`],["Material",v.material==="aluminum"?"Aluminum":"Copper"]]);}
    case "breaker-size-calculator": {const raw=pos(v.amps,"Load current")*pos(v.multiplier,"Multiplier")/100,r=nextRating(raw);return R(`${fmt(r,2)} A`,[["Calculated minimum",`${fmt(raw)} A`],["Next listed planning size",`${fmt(r,2)} A`],["Important",safeNote()]]);}
    case "fuse-size-calculator": {const raw=pos(v.amps,"Load current")*(1+nonneg(v.margin,"Margin")/100),r=nextRating(raw);return R(`${fmt(r,2)} A`,[["Calculated target",`${fmt(raw)} A`],["Next listed planning size",`${fmt(r,2)} A`],["Important",safeNote()]]);}
    case "transformer-sizing-calculator": {const base=pos(v.volts,"Voltage")*pos(v.amps,"Current"),va=base*(1+nonneg(v.margin,"Margin")/100);return R(`${fmt(va)} VA`,[["Load VA",`${fmt(base)} VA`],["Estimated transformer size",`${fmt(va)} VA (${fmt(va/1000)} kVA)`],["Important",safeNote()]]);}
    case "current-transformer-calculator": {const pr=pos(v.primaryRated,"Primary rating"),sr=pos(v.secondaryRated,"Secondary rating"),pa=nonneg(v.primaryActual,"Actual primary current"),ratio=pr/sr,sec=pa/ratio;return R(`${fmt(pr)}:${fmt(sr)}`,[["CT ratio",`${fmt(pr)}:${fmt(sr)} (${fmt(ratio)}:1)`],["Expected secondary current",`${fmt(sec)} A`]]);}
    case "transformer-turns-ratio-calculator": {const vp=pos(v.vp,"Primary voltage"),vs=pos(v.vs,"Secondary voltage"),np=pos(v.np,"Primary turns"),ratio=vp/vs,ns=np/ratio;return R(`${fmt(ratio)}:1`,[["Primary-to-secondary ratio",`${fmt(ratio)}:1`],["Estimated secondary turns",fmt(ns)]]);}
    case "motor-full-load-amps-calculator":
    case "motor-horsepower-to-amps-calculator": {const eff=pos(v.eff,"Efficiency");if(eff>100)throw new Error("Efficiency cannot exceed 100%.");const a=pos(v.hp,"Horsepower")*745.7/(phaseFactor(v.phase)*pos(v.volts,"Voltage")*(eff/100)*pf(v.pf));return R(`${fmt(a)} A`,[["Estimated current",`${fmt(a)} A`],["Important","Use motor nameplate current and applicable code tables for equipment sizing."]]);}
    case "horsepower-to-watts-calculator": {const w=nonneg(v.hp,"Horsepower")*745.7;return R(`${fmt(w)} W`,[["Power",`${fmt(w)} W`]]);}
    case "watts-to-horsepower-calculator": {const hp=nonneg(v.watts,"Watts")/745.7;return R(`${fmt(hp)} hp`,[["Mechanical horsepower",`${fmt(hp)} hp`]]);}
    case "ac-power-calculator": {const kw=kwFromAc(pos(v.volts,"Voltage"),pos(v.amps,"Current"),pf(v.pf),v.phase);return R(`${fmt(kw)} kW`,[["Real power",`${fmt(kw)} kW`],["Watts",`${fmt(kw*1000)} W`]]);}
    case "dc-power-calculator": {const w=pos(v.volts,"Voltage")*pos(v.amps,"Current");return R(`${fmt(w)} W`,[["DC power",`${fmt(w)} W`]]);}
    case "three-phase-power-calculator": {const kw=Math.sqrt(3)*pos(v.volts,"Voltage")*pos(v.amps,"Current")*pf(v.pf)/1000;return R(`${fmt(kw)} kW`,[["Three-phase real power",`${fmt(kw)} kW`]]);}
    case "single-phase-power-calculator": {const kw=pos(v.volts,"Voltage")*pos(v.amps,"Current")*pf(v.pf)/1000;return R(`${fmt(kw)} kW`,[["Single-phase real power",`${fmt(kw)} kW`]]);}
    case "reactive-power-calculator": {const p=pos(v.kw,"Real power"),factor=pf(v.pf),q=p*Math.tan(Math.acos(factor));return R(`${fmt(q)} kVAR`,[["Reactive power",`${fmt(q)} kVAR`],["Real power",`${fmt(p)} kW`]]);}
    case "apparent-power-calculator": {const kva=pos(v.kw,"Real power")/pf(v.pf);return R(`${fmt(kva)} kVA`,[["Apparent power",`${fmt(kva)} kVA`]]);}
    default: throw new Error("This calculator is not configured.");
  }
}
