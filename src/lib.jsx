import {createContext,useContext,useEffect,useState} from "react";
import pdata from "./data/pieces.json";import cdata from "./data/collections.json";import S from "./data/settings.json";
export const settings=S,collections=cdata.items;
export const pieces=pdata.pieces.filter(p=>p.visible!==false);
export const CATS={living:"Living Room",bed:"Bedroom",dining:"Dining Room",lounge:"Lounge & Accent",storage:"Sideboards & Consoles",tables:"Coffee & Media Tables",floor:"Showroom floor",new:"New arrivals"};
export const catOf=p=>p.showroomFloor?"floor":p.category;
export const kes=n=>n?"KES "+Number(n).toLocaleString("en-US"):"Price on enquiry";
export const minPrice=Math.min(...pieces.filter(p=>p.price).map(p=>p.price));
export const ROOMS={living:{t:"Living Room",img:"/images/n3.webp",d:"Sofas, armchairs, tables and storage that sit well together in a generous living space.",c:["living","lounge","tables","storage"]},bedroom:{t:"Bedroom",img:"/images/n8.webp",d:"Upholstered beds and finishing pieces for a calm, restful room.",c:["bed"]},dining:{t:"Dining Room",img:"/images/n16.webp",d:"Tables, chairs and sideboards made for long evenings around the table.",c:["dining","storage"]}};
export const wa=t=>`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}`;
export function openStatus(){const d=new Date(new Date().toLocaleString("en-US",{timeZone:"Africa/Nairobi"})),h=d.getHours()+d.getMinutes()/60,o=h>=S.openHour&&h<S.closeHour;return o?`Open now, until ${S.closeHour>12?S.closeHour-12+"pm":S.closeHour+"am"}`:`Closed now. ${S.hours}`.replace("Monday to Sunday","Open daily")}
export const Status=()=>{const[s,set]=useState(openStatus());useEffect(()=>{set(openStatus())},[]);return <p className={"open"+(s.startsWith("Closed")?" c":"")}><span className="dot"/>{s}</p>};
export function usePage(title,desc){useEffect(()=>{document.title=title+" | Mandela Heritage Furnitures";const m=document.querySelector('meta[name="description"]');if(m&&desc)m.content=desc;window.scrollTo({top:0,left:0,behavior:"instant"})},[title]);}
const Ctx=createContext();export const useEq=()=>useContext(Ctx);
export function EqProvider({children}){const[ids,setIds]=useState(()=>{try{return JSON.parse(localStorage.getItem("eql")||"[]")}catch{return[]}});
useEffect(()=>{try{localStorage.setItem("eql",JSON.stringify(ids))}catch{}},[ids]);
const toggle=id=>setIds(l=>l.includes(id)?l.filter(x=>x!==id):[...l,id]),addMany=a=>setIds(l=>[...l,...a.filter(x=>!l.includes(x))]);
return <Ctx.Provider value={{ids,toggle,addMany,clear:()=>setIds([]),has:id=>ids.includes(id)}}>{children}</Ctx.Provider>}
