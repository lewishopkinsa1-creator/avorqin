"use client";

import { useMemo, useState } from "react";

export type Batch201250Kind =
  | "auto-loan-calculator"
  | "credit-card-payoff-calculator"
  | "debt-payoff-calculator"
  | "debt-snowball-calculator"
  | "debt-avalanche-calculator"
  | "apr-calculator"
  | "apy-calculator"
  | "debt-to-income-ratio-calculator"
  | "loan-amortization-calculator"
  | "rule-of-72-calculator"
  | "rent-vs-buy-calculator"
  | "down-payment-calculator"
  | "mortgage-refinance-calculator"
  | "biweekly-mortgage-calculator"
  | "credit-card-interest-calculator"
  | "credit-card-minimum-payment-calculator"
  | "pay-raise-calculator"
  | "overtime-pay-calculator"
  | "freelance-rate-calculator"
  | "cost-per-unit-calculator"
  | "unit-price-calculator"
  | "price-per-square-foot-calculator"
  | "revenue-growth-calculator"
  | "customer-acquisition-cost-calculator"
  | "customer-lifetime-value-calculator"
  | "roas-calculator"
  | "cpm-calculator"
  | "cpc-calculator"
  | "cpa-calculator"
  | "conversion-rate-calculator"
  | "title-tag-length-checker"
  | "meta-description-length-checker"
  | "canonical-tag-generator"
  | "meta-robots-tag-generator"
  | "hreflang-validator"
  | "json-ld-validator"
  | "xml-sitemap-validator"
  | "sitemap-url-extractor"
  | "redirect-rule-generator"
  | "utm-decoder"
  | "json-schema-validator"
  | "json-escape-unescape"
  | "json-string-converter"
  | "csv-formatter"
  | "csv-column-extractor"
  | "csv-duplicate-remover"
  | "csv-sorter"
  | "tsv-to-csv"
  | "csv-to-tsv"
  | "yaml-validator";

type ResultItem = { label: string; value: string; note?: string };
type FinanceField = {
  key: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  type?: "number" | "text";
};
type FinanceConfig = { fields: FinanceField[]; button?: string; note?: string };
type TextField = {
  key: string;
  label: string;
  type: "input" | "textarea" | "select";
  placeholder?: string;
  defaultValue?: string;
  options?: { label: string; value: string }[];
};
type TextConfig = { fields: TextField[]; button?: string; note?: string };

const inputClass = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const textareaClass = "min-h-48 w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm outline-none transition focus:border-primary";
const buttonClass = "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondaryButtonClass = "rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";

