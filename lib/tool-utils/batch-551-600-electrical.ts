export type Batch551600Kind =
  | "ac-amps-to-watts-calculator"
  | "dc-amps-to-watts-calculator"
  | "single-phase-amps-to-watts-calculator"
  | "three-phase-amps-to-watts-calculator"
  | "12v-amps-to-watts-calculator"
  | "24v-amps-to-watts-calculator"
  | "48v-amps-to-watts-calculator"
  | "120v-amps-to-watts-calculator"
  | "230v-amps-to-watts-calculator"
  | "240v-amps-to-watts-calculator"
  | "12v-watts-to-amps-calculator"
  | "24v-watts-to-amps-calculator"
  | "48v-watts-to-amps-calculator"
  | "120v-watts-to-amps-calculator"
  | "230v-watts-to-amps-calculator"
  | "240v-watts-to-amps-calculator"
  | "watts-to-kwh-per-day-calculator"
  | "monthly-electricity-usage-calculator"
  | "annual-electricity-cost-calculator"
  | "energy-cost-per-hour-calculator"
  | "solar-panel-output-calculator"
  | "solar-panel-size-calculator"
  | "solar-battery-size-calculator"
  | "solar-battery-runtime-calculator"
  | "solar-charge-time-calculator"
  | "inverter-size-calculator"
  | "inverter-battery-runtime-calculator"
  | "battery-charging-time-calculator"
  | "battery-c-rate-calculator"
  | "battery-energy-density-calculator"
  | "capacitor-energy-calculator"
  | "capacitor-charge-calculator"
  | "capacitive-reactance-calculator"
  | "inductive-reactance-calculator"
  | "resonant-frequency-calculator"
  | "rl-time-constant-calculator"
  | "series-rlc-impedance-calculator"
  | "parallel-rlc-impedance-calculator"
  | "impedance-triangle-calculator"
  | "phase-angle-calculator"
  | "frequency-to-period-calculator"
  | "period-to-frequency-calculator"
  | "wavelength-calculator"
  | "dbm-to-watts-calculator"
  | "watts-to-dbm-calculator"
  | "dbw-to-watts-calculator"
  | "watts-to-dbw-calculator"
  | "rms-voltage-calculator"
  | "peak-voltage-calculator"
  | "peak-to-peak-voltage-calculator";

