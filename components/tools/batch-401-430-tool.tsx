"use client";

import { useMemo, useState } from "react";

export type Batch401430Kind =
  | "average-order-value-calculator"
  | "click-through-rate-calculator"
  | "cost-per-lead-calculator"
  | "lead-conversion-rate-calculator"
  | "email-open-rate-calculator"
  | "email-click-through-rate-calculator"
  | "ecommerce-profit-calculator"
  | "gmroi-calculator"
  | "inventory-turnover-calculator"
  | "reorder-point-calculator"
  | "safety-stock-calculator"
  | "economic-order-quantity-calculator"
  | "sell-through-rate-calculator"
  | "cart-abandonment-rate-calculator"
  | "engagement-rate-calculator"
  | "churn-rate-calculator"
  | "retention-rate-calculator"
  | "mrr-calculator"
  | "arr-calculator"
  | "mrr-growth-calculator"
  | "ltv-to-cac-ratio-calculator"
  | "cac-payback-period-calculator"
  | "payback-period-calculator"
  | "contribution-margin-calculator"
  | "operating-margin-calculator"
  | "ebitda-margin-calculator"
  | "cost-of-goods-sold-calculator"
  | "average-revenue-per-user-calculator"
  | "ad-spend-calculator"
  | "target-roas-calculator";

