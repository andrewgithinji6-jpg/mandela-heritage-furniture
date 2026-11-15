import {Link} from "react-router-dom";import {useState} from "react";import {settings,wa,kes} from "./lib.jsx";
export const Img=({src,alt="",className=""})=><div className={"ph "+className}><img src={src} alt={alt} loading="lazy" decoding="async"/></div>;
export const PieceCard=({p})=><Link to={"/piece/"+p.id} className="pc"><Img src={p.image} alt={p.title}/><span className="pn">{p.title}</span><span className="pp">{kes(p.price)}</span></Link>;
export const Chev=()=><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8l7 6 7-6M5 14l7 6 7-6"/></svg>;
const FORMS={contact:[["name","Name"],["phone","Phone","tel"],["email","Email","email"],["msg","Message","area"]],
bespoke:[["name","Name"],["phone","Phone","tel"],["email","Email","email"],["type","Type of furniture","sel",["Sofa or lounge","Bed or bedroom","Dining","Sideboard or storage","Table","Other"]],["finish","Preferred materials or finishes"],["msg","Design requirements","area"]],
trade:[["name","Name"],["phone","Phone","tel"],["email","Email","email"],["type","Project type","sel",["Residential development","Interior design studio","Hospitality","Office or executive space","Other"]],["size","Number of units or rooms"],["msg","About your project","area"]],
consult:[["name","Name"],["phone","Phone","tel"],["email","Email","email"],["type","Space to furnish","sel",["Living room","Bedroom","Dining room","Whole home","Office or commercial"]],["date","Preferred date","date"],["time","Preferred time","sel",["Morning","Afternoon"]],["msg","Anything we should know","area"]]};
export function EnquiryForm({kind,label}){const[sent,setSent]=useState(null);const F=FORMS[kind];
const sub=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(!d.name?.trim()||!d.phone?.trim()){setSent({err:true});return}
setSent({text:`Enquiry (${kind})\n`+F.map(([k,l])=>d[k]?`${l}: ${d[k]}`:"").filter(Boolean).join("\n"),name:d.name});e.target.reset()};
return <form className="f" onSubmit={sub} noValidate>{F.map(([k,l,t,o])=><div key={k}><label htmlFor={kind+k}>{l}</label>{t==="area"?<textarea id={kind+k} name={k} rows="4"/>:t==="sel"?<select id={kind+k} name={k}>{o.map(x=><option key={x}>{x}</option>)}</select>:<input id={kind+k} name={k} type={t||"text"}/>}</div>)}
<div><button className="btn" type="submit">{label}</button></div>
{sent?.err&&<p role="status" className="note">Please add your name and phone number.</p>}
{sent?.text&&<p role="status" className="note">Thank you, {sent.name}. Your request is ready: <a className="lnk" target="_blank" rel="noopener" href={wa(sent.text)}>send it on WhatsApp</a> or <a className="lnk" href={"mailto:"+settings.email+"?subject="+encodeURIComponent("Enquiry: "+kind)+"&body="+encodeURIComponent(sent.text)}>by email</a>.</p>}</form>}