export type Batch551600Field = {
  key: string;
  label: string;
  type?: "number" | "input" | "select";
  defaultValue?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export type Batch551600Config = {
  fields: Batch551600Field[];
  button?: string;
  note?: string;
};

export type Batch551600ResultItem = { label: string; value: string; note?: string };
export type Batch551600Result = { output: string; summary: Batch551600ResultItem[] };

const num=(x:string,l:string)=>{const n=Number(x);if(!Number.isFinite(n))throw new Error(`${l} must be a valid number.`);return n;};
const pos=(x:string,l:string)=>{const n=num(x,l);if(n<=0)throw new Error(`${l} must be greater than zero.`);return n;};
const nonneg=(x:string,l:string)=>{const n=num(x,l);if(n<0)throw new Error(`${l} cannot be negative.`);return n;};
const pct=(x:string,l:string,allowZero=false)=>{const n=allowZero?nonneg(x,l):pos(x,l);if(n>100)throw new Error(`${l} cannot exceed 100%.`);return n/100;};
const powerFactor=(x:string)=>{const n=pos(x,"Power factor");if(n>1)throw new Error("Power factor must be between 0 and 1.");return n;};
const fmt=(n:number,d=4)=>new Intl.NumberFormat(undefined,{maximumFractionDigits:d}).format(n);
const money=(n:number)=>new Intl.NumberFormat(undefined,{style:"currency",currency:"USD",maximumFractionDigits:4}).format(n);
const R=(output:string,pairs:[string,string][]):Batch551600Result=>({output,summary:pairs.map(([label,value])=>({label,value}))});
const phaseOptions=[{label:"Single phase",value:"single"},{label:"Three phase",value:"three"}];
const periodUnits=[{label:"Seconds (s)",value:"s"},{label:"Milliseconds (ms)",value:"ms"},{label:"Microseconds (µs)",value:"us"},{label:"Nanoseconds (ns)",value:"ns"}];
const capUnits=[{label:"Farads (F)",value:"f"},{label:"Millifarads (mF)",value:"mf"},{label:"Microfarads (µF)",value:"uf"},{label:"Nanofarads (nF)",value:"nf"},{label:"Picofarads (pF)",value:"pf"}];
const indUnits=[{label:"Henries (H)",value:"h"},{label:"Millihenries (mH)",value:"mh"},{label:"Microhenries (µH)",value:"uh"}];
const safetyNote="Planning estimate only — verify equipment ratings, wiring/protection requirements, manufacturer specifications, and applicable electrical codes before real-world work.";
const capToF=(v:number,u:string)=>v*({f:1,mf:1e-3,uf:1e-6,nf:1e-9,pf:1e-12}[u]??1);
const indToH=(v:number,u:string)=>v*({h:1,mh:1e-3,uh:1e-6}[u]??1);
const periodToS=(v:number,u:string)=>v*({s:1,ms:1e-3,us:1e-6,ns:1e-9}[u]??1);
const fixedAc=(volts:number,dir:"a2w"|"w2a"):Batch551600Config=>({fields:dir==="a2w"?[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"pf",label:"Power factor",type:"number",defaultValue:"1"}]:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1200"},{key:"pf",label:"Power factor",type:"number",defaultValue:"1"}],note:`Fixed at ${volts} V AC. ${safetyNote}`});
const fixedDc=(volts:number,dir:"a2w"|"w2a"):Batch551600Config=>({fields:dir==="a2w"?[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"}]:[{key:"watts",label:"Power (W)",type:"number",defaultValue:String(volts*10)}],note:`Fixed at ${volts} V DC. ${safetyNote}`});

export const BATCH551600_CONFIG:Record<Batch551600Kind,Batch551600Config> = {
  "ac-amps-to-watts-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"},{key:"phase",label:"AC phase",type:"select",defaultValue:"single",options:phaseOptions}],note:safetyNote},
  "dc-amps-to-watts-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"12"}],note:safetyNote},
  "single-phase-amps-to-watts-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"240"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}],note:safetyNote},
  "three-phase-amps-to-watts-calculator":{fields:[{key:"amps",label:"Current (A)",type:"number",defaultValue:"10"},{key:"volts",label:"Line voltage (V)",type:"number",defaultValue:"400"},{key:"pf",label:"Power factor",type:"number",defaultValue:"0.9"}],note:safetyNote},
  "12v-amps-to-watts-calculator":fixedDc(12,"a2w"),
  "24v-amps-to-watts-calculator":fixedDc(24,"a2w"),
  "48v-amps-to-watts-calculator":fixedDc(48,"a2w"),
  "120v-amps-to-watts-calculator":fixedAc(120,"a2w"),
  "230v-amps-to-watts-calculator":fixedAc(230,"a2w"),
  "240v-amps-to-watts-calculator":fixedAc(240,"a2w"),
  "12v-watts-to-amps-calculator":fixedDc(12,"w2a"),
  "24v-watts-to-amps-calculator":fixedDc(24,"w2a"),
  "48v-watts-to-amps-calculator":fixedDc(48,"w2a"),
  "120v-watts-to-amps-calculator":fixedAc(120,"w2a"),
  "230v-watts-to-amps-calculator":fixedAc(230,"w2a"),
  "240v-watts-to-amps-calculator":fixedAc(240,"w2a"),
  "watts-to-kwh-per-day-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"},{key:"hours",label:"Hours used per day",type:"number",defaultValue:"8"}]},
  "monthly-electricity-usage-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"},{key:"hours",label:"Hours used per day",type:"number",defaultValue:"8"},{key:"days",label:"Days in month",type:"number",defaultValue:"30"}]},
  "annual-electricity-cost-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1000"},{key:"hours",label:"Hours used per day",type:"number",defaultValue:"8"},{key:"days",label:"Days per year",type:"number",defaultValue:"365"},{key:"rate",label:"Electricity rate ($/kWh)",type:"number",defaultValue:"0.15"}]},
  "energy-cost-per-hour-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1500"},{key:"rate",label:"Electricity rate ($/kWh)",type:"number",defaultValue:"0.15"}]},
  "solar-panel-output-calculator":{fields:[{key:"panelWatts",label:"Panel rating (W)",type:"number",defaultValue:"400"},{key:"count",label:"Number of panels",type:"number",defaultValue:"10"},{key:"sun",label:"Peak sun hours per day",type:"number",defaultValue:"5"},{key:"eff",label:"System efficiency (%)",type:"number",defaultValue:"80"}],note:"Energy estimate only. Weather, orientation, shading, temperature, equipment, and local conditions affect real output."},
  "solar-panel-size-calculator":{fields:[{key:"dailyKwh",label:"Target energy per day (kWh)",type:"number",defaultValue:"20"},{key:"sun",label:"Peak sun hours per day",type:"number",defaultValue:"5"},{key:"eff",label:"System efficiency (%)",type:"number",defaultValue:"80"},{key:"panelWatts",label:"Panel rating (W)",type:"number",defaultValue:"400"}],note:"Planning estimate only. Solar design must account for site conditions, equipment limits, codes, and local requirements."},
  "solar-battery-size-calculator":{fields:[{key:"dailyKwh",label:"Energy needed per day (kWh)",type:"number",defaultValue:"10"},{key:"days",label:"Days of autonomy",type:"number",defaultValue:"1"},{key:"volts",label:"Battery-bank voltage (V)",type:"number",defaultValue:"48"},{key:"dod",label:"Usable depth of discharge (%)",type:"number",defaultValue:"80"},{key:"eff",label:"System efficiency (%)",type:"number",defaultValue:"90"}],note:safetyNote},
  "solar-battery-runtime-calculator":{fields:[{key:"volts",label:"Battery voltage (V)",type:"number",defaultValue:"48"},{key:"ah",label:"Battery capacity (Ah)",type:"number",defaultValue:"100"},{key:"load",label:"Load (W)",type:"number",defaultValue:"500"},{key:"usable",label:"Usable capacity (%)",type:"number",defaultValue:"80"},{key:"eff",label:"System efficiency (%)",type:"number",defaultValue:"90"}],note:safetyNote},
  "solar-charge-time-calculator":{fields:[{key:"volts",label:"Battery voltage (V)",type:"number",defaultValue:"48"},{key:"ah",label:"Battery capacity (Ah)",type:"number",defaultValue:"100"},{key:"recharge",label:"Capacity to replace (%)",type:"number",defaultValue:"50"},{key:"solarWatts",label:"Solar array power (W)",type:"number",defaultValue:"1000"},{key:"eff",label:"Charging/system efficiency (%)",type:"number",defaultValue:"80"}],note:"This estimates effective full-sun charging time, not clock time. Solar output varies throughout the day."},
  "inverter-size-calculator":{fields:[{key:"continuous",label:"Continuous load (W)",type:"number",defaultValue:"1500"},{key:"surge",label:"Largest surge requirement (W)",type:"number",defaultValue:"3000"},{key:"headroom",label:"Continuous-load headroom (%)",type:"number",defaultValue:"25"}],note:safetyNote},
  "inverter-battery-runtime-calculator":{fields:[{key:"volts",label:"Battery voltage (V)",type:"number",defaultValue:"12"},{key:"ah",label:"Battery capacity (Ah)",type:"number",defaultValue:"100"},{key:"load",label:"AC load (W)",type:"number",defaultValue:"500"},{key:"usable",label:"Usable capacity (%)",type:"number",defaultValue:"80"},{key:"eff",label:"Inverter efficiency (%)",type:"number",defaultValue:"90"}],note:safetyNote},
  "battery-charging-time-calculator":{fields:[{key:"ah",label:"Battery capacity (Ah)",type:"number",defaultValue:"100"},{key:"start",label:"Starting charge (%)",type:"number",defaultValue:"20"},{key:"target",label:"Target charge (%)",type:"number",defaultValue:"100"},{key:"amps",label:"Charger current (A)",type:"number",defaultValue:"20"},{key:"eff",label:"Charging efficiency (%)",type:"number",defaultValue:"90"}],note:"Real charge time can be longer because charging current may taper near full charge and battery-management limits may apply."},
  "battery-c-rate-calculator":{fields:[{key:"amps",label:"Charge or discharge current (A)",type:"number",defaultValue:"50"},{key:"ah",label:"Battery capacity (Ah)",type:"number",defaultValue:"100"}]},
  "battery-energy-density-calculator":{fields:[{key:"wh",label:"Stored energy (Wh)",type:"number",defaultValue:"1000"},{key:"kg",label:"Battery mass (kg)",type:"number",defaultValue:"8"},{key:"liters",label:"Battery volume (L)",type:"number",defaultValue:"6"}]},
  "capacitor-energy-calculator":{fields:[{key:"cap",label:"Capacitance",type:"number",defaultValue:"1000"},{key:"capUnit",label:"Capacitance unit",type:"select",defaultValue:"uf",options:capUnits},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"12"}]},
  "capacitor-charge-calculator":{fields:[{key:"cap",label:"Capacitance",type:"number",defaultValue:"1000"},{key:"capUnit",label:"Capacitance unit",type:"select",defaultValue:"uf",options:capUnits},{key:"volts",label:"Voltage (V)",type:"number",defaultValue:"12"}]},
  "capacitive-reactance-calculator":{fields:[{key:"cap",label:"Capacitance",type:"number",defaultValue:"10"},{key:"capUnit",label:"Capacitance unit",type:"select",defaultValue:"uf",options:capUnits},{key:"freq",label:"Frequency (Hz)",type:"number",defaultValue:"60"}]},
  "inductive-reactance-calculator":{fields:[{key:"ind",label:"Inductance",type:"number",defaultValue:"100"},{key:"indUnit",label:"Inductance unit",type:"select",defaultValue:"mh",options:indUnits},{key:"freq",label:"Frequency (Hz)",type:"number",defaultValue:"60"}]},
  "resonant-frequency-calculator":{fields:[{key:"ind",label:"Inductance",type:"number",defaultValue:"10"},{key:"indUnit",label:"Inductance unit",type:"select",defaultValue:"mh",options:indUnits},{key:"cap",label:"Capacitance",type:"number",defaultValue:"10"},{key:"capUnit",label:"Capacitance unit",type:"select",defaultValue:"uf",options:capUnits}]},
  "rl-time-constant-calculator":{fields:[{key:"ind",label:"Inductance",type:"number",defaultValue:"100"},{key:"indUnit",label:"Inductance unit",type:"select",defaultValue:"mh",options:indUnits},{key:"res",label:"Resistance (Ω)",type:"number",defaultValue:"10"}]},
  "series-rlc-impedance-calculator":{fields:[{key:"res",label:"Resistance (Ω)",type:"number",defaultValue:"100"},{key:"ind",label:"Inductance",type:"number",defaultValue:"100"},{key:"indUnit",label:"Inductance unit",type:"select",defaultValue:"mh",options:indUnits},{key:"cap",label:"Capacitance",type:"number",defaultValue:"10"},{key:"capUnit",label:"Capacitance unit",type:"select",defaultValue:"uf",options:capUnits},{key:"freq",label:"Frequency (Hz)",type:"number",defaultValue:"60"}]},
  "parallel-rlc-impedance-calculator":{fields:[{key:"res",label:"Parallel resistance (Ω)",type:"number",defaultValue:"100"},{key:"ind",label:"Inductance",type:"number",defaultValue:"100"},{key:"indUnit",label:"Inductance unit",type:"select",defaultValue:"mh",options:indUnits},{key:"cap",label:"Capacitance",type:"number",defaultValue:"10"},{key:"capUnit",label:"Capacitance unit",type:"select",defaultValue:"uf",options:capUnits},{key:"freq",label:"Frequency (Hz)",type:"number",defaultValue:"60"}]},
  "impedance-triangle-calculator":{fields:[{key:"res",label:"Resistance R (Ω)",type:"number",defaultValue:"100"},{key:"react",label:"Net reactance X (Ω; negative = capacitive)",type:"number",defaultValue:"50"}]},
  "phase-angle-calculator":{fields:[{key:"pf",label:"Power factor",type:"number",defaultValue:"0.8"}]},
  "frequency-to-period-calculator":{fields:[{key:"freq",label:"Frequency (Hz)",type:"number",defaultValue:"60"}]},
  "period-to-frequency-calculator":{fields:[{key:"period",label:"Period",type:"number",defaultValue:"16.6667"},{key:"unit",label:"Period unit",type:"select",defaultValue:"ms",options:periodUnits}]},
  "wavelength-calculator":{fields:[{key:"freqMhz",label:"Frequency (MHz)",type:"number",defaultValue:"100"},{key:"vf",label:"Velocity factor",type:"number",defaultValue:"1"}]},
  "dbm-to-watts-calculator":{fields:[{key:"dbm",label:"Power (dBm)",type:"number",defaultValue:"30"}]},
  "watts-to-dbm-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1"}]},
  "dbw-to-watts-calculator":{fields:[{key:"dbw",label:"Power (dBW)",type:"number",defaultValue:"0"}]},
  "watts-to-dbw-calculator":{fields:[{key:"watts",label:"Power (W)",type:"number",defaultValue:"1"}]},
  "rms-voltage-calculator":{fields:[{key:"peak",label:"Peak voltage (V)",type:"number",defaultValue:"170"}]},
  "peak-voltage-calculator":{fields:[{key:"rms",label:"RMS voltage (V)",type:"number",defaultValue:"120"}]},
  "peak-to-peak-voltage-calculator":{fields:[{key:"rms",label:"RMS voltage (V)",type:"number",defaultValue:"120"}]},
};