const FINANCE: Record<string, FinanceConfig> = {
  "auto-loan-calculator": { fields: [
    {key:"price",label:"Vehicle price",placeholder:"35000"},{key:"down",label:"Down payment",placeholder:"5000",defaultValue:"0"},{key:"trade",label:"Trade-in credit",placeholder:"0",defaultValue:"0"},{key:"tax",label:"Sales tax (%)",placeholder:"6.25",defaultValue:"0"},{key:"apr",label:"APR (%)",placeholder:"6.5"},{key:"months",label:"Loan term (months)",placeholder:"60"}
  ]},
  "credit-card-payoff-calculator": { fields: [{key:"balance",label:"Card balance",placeholder:"8000"},{key:"apr",label:"APR (%)",placeholder:"24.99"},{key:"payment",label:"Monthly payment",placeholder:"350"}] },
  "debt-payoff-calculator": { fields: [{key:"balance",label:"Debt balance",placeholder:"15000"},{key:"apr",label:"APR (%)",placeholder:"12"},{key:"payment",label:"Monthly payment",placeholder:"500"}] },
  "debt-snowball-calculator": { fields: [
    {key:"balances",label:"Balances (comma-separated)",type:"text",placeholder:"1200, 4800, 12500"},{key:"aprs",label:"APR rates % (comma-separated)",type:"text",placeholder:"22.9, 8.5, 14.2"},{key:"minimums",label:"Minimum payments (comma-separated)",type:"text",placeholder:"35, 125, 275"},{key:"extra",label:"Extra monthly payment",placeholder:"200",defaultValue:"0"}
  ], note:"The snowball method targets the smallest remaining balance first and rolls freed minimum payments into the next debt." },
  "debt-avalanche-calculator": { fields: [
    {key:"balances",label:"Balances (comma-separated)",type:"text",placeholder:"1200, 4800, 12500"},{key:"aprs",label:"APR rates % (comma-separated)",type:"text",placeholder:"22.9, 8.5, 14.2"},{key:"minimums",label:"Minimum payments (comma-separated)",type:"text",placeholder:"35, 125, 275"},{key:"extra",label:"Extra monthly payment",placeholder:"200",defaultValue:"0"}
  ], note:"The avalanche method targets the highest APR first and rolls freed minimum payments into the next debt." },
  "apr-calculator": { fields: [{key:"loan",label:"Amount borrowed",placeholder:"10000"},{key:"fees",label:"Upfront fees",placeholder:"250",defaultValue:"0"},{key:"payment",label:"Monthly payment",placeholder:"220"},{key:"months",label:"Number of monthly payments",placeholder:"48"}], note:"This estimates APR by solving for the periodic rate that equates net proceeds with equal monthly payments." },
  "apy-calculator": { fields: [{key:"rate",label:"Stated annual interest rate (%)",placeholder:"5"},{key:"n",label:"Compounding periods per year",placeholder:"12",defaultValue:"12"}] },
  "debt-to-income-ratio-calculator": { fields: [{key:"income",label:"Gross monthly income",placeholder:"6500"},{key:"debt",label:"Monthly debt payments",placeholder:"1800"}] },
  "loan-amortization-calculator": { fields: [{key:"principal",label:"Loan amount",placeholder:"25000"},{key:"apr",label:"APR (%)",placeholder:"7.25"},{key:"years",label:"Loan term (years)",placeholder:"5"}] },
  "rule-of-72-calculator": { fields: [{key:"rate",label:"Annual growth rate (%)",placeholder:"8"}] },
  "rent-vs-buy-calculator": { fields: [
    {key:"rent",label:"Current monthly rent",placeholder:"2200"},{key:"rentGrowth",label:"Annual rent increase (%)",placeholder:"3",defaultValue:"3"},{key:"home",label:"Home price",placeholder:"400000"},{key:"down",label:"Down payment",placeholder:"80000",defaultValue:"0"},{key:"apr",label:"Mortgage rate (%)",placeholder:"6.5"},{key:"term",label:"Mortgage term (years)",placeholder:"30",defaultValue:"30"},{key:"tax",label:"Property tax (% of home value / year)",placeholder:"1.2",defaultValue:"1.2"},{key:"insurance",label:"Annual homeowners insurance",placeholder:"1800",defaultValue:"0"},{key:"appreciation",label:"Home appreciation (% / year)",placeholder:"3",defaultValue:"3"},{key:"horizon",label:"Comparison period (years)",placeholder:"7",defaultValue:"7"}
  ], note:"This is a simplified comparison. It does not include maintenance, selling costs, tax effects, PMI, opportunity cost, or every transaction expense." },
  "down-payment-calculator": { fields: [{key:"price",label:"Purchase price",placeholder:"350000"},{key:"pct",label:"Down payment (%)",placeholder:"20"}] },
  "mortgage-refinance-calculator": { fields: [{key:"balance",label:"Current mortgage balance",placeholder:"280000"},{key:"oldRate",label:"Current rate (%)",placeholder:"7.1"},{key:"oldYears",label:"Years remaining",placeholder:"24"},{key:"newRate",label:"New rate (%)",placeholder:"5.9"},{key:"newYears",label:"New loan term (years)",placeholder:"20"},{key:"costs",label:"Closing costs",placeholder:"5000",defaultValue:"0"}] },
  "biweekly-mortgage-calculator": { fields: [{key:"balance",label:"Mortgage balance",placeholder:"300000"},{key:"apr",label:"Interest rate (%)",placeholder:"6.5"},{key:"years",label:"Term (years)",placeholder:"30"}] },
  "credit-card-interest-calculator": { fields: [{key:"balance",label:"Credit card balance",placeholder:"5000"},{key:"apr",label:"APR (%)",placeholder:"24.99"}] },
  "credit-card-minimum-payment-calculator": { fields: [{key:"balance",label:"Current balance",placeholder:"5000"},{key:"apr",label:"APR (%)",placeholder:"24.99"},{key:"pct",label:"Minimum payment (% of balance)",placeholder:"2",defaultValue:"2"},{key:"floor",label:"Minimum dollar floor",placeholder:"35",defaultValue:"35"}] },
  "pay-raise-calculator": { fields: [{key:"salary",label:"Current annual salary",placeholder:"65000"},{key:"raise",label:"Raise (%)",placeholder:"5"}] },
  "overtime-pay-calculator": { fields: [{key:"rate",label:"Hourly rate",placeholder:"25"},{key:"regular",label:"Regular hours",placeholder:"40",defaultValue:"40"},{key:"ot",label:"Overtime hours",placeholder:"8",defaultValue:"0"},{key:"mult",label:"Overtime multiplier",placeholder:"1.5",defaultValue:"1.5"}] },
  "freelance-rate-calculator": { fields: [{key:"income",label:"Target take-home / owner income per year",placeholder:"80000"},{key:"hours",label:"Billable hours per week",placeholder:"25"},{key:"weeks",label:"Working weeks per year",placeholder:"48"},{key:"overhead",label:"Overhead reserve (% of revenue)",placeholder:"15",defaultValue:"15"},{key:"tax",label:"Tax reserve (% of revenue)",placeholder:"25",defaultValue:"25"}] },
  "cost-per-unit-calculator": { fields: [{key:"cost",label:"Total cost",placeholder:"1250"},{key:"units",label:"Number of units",placeholder:"500"}] },
  "unit-price-calculator": { fields: [{key:"price",label:"Package price",placeholder:"18.99"},{key:"qty",label:"Quantity / units",placeholder:"24"}] },
  "price-per-square-foot-calculator": { fields: [{key:"price",label:"Total price",placeholder:"425000"},{key:"area",label:"Area (square feet)",placeholder:"2100"}] },
  "revenue-growth-calculator": { fields: [{key:"old",label:"Earlier revenue",placeholder:"120000"},{key:"now",label:"Current revenue",placeholder:"150000"}] },
  "customer-acquisition-cost-calculator": { fields: [{key:"spend",label:"Sales + marketing spend",placeholder:"50000"},{key:"customers",label:"New customers acquired",placeholder:"250"}] },
  "customer-lifetime-value-calculator": { fields: [{key:"aov",label:"Average order value",placeholder:"75"},{key:"freq",label:"Purchases per customer per year",placeholder:"4"},{key:"years",label:"Average customer lifespan (years)",placeholder:"3"},{key:"margin",label:"Gross margin (%)",placeholder:"60",defaultValue:"100"}] },
  "roas-calculator": { fields: [{key:"revenue",label:"Revenue attributed to ads",placeholder:"25000"},{key:"spend",label:"Ad spend",placeholder:"5000"}] },
  "cpm-calculator": { fields: [{key:"spend",label:"Ad spend",placeholder:"1200"},{key:"impressions",label:"Impressions",placeholder:"250000"}] },
  "cpc-calculator": { fields: [{key:"spend",label:"Ad spend",placeholder:"1200"},{key:"clicks",label:"Clicks",placeholder:"2400"}] },
  "cpa-calculator": { fields: [{key:"spend",label:"Ad spend",placeholder:"1200"},{key:"conversions",label:"Acquisitions / conversions",placeholder:"80"}] },
  "conversion-rate-calculator": { fields: [{key:"visitors",label:"Visitors / sessions",placeholder:"10000"},{key:"conversions",label:"Conversions",placeholder:"350"}] }
};

