import {Link} from "react-router-dom";import {useState} from "react";import {settings,wa} from "./lib.jsx";
export const Img=({src,alt="",className=""})=><div className={"ph "+className}><img src={src} alt={alt} loading="lazy" decoding="async"/></div>;
export const PieceCard=({p})=><Link to={"/piece/"+p.id} className="pc"><Img src={p.image} alt={p.title}/><span className="cap">{p.title}</span></Link>;
export const Sec=({children,className="",style})=><section className={"px-[5vw] py-[6vh] "+className} style={style}><div className="max-w-[1180px] mx-auto">{children}</div></section>;
export function EnquiryForm({kind,label}){const[sent,setSent]=useState(null);const b=kind==="bespoke";
const sub=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(!d.name?.trim()||!d.phone?.trim()||!d.msg?.trim()){setSent({err:true});return}
setSent({text:`Enquiry (${kind})\nName: ${d.name}\nPhone: ${d.phone}${d.email?"\nEmail: "+d.email:""}${d.type?"\nType: "+d.type:""}${d.finish?"\nFinishes: "+d.finish:""}\nMessage: ${d.msg}`,name:d.name});e.target.reset()};
return <form className="f" onSubmit={sub} noValidate><div><label htmlFor={kind+"n"}>Name</label><input id={kind+"n"} name="name" autoComplete="name"/></div><div><label htmlFor={kind+"p"}>Phone</label><input id={kind+"p"} name="phone" type="tel" autoComplete="tel"/></div><div><label htmlFor={kind+"e"}>Email</label><input id={kind+"e"} name="email" type="email" autoComplete="email"/></div>
{b&&<><div><label htmlFor="bt">Type of furniture</label><select id="bt" name="type"><option>Sofa or lounge</option><option>Bed or bedroom</option><option>Dining</option><option>Office</option><option>Other</option></select></div><div><label htmlFor="bf">Preferred materials or finishes</label><input id="bf" name="finish"/></div></>}
<div><label htmlFor={kind+"m"}>{b?"Design requirements":"Message"}</label><textarea id={kind+"m"} name="msg" rows="4"/></div>{b&&<p>Reference images can be shared on WhatsApp after you send this.</p>}
<div><button className="btn" type="submit">{label}</button></div>
{sent?.err&&<p role="status" className="note">Please add your name, phone number and a short message.</p>}
{sent?.text&&<p role="status" className="note">Thank you, {sent.name}. Your enquiry is ready: <a className="lnk" target="_blank" rel="noopener" href={wa(sent.text)}>send it on WhatsApp</a> or <a className="lnk" href={"mailto:"+settings.email+"?subject=Enquiry&body="+encodeURIComponent(sent.text)}>by email</a>.</p>}</form>}
