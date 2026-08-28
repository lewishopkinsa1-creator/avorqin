"use client";

import { useMemo, useState } from "react";

export type Batch301350Kind =
  | "square-footage-calculator"
  | "concrete-calculator"
  | "concrete-slab-calculator"
  | "concrete-bag-calculator"
  | "cubic-yard-calculator"
  | "gravel-calculator"
  | "mulch-calculator"
  | "topsoil-calculator"
  | "sand-calculator"
  | "brick-calculator"
  | "concrete-block-calculator"
  | "drywall-calculator"
  | "paint-calculator"
  | "wallpaper-calculator"
  | "flooring-calculator"
  | "tile-calculator"
  | "carpet-calculator"
  | "decking-calculator"
  | "fence-calculator"
  | "roofing-calculator"
  | "roof-pitch-calculator"
  | "rafter-length-calculator"
  | "roof-shingle-calculator"
  | "stair-calculator"
  | "board-foot-calculator"
  | "lumber-calculator"
  | "stud-calculator"
  | "insulation-calculator"
  | "paver-calculator"
  | "asphalt-calculator"
  | "room-area-calculator"
  | "wall-area-calculator"
  | "ceiling-area-calculator"
  | "cubic-feet-calculator"
  | "square-feet-to-cubic-yards-calculator"
  | "grout-calculator"
  | "mortar-calculator"
  | "thinset-calculator"
  | "rebar-calculator"
  | "pool-volume-calculator"
  | "tank-volume-calculator"
  | "pipe-volume-calculator"
  | "gpm-calculator"
  | "flow-rate-calculator"
  | "deck-stain-calculator"
  | "epoxy-calculator"
  | "crushed-stone-calculator"
  | "road-base-calculator"
  | "gravel-driveway-calculator"
  | "fence-post-depth-calculator";

type ResultItem = { label: string; value: string; note?: string };
type Field = { key:string; label:string; type?:"number"|"input"|"select"; defaultValue?:string; placeholder?:string; options?:{label:string;value:string}[] };
type Config = { fields:Field[]; button?:string; note?:string };
type ToolResult = { output:string; summary:ResultItem[] };

const inputClass="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const textareaClass="min-h-36 w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm outline-none transition focus:border-primary";
const buttonClass="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondaryButtonClass="rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";
const num=(x:string,l:string)=>{const n=Number(x);if(!Number.isFinite(n))throw new Error(`${l} must be a valid number.`);return n;};
const pos=(x:string,l:string)=>{const n=num(x,l);if(n<=0)throw new Error(`${l} must be greater than zero.`);return n;};
const pct=(x:string,l:string)=>{const n=num(x,l);if(n<0)throw new Error(`${l} cannot be negative.`);return n;};
const fmt=(n:number,d=4)=>new Intl.NumberFormat(undefined,{maximumFractionDigits:d}).format(n);
const R=(output:string,pairs:[string,string][]):ToolResult=>({output,summary:pairs.map(([label,value])=>({label,value}))});
function materialBox(v:Record<string,string>,defaultDensity:number){const l=pos(v.length,"Length"),w=pos(v.width,"Width"),depth=pos(v.depth,"Depth"),density=v.density?pos(v.density,"Density"):defaultDensity,cf=l*w*depth/12,cy=cf/27,tons=cf*density/2000;return R(`${fmt(cy)} cu yd`,[["Volume",`${fmt(cy)} cu yd`],["Cubic feet",`${fmt(cf)} cu ft`],["Estimated weight",`${fmt(tons)} tons`]]);}