const TEXT: Record<string, TextConfig> = {
  "title-tag-length-checker": { fields: [{key:"text",label:"Title tag",type:"input",placeholder:"Free Online JSON Formatter | Avorqin"}] },
  "meta-description-length-checker": { fields: [{key:"text",label:"Meta description",type:"textarea",placeholder:"Write or paste your meta description here..."}] },
  "canonical-tag-generator": { fields: [{key:"url",label:"Canonical URL",type:"input",placeholder:"https://example.com/page/"}] },
  "meta-robots-tag-generator": { fields: [{key:"directives",label:"Robots directives (comma-separated)",type:"input",defaultValue:"index, follow",placeholder:"index, follow, max-image-preview:large"}] },
  "hreflang-validator": { fields: [{key:"entries",label:"Hreflang entries (one per line: code = URL)",type:"textarea",placeholder:"en = https://example.com/en/\nen-US = https://example.com/us/\nx-default = https://example.com/"}] },
  "json-ld-validator": { fields: [{key:"json",label:"JSON-LD",type:"textarea",placeholder:'{"@context":"https://schema.org","@type":"WebSite","name":"Avorqin"}'}] },
  "xml-sitemap-validator": { fields: [{key:"xml",label:"XML sitemap",type:"textarea",placeholder:"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">...</urlset>"}] },
  "sitemap-url-extractor": { fields: [{key:"xml",label:"XML sitemap",type:"textarea",placeholder:"Paste an XML sitemap or sitemap index..."}] },
  "redirect-rule-generator": { fields: [{key:"source",label:"Source path",type:"input",placeholder:"/old-page"},{key:"destination",label:"Destination URL or path",type:"input",placeholder:"https://example.com/new-page"},{key:"status",label:"Redirect status",type:"select",defaultValue:"301",options:[{label:"301 Permanent",value:"301"},{label:"302 Temporary",value:"302"},{label:"307 Temporary",value:"307"},{label:"308 Permanent",value:"308"}]}] },
  "utm-decoder": { fields: [{key:"url",label:"URL with UTM parameters",type:"textarea",placeholder:"https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=spring"}] },
  "json-schema-validator": { fields: [{key:"json",label:"JSON data",type:"textarea",placeholder:'{"name":"Avorqin","visits":100}'},{key:"schema",label:"JSON Schema",type:"textarea",placeholder:'{"type":"object","required":["name"],"properties":{"name":{"type":"string"},"visits":{"type":"integer","minimum":0}}}'}], note:"This browser-only validator supports common JSON Schema keywords used by many everyday schemas. It is not a complete implementation of every JSON Schema draft feature." },
  "json-escape-unescape": { fields: [{key:"mode",label:"Action",type:"select",defaultValue:"escape",options:[{label:"Escape text",value:"escape"},{label:"Unescape JSON string content",value:"unescape"}]},{key:"text",label:"Input",type:"textarea",placeholder:'Line one\n"quoted text"'}] },
  "json-string-converter": { fields: [{key:"mode",label:"Action",type:"select",defaultValue:"encode",options:[{label:"JSON to JSON string",value:"encode"},{label:"JSON string to formatted JSON",value:"decode"}]},{key:"text",label:"Input",type:"textarea",placeholder:'{"name":"Avorqin","active":true}'}] },
  "csv-formatter": { fields: [{key:"csv",label:"CSV",type:"textarea",placeholder:'name,city\n"Smith, Jane",Austin\nJohn,Dallas'}] },
  "csv-column-extractor": { fields: [{key:"csv",label:"CSV",type:"textarea",placeholder:"name,email\nJane,jane@example.com\nJohn,john@example.com"},{key:"column",label:"Header name or 1-based column number",type:"input",placeholder:"email"}] },
  "csv-duplicate-remover": { fields: [{key:"csv",label:"CSV",type:"textarea",placeholder:"name,city\nJane,Austin\nJane,Austin\nJohn,Dallas"}] },
  "csv-sorter": { fields: [{key:"csv",label:"CSV",type:"textarea",placeholder:"name,score\nJane,92\nJohn,81"},{key:"column",label:"Header name or 1-based column number",type:"input",placeholder:"score"},{key:"direction",label:"Direction",type:"select",defaultValue:"asc",options:[{label:"Ascending",value:"asc"},{label:"Descending",value:"desc"}]}] },
  "tsv-to-csv": { fields: [{key:"text",label:"TSV",type:"textarea",placeholder:"name\tcity\nJane\tAustin\nJohn\tDallas"}] },
  "csv-to-tsv": { fields: [{key:"text",label:"CSV",type:"textarea",placeholder:"name,city\nJane,Austin\nJohn,Dallas"}] },
  "yaml-validator": { fields: [{key:"yaml",label:"YAML",type:"textarea",placeholder:"site:\n  name: Avorqin\n  tools:\n    - json\n    - csv"}], note:"This checks common YAML syntax and indentation problems without adding a server-side parser or a new package dependency. Complex YAML features should still be verified with a full YAML parser." }
};

function n(values: Record<string,string>, key: string, label?: string): number {
  const raw = values[key]?.trim();
  if (!raw) throw new Error(`${label ?? key} is required.`);
  const value = Number(raw.replace(/[$,%\s]/g, ""));
  if (!Number.isFinite(value)) throw new Error(`${label ?? key} must be a valid number.`);
  return value;
}
function nz(value: number, label: string) { if (value <= 0) throw new Error(`${label} must be greater than zero.`); return value; }
function money(value: number) { return new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",maximumFractionDigits:2}).format(value); }
function number(value: number, digits=2) { return new Intl.NumberFormat("en-US", {maximumFractionDigits:digits}).format(value); }
function percent(value: number, digits=2) { return `${number(value,digits)}%`; }
function monthlyPayment(principal:number, annualRatePercent:number, months:number) {
  if (principal < 0 || months <= 0) throw new Error("Loan amount and term must be valid.");
  const r=annualRatePercent/100/12;
  return r===0 ? principal/months : principal*r/(1-Math.pow(1+r,-months));
}
function remainingBalance(principal:number, annualRatePercent:number, totalMonths:number, paidMonths:number) {
  const r=annualRatePercent/100/12;
  const pmt=monthlyPayment(principal,annualRatePercent,totalMonths);
  if (r===0) return Math.max(0,principal-pmt*paidMonths);
  return Math.max(0, principal*Math.pow(1+r,paidMonths)-pmt*(Math.pow(1+r,paidMonths)-1)/r);
}
function payoff(balance:number, apr:number, payment:number) {
  nz(balance,"Balance"); nz(payment,"Monthly payment");
  const r=apr/100/12; let months=0, interest=0, total=0, b=balance;
  while (b>0.005 && months<2400) {
    const i=b*r; if (payment<=i && r>0) throw new Error("The monthly payment is not high enough to cover monthly interest.");
    b+=i; interest+=i; const p=Math.min(payment,b); b-=p; total+=p; months++;
  }
  if (months>=2400) throw new Error("Payoff exceeds 200 years. Increase the payment amount.");
  return {months,interest,total};
}
function parseList(text:string,label:string) {
  const values=text.split(/[,\n]+/).map(v=>v.trim()).filter(Boolean).map(v=>Number(v.replace(/[$,%\s]/g,"")));
  if (!values.length || values.some(v=>!Number.isFinite(v))) throw new Error(`${label} must contain comma-separated numbers.`);
  return values;
}
function multiDebt(values:Record<string,string>, strategy:"snowball"|"avalanche") {
  const balances=parseList(values.balances,"Balances");
  const aprs=parseList(values.aprs,"APR rates");
  if (aprs.length!==balances.length) throw new Error("Enter one APR for each balance.");
  let mins=values.minimums?.trim()?parseList(values.minimums,"Minimum payments"):balances.map(b=>Math.max(25,b*0.02));
  if (mins.length!==balances.length) throw new Error("Enter one minimum payment for each balance.");
  const extra=Number((values.extra||"0").replace(/[$,%\s]/g,"")); if (!Number.isFinite(extra)||extra<0) throw new Error("Extra payment must be zero or greater.");
  const original=balances.slice(); const b=balances.slice(); let months=0,totalInterest=0,totalPaid=0;
  while (b.some(x=>x>0.005) && months<2400) {
    months++;
    for (let i=0;i<b.length;i++) if (b[i]>0) { const interest=b[i]*(aprs[i]/100/12); b[i]+=interest; totalInterest+=interest; }
    let rolled=extra;
    for (let i=0;i<b.length;i++) {
      if (b[i]<=0.005) { rolled+=mins[i]; continue; }
      const p=Math.min(mins[i],b[i]); b[i]-=p; totalPaid+=p;
    }
    const active=b.map((x,i)=>({i,b:x,apr:aprs[i]})).filter(x=>x.b>0.005);
    if (active.length) {
      active.sort(strategy==="snowball" ? (a,c)=>a.b-c.b : (a,c)=>c.apr-a.apr || a.b-c.b);
      const t=active[0].i; const p=Math.min(rolled,b[t]); b[t]-=p; totalPaid+=p;
    }
    if (months===1 && totalPaid <= totalInterest) throw new Error("Combined payments are not high enough to cover interest. Increase minimum or extra payments.");
  }
  if (months>=2400) throw new Error("Payoff exceeds 200 years. Increase the payment amounts.");
  return {months,totalInterest,totalPaid,starting:original.reduce((a,c)=>a+c,0)};
}
function solveApr(net:number,payment:number,months:number) {
  nz(net,"Net proceeds"); nz(payment,"Monthly payment"); nz(months,"Term");
  if (payment*months<=net) return 0;
  let low=0,high=1;
  for(let k=0;k<120;k++) { const r=(low+high)/2; const pv=payment*(1-Math.pow(1+r,-months))/r; if(pv>net) low=r; else high=r; }
  return (low+high)/2;
}
function monthsText(months:number) { const y=Math.floor(months/12),m=months%12; return y?`${y} yr${y===1?"":"s"}${m?` ${m} mo`:""}`:`${m} month${m===1?"":"s"}`; }
function result(label:string,value:string,note?:string):ResultItem { return {label,value,note}; }

function calculateFinance(kind:string,v:Record<string,string>):ResultItem[] {
  switch(kind) {
    case "auto-loan-calculator": { const price=n(v,"price","Vehicle price"),down=n({...v,down:v.down||"0"},"down"),trade=n({...v,trade:v.trade||"0"},"trade"),tax=n({...v,tax:v.tax||"0"},"tax"),apr=n(v,"apr","APR"),months=n(v,"months","Loan term"); nz(price,"Vehicle price"); nz(months,"Loan term"); const financed=Math.max(0,price*(1+tax/100)-down-trade); const pmt=monthlyPayment(financed,apr,months); return [result("Amount financed",money(financed)),result("Estimated monthly payment",money(pmt)),result("Total of loan payments",money(pmt*months)),result("Estimated interest",money(pmt*months-financed))]; }
    case "credit-card-payoff-calculator":
    case "debt-payoff-calculator": { const x=payoff(n(v,"balance","Balance"),n(v,"apr","APR"),n(v,"payment","Monthly payment")); return [result("Estimated payoff time",monthsText(x.months)),result("Total interest",money(x.interest)),result("Total paid",money(x.total))]; }
    case "debt-snowball-calculator":
    case "debt-avalanche-calculator": { const x=multiDebt(v,kind.includes("snowball")?"snowball":"avalanche"); return [result("Starting debt",money(x.starting)),result("Estimated payoff time",monthsText(x.months)),result("Estimated interest",money(x.totalInterest)),result("Estimated total paid",money(x.totalPaid))]; }
    case "apr-calculator": { const loan=n(v,"loan","Amount borrowed"),fees=n({...v,fees:v.fees||"0"},"fees"),payment=n(v,"payment","Monthly payment"),months=n(v,"months","Number of payments"); const net=loan-fees; nz(net,"Net loan proceeds"); const r=solveApr(net,payment,months); return [result("Net proceeds",money(net)),result("Estimated APR",percent(r*12*100,3)),result("Effective annual rate",percent((Math.pow(1+r,12)-1)*100,3)),result("Total scheduled payments",money(payment*months))]; }
    case "apy-calculator": { const rate=n(v,"rate","Interest rate"),freq=n(v,"n","Compounding periods"); nz(freq,"Compounding periods"); const apy=(Math.pow(1+rate/100/freq,freq)-1)*100; return [result("APY",percent(apy,4)),result("Stated annual rate",percent(rate,4)),result("Compounds per year",number(freq,0))]; }
    case "debt-to-income-ratio-calculator": { const income=n(v,"income","Gross monthly income"),debt=n(v,"debt","Monthly debt payments"); nz(income,"Gross monthly income"); const dti=debt/income*100; return [result("Debt-to-income ratio",percent(dti,2)),result("Monthly debt",money(debt)),result("Gross monthly income",money(income))]; }
    case "loan-amortization-calculator": { const p=n(v,"principal","Loan amount"),apr=n(v,"apr","APR"),years=n(v,"years","Term"); const months=years*12,pmt=monthlyPayment(p,apr,months),firstInterest=p*apr/100/12; return [result("Monthly payment",money(pmt)),result("Total interest",money(pmt*months-p)),result("Total repayment",money(pmt*months)),result("First payment: principal",money(pmt-firstInterest)),result("First payment: interest",money(firstInterest))]; }
    case "rule-of-72-calculator": { const rate=n(v,"rate","Annual growth rate"); nz(rate,"Annual growth rate"); return [result("Estimated doubling time",`${number(72/rate,2)} years`),result("Growth rate",percent(rate,2))]; }
    case "rent-vs-buy-calculator": { const rent=n(v,"rent","Monthly rent"),rentGrowth=n({...v,rentGrowth:v.rentGrowth||"0"},"rentGrowth"),home=n(v,"home","Home price"),down=n({...v,down:v.down||"0"},"down"),apr=n(v,"apr","Mortgage rate"),term=n(v,"term","Mortgage term"),tax=n({...v,tax:v.tax||"0"},"tax"),insurance=n({...v,insurance:v.insurance||"0"},"insurance"),app=n({...v,appreciation:v.appreciation||"0"},"appreciation"),horizon=n(v,"horizon","Comparison period"); const principal=Math.max(0,home-down),pmt=monthlyPayment(principal,apr,term*12),months=Math.min(term*12,Math.round(horizon*12)); let rentTotal=0,currentRent=rent; for(let y=0;y<Math.ceil(horizon);y++){ const portion=Math.min(12,Math.max(0,months-y*12)); rentTotal+=currentRent*portion; currentRent*=1+rentGrowth/100; } const futureHome=home*Math.pow(1+app/100,horizon); const remain=remainingBalance(principal,apr,term*12,months); const equity=futureHome-remain; const ownershipOutflow=down+pmt*months+(home*tax/100+insurance)*horizon; const netCost=ownershipOutflow-equity; return [result("Estimated rent paid",money(rentTotal)),result("Mortgage principal + interest payment",money(pmt)),result("Estimated home value after period",money(futureHome)),result("Estimated equity after period",money(equity)),result("Simplified net ownership cost",money(netCost)),result("Simplified difference",money(rentTotal-netCost),rentTotal>netCost?"Positive means buying is lower in this simplified comparison.":"Negative means renting is lower in this simplified comparison.")]; }
    case "down-payment-calculator": { const price=n(v,"price","Purchase price"),pct=n(v,"pct","Down payment percentage"); const down=price*pct/100; return [result("Down payment",money(down)),result("Estimated amount financed",money(Math.max(0,price-down))),result("Down payment percentage",percent(pct,2))]; }
    case "mortgage-refinance-calculator": { const balance=n(v,"balance","Balance"),oldRate=n(v,"oldRate","Current rate"),oldYears=n(v,"oldYears","Years remaining"),newRate=n(v,"newRate","New rate"),newYears=n(v,"newYears","New term"),costs=n({...v,costs:v.costs||"0"},"costs"); const oldP=monthlyPayment(balance,oldRate,oldYears*12),newP=monthlyPayment(balance,newRate,newYears*12),savings=oldP-newP; return [result("Current monthly P&I",money(oldP)),result("New monthly P&I",money(newP)),result("Monthly payment change",money(savings)),result("Closing-cost break-even",savings>0?monthsText(Math.ceil(costs/savings)):"No payment break-even"),result("Current remaining interest",money(oldP*oldYears*12-balance)),result("New scheduled interest + closing costs",money(newP*newYears*12-balance+costs))]; }
    case "biweekly-mortgage-calculator": { const balance=n(v,"balance","Balance"),apr=n(v,"apr","Interest rate"),years=n(v,"years","Term"); const months=years*12,std=monthlyPayment(balance,apr,months),stdInterest=std*months-balance; const per=apr/100/26,bi=std/2; let b=balance,periods=0,interest=0; while(b>0.005&&periods<2600){ const i=b*per;b+=i;interest+=i;const p=Math.min(bi,b);b-=p;periods++; } return [result("Standard monthly payment",money(std)),result("Biweekly payment",money(bi)),result("Standard payoff",`${years} years`),result("Estimated biweekly payoff",`${number(periods/26,2)} years`),result("Estimated interest saved",money(Math.max(0,stdInterest-interest)))]; }
    case "credit-card-interest-calculator": { const balance=n(v,"balance","Balance"),apr=n(v,"apr","APR"); return [result("Estimated monthly interest",money(balance*apr/100/12)),result("Estimated daily interest",money(balance*apr/100/365)),result("Annual interest at unchanged balance",money(balance*apr/100))]; }
    case "credit-card-minimum-payment-calculator": { const balance=n(v,"balance","Balance"),apr=n(v,"apr","APR"),pct=n(v,"pct","Minimum percentage"),floor=n(v,"floor","Minimum floor"); const interest=balance*apr/100/12; const payment=Math.min(balance,Math.max(balance*pct/100,floor,interest+1)); return [result("Estimated minimum payment",money(payment)),result("Estimated monthly interest",money(interest)),result("Amount above estimated interest",money(Math.max(0,payment-interest)))]; }
    case "pay-raise-calculator": { const salary=n(v,"salary","Current salary"),raise=n(v,"raise","Raise"); const inc=salary*raise/100; return [result("New annual salary",money(salary+inc)),result("Annual increase",money(inc)),result("Monthly increase",money(inc/12)),result("New monthly equivalent",money((salary+inc)/12))]; }
    case "overtime-pay-calculator": { const rate=n(v,"rate","Hourly rate"),regular=n(v,"regular","Regular hours"),ot=n(v,"ot","Overtime hours"),mult=n(v,"mult","Overtime multiplier"); const rp=rate*regular,op=rate*mult*ot; return [result("Regular pay",money(rp)),result("Overtime pay",money(op)),result("Total gross pay",money(rp+op)),result("Overtime hourly rate",money(rate*mult))]; }
    case "freelance-rate-calculator": { const income=n(v,"income","Target income"),hours=n(v,"hours","Billable hours"),weeks=n(v,"weeks","Working weeks"),over=n(v,"overhead","Overhead")/100,tax=n(v,"tax","Tax reserve")/100; nz(hours,"Billable hours");nz(weeks,"Working weeks"); if(over+tax>=0.95) throw new Error("Overhead plus tax reserve must be less than 95%."); const revenue=income/(1-over-tax),rate=revenue/(hours*weeks); return [result("Suggested minimum hourly rate",money(rate)),result("Required annual billed revenue",money(revenue)),result("Annual billable hours",number(hours*weeks,0)),result("Weekly billed revenue target",money(revenue/weeks))]; }
    case "cost-per-unit-calculator": { const cost=n(v,"cost","Total cost"),units=n(v,"units","Units");nz(units,"Units");return [result("Cost per unit",money(cost/units)),result("Total cost",money(cost)),result("Units",number(units,2))]; }
    case "unit-price-calculator": { const price=n(v,"price","Package price"),qty=n(v,"qty","Quantity");nz(qty,"Quantity");return [result("Unit price",money(price/qty)),result("Package price",money(price)),result("Quantity",number(qty,2))]; }
    case "price-per-square-foot-calculator": { const price=n(v,"price","Price"),area=n(v,"area","Area");nz(area,"Area");return [result("Price per square foot",money(price/area)),result("Total price",money(price)),result("Area",`${number(area,2)} sq ft`)]; }
    case "revenue-growth-calculator": { const old=n(v,"old","Earlier revenue"),now=n(v,"now","Current revenue");nz(Math.abs(old),"Earlier revenue");const change=now-old;return [result("Revenue growth",percent(change/old*100,2)),result("Dollar change",money(change)),result("Current revenue",money(now))]; }
    case "customer-acquisition-cost-calculator": { const spend=n(v,"spend","Spend"),customers=n(v,"customers","New customers");nz(customers,"New customers");return [result("Customer acquisition cost",money(spend/customers)),result("Total spend",money(spend)),result("New customers",number(customers,0))]; }
    case "customer-lifetime-value-calculator": { const aov=n(v,"aov","Average order value"),freq=n(v,"freq","Purchase frequency"),years=n(v,"years","Customer lifespan"),margin=n(v,"margin","Gross margin")/100; const revenue=aov*freq*years;return [result("Estimated customer lifetime value",money(revenue*margin)),result("Lifetime revenue before margin",money(revenue)),result("Annual revenue per customer",money(aov*freq)),result("Gross margin",percent(margin*100,2))]; }
    case "roas-calculator": { const revenue=n(v,"revenue","Revenue"),spend=n(v,"spend","Ad spend");nz(spend,"Ad spend");return [result("ROAS",`${number(revenue/spend,2)}x`),result("ROAS percentage",percent(revenue/spend*100,2)),result("Revenue minus ad spend",money(revenue-spend))]; }
    case "cpm-calculator": { const spend=n(v,"spend","Ad spend"),impressions=n(v,"impressions","Impressions");nz(impressions,"Impressions");return [result("CPM",money(spend/impressions*1000)),result("Ad spend",money(spend)),result("Impressions",number(impressions,0))]; }
    case "cpc-calculator": { const spend=n(v,"spend","Ad spend"),clicks=n(v,"clicks","Clicks");nz(clicks,"Clicks");return [result("CPC",money(spend/clicks)),result("Ad spend",money(spend)),result("Clicks",number(clicks,0))]; }
    case "cpa-calculator": { const spend=n(v,"spend","Ad spend"),conversions=n(v,"conversions","Conversions");nz(conversions,"Conversions");return [result("CPA",money(spend/conversions)),result("Ad spend",money(spend)),result("Acquisitions",number(conversions,0))]; }
    case "conversion-rate-calculator": { const visitors=n(v,"visitors","Visitors"),conversions=n(v,"conversions","Conversions");nz(visitors,"Visitors");return [result("Conversion rate",percent(conversions/visitors*100,2)),result("Conversions",number(conversions,0)),result("Visitors / sessions",number(visitors,0))]; }
    default: throw new Error("This calculator is not configured.");
  }
}

function parseDelimited(text:string, delimiter:string) {
  const rows:string[][]=[]; let row:string[]=[],field="",quoted=false;
  for(let i=0;i<text.length;i++) { const ch=text[i];
    if(quoted) { if(ch==='"' && text[i+1]==='"'){field+='"';i++;} else if(ch==='"'){quoted=false;} else field+=ch; }
    else if(ch==='"'){quoted=true;} else if(ch===delimiter){row.push(field);field="";} else if(ch==='\n'){row.push(field);rows.push(row);row=[];field="";} else if(ch==='\r'){} else field+=ch;
  }
  if(quoted) throw new Error("A quoted field is not closed.");
  if(field.length||row.length){row.push(field);rows.push(row);} return rows;
}
function quoteField(value:string,delimiter:string){ const must=value.includes(delimiter)||/["\r\n]/.test(value)||/^\s|\s$/.test(value); const escaped=value.replace(/"/g,'""'); return must?`"${escaped}"`:escaped; }
function stringifyRows(rows:string[][],delimiter:string){ return rows.map(r=>r.map(v=>quoteField(v,delimiter)).join(delimiter)).join("\n"); }
function columnIndex(header:string[], spec:string){ const trimmed=spec.trim(); const byName=header.findIndex(h=>h.trim().toLowerCase()===trimmed.toLowerCase()); if(byName>=0)return byName; const numeric=Number(trimmed); if(Number.isInteger(numeric)&&numeric>=1&&numeric<=header.length)return numeric-1; throw new Error("Column was not found. Use an exact header name or a valid 1-based column number."); }
function parseXml(xml:string){ const doc=new DOMParser().parseFromString(xml,"application/xml"); const err=doc.querySelector("parsererror"); if(err) throw new Error("Malformed XML: " + (err.textContent||"parser error").split("\n")[0]); return doc; }
function getLocs(doc:Document){ return Array.from(doc.getElementsByTagName("loc")).map(el=>(el.textContent||"").trim()).filter(Boolean); }
function validateSchemaValue(data:unknown,schema:any,path:string,errors:string[]){
  if(!schema||typeof schema!=="object")return;
  if(Array.isArray(schema.enum)&&!schema.enum.some((x:any)=>JSON.stringify(x)===JSON.stringify(data))) errors.push(`${path}: value is not in enum.`);
  const t=schema.type;
  if(t){ let ok=true; if(t==="null")ok=data===null; else if(t==="array")ok=Array.isArray(data); else if(t==="object")ok=typeof data==="object"&&data!==null&&!Array.isArray(data); else if(t==="integer")ok=typeof data==="number"&&Number.isInteger(data); else ok=typeof data===t; if(!ok){errors.push(`${path}: expected ${t}.`);return;} }
  if(typeof data==="number"){ if(typeof schema.minimum==="number"&&data<schema.minimum)errors.push(`${path}: must be >= ${schema.minimum}.`); if(typeof schema.maximum==="number"&&data>schema.maximum)errors.push(`${path}: must be <= ${schema.maximum}.`); }
  if(typeof data==="string"){ if(typeof schema.minLength==="number"&&data.length<schema.minLength)errors.push(`${path}: string is shorter than ${schema.minLength}.`); if(typeof schema.maxLength==="number"&&data.length>schema.maxLength)errors.push(`${path}: string is longer than ${schema.maxLength}.`); if(schema.pattern){try{if(!new RegExp(schema.pattern).test(data))errors.push(`${path}: does not match pattern.`);}catch{errors.push(`${path}: schema contains an invalid regular expression.`);}} }
  if(Array.isArray(data)){ if(typeof schema.minItems==="number"&&data.length<schema.minItems)errors.push(`${path}: needs at least ${schema.minItems} items.`); if(typeof schema.maxItems==="number"&&data.length>schema.maxItems)errors.push(`${path}: allows at most ${schema.maxItems} items.`); if(schema.items)data.forEach((x,i)=>validateSchemaValue(x,schema.items,`${path}[${i}]`,errors)); }
  if(typeof data==="object"&&data!==null&&!Array.isArray(data)){ const obj=data as Record<string,unknown>; if(Array.isArray(schema.required))for(const k of schema.required)if(!(k in obj))errors.push(`${path}: missing required property ${k}.`); if(schema.properties&&typeof schema.properties==="object")for(const [k,s] of Object.entries(schema.properties))if(k in obj)validateSchemaValue(obj[k],s,`${path}.${k}`,errors); }
}
function commonYamlIssues(text:string){ const errors:string[]=[]; const lines=text.replace(/\r/g,"").split("\n"); let previousIndent=0; let previousCanNest=false; const quoteBalanced=(line:string,q:string)=>{let c=0,esc=false;for(const ch of line){if(ch==='\\'&&!esc){esc=true;continue;}if(ch===q&&!esc)c++;esc=false;}return c%2===0;};
  lines.forEach((line,i)=>{ if(!line.trim()||line.trim().startsWith("#"))return; if(line.includes("\t"))errors.push(`Line ${i+1}: tabs are not recommended for YAML indentation.`); const indent=(line.match(/^ */)||[""])[0].length; if(indent>previousIndent && !previousCanNest) errors.push(`Line ${i+1}: indentation increases after a line that does not appear to open a nested block.`); if(!quoteBalanced(line,"\"")||!quoteBalanced(line,"'"))errors.push(`Line ${i+1}: unbalanced quote.`); let square=0,curly=0; for(const ch of line.replace(/(['\"]).*?\1/g,"")){if(ch==='[')square++;if(ch===']')square--;if(ch==='{')curly++;if(ch==='}')curly--;} if(square!==0||curly!==0)errors.push(`Line ${i+1}: unbalanced inline brackets or braces.`); const trimmed=line.trim(); previousCanNest=trimmed.endsWith(":")||/^-[^:]*:\s*$/.test(trimmed)||trimmed==="-"; previousIndent=indent; }); return errors;
}
function runText(kind:string,v:Record<string,string>):{output:string;summary?:ResultItem[]} {
  switch(kind){
    case "title-tag-length-checker": {const text=v.text||"",len=text.length,status=len===0?"Empty":len<30?"Short":len<=60?"Common range":"Long";return {output:text,summary:[result("Characters",String(len)),result("Length assessment",status),result("Approx. width",`${Math.round(len*7.2)} px`,"Actual Google rendering varies by character width, device, and query.")]};}
    case "meta-description-length-checker": {const text=v.text||"",len=text.length,status=len===0?"Empty":len<120?"Short":len<=160?"Common range":"Long";return {output:text,summary:[result("Characters",String(len)),result("Length assessment",status),result("Words",String(text.trim()?text.trim().split(/\s+/).length:0))]};}
    case "canonical-tag-generator": {let url:URL;try{url=new URL(v.url.trim());}catch{throw new Error("Enter a valid absolute URL including https:// or http://.");} if(!/^https?:$/.test(url.protocol))throw new Error("Canonical URLs should use http or https."); return {output:`<link rel="canonical" href="${url.toString().replace(/"/g,"&quot;")}">`,summary:[result("Canonical URL",url.toString())]};}
    case "meta-robots-tag-generator": {const allowed=/^(index|noindex|follow|nofollow|noarchive|nosnippet|notranslate|noimageindex|none|all|max-snippet:-?\d+|max-image-preview:(none|standard|large)|max-video-preview:-?\d+|unavailable_after:.+)$/i; const dirs=(v.directives||"").split(",").map(x=>x.trim()).filter(Boolean);if(!dirs.length)throw new Error("Enter at least one robots directive."); const bad=dirs.filter(x=>!allowed.test(x)); return {output:`<meta name="robots" content="${dirs.join(", ")}">`,summary:[result("Directives",dirs.join(", ")),result("Unrecognized directives",bad.length?bad.join(", "):"None")]};}
    case "hreflang-validator": {const rows=(v.entries||"").split(/\n/).map(x=>x.trim()).filter(Boolean);if(!rows.length)throw new Error("Paste at least one hreflang entry.");const seen=new Set<string>(),errors:string[]=[];let xdefault=0;rows.forEach((row,i)=>{const m=row.match(/^([^=,\s]+)\s*(?:=|,|\s)\s*(https?:\/\/\S+)$/i);if(!m){errors.push(`Line ${i+1}: use code = https://example.com/page/`);return;}const code=m[1],url=m[2];if(code==="x-default")xdefault++;else if(!/^[a-z]{2,3}(?:-[A-Z][a-z]{3})?(?:-[A-Z]{2}|-\d{3})?$/.test(code))errors.push(`Line ${i+1}: uncommon or malformed hreflang code "${code}".`);if(seen.has(code.toLowerCase()))errors.push(`Line ${i+1}: duplicate hreflang code "${code}".`);seen.add(code.toLowerCase());try{new URL(url);}catch{errors.push(`Line ${i+1}: invalid URL.`);}});if(xdefault>1)errors.push("More than one x-default entry was found.");return {output:errors.length?errors.join("\n"):"No common hreflang problems found.",summary:[result("Entries checked",String(rows.length)),result("Issues",String(errors.length)),result("x-default",xdefault?"Present":"Not present")]};}
    case "json-ld-validator": {let data:any;try{data=JSON.parse(v.json);}catch(e){throw new Error("Invalid JSON: "+(e instanceof Error?e.message:"parse error"));}const nodes=Array.isArray(data)?data:[data],warnings:string[]=[];nodes.forEach((x:any,i:number)=>{if(!x||typeof x!=="object")warnings.push(`Item ${i+1}: JSON-LD node should be an object.`);else{if(!("@context" in x))warnings.push(`Item ${i+1}: missing @context.`);if(!("@type" in x))warnings.push(`Item ${i+1}: missing @type.`);}});return {output:warnings.length?warnings.join("\n"):"Valid JSON syntax. Common JSON-LD fields @context and @type are present.",summary:[result("JSON-LD nodes",String(nodes.length)),result("Warnings",String(warnings.length))]};}
    case "xml-sitemap-validator": {const doc=parseXml(v.xml),root=doc.documentElement?.localName||"",locs=getLocs(doc),invalid=locs.filter(x=>{try{new URL(x);return false;}catch{return true;}});if(root!=="urlset"&&root!=="sitemapindex")throw new Error(`Root element is <${root||"unknown"}>; expected <urlset> or <sitemapindex>.`);return {output:invalid.length?`Invalid <loc> URLs:\n${invalid.join("\n")}`:"XML is well-formed and no malformed <loc> URLs were found.",summary:[result("Sitemap type",root),result("<loc> entries",String(locs.length)),result("Malformed URLs",String(invalid.length))]};}
    case "sitemap-url-extractor": {const locs=getLocs(parseXml(v.xml));if(!locs.length)throw new Error("No <loc> URLs were found.");return {output:locs.join("\n"),summary:[result("URLs extracted",String(locs.length))]};}
    case "redirect-rule-generator": {const source=(v.source||"").trim(),dest=(v.destination||"").trim(),status=v.status||"301";if(!source.startsWith("/"))throw new Error("Source path should begin with /.");if(!dest)throw new Error("Destination is required.");const permanent=status==="301"||status==="308"; const nginx=`# Nginx\nreturn ${status} ${dest};`; const pattern=source.replace(/^\//,"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); const apache=`# Apache (.htaccess)\nRedirect ${permanent?"permanent":"temp"} ${source} ${dest}\n\n# Apache mod_rewrite alternative\nRewriteRule ^${pattern}$ ${dest} [R=${status},L]`;return {output:`${apache}\n\n${nginx}`,summary:[result("Status",status),result("Source",source),result("Destination",dest)]};}
    case "utm-decoder": {let url:URL;try{url=new URL(v.url.trim());}catch{throw new Error("Enter a valid absolute URL.");}const keys=["utm_source","utm_medium","utm_campaign","utm_term","utm_content","utm_id","utm_source_platform","utm_creative_format","utm_marketing_tactic"];const found:Record<string,string>={};keys.forEach(k=>{const val=url.searchParams.get(k);if(val!==null)found[k]=val;});if(!Object.keys(found).length)throw new Error("No UTM parameters were found in this URL.");return {output:JSON.stringify(found,null,2),summary:Object.entries(found).map(([k,val])=>result(k,val))};}
    case "json-schema-validator": {let data:any,schema:any;try{data=JSON.parse(v.json);}catch(e){throw new Error("JSON data is invalid: "+(e instanceof Error?e.message:"parse error"));}try{schema=JSON.parse(v.schema);}catch(e){throw new Error("JSON Schema is invalid JSON: "+(e instanceof Error?e.message:"parse error"));}const errors:string[]=[];validateSchemaValue(data,schema,"$",errors);return {output:errors.length?errors.join("\n"):"The JSON matches the supported schema rules.",summary:[result("Validation errors",String(errors.length)),result("Result",errors.length?"Does not match":"Matches supported rules")]};}
    case "json-escape-unescape": {const text=v.text||"";if(v.mode==="unescape"){let out:string;try{out=JSON.parse(`"${text}"`);}catch(e){throw new Error("Unable to unescape this JSON string content: "+(e instanceof Error?e.message:"parse error"));}return {output:out,summary:[result("Output characters",String(out.length))]};}const out=JSON.stringify(text).slice(1,-1);return {output:out,summary:[result("Escaped characters",String(out.length))]};}
    case "json-string-converter": {if(v.mode==="decode"){let inner:any;try{inner=JSON.parse(v.text);}catch(e){throw new Error("Input must be a valid JSON string literal, including the outer quotes.");}if(typeof inner!=="string")throw new Error("Decoded value is not a JSON string. Wrap the escaped JSON in outer quotes.");let parsed:any;try{parsed=JSON.parse(inner);}catch{throw new Error("The decoded string does not contain valid JSON.");}return {output:JSON.stringify(parsed,null,2)};}let parsed:any;try{parsed=JSON.parse(v.text);}catch(e){throw new Error("Input must be valid JSON before it can be converted to a JSON string.");}return {output:JSON.stringify(JSON.stringify(parsed))};}
    case "csv-formatter": {const rows=parseDelimited(v.csv,",");if(!rows.length)throw new Error("No CSV rows were found.");const width=Math.max(...rows.map(r=>r.length));return {output:stringifyRows(rows,","),summary:[result("Rows",String(rows.length)),result("Maximum columns",String(width))]};}
    case "csv-column-extractor": {const rows=parseDelimited(v.csv,",");if(rows.length<1)throw new Error("No CSV rows were found.");const idx=columnIndex(rows[0],v.column||"");const values=rows.slice(1).map(r=>r[idx]??"");return {output:values.join("\n"),summary:[result("Column",rows[0][idx]||`#${idx+1}`),result("Values",String(values.length))]};}
    case "csv-duplicate-remover": {const rows=parseDelimited(v.csv,",");if(!rows.length)throw new Error("No CSV rows were found.");const out=[rows[0]],seen=new Set<string>();let removed=0;for(const row of rows.slice(1)){const key=JSON.stringify(row);if(seen.has(key)){removed++;continue;}seen.add(key);out.push(row);}return {output:stringifyRows(out,","),summary:[result("Duplicate rows removed",String(removed)),result("Rows remaining",String(out.length))]};}
    case "csv-sorter": {const rows=parseDelimited(v.csv,",");if(rows.length<2)throw new Error("CSV needs a header and at least one data row.");const idx=columnIndex(rows[0],v.column||"");const direction=v.direction==="desc"?-1:1;const data=rows.slice(1).sort((a,b)=>{const av=a[idx]??"",bv=b[idx]??"",an=Number(av),bn=Number(bv);const cmp=Number.isFinite(an)&&Number.isFinite(bn)?an-bn:av.localeCompare(bv,undefined,{numeric:true,sensitivity:"base"});return cmp*direction;});return {output:stringifyRows([rows[0],...data],","),summary:[result("Sorted by",rows[0][idx]||`#${idx+1}`),result("Direction",direction===1?"Ascending":"Descending"),result("Data rows",String(data.length))]};}
    case "tsv-to-csv": {const rows=parseDelimited(v.text,"\t");if(!rows.length)throw new Error("No TSV rows were found.");return {output:stringifyRows(rows,","),summary:[result("Rows",String(rows.length))]};}
    case "csv-to-tsv": {const rows=parseDelimited(v.text,",");if(!rows.length)throw new Error("No CSV rows were found.");return {output:stringifyRows(rows,"\t"),summary:[result("Rows",String(rows.length))]};}
    case "yaml-validator": {const errors=commonYamlIssues(v.yaml||"");return {output:errors.length?errors.join("\n"):"No common YAML syntax or indentation problems were found.",summary:[result("Lines",String((v.yaml||"").split(/\r?\n/).length)),result("Common issues",String(errors.length)),result("Assessment",errors.length?"Review needed":"No common issues found")]};}
    default: throw new Error("This utility is not configured.");
  }
}

function ResultGrid({items}:{items:ResultItem[]}) { return <div className="grid gap-3 sm:grid-cols-2">{items.map((item,i)=><div key={`${item.label}-${i}`} className="rounded-xl border bg-background p-4"><div className="text-sm text-muted-foreground">{item.label}</div><div className="mt-1 break-words text-xl font-semibold">{item.value}</div>{item.note&&<div className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.note}</div>}</div>)}</div>; }

function FinanceCalculator({kind,config}:{kind:string;config:FinanceConfig}) {
  const initial=useMemo(()=>Object.fromEntries(config.fields.map(f=>[f.key,f.defaultValue||""])),[config]);
  const [values,setValues]=useState<Record<string,string>>(initial); const [items,setItems]=useState<ResultItem[]>([]); const [error,setError]=useState("");
  const run=()=>{setError("");try{setItems(calculateFinance(kind,values));}catch(e){setItems([]);setError(e instanceof Error?e.message:"Unable to calculate.");}};
  const reset=()=>{setValues(initial);setItems([]);setError("");};
  return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2">{config.fields.map(f=><label key={f.key} className="block space-y-2"><span className="text-sm font-medium">{f.label}</span><input type={f.type==="text"?"text":"number"} step="any" value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));setItems([]);setError("");}} placeholder={f.placeholder} className={inputClass}/></label>)}</div>{config.note&&<div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">{config.note}</div>}<div className="flex flex-wrap gap-3"><button type="button" onClick={run} className={buttonClass}>{config.button||"Calculate"}</button><button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button></div>{error&&<div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}{items.length>0&&<ResultGrid items={items}/>}</div>;
}

function TextUtility({kind,config}:{kind:string;config:TextConfig}) {
  const initial=useMemo(()=>Object.fromEntries(config.fields.map(f=>[f.key,f.defaultValue||""])),[config]); const [values,setValues]=useState<Record<string,string>>(initial); const [output,setOutput]=useState(""); const [summary,setSummary]=useState<ResultItem[]>([]);const[error,setError]=useState("");const[copied,setCopied]=useState(false);
  const run=()=>{setError("");setCopied(false);try{const r=runText(kind,values);setOutput(r.output);setSummary(r.summary||[]);}catch(e){setOutput("");setSummary([]);setError(e instanceof Error?e.message:"Unable to process input.");}};
  const reset=()=>{setValues(initial);setOutput("");setSummary([]);setError("");setCopied(false);}; const copy=async()=>{if(!output)return;try{await navigator.clipboard.writeText(output);setCopied(true);window.setTimeout(()=>setCopied(false),1500);}catch{setError("Unable to copy output.");}};
  return <div className="space-y-5">{config.fields.map(f=><label key={f.key} className="block space-y-2"><span className="text-sm font-medium">{f.label}</span>{f.type==="textarea"?<textarea value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));setOutput("");setSummary([]);setError("");}} placeholder={f.placeholder} className={textareaClass}/>:f.type==="select"?<select value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));setOutput("");setSummary([]);setError("");}} className={inputClass}>{(f.options||[]).map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>:<input type="text" value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));setOutput("");setSummary([]);setError("");}} placeholder={f.placeholder} className={inputClass}/>}</label>)}{config.note&&<div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">{config.note}</div>}<div className="flex flex-wrap gap-3"><button type="button" onClick={run} className={buttonClass}>{config.button||"Run Tool"}</button><button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button></div>{error&&<div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}{summary.length>0&&<ResultGrid items={summary}/>} {output!==""&&<div className="space-y-2"><div className="flex items-center justify-between gap-3"><span className="text-sm font-medium">Result</span><button type="button" onClick={copy} className={secondaryButtonClass}>{copied?"Copied":"Copy"}</button></div><textarea readOnly value={output} className={textareaClass} aria-label="Result"/></div>}</div>;
}

export function Batch201250Tool({kind}:{kind:Batch201250Kind}) { const finance=FINANCE[kind]; if(finance)return <FinanceCalculator kind={kind} config={finance}/>; const text=TEXT[kind]; if(text)return <TextUtility kind={kind} config={text}/>; return <div className="rounded-lg border p-4 text-sm text-muted-foreground">This tool is not configured.</div>; }