function fixedA2W(volts:number,amps:string,pfValue?:string){const a=pos(amps,"Current");const factor=pfValue===undefined?1:powerFactor(pfValue);const w=volts*a*factor;return R(`${fmt(w)} W`,[["Power",`${fmt(w)} W`],["Voltage",`${volts} V`],["Power factor",fmt(factor)]]);}
function fixedW2A(volts:number,watts:string,pfValue?:string){const w=nonneg(watts,"Power");const factor=pfValue===undefined?1:powerFactor(pfValue);const a=w/(volts*factor);return R(`${fmt(a)} A`,[["Current",`${fmt(a)} A`],["Voltage",`${volts} V`],["Power factor",fmt(factor)]]);}

export function runBatch551600(kind:Batch551600Kind,v:Record<string,string>):Batch551600Result{
  switch(kind){
    case "ac-amps-to-watts-calculator": {const a=pos(v.amps,"Current"),volts=pos(v.volts,"Voltage"),factor=powerFactor(v.pf),m=v.phase==="three"?Math.sqrt(3):1,w=m*volts*a*factor;return R(`${fmt(w)} W`,[["Real power",`${fmt(w)} W`],["Kilowatts",`${fmt(w/1000)} kW`]]);}
    case "dc-amps-to-watts-calculator": {const w=pos(v.amps,"Current")*pos(v.volts,"Voltage");return R(`${fmt(w)} W`,[["DC power",`${fmt(w)} W`]]);}
    case "single-phase-amps-to-watts-calculator": {const w=pos(v.amps,"Current")*pos(v.volts,"Voltage")*powerFactor(v.pf);return R(`${fmt(w)} W`,[["Single-phase power",`${fmt(w)} W`],["Kilowatts",`${fmt(w/1000)} kW`]]);}
    case "three-phase-amps-to-watts-calculator": {const w=Math.sqrt(3)*pos(v.amps,"Current")*pos(v.volts,"Line voltage")*powerFactor(v.pf);return R(`${fmt(w)} W`,[["Three-phase power",`${fmt(w)} W`],["Kilowatts",`${fmt(w/1000)} kW`]]);}
    case "12v-amps-to-watts-calculator": return fixedA2W(12,v.amps);
    case "24v-amps-to-watts-calculator": return fixedA2W(24,v.amps);
    case "48v-amps-to-watts-calculator": return fixedA2W(48,v.amps);
    case "120v-amps-to-watts-calculator": return fixedA2W(120,v.amps,v.pf);
    case "230v-amps-to-watts-calculator": return fixedA2W(230,v.amps,v.pf);
    case "240v-amps-to-watts-calculator": return fixedA2W(240,v.amps,v.pf);
    case "12v-watts-to-amps-calculator": return fixedW2A(12,v.watts);
    case "24v-watts-to-amps-calculator": return fixedW2A(24,v.watts);
    case "48v-watts-to-amps-calculator": return fixedW2A(48,v.watts);
    case "120v-watts-to-amps-calculator": return fixedW2A(120,v.watts,v.pf);
    case "230v-watts-to-amps-calculator": return fixedW2A(230,v.watts,v.pf);
    case "240v-watts-to-amps-calculator": return fixedW2A(240,v.watts,v.pf);
    case "watts-to-kwh-per-day-calculator": {const kwh=nonneg(v.watts,"Power")*nonneg(v.hours,"Hours")/1000;return R(`${fmt(kwh)} kWh/day`,[["Daily energy",`${fmt(kwh)} kWh`],["Daily watt-hours",`${fmt(kwh*1000)} Wh`]]);}
    case "monthly-electricity-usage-calculator": {const kwh=nonneg(v.watts,"Power")*nonneg(v.hours,"Hours")*pos(v.days,"Days")/1000;return R(`${fmt(kwh)} kWh/month`,[["Monthly energy",`${fmt(kwh)} kWh`],["Average daily energy",`${fmt(kwh/pos(v.days,"Days"))} kWh`]]);}
    case "annual-electricity-cost-calculator": {const kwh=nonneg(v.watts,"Power")*nonneg(v.hours,"Hours")*pos(v.days,"Days")/1000,cost=kwh*nonneg(v.rate,"Electricity rate");return R(money(cost),[["Annual cost",money(cost)],["Annual energy",`${fmt(kwh)} kWh`]]);}
    case "energy-cost-per-hour-calculator": {const cost=nonneg(v.watts,"Power")/1000*nonneg(v.rate,"Electricity rate");return R(`${money(cost)} / hour`,[["Cost per hour",money(cost)],["Cost per 8 hours",money(cost*8)]]);}
    case "solar-panel-output-calculator": {const wh=pos(v.panelWatts,"Panel rating")*pos(v.count,"Panel count")*pos(v.sun,"Peak sun hours")*pct(v.eff,"System efficiency");return R(`${fmt(wh/1000)} kWh/day`,[["Estimated daily energy",`${fmt(wh/1000)} kWh`],["Effective daily watt-hours",`${fmt(wh)} Wh`]]);}
    case "solar-panel-size-calculator": {const daily=pos(v.dailyKwh,"Target energy")*1000,sun=pos(v.sun,"Peak sun hours"),eff=pct(v.eff,"System efficiency"),rating=pos(v.panelWatts,"Panel rating"),array=daily/(sun*eff),count=Math.ceil(array/rating);return R(`${fmt(array)} W array`,[["Minimum array rating",`${fmt(array)} W`],["Panels at ${fmt(rating)} W each",String(count)]]);}
    case "solar-battery-size-calculator": {const needed=pos(v.dailyKwh,"Daily energy")*1000*pos(v.days,"Days of autonomy"),usable=pct(v.dod,"Usable depth of discharge"),eff=pct(v.eff,"System efficiency"),nominalWh=needed/(usable*eff),ah=nominalWh/pos(v.volts,"Battery voltage");return R(`${fmt(ah)} Ah`,[["Estimated bank capacity",`${fmt(ah)} Ah`],["Nominal stored energy",`${fmt(nominalWh/1000)} kWh`]]);}
    case "solar-battery-runtime-calculator": {const usableWh=pos(v.volts,"Battery voltage")*pos(v.ah,"Battery capacity")*pct(v.usable,"Usable capacity")*pct(v.eff,"System efficiency"),hours=usableWh/pos(v.load,"Load");return R(`${fmt(hours)} hours`,[["Estimated runtime",`${fmt(hours)} hours`],["Usable delivered energy",`${fmt(usableWh)} Wh`]]);}
    case "solar-charge-time-calculator": {const wh=pos(v.volts,"Battery voltage")*pos(v.ah,"Battery capacity")*pct(v.recharge,"Capacity to replace"),delivered=pos(v.solarWatts,"Solar array power")*pct(v.eff,"Charging efficiency"),hours=wh/delivered;return R(`${fmt(hours)} peak-sun hours`,[["Effective sun hours",`${fmt(hours)} h`],["Energy to replace",`${fmt(wh)} Wh`]]);}
    case "inverter-size-calculator": {const cont=pos(v.continuous,"Continuous load"),surge=nonneg(v.surge,"Surge load"),head=pct(v.headroom,"Headroom",true),base=cont*(1+head),recommended=Math.max(base,surge);return R(`${fmt(recommended)} W minimum`,[["Continuous load with headroom",`${fmt(base)} W`],["Surge requirement",`${fmt(surge)} W`],["Minimum of the two",`${fmt(recommended)} W`]]);}
    case "inverter-battery-runtime-calculator": {const usableWh=pos(v.volts,"Battery voltage")*pos(v.ah,"Battery capacity")*pct(v.usable,"Usable capacity")*pct(v.eff,"Inverter efficiency"),hours=usableWh/pos(v.load,"Load");return R(`${fmt(hours)} hours`,[["Estimated runtime",`${fmt(hours)} hours`],["AC energy available",`${fmt(usableWh)} Wh`]]);}
    case "battery-charging-time-calculator": {const start=nonneg(v.start,"Starting charge"),target=pos(v.target,"Target charge");if(start>100||target>100)throw new Error("Charge percentages cannot exceed 100%.");if(target<=start)throw new Error("Target charge must be greater than starting charge.");const neededAh=pos(v.ah,"Battery capacity")*((target-start)/100),hours=neededAh/(pos(v.amps,"Charger current")*pct(v.eff,"Charging efficiency"));return R(`${fmt(hours)} hours`,[["Estimated charge time",`${fmt(hours)} hours`],["Capacity to replace",`${fmt(neededAh)} Ah`]]);}
    case "battery-c-rate-calculator": {const c=pos(v.amps,"Current")/pos(v.ah,"Battery capacity");return R(`${fmt(c)} C`,[["C-rate",`${fmt(c)} C`],["Ideal full-discharge time",`${fmt(1/c)} hours`]]);}
    case "battery-energy-density-calculator": {const wh=pos(v.wh,"Stored energy"),kg=pos(v.kg,"Battery mass"),liters=pos(v.liters,"Battery volume");return R(`${fmt(wh/kg)} Wh/kg`,[["Gravimetric energy density",`${fmt(wh/kg)} Wh/kg`],["Volumetric energy density",`${fmt(wh/liters)} Wh/L`]]);}
    case "capacitor-energy-calculator": {const c=capToF(pos(v.cap,"Capacitance"),v.capUnit),volts=nonneg(v.volts,"Voltage"),j=0.5*c*volts*volts;return R(`${fmt(j,8)} J`,[["Stored energy",`${fmt(j,8)} J`],["Capacitance",`${fmt(c,12)} F`]]);}
    case "capacitor-charge-calculator": {const c=capToF(pos(v.cap,"Capacitance"),v.capUnit),volts=nonneg(v.volts,"Voltage"),q=c*volts;return R(`${fmt(q,8)} C`,[["Stored charge",`${fmt(q,8)} C`],["Microcoulombs",`${fmt(q*1e6)} µC`]]);}
    case "capacitive-reactance-calculator": {const c=capToF(pos(v.cap,"Capacitance"),v.capUnit),f=pos(v.freq,"Frequency"),x=1/(2*Math.PI*f*c);return R(`${fmt(x)} Ω`,[["Capacitive reactance",`${fmt(x)} Ω`]]);}
    case "inductive-reactance-calculator": {const l=indToH(pos(v.ind,"Inductance"),v.indUnit),f=pos(v.freq,"Frequency"),x=2*Math.PI*f*l;return R(`${fmt(x)} Ω`,[["Inductive reactance",`${fmt(x)} Ω`]]);}
    case "resonant-frequency-calculator": {const l=indToH(pos(v.ind,"Inductance"),v.indUnit),c=capToF(pos(v.cap,"Capacitance"),v.capUnit),f=1/(2*Math.PI*Math.sqrt(l*c));return R(`${fmt(f)} Hz`,[["Resonant frequency",`${fmt(f)} Hz`],["Angular frequency",`${fmt(2*Math.PI*f)} rad/s`]]);}
    case "rl-time-constant-calculator": {const l=indToH(pos(v.ind,"Inductance"),v.indUnit),r=pos(v.res,"Resistance"),tau=l/r;return R(`${fmt(tau,8)} s`,[["Time constant τ",`${fmt(tau,8)} s`],["Milliseconds",`${fmt(tau*1000)} ms`]]);}
    case "series-rlc-impedance-calculator": {const r=nonneg(v.res,"Resistance"),l=indToH(pos(v.ind,"Inductance"),v.indUnit),c=capToF(pos(v.cap,"Capacitance"),v.capUnit),f=pos(v.freq,"Frequency"),xl=2*Math.PI*f*l,xc=1/(2*Math.PI*f*c),x=xl-xc,z=Math.sqrt(r*r+x*x),angle=Math.atan2(x,r)*180/Math.PI;return R(`${fmt(z)} Ω`,[["Impedance magnitude",`${fmt(z)} Ω`],["Net reactance",`${fmt(x)} Ω`],["Phase angle",`${fmt(angle)}°`]]);}
    case "parallel-rlc-impedance-calculator": {const r=pos(v.res,"Resistance"),l=indToH(pos(v.ind,"Inductance"),v.indUnit),c=capToF(pos(v.cap,"Capacitance"),v.capUnit),f=pos(v.freq,"Frequency"),w=2*Math.PI*f,g=1/r,b=w*c-1/(w*l),y=Math.sqrt(g*g+b*b),z=1/y,angle=-Math.atan2(b,g)*180/Math.PI;return R(`${fmt(z)} Ω`,[["Impedance magnitude",`${fmt(z)} Ω`],["Impedance phase",`${fmt(angle)}°`],["Admittance",`${fmt(y,8)} S`]]);}
    case "impedance-triangle-calculator": {const r=nonneg(v.res,"Resistance"),x=num(v.react,"Reactance"),z=Math.sqrt(r*r+x*x),angle=Math.atan2(x,r)*180/Math.PI;return R(`${fmt(z)} Ω`,[["Impedance magnitude",`${fmt(z)} Ω`],["Phase angle",`${fmt(angle)}°`],["Resistance",`${fmt(r)} Ω`]]);}
    case "phase-angle-calculator": {const factor=powerFactor(v.pf),angle=Math.acos(factor)*180/Math.PI;return R(`${fmt(angle)}°`,[["Phase angle",`${fmt(angle)}°`],["Power factor",fmt(factor)]]);}
    case "frequency-to-period-calculator": {const f=pos(v.freq,"Frequency"),s=1/f;return R(`${fmt(s,10)} s`,[["Period",`${fmt(s,10)} s`],["Milliseconds",`${fmt(s*1000,8)} ms`],["Microseconds",`${fmt(s*1e6,6)} µs`]]);}
    case "period-to-frequency-calculator": {const s=periodToS(pos(v.period,"Period"),v.unit),f=1/s;return R(`${fmt(f)} Hz`,[["Frequency",`${fmt(f)} Hz`],["Period",`${fmt(s,10)} s`]]);}
    case "wavelength-calculator": {const f=pos(v.freqMhz,"Frequency")*1e6,vf=pos(v.vf,"Velocity factor");if(vf>1)throw new Error("Velocity factor cannot exceed 1.");const meters=299792458*vf/f;return R(`${fmt(meters)} m`,[["Wavelength",`${fmt(meters)} m`],["Feet",`${fmt(meters*3.280839895)} ft`]]);}
    case "dbm-to-watts-calculator": {const dbm=num(v.dbm,"dBm"),mw=Math.pow(10,dbm/10),w=mw/1000;return R(`${fmt(w,10)} W`,[["Watts",`${fmt(w,10)} W`],["Milliwatts",`${fmt(mw,8)} mW`]]);}
    case "watts-to-dbm-calculator": {const w=pos(v.watts,"Power"),dbm=10*Math.log10(w*1000);return R(`${fmt(dbm)} dBm`,[["Power level",`${fmt(dbm)} dBm`],["Milliwatts",`${fmt(w*1000)} mW`]]);}
    case "dbw-to-watts-calculator": {const dbw=num(v.dbw,"dBW"),w=Math.pow(10,dbw/10);return R(`${fmt(w,10)} W`,[["Watts",`${fmt(w,10)} W`]]);}
    case "watts-to-dbw-calculator": {const w=pos(v.watts,"Power"),dbw=10*Math.log10(w);return R(`${fmt(dbw)} dBW`,[["Power level",`${fmt(dbw)} dBW`]]);}
    case "rms-voltage-calculator": {const peak=nonneg(v.peak,"Peak voltage"),rms=peak/Math.sqrt(2);return R(`${fmt(rms)} V RMS`,[["RMS voltage",`${fmt(rms)} V`],["Peak-to-peak voltage",`${fmt(peak*2)} V`]]);}
    case "peak-voltage-calculator": {const rms=nonneg(v.rms,"RMS voltage"),peak=rms*Math.sqrt(2);return R(`${fmt(peak)} V peak`,[["Peak voltage",`${fmt(peak)} V`],["Peak-to-peak voltage",`${fmt(peak*2)} V`]]);}
    case "peak-to-peak-voltage-calculator": {const rms=nonneg(v.rms,"RMS voltage"),vpp=2*Math.sqrt(2)*rms;return R(`${fmt(vpp)} V p-p`,[["Peak-to-peak voltage",`${fmt(vpp)} V`],["Peak voltage",`${fmt(vpp/2)} V`]]);}
    default: throw new Error("This calculator is not configured.");
  }
}