type Field={key:string;label:string;defaultValue:string;type?:"number"|"select";options?:{label:string;value:string}[]};
type Config={fields:Field[];note?:string};
type Result={output:string;items:{label:string;value:string}[]};
const inputClass="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const buttonClass="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondary="rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";
const num=(v:string,l:string)=>{const n=Number(v);if(!Number.isFinite(n))throw new Error(`${l} must be a valid number.`);return n;};
const pos=(v:string,l:string)=>{const n=num(v,l);if(n<=0)throw new Error(`${l} must be greater than zero.`);return n;};
const nonneg=(v:string,l:string)=>{const n=num(v,l);if(n<0)throw new Error(`${l} cannot be negative.`);return n;};
const money=(n:number)=>new Intl.NumberFormat(undefined,{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n);
const fmt=(n:number,d=4)=>new Intl.NumberFormat(undefined,{maximumFractionDigits:d}).format(n);
const pct=(n:number)=>`${fmt(n,2)}%`;
const R=(output:string,pairs:[string,string][]):Result=>({output,items:pairs.map(([label,value])=>({label,value}))});
const percent=(a:number,b:number)=>b===0?(()=>{throw new Error("The denominator must be greater than zero.")})():a/b*100;

const CONFIG:Record<Batch401430Kind,Config>={
"average-order-value-calculator":{fields:[{key:"revenue",label:"Revenue ($)",defaultValue:"10000"},{key:"orders",label:"Orders",defaultValue:"250"}]},
"click-through-rate-calculator":{fields:[{key:"clicks",label:"Clicks",defaultValue:"250"},{key:"impressions",label:"Impressions",defaultValue:"10000"}]},
"cost-per-lead-calculator":{fields:[{key:"spend",label:"Marketing spend ($)",defaultValue:"2000"},{key:"leads",label:"Leads",defaultValue:"80"}]},
"lead-conversion-rate-calculator":{fields:[{key:"leads",label:"Leads",defaultValue:"80"},{key:"visitors",label:"Visitors or prospects",defaultValue:"2000"}]},
"email-open-rate-calculator":{fields:[{key:"opens",label:"Unique opens",defaultValue:"2500"},{key:"delivered",label:"Delivered emails",defaultValue:"10000"}]},
"email-click-through-rate-calculator":{fields:[{key:"clicks",label:"Unique clicks",defaultValue:"500"},{key:"delivered",label:"Delivered emails",defaultValue:"10000"}]},
"ecommerce-profit-calculator":{fields:[{key:"revenue",label:"Revenue ($)",defaultValue:"25000"},{key:"cogs",label:"Cost of goods sold ($)",defaultValue:"10000"},{key:"other",label:"Other operating costs ($)",defaultValue:"5000"}]},
"gmroi-calculator":{fields:[{key:"grossProfit",label:"Gross margin / gross profit ($)",defaultValue:"50000"},{key:"inventory",label:"Average inventory cost ($)",defaultValue:"20000"}]},
"inventory-turnover-calculator":{fields:[{key:"cogs",label:"Cost of goods sold ($)",defaultValue:"120000"},{key:"inventory",label:"Average inventory ($)",defaultValue:"30000"}]},
"reorder-point-calculator":{fields:[{key:"daily",label:"Average daily demand (units)",defaultValue:"25"},{key:"lead",label:"Lead time (days)",defaultValue:"10"},{key:"safety",label:"Safety stock (units)",defaultValue:"100"}]},
"safety-stock-calculator":{fields:[{key:"maxDaily",label:"Maximum daily demand",defaultValue:"40"},{key:"maxLead",label:"Maximum lead time (days)",defaultValue:"14"},{key:"avgDaily",label:"Average daily demand",defaultValue:"25"},{key:"avgLead",label:"Average lead time (days)",defaultValue:"10"}]},
"economic-order-quantity-calculator":{fields:[{key:"demand",label:"Annual demand (units)",defaultValue:"10000"},{key:"orderCost",label:"Ordering cost per order ($)",defaultValue:"50"},{key:"holding",label:"Annual holding cost per unit ($)",defaultValue:"5"}]},
"sell-through-rate-calculator":{fields:[{key:"sold",label:"Units sold",defaultValue:"800"},{key:"received",label:"Units received",defaultValue:"1000"}]},
"cart-abandonment-rate-calculator":{fields:[{key:"started",label:"Carts / checkouts initiated",defaultValue:"1000"},{key:"completed",label:"Completed orders",defaultValue:"300"}]},
"engagement-rate-calculator":{fields:[{key:"interactions",label:"Interactions",defaultValue:"750"},{key:"base",label:"Audience or impressions",defaultValue:"10000"}]},
"churn-rate-calculator":{fields:[{key:"lost",label:"Customers lost",defaultValue:"50"},{key:"start",label:"Customers at start",defaultValue:"1000"}]},
"retention-rate-calculator":{fields:[{key:"end",label:"Customers at end",defaultValue:"1050"},{key:"new",label:"New customers acquired",defaultValue:"150"},{key:"start",label:"Customers at start",defaultValue:"1000"}]},
"mrr-calculator":{fields:[{key:"customers",label:"Paying customers",defaultValue:"250"},{key:"arpc",label:"Average monthly revenue per customer ($)",defaultValue:"40"}]},
"arr-calculator":{fields:[{key:"mrr",label:"Monthly recurring revenue ($)",defaultValue:"10000"}]},
"mrr-growth-calculator":{fields:[{key:"previous",label:"Previous MRR ($)",defaultValue:"9000"},{key:"current",label:"Current MRR ($)",defaultValue:"10000"}]},
"ltv-to-cac-ratio-calculator":{fields:[{key:"ltv",label:"Customer lifetime value ($)",defaultValue:"1200"},{key:"cac",label:"Customer acquisition cost ($)",defaultValue:"300"}]},
"cac-payback-period-calculator":{fields:[{key:"cac",label:"Customer acquisition cost ($)",defaultValue:"300"},{key:"monthlyRevenue",label:"Monthly revenue per customer ($)",defaultValue:"60"},{key:"grossMargin",label:"Gross margin (%)",defaultValue:"80"}]},
"payback-period-calculator":{fields:[{key:"investment",label:"Initial investment ($)",defaultValue:"50000"},{key:"cashflow",label:"Recurring annual cash flow ($)",defaultValue:"15000"}]},
"contribution-margin-calculator":{fields:[{key:"revenue",label:"Revenue ($)",defaultValue:"100000"},{key:"variable",label:"Variable costs ($)",defaultValue:"60000"}]},
"operating-margin-calculator":{fields:[{key:"income",label:"Operating income ($)",defaultValue:"20000"},{key:"revenue",label:"Revenue ($)",defaultValue:"100000"}]},
"ebitda-margin-calculator":{fields:[{key:"ebitda",label:"EBITDA ($)",defaultValue:"25000"},{key:"revenue",label:"Revenue ($)",defaultValue:"100000"}]},
"cost-of-goods-sold-calculator":{fields:[{key:"begin",label:"Beginning inventory ($)",defaultValue:"20000"},{key:"purchases",label:"Purchases ($)",defaultValue:"80000"},{key:"end",label:"Ending inventory ($)",defaultValue:"25000"}]},
"average-revenue-per-user-calculator":{fields:[{key:"revenue",label:"Revenue ($)",defaultValue:"50000"},{key:"users",label:"Active users / customers",defaultValue:"2000"}]},
"ad-spend-calculator":{fields:[{key:"model",label:"Pricing model",defaultValue:"cpc",type:"select",options:[{label:"CPC (cost per click)",value:"cpc"},{label:"CPM (cost per 1,000 impressions)",value:"cpm"}]},{key:"rate",label:"CPC or CPM rate ($)",defaultValue:"1.50"},{key:"volume",label:"Clicks or impressions",defaultValue:"1000"}]},
"target-roas-calculator":{fields:[{key:"revenue",label:"Target revenue ($)",defaultValue:"50000"},{key:"spend",label:"Ad spend ($)",defaultValue:"10000"}]},
};

function run(kind:Batch401430Kind,v:Record<string,string>):Result{
 switch(kind){
 case "average-order-value-calculator":{const r=nonneg(v.revenue,"Revenue"),o=pos(v.orders,"Orders"),x=r/o;return R(money(x),[["Average order value",money(x)],["Revenue",money(r)],["Orders",fmt(o)]]);}
 case "click-through-rate-calculator":{const x=percent(nonneg(v.clicks,"Clicks"),pos(v.impressions,"Impressions"));return R(pct(x),[["Click-through rate",pct(x)]]);}
 case "cost-per-lead-calculator":{const x=nonneg(v.spend,"Spend")/pos(v.leads,"Leads");return R(money(x),[["Cost per lead",money(x)]]);}
 case "lead-conversion-rate-calculator":{const x=percent(nonneg(v.leads,"Leads"),pos(v.visitors,"Visitors or prospects"));return R(pct(x),[["Lead conversion rate",pct(x)]]);}
 case "email-open-rate-calculator":{const x=percent(nonneg(v.opens,"Opens"),pos(v.delivered,"Delivered emails"));return R(pct(x),[["Email open rate",pct(x)]]);}
 case "email-click-through-rate-calculator":{const x=percent(nonneg(v.clicks,"Clicks"),pos(v.delivered,"Delivered emails"));return R(pct(x),[["Email click-through rate",pct(x)]]);}
 case "ecommerce-profit-calculator":{const rev=pos(v.revenue,"Revenue"),profit=rev-nonneg(v.cogs,"COGS")-nonneg(v.other,"Other costs"),margin=profit/rev*100;return R(money(profit),[["Profit",money(profit)],["Profit margin",pct(margin)]]);}
 case "gmroi-calculator":{const x=nonneg(v.grossProfit,"Gross margin")/pos(v.inventory,"Average inventory");return R(`${fmt(x,3)}x`,[["GMROI",`${fmt(x,3)}x`]]);}
 case "inventory-turnover-calculator":{const x=nonneg(v.cogs,"COGS")/pos(v.inventory,"Average inventory");return R(`${fmt(x,3)}x`,[["Inventory turnover",`${fmt(x,3)}x`],["Approx. days inventory",fmt(365/x,1)]]);}
 case "reorder-point-calculator":{const x=nonneg(v.daily,"Daily demand")*nonneg(v.lead,"Lead time")+nonneg(v.safety,"Safety stock");return R(`${fmt(x)} units`,[["Reorder point",`${fmt(x)} units`]]);}
 case "safety-stock-calculator":{const x=Math.max(0,nonneg(v.maxDaily,"Maximum daily demand")*nonneg(v.maxLead,"Maximum lead time")-nonneg(v.avgDaily,"Average daily demand")*nonneg(v.avgLead,"Average lead time"));return R(`${fmt(x)} units`,[["Safety stock",`${fmt(x)} units`]]);}
 case "economic-order-quantity-calculator":{const x=Math.sqrt(2*pos(v.demand,"Annual demand")*nonneg(v.orderCost,"Ordering cost")/pos(v.holding,"Holding cost"));return R(`${fmt(x,2)} units`,[["Economic order quantity",`${fmt(x,2)} units`]]);}
 case "sell-through-rate-calculator":{const x=percent(nonneg(v.sold,"Units sold"),pos(v.received,"Units received"));return R(pct(x),[["Sell-through rate",pct(x)]]);}
 case "cart-abandonment-rate-calculator":{const s=pos(v.started,"Initiated carts"),c=nonneg(v.completed,"Completed orders");if(c>s)throw new Error("Completed orders cannot exceed initiated carts.");const x=(1-c/s)*100;return R(pct(x),[["Cart abandonment rate",pct(x)],["Completion rate",pct(100-x)]]);}
 case "engagement-rate-calculator":{const x=percent(nonneg(v.interactions,"Interactions"),pos(v.base,"Audience or impressions"));return R(pct(x),[["Engagement rate",pct(x)]]);}
 case "churn-rate-calculator":{const x=percent(nonneg(v.lost,"Customers lost"),pos(v.start,"Starting customers"));return R(pct(x),[["Churn rate",pct(x)]]);}
 case "retention-rate-calculator":{const start=pos(v.start,"Starting customers"),x=(nonneg(v.end,"Ending customers")-nonneg(v.new,"New customers"))/start*100;return R(pct(x),[["Retention rate",pct(x)]]);}
 case "mrr-calculator":{const x=nonneg(v.customers,"Customers")*nonneg(v.arpc,"Average monthly revenue per customer");return R(money(x),[["Monthly recurring revenue",money(x)],["Annualized run rate",money(x*12)]]);}
 case "arr-calculator":{const x=nonneg(v.mrr,"MRR")*12;return R(money(x),[["Annual recurring revenue",money(x)]]);}
 case "mrr-growth-calculator":{const p=pos(v.previous,"Previous MRR"),c=nonneg(v.current,"Current MRR"),x=(c-p)/p*100;return R(pct(x),[["MRR growth",pct(x)],["MRR change",money(c-p)]]);}
 case "ltv-to-cac-ratio-calculator":{const x=nonneg(v.ltv,"LTV")/pos(v.cac,"CAC");return R(`${fmt(x,2)}:1`,[["LTV:CAC ratio",`${fmt(x,2)}:1`]]);}
 case "cac-payback-period-calculator":{const margin=nonneg(v.grossMargin,"Gross margin");if(margin>100)throw new Error("Gross margin cannot exceed 100%.");const monthly=pos(v.monthlyRevenue,"Monthly revenue")*margin/100;if(monthly<=0)throw new Error("Monthly gross profit must be greater than zero.");const x=nonneg(v.cac,"CAC")/monthly;return R(`${fmt(x,2)} months`,[["CAC payback period",`${fmt(x,2)} months`],["Monthly gross profit/customer",money(monthly)]]);}
 case "payback-period-calculator":{const x=nonneg(v.investment,"Investment")/pos(v.cashflow,"Annual cash flow");return R(`${fmt(x,2)} years`,[["Payback period",`${fmt(x,2)} years`],["Approx. months",fmt(x*12,1)]]);}
 case "contribution-margin-calculator":{const r=pos(v.revenue,"Revenue"),cm=r-nonneg(v.variable,"Variable costs"),x=cm/r*100;return R(money(cm),[["Contribution margin",money(cm)],["Contribution margin ratio",pct(x)]]);}
 case "operating-margin-calculator":{const x=percent(num(v.income,"Operating income"),pos(v.revenue,"Revenue"));return R(pct(x),[["Operating margin",pct(x)]]);}
 case "ebitda-margin-calculator":{const x=percent(num(v.ebitda,"EBITDA"),pos(v.revenue,"Revenue"));return R(pct(x),[["EBITDA margin",pct(x)]]);}
 case "cost-of-goods-sold-calculator":{const x=nonneg(v.begin,"Beginning inventory")+nonneg(v.purchases,"Purchases")-nonneg(v.end,"Ending inventory");return R(money(x),[["Cost of goods sold",money(x)]]);}
 case "average-revenue-per-user-calculator":{const x=nonneg(v.revenue,"Revenue")/pos(v.users,"Users");return R(money(x),[["Average revenue per user",money(x)]]);}
 case "ad-spend-calculator":{const rate=nonneg(v.rate,"Rate"),volume=nonneg(v.volume,"Volume"),x=v.model==="cpm"?rate*volume/1000:rate*volume;return R(money(x),[["Estimated ad spend",money(x)],["Pricing model",v.model==="cpm"?"CPM":"CPC"]]);}
 case "target-roas-calculator":{const x=nonneg(v.revenue,"Revenue")/pos(v.spend,"Ad spend");return R(`${fmt(x,2)}x`,[["Target ROAS",`${fmt(x,2)}x`],["ROAS percent",pct(x*100)]]);}
 }
}

export function Batch401430Tool({kind}:{kind:Batch401430Kind}){
 const cfg=CONFIG[kind];
 const initial=useMemo(()=>Object.fromEntries(cfg.fields.map(f=>[f.key,f.defaultValue])),[cfg]);
 const [values,setValues]=useState<Record<string,string>>(initial);const [result,setResult]=useState<Result|null>(null);const [error,setError]=useState("");
 const calculate=()=>{try{setError("");setResult(run(kind,values));}catch(e){setResult(null);setError(e instanceof Error?e.message:"Unable to calculate.");}};
 const reset=()=>{setValues(initial);setResult(null);setError("");};
 return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2">{cfg.fields.map(f=><label key={f.key} className="space-y-2"><span className="text-sm font-medium">{f.label}</span>{f.type==="select"?<select className={inputClass} value={values[f.key]} onChange={e=>setValues({...values,[f.key]:e.target.value})}>{f.options?.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>:<input type="number" step="any" className={inputClass} value={values[f.key]} onChange={e=>setValues({...values,[f.key]:e.target.value})}/>}</label>)}</div><div className="flex gap-2"><button type="button" onClick={calculate} className={buttonClass}>Calculate</button><button type="button" onClick={reset} className={secondary}>Reset</button></div>{error&&<div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}{result&&<div className="space-y-3 rounded-xl border bg-muted/20 p-5"><div className="text-2xl font-semibold">{result.output}</div><div className="grid gap-3 sm:grid-cols-2">{result.items.map(x=><div key={x.label} className="rounded-lg border bg-background p-3"><div className="text-xs text-muted-foreground">{x.label}</div><div className="font-medium">{x.value}</div></div>)}</div></div>}</div>;
}