const CONFIG:Record<Batch301350Kind,Config>={
  "square-footage-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"12"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "concrete-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"10"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"10"},{key:"thickness",label:"Thickness (in)",type:"number",defaultValue:"4"}],button:"Calculate"},
  "concrete-slab-calculator":{fields:[{key:"length",label:"Slab length (ft)",type:"number",defaultValue:"20"},{key:"width",label:"Slab width (ft)",type:"number",defaultValue:"12"},{key:"thickness",label:"Thickness (in)",type:"number",defaultValue:"4"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "concrete-bag-calculator":{fields:[{key:"volume",label:"Concrete volume (cu ft)",type:"number",defaultValue:"10"},{key:"bag",label:"Bag size",type:"select",defaultValue:"80",options:[{label:"40 lb",value:"40"},{label:"60 lb",value:"60"},{label:"80 lb",value:"80"}]}],button:"Calculate"},
  "cubic-yard-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"12"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"8"},{key:"depth",label:"Depth (ft)",type:"number",defaultValue:"1"}],button:"Calculate"},
  "gravel-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"20"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"10"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"4"},{key:"density",label:"Density (lb/cu ft)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "mulch-calculator":{fields:[{key:"area",label:"Area (sq ft)",type:"number",defaultValue:"500"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"3"}],button:"Calculate"},
  "topsoil-calculator":{fields:[{key:"area",label:"Area (sq ft)",type:"number",defaultValue:"500"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"4"}],button:"Calculate"},
  "sand-calculator":{fields:[{key:"area",label:"Area (sq ft)",type:"number",defaultValue:"200"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"3"},{key:"density",label:"Density (lb/cu ft)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "brick-calculator":{fields:[{key:"wallLength",label:"Wall length (ft)",type:"number",defaultValue:"20"},{key:"wallHeight",label:"Wall height (ft)",type:"number",defaultValue:"8"},{key:"brickLength",label:"Brick length (in)",type:"number",defaultValue:"8"},{key:"brickHeight",label:"Brick height (in)",type:"number",defaultValue:"2.25"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "concrete-block-calculator":{fields:[{key:"wallLength",label:"Wall length (ft)",type:"number",defaultValue:"20"},{key:"wallHeight",label:"Wall height (ft)",type:"number",defaultValue:"8"},{key:"blockLength",label:"Block face length (in)",type:"number",defaultValue:"16"},{key:"blockHeight",label:"Block face height (in)",type:"number",defaultValue:"8"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"5"}],button:"Calculate"},
  "drywall-calculator":{fields:[{key:"area",label:"Wall/ceiling area (sq ft)",type:"number",defaultValue:"1000"},{key:"sheetWidth",label:"Sheet width (ft)",type:"number",defaultValue:"4"},{key:"sheetHeight",label:"Sheet height (ft)",type:"number",defaultValue:"8"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "paint-calculator":{fields:[{key:"area",label:"Paintable area (sq ft)",type:"number",defaultValue:"1200"},{key:"coats",label:"Number of coats",type:"number",defaultValue:"2"},{key:"coverage",label:"Coverage per gallon (sq ft)",type:"number",defaultValue:"350"}],button:"Calculate"},
  "wallpaper-calculator":{fields:[{key:"area",label:"Wall area (sq ft)",type:"number",defaultValue:"500"},{key:"coverage",label:"Coverage per roll (sq ft)",type:"number",defaultValue:"56"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "flooring-calculator":{fields:[{key:"length",label:"Room length (ft)",type:"number",defaultValue:"15"},{key:"width",label:"Room width (ft)",type:"number",defaultValue:"12"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "tile-calculator":{fields:[{key:"length",label:"Area length (ft)",type:"number",defaultValue:"12"},{key:"width",label:"Area width (ft)",type:"number",defaultValue:"10"},{key:"tileLength",label:"Tile length (in)",type:"number",defaultValue:"12"},{key:"tileWidth",label:"Tile width (in)",type:"number",defaultValue:"12"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "carpet-calculator":{fields:[{key:"length",label:"Room length (ft)",type:"number",defaultValue:"15"},{key:"width",label:"Room width (ft)",type:"number",defaultValue:"12"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "decking-calculator":{fields:[{key:"length",label:"Deck length (ft)",type:"number",defaultValue:"20"},{key:"width",label:"Deck width (ft)",type:"number",defaultValue:"12"},{key:"boardWidth",label:"Board width (in)",type:"number",defaultValue:"5.5"},{key:"boardLength",label:"Board length (ft)",type:"number",defaultValue:"12"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "fence-calculator":{fields:[{key:"length",label:"Total fence length (ft)",type:"number",defaultValue:"100"},{key:"panelWidth",label:"Panel width (ft)",type:"number",defaultValue:"8"}],button:"Calculate"},
  "roofing-calculator":{fields:[{key:"length",label:"Building length (ft)",type:"number",defaultValue:"40"},{key:"width",label:"Building width (ft)",type:"number",defaultValue:"30"},{key:"rise",label:"Roof rise per 12 in run",type:"number",defaultValue:"6"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "roof-pitch-calculator":{fields:[{key:"rise",label:"Rise",type:"number",defaultValue:"6"},{key:"run",label:"Run",type:"number",defaultValue:"12"}],button:"Calculate"},
  "rafter-length-calculator":{fields:[{key:"run",label:"Horizontal run (ft)",type:"number",defaultValue:"15"},{key:"rise",label:"Rise per 12 in run",type:"number",defaultValue:"6"}],button:"Calculate"},
  "roof-shingle-calculator":{fields:[{key:"area",label:"Roof area (sq ft)",type:"number",defaultValue:"2000"},{key:"coverage",label:"Coverage per bundle (sq ft)",type:"number",defaultValue:"33.3"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "stair-calculator":{fields:[{key:"rise",label:"Total rise (in)",type:"number",defaultValue:"108"},{key:"maxRiser",label:"Maximum riser height (in)",type:"number",defaultValue:"7.75"},{key:"tread",label:"Tread depth (in)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "board-foot-calculator":{fields:[{key:"thickness",label:"Thickness (in)",type:"number",defaultValue:"2"},{key:"width",label:"Width (in)",type:"number",defaultValue:"6"},{key:"length",label:"Length (ft)",type:"number",defaultValue:"8"},{key:"quantity",label:"Quantity",type:"number",defaultValue:"10"}],button:"Calculate"},
  "lumber-calculator":{fields:[{key:"thickness",label:"Thickness (in)",type:"number",defaultValue:"2"},{key:"width",label:"Width (in)",type:"number",defaultValue:"4"},{key:"length",label:"Piece length (ft)",type:"number",defaultValue:"8"},{key:"quantity",label:"Number of pieces",type:"number",defaultValue:"20"}],button:"Calculate"},
  "stud-calculator":{fields:[{key:"length",label:"Wall length (ft)",type:"number",defaultValue:"20"},{key:"spacing",label:"Stud spacing on center (in)",type:"number",defaultValue:"16"}],button:"Calculate"},
  "insulation-calculator":{fields:[{key:"area",label:"Area to insulate (sq ft)",type:"number",defaultValue:"1000"},{key:"coverage",label:"Coverage per pack (sq ft)",type:"number",defaultValue:"40"}],button:"Calculate"},
  "paver-calculator":{fields:[{key:"length",label:"Patio length (ft)",type:"number",defaultValue:"20"},{key:"width",label:"Patio width (ft)",type:"number",defaultValue:"15"},{key:"paverLength",label:"Paver length (in)",type:"number",defaultValue:"8"},{key:"paverWidth",label:"Paver width (in)",type:"number",defaultValue:"4"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "asphalt-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"50"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"12"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"3"},{key:"density",label:"Density (lb/cu ft)",type:"number",defaultValue:"145"}],button:"Calculate"},
  "room-area-calculator":{fields:[{key:"length",label:"Room length (ft)",type:"number",defaultValue:"15"},{key:"width",label:"Room width (ft)",type:"number",defaultValue:"12"}],button:"Calculate"},
  "wall-area-calculator":{fields:[{key:"length",label:"Wall length (ft)",type:"number",defaultValue:"20"},{key:"height",label:"Wall height (ft)",type:"number",defaultValue:"8"},{key:"openings",label:"Door/window openings (sq ft)",type:"number",defaultValue:"35"}],button:"Calculate"},
  "ceiling-area-calculator":{fields:[{key:"length",label:"Room length (ft)",type:"number",defaultValue:"15"},{key:"width",label:"Room width (ft)",type:"number",defaultValue:"12"}],button:"Calculate"},
  "cubic-feet-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"10"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"8"},{key:"height",label:"Height (ft)",type:"number",defaultValue:"4"}],button:"Calculate"},
  "square-feet-to-cubic-yards-calculator":{fields:[{key:"area",label:"Area (sq ft)",type:"number",defaultValue:"1000"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"3"}],button:"Calculate"},
  "grout-calculator":{fields:[{key:"area",label:"Tiled area (sq ft)",type:"number",defaultValue:"200"},{key:"tileLength",label:"Tile length (in)",type:"number",defaultValue:"12"},{key:"tileWidth",label:"Tile width (in)",type:"number",defaultValue:"12"},{key:"joint",label:"Grout joint width (in)",type:"number",defaultValue:"0.125"},{key:"depth",label:"Grout depth (in)",type:"number",defaultValue:"0.25"}],button:"Calculate"},
  "mortar-calculator":{fields:[{key:"wallLength",label:"Wall length (ft)",type:"number",defaultValue:"20"},{key:"wallHeight",label:"Wall height (ft)",type:"number",defaultValue:"8"},{key:"brickLength",label:"Brick length (in)",type:"number",defaultValue:"8"},{key:"brickHeight",label:"Brick height (in)",type:"number",defaultValue:"2.25"},{key:"brickDepth",label:"Brick depth (in)",type:"number",defaultValue:"3.625"},{key:"joint",label:"Joint width (in)",type:"number",defaultValue:"0.375"},{key:"yield",label:"Mortar yield per bag (cu ft)",type:"number",defaultValue:"0.7"}],button:"Calculate"},
  "thinset-calculator":{fields:[{key:"area",label:"Tile area (sq ft)",type:"number",defaultValue:"300"},{key:"coverage",label:"Coverage per bag (sq ft)",type:"number",defaultValue:"50"},{key:"waste",label:"Waste allowance (%)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "rebar-calculator":{fields:[{key:"length",label:"Slab length (ft)",type:"number",defaultValue:"20"},{key:"width",label:"Slab width (ft)",type:"number",defaultValue:"12"},{key:"spacing",label:"Rebar spacing (in)",type:"number",defaultValue:"18"},{key:"stock",label:"Stock bar length (ft)",type:"number",defaultValue:"20"}],button:"Calculate"},
  "pool-volume-calculator":{fields:[{key:"length",label:"Pool length (ft)",type:"number",defaultValue:"30"},{key:"width",label:"Pool width (ft)",type:"number",defaultValue:"15"},{key:"depth",label:"Average depth (ft)",type:"number",defaultValue:"5"}],button:"Calculate"},
  "tank-volume-calculator":{fields:[{key:"diameter",label:"Tank inside diameter (ft)",type:"number",defaultValue:"6"},{key:"length",label:"Tank length (ft)",type:"number",defaultValue:"10"}],button:"Calculate"},
  "pipe-volume-calculator":{fields:[{key:"diameter",label:"Pipe inside diameter (in)",type:"number",defaultValue:"2"},{key:"length",label:"Pipe length (ft)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "gpm-calculator":{fields:[{key:"gallons",label:"Volume (US gal)",type:"number",defaultValue:"100"},{key:"minutes",label:"Time (minutes)",type:"number",defaultValue:"5"}],button:"Calculate"},
  "flow-rate-calculator":{fields:[{key:"gallons",label:"Volume (US gal)",type:"number",defaultValue:"100"},{key:"seconds",label:"Time (seconds)",type:"number",defaultValue:"120"}],button:"Calculate"},
  "deck-stain-calculator":{fields:[{key:"area",label:"Deck surface area (sq ft)",type:"number",defaultValue:"500"},{key:"coats",label:"Number of coats",type:"number",defaultValue:"2"},{key:"coverage",label:"Coverage per gallon (sq ft)",type:"number",defaultValue:"250"}],button:"Calculate"},
  "epoxy-calculator":{fields:[{key:"area",label:"Coated area (sq ft)",type:"number",defaultValue:"100"},{key:"thickness",label:"Average thickness (mils)",type:"number",defaultValue:"20"}],button:"Calculate"},
  "crushed-stone-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"30"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"10"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"4"},{key:"density",label:"Density (lb/cu ft)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "road-base-calculator":{fields:[{key:"length",label:"Length (ft)",type:"number",defaultValue:"50"},{key:"width",label:"Width (ft)",type:"number",defaultValue:"12"},{key:"depth",label:"Depth (in)",type:"number",defaultValue:"6"},{key:"density",label:"Density (lb/cu ft)",type:"number",defaultValue:"125"}],button:"Calculate"},
  "gravel-driveway-calculator":{fields:[{key:"length",label:"Driveway length (ft)",type:"number",defaultValue:"60"},{key:"width",label:"Driveway width (ft)",type:"number",defaultValue:"12"},{key:"depth",label:"Gravel depth (in)",type:"number",defaultValue:"4"},{key:"density",label:"Density (lb/cu ft)",type:"number",defaultValue:"100"}],button:"Calculate"},
  "fence-post-depth-calculator":{fields:[{key:"height",label:"Above-ground post height (ft)",type:"number",defaultValue:"6"},{key:"ratio",label:"Burial depth as % of above-ground height",type:"number",defaultValue:"33.3"},{key:"minimum",label:"Minimum depth (ft)",type:"number",defaultValue:"2"}],button:"Calculate"},
};

export function runBatch301350(kind:Batch301350Kind,v:Record<string,string>):ToolResult{

  switch(kind){
    case "square-footage-calculator": { const l=pos(v.length,"Length"),w=pos(v.width,"Width"),a=l*w; return R(`${fmt(a)} sq ft`,[["Square footage",`${fmt(a)} sq ft`],["Square yards",`${fmt(a/9)} sq yd`]]); }
    case "concrete-calculator": { const l=pos(v.length,"Length"),w=pos(v.width,"Width"),t=pos(v.thickness,"Thickness"); const cf=l*w*t/12,cy=cf/27; return R(`${fmt(cy)} cu yd`,[["Concrete volume",`${fmt(cy)} cu yd`],["Cubic feet",`${fmt(cf)} cu ft`]]); }
    case "concrete-slab-calculator": { const l=pos(v.length,"Length"),w=pos(v.width,"Width"),t=pos(v.thickness,"Thickness"),wa=pct(v.waste,"Waste"); const base=l*w*t/12/27,total=base*(1+wa/100); return R(`${fmt(total)} cu yd`,[["Base volume",`${fmt(base)} cu yd`],["With waste",`${fmt(total)} cu yd`]]); }
    case "concrete-bag-calculator": { const cf=pos(v.volume,"Concrete volume"); const yields:Record<string,number>={"40":0.30,"60":0.45,"80":0.60}; const y=yields[v.bag]||0.60,bags=Math.ceil(cf/y); return R(`${bags} bags`,[["Estimated bags",String(bags)],["Approx. yield per bag",`${fmt(y)} cu ft`]]); }
    case "cubic-yard-calculator": { const cf=pos(v.length,"Length")*pos(v.width,"Width")*pos(v.depth,"Depth"),cy=cf/27; return R(`${fmt(cy)} cu yd`,[["Cubic yards",`${fmt(cy)} cu yd`],["Cubic feet",`${fmt(cf)} cu ft`]]); }
    case "gravel-calculator": { return materialBox(v,100); }
    case "mulch-calculator": { const area=pos(v.area,"Area"),depth=pos(v.depth,"Depth"),cf=area*depth/12,cy=cf/27; return R(`${fmt(cy)} cu yd`,[["Mulch volume",`${fmt(cy)} cu yd`],["Cubic feet",`${fmt(cf)} cu ft`]]); }
    case "topsoil-calculator": { const area=pos(v.area,"Area"),depth=pos(v.depth,"Depth"),cf=area*depth/12,cy=cf/27; return R(`${fmt(cy)} cu yd`,[["Topsoil volume",`${fmt(cy)} cu yd`],["Cubic feet",`${fmt(cf)} cu ft`]]); }
    case "sand-calculator": { const area=pos(v.area,"Area"),depth=pos(v.depth,"Depth"),density=pos(v.density,"Density"),cf=area*depth/12,tons=cf*density/2000; return R(`${fmt(cf/27)} cu yd`,[["Sand volume",`${fmt(cf/27)} cu yd`],["Estimated weight",`${fmt(tons)} tons`]]); }
    case "brick-calculator": { const area=pos(v.wallLength,"Wall length")*pos(v.wallHeight,"Wall height")*144,face=pos(v.brickLength,"Brick length")*pos(v.brickHeight,"Brick height"),wa=pct(v.waste,"Waste"),count=Math.ceil(area/face*(1+wa/100)); return R(`${count} bricks`,[["Estimated bricks",String(count)],["Wall area",`${fmt(area/144)} sq ft`]]); }
    case "concrete-block-calculator": { const area=pos(v.wallLength,"Wall length")*pos(v.wallHeight,"Wall height")*144,face=pos(v.blockLength,"Block length")*pos(v.blockHeight,"Block height"),wa=pct(v.waste,"Waste"),count=Math.ceil(area/face*(1+wa/100)); return R(`${count} blocks`,[["Estimated blocks",String(count)],["Wall area",`${fmt(area/144)} sq ft`]]); }
    case "drywall-calculator": { const area=pos(v.area,"Area"),sheet=pos(v.sheetWidth,"Sheet width")*pos(v.sheetHeight,"Sheet height"),wa=pct(v.waste,"Waste"),count=Math.ceil(area*(1+wa/100)/sheet); return R(`${count} sheets`,[["Estimated sheets",String(count)],["Purchase area",`${fmt(count*sheet)} sq ft`]]); }
    case "paint-calculator": { const area=pos(v.area,"Area"),coats=pos(v.coats,"Coats"),coverage=pos(v.coverage,"Coverage"),gal=area*coats/coverage; return R(`${fmt(gal)} gal`,[["Paint needed",`${fmt(gal)} gal`],["One-gallon cans (rounded up)",String(Math.ceil(gal))]]); }
    case "wallpaper-calculator": { const area=pos(v.area,"Area"),coverage=pos(v.coverage,"Coverage"),wa=pct(v.waste,"Waste"),rolls=Math.ceil(area*(1+wa/100)/coverage); return R(`${rolls} rolls`,[["Estimated rolls",String(rolls)],["Adjusted area",`${fmt(area*(1+wa/100))} sq ft`]]); }
    case "flooring-calculator": { const area=pos(v.length,"Length")*pos(v.width,"Width"),wa=pct(v.waste,"Waste"),buy=area*(1+wa/100); return R(`${fmt(buy)} sq ft`,[["Room area",`${fmt(area)} sq ft`],["Purchase area",`${fmt(buy)} sq ft`]]); }
    case "tile-calculator": { const area=pos(v.length,"Length")*pos(v.width,"Width")*144,tile=pos(v.tileLength,"Tile length")*pos(v.tileWidth,"Tile width"),wa=pct(v.waste,"Waste"),count=Math.ceil(area/tile*(1+wa/100)); return R(`${count} tiles`,[["Estimated tiles",String(count)],["Project area",`${fmt(area/144)} sq ft`]]); }
    case "carpet-calculator": { const area=pos(v.length,"Length")*pos(v.width,"Width"),wa=pct(v.waste,"Waste"),buy=area*(1+wa/100); return R(`${fmt(buy)} sq ft`,[["Room area",`${fmt(area)} sq ft`],["Purchase area",`${fmt(buy)} sq ft`],["Square yards",`${fmt(buy/9)} sq yd`]]); }
    case "decking-calculator": { const area=pos(v.length,"Length")*pos(v.width,"Width"),boardArea=pos(v.boardWidth,"Board width")/12*pos(v.boardLength,"Board length"),wa=pct(v.waste,"Waste"),boards=Math.ceil(area*(1+wa/100)/boardArea); return R(`${boards} boards`,[["Deck area",`${fmt(area)} sq ft`],["Estimated boards",String(boards)]]); }
    case "fence-calculator": { const len=pos(v.length,"Fence length"),pw=pos(v.panelWidth,"Panel width"),panels=Math.ceil(len/pw); return R(`${panels} panels`,[["Fence panels",String(panels)],["Posts",String(panels+1)]]); }
    case "roofing-calculator": { const base=pos(v.length,"Length")*pos(v.width,"Width"),rise=num(v.rise,"Rise"),wa=pct(v.waste,"Waste"),factor=Math.sqrt(1+(rise/12)**2),roof=base*factor,buy=roof*(1+wa/100); return R(`${fmt(buy)} sq ft`,[["Sloped roof area",`${fmt(roof)} sq ft`],["With waste",`${fmt(buy)} sq ft`],["Roofing squares",fmt(buy/100)]]); }
    case "roof-pitch-calculator": { const rise=pos(v.rise,"Rise"),run=pos(v.run,"Run"),ratio=rise/run,angle=Math.atan(ratio)*180/Math.PI; return R(`${fmt(angle)}°`,[["Slope angle",`${fmt(angle)}°`],["Slope",`${fmt(ratio*100)}%`],["Pitch",`${fmt(rise)} : ${fmt(run)}`]]); }
    case "rafter-length-calculator": { const run=pos(v.run,"Run"),rise12=pos(v.rise,"Rise"),rise=run*rise12/12,len=Math.hypot(run,rise),angle=Math.atan(rise/run)*180/Math.PI; return R(`${fmt(len)} ft`,[["Rafter length",`${fmt(len)} ft`],["Vertical rise",`${fmt(rise)} ft`],["Angle",`${fmt(angle)}°`]]); }
    case "roof-shingle-calculator": { const area=pos(v.area,"Roof area"),coverage=pos(v.coverage,"Coverage"),wa=pct(v.waste,"Waste"),adj=area*(1+wa/100),bundles=Math.ceil(adj/coverage); return R(`${bundles} bundles`,[["Adjusted roof area",`${fmt(adj)} sq ft`],["Bundles",String(bundles)],["Roofing squares",fmt(adj/100)]]); }
    case "stair-calculator": { const rise=pos(v.rise,"Total rise"),max=pos(v.maxRiser,"Maximum riser"),tread=pos(v.tread,"Tread depth"),risers=Math.ceil(rise/max),actual=rise/risers,treads=Math.max(0,risers-1),run=treads*tread; return R(`${risers} risers`,[["Risers",String(risers)],["Actual riser height",`${fmt(actual)} in`],["Treads",String(treads)],["Total run",`${fmt(run)} in`]]); }
    case "board-foot-calculator": { const bf=pos(v.thickness,"Thickness")*pos(v.width,"Width")*pos(v.length,"Length")/12*pos(v.quantity,"Quantity"); return R(`${fmt(bf)} board ft`,[["Board feet",fmt(bf)],["Quantity",fmt(pos(v.quantity,"Quantity"))]]); }
    case "lumber-calculator": { const q=pos(v.quantity,"Quantity"),l=pos(v.length,"Length"),bf=pos(v.thickness,"Thickness")*pos(v.width,"Width")*l/12*q; return R(`${fmt(bf)} board ft`,[["Board feet",fmt(bf)],["Total linear feet",`${fmt(l*q)} ft`]]); }
    case "stud-calculator": { const len=pos(v.length,"Wall length"),spacing=pos(v.spacing,"Spacing"),studs=Math.ceil(len*12/spacing)+1; return R(`${studs} studs`,[["Estimated studs",String(studs)],["Wall length",`${fmt(len)} ft`]]); }
    case "insulation-calculator": { const area=pos(v.area,"Area"),coverage=pos(v.coverage,"Coverage"),packs=Math.ceil(area/coverage); return R(`${packs} packs`,[["Estimated packs",String(packs)],["Area",`${fmt(area)} sq ft`]]); }
    case "paver-calculator": { const area=pos(v.length,"Length")*pos(v.width,"Width")*144,paver=pos(v.paverLength,"Paver length")*pos(v.paverWidth,"Paver width"),wa=pct(v.waste,"Waste"),count=Math.ceil(area/paver*(1+wa/100)); return R(`${count} pavers`,[["Estimated pavers",String(count)],["Patio area",`${fmt(area/144)} sq ft`]]); }
    case "asphalt-calculator": { return materialBox(v,145); }
    case "room-area-calculator": { const a=pos(v.length,"Length")*pos(v.width,"Width"); return R(`${fmt(a)} sq ft`,[["Room area",`${fmt(a)} sq ft`],["Square yards",`${fmt(a/9)} sq yd`]]); }
    case "wall-area-calculator": { const gross=pos(v.length,"Length")*pos(v.height,"Height"),open=Math.max(0,num(v.openings,"Openings")),net=Math.max(0,gross-open); return R(`${fmt(net)} sq ft`,[["Gross wall area",`${fmt(gross)} sq ft`],["Openings",`${fmt(open)} sq ft`],["Net wall area",`${fmt(net)} sq ft`]]); }
    case "ceiling-area-calculator": { const a=pos(v.length,"Length")*pos(v.width,"Width"); return R(`${fmt(a)} sq ft`,[["Ceiling area",`${fmt(a)} sq ft`]]); }
    case "cubic-feet-calculator": { const cf=pos(v.length,"Length")*pos(v.width,"Width")*pos(v.height,"Height"); return R(`${fmt(cf)} cu ft`,[["Cubic feet",`${fmt(cf)} cu ft`],["Cubic yards",`${fmt(cf/27)} cu yd`]]); }
    case "square-feet-to-cubic-yards-calculator": { const cf=pos(v.area,"Area")*pos(v.depth,"Depth")/12,cy=cf/27; return R(`${fmt(cy)} cu yd`,[["Cubic yards",`${fmt(cy)} cu yd`],["Cubic feet",`${fmt(cf)} cu ft`]]); }
    case "grout-calculator": { const area=pos(v.area,"Area")*144,tl=pos(v.tileLength,"Tile length"),tw=pos(v.tileWidth,"Tile width"),j=pos(v.joint,"Joint width"),d=pos(v.depth,"Grout depth"),cell=(tl+j)*(tw+j),jointArea=cell-tl*tw,cells=area/cell,ci=cells*jointArea*d,cf=ci/1728; return R(`${fmt(cf)} cu ft`,[["Approx. grout volume",`${fmt(cf)} cu ft`],["Cubic inches",`${fmt(ci)} cu in`]]); }
    case "mortar-calculator": { const wl=pos(v.wallLength,"Wall length")*12,wh=pos(v.wallHeight,"Wall height")*12,bl=pos(v.brickLength,"Brick length"),bh=pos(v.brickHeight,"Brick height"),bd=pos(v.brickDepth,"Brick depth"),j=pos(v.joint,"Joint width"),yieldCf=pos(v.yield,"Bag yield"),wallArea=wl*wh,cell=(bl+j)*(bh+j),bricks=Math.floor(wallArea/cell),wallVol=wallArea*bd,brickVol=bricks*bl*bh*bd,mortarCi=Math.max(0,wallVol-brickVol),cf=mortarCi/1728,bags=Math.ceil(cf/yieldCf); return R(`${fmt(cf)} cu ft`,[["Approx. mortar volume",`${fmt(cf)} cu ft`],["Estimated bags",String(bags)],["Approx. bricks in wall",String(bricks)]]); }
    case "thinset-calculator": { const area=pos(v.area,"Area"),coverage=pos(v.coverage,"Coverage"),wa=pct(v.waste,"Waste"),bags=Math.ceil(area*(1+wa/100)/coverage); return R(`${bags} bags`,[["Estimated bags",String(bags)],["Adjusted area",`${fmt(area*(1+wa/100))} sq ft`]]); }
    case "rebar-calculator": { const l=pos(v.length,"Length"),w=pos(v.width,"Width"),sp=pos(v.spacing,"Spacing")/12,stock=pos(v.stock,"Stock length"),barsL=Math.ceil(w/sp)+1,barsW=Math.ceil(l/sp)+1,total=barsL*l+barsW*w,pieces=Math.ceil(total/stock); return R(`${fmt(total)} linear ft`,[["Total rebar length",`${fmt(total)} ft`],["Stock pieces",String(pieces)],["Bars running lengthwise",String(barsL)],["Bars running widthwise",String(barsW)]]); }
    case "pool-volume-calculator": { const cf=pos(v.length,"Length")*pos(v.width,"Width")*pos(v.depth,"Average depth"),gal=cf*7.48052; return R(`${fmt(gal)} gal`,[["US gallons",fmt(gal)],["Cubic feet",`${fmt(cf)} cu ft`]]); }
    case "tank-volume-calculator": { const d=pos(v.diameter,"Diameter"),l=pos(v.length,"Length"),cf=Math.PI*(d/2)**2*l,gal=cf*7.48052; return R(`${fmt(gal)} gal`,[["US gallons",fmt(gal)],["Cubic feet",`${fmt(cf)} cu ft`]]); }
    case "pipe-volume-calculator": { const d=pos(v.diameter,"Inside diameter"),l=pos(v.length,"Length"),ci=Math.PI*(d/2)**2*l*12,gal=ci/231; return R(`${fmt(gal)} gal`,[["US gallons",fmt(gal)],["Cubic inches",`${fmt(ci)} cu in`]]); }
    case "gpm-calculator": { const g=pos(v.gallons,"Gallons"),m=pos(v.minutes,"Minutes"),gpm=g/m; return R(`${fmt(gpm)} GPM`,[["Flow rate",`${fmt(gpm)} GPM`],["Liters per minute",`${fmt(gpm*3.78541)} L/min`]]); }
    case "flow-rate-calculator": { const g=pos(v.gallons,"Gallons"),s=pos(v.seconds,"Seconds"),gpm=g/(s/60); return R(`${fmt(gpm)} GPM`,[["Gallons per minute",`${fmt(gpm)} GPM`],["Liters per minute",`${fmt(gpm*3.78541)} L/min`]]); }
    case "deck-stain-calculator": { const a=pos(v.area,"Area"),coats=pos(v.coats,"Coats"),cov=pos(v.coverage,"Coverage"),gal=a*coats/cov; return R(`${fmt(gal)} gal`,[["Stain needed",`${fmt(gal)} gal`],["One-gallon cans (rounded up)",String(Math.ceil(gal))]]); }
    case "epoxy-calculator": { const area=pos(v.area,"Area"),mils=pos(v.thickness,"Thickness"),ci=area*144*mils/1000,gal=ci/231; return R(`${fmt(gal)} gal`,[["Epoxy volume",`${fmt(gal)} gal`],["Cubic inches",`${fmt(ci)} cu in`]]); }
    case "crushed-stone-calculator": { return materialBox(v,100); }
    case "road-base-calculator": { return materialBox(v,125); }
    case "gravel-driveway-calculator": { return materialBox(v,100); }
    case "fence-post-depth-calculator": { const h=pos(v.height,"Post height"),ratio=pct(v.ratio,"Burial percentage"),min=pos(v.minimum,"Minimum depth"),depth=Math.max(min,h*ratio/100),total=h+depth; return R(`${fmt(depth)} ft deep`,[["Recommended planning depth",`${fmt(depth)} ft`],["Total post length",`${fmt(total)} ft`]]); }
    default: throw new Error("This calculator is not configured.");
  }

}

function ResultGrid({items}:{items:ResultItem[]}){return <div className="grid gap-3 sm:grid-cols-2">{items.map((item,i)=><div key={`${item.label}-${i}`} className="rounded-xl border bg-background p-4"><div className="text-sm text-muted-foreground">{item.label}</div><div className="mt-1 break-words text-xl font-semibold">{item.value}</div>{item.note&&<div className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.note}</div>}</div>)}</div>}

export function Batch301350Tool({kind}:{kind:Batch301350Kind}){
 const config=CONFIG[kind];
 const initial=useMemo(()=>Object.fromEntries(config.fields.map(f=>[f.key,f.defaultValue||""])),[config]);
 const [values,setValues]=useState<Record<string,string>>(initial);const[output,setOutput]=useState("");const[summary,setSummary]=useState<ResultItem[]>([]);const[error,setError]=useState("");const[copied,setCopied]=useState(false);
 const clear=()=>{setOutput("");setSummary([]);setError("");setCopied(false)};
 const run=()=>{setError("");setCopied(false);try{const r=runBatch301350(kind,values);setOutput(r.output);setSummary(r.summary)}catch(e){setOutput("");setSummary([]);setError(e instanceof Error?e.message:"Unable to calculate.")}};
 const reset=()=>{setValues(initial);clear()};
 const copy=async()=>{if(!output)return;try{await navigator.clipboard.writeText(output);setCopied(true);window.setTimeout(()=>setCopied(false),1500)}catch{setError("Unable to copy result.")}};
 return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2">{config.fields.map(f=><label key={f.key} className="block space-y-2"><span className="text-sm font-medium">{f.label}</span>{f.type==="select"?<select value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));clear()}} className={inputClass}>{(f.options||[]).map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>:<input type={f.type==="input"?"text":"number"} step="any" value={values[f.key]||""} onChange={e=>{setValues(p=>({...p,[f.key]:e.target.value}));clear()}} placeholder={f.placeholder} className={inputClass}/>}</label>)}</div>{config.note&&<div className="rounded-lg border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">{config.note}</div>}<div className="flex flex-wrap gap-3"><button type="button" onClick={run} className={buttonClass}>{config.button||"Calculate"}</button><button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button></div>{error&&<div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}{summary.length>0&&<ResultGrid items={summary}/>}{output&&<div className="space-y-2"><div className="flex items-center justify-between gap-3"><span className="text-sm font-medium">Result</span><button type="button" onClick={copy} className={secondaryButtonClass}>{copied?"Copied":"Copy"}</button></div><textarea readOnly value={output} className={textareaClass} aria-label="Result"/></div>}</div>;
}
