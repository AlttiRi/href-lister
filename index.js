import{r as x,c as M,d as b,o as h,a as v,b as a,w as B,v as j,u as D,i as R,p as A,e as U,s as W,f as Y,g as F,h as H,j as q,n as S,k as K,t as G,l as J,m as Q,q as X,F as I,x as Z,y as C,z}from"./vendor.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const m=x(""),O=M(()=>tt(m.value)),T=M(()=>O.value.map(t=>t.url));function tt(t){const n=t.split(`
`).map(s=>s.trim()).filter(s=>s),o=[];for(const s of n){const[e,...i]=s.split(/\s+(#|\/\/)/),[u,...c]=e.trim().split(/\s+/);if(u.startsWith("http")){const p=$(u);if(p&&c.every(_=>!$(_))){o.push({url:p,comment:[...c,...i].join(" ")});continue}p&&o.push({url:p})}else c.unshift(u);for(const p of c){const _=$(p);_&&o.push({url:_})}}return o}function $(t){const n=t.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);if(console.log(n),n!=null&&n.groups)return n.groups.url}function et(t,n=100){const o=c=>`${c.length?'["'+c.join('", "')+'"]':"[]"}`;if(t.length<=n)return`/* ${t.length.toString().padStart(3)} */ ${o(t)},`;const s=c=>c.toString().length,e=Math.trunc(t.length/n),u=[`/* ${t.length.toString().padStart(1+s(t.length))+" ".repeat(3+s(e))} */`];for(let c=0;c<=e;c++){const p=t.slice(n*c,n+n*c),_=`(${c+1})`.padStart(2+s(e)),r=p.length.toString().padStart(1+s(t.length));u.push(`/* ${r} ${_} */ ${o(p)},`)}return u.join(`
`)}const L=t=>(A("data-v-f9a7f093"),t=t(),U(),t),nt={class:"row row-cols-lg-3 g-3 align-items-end"},ot={class:"input col-12"},st=L(()=>a("label",{for:"urls-textarea",class:"fuck-off-lighthouse"},null,-1)),rt={class:"input col-12"},at={class:"row"},ct=L(()=>a("span",{class:"btn-group"},[a("span",{class:"input-group-text me-2"},"Clipboard")],-1)),it={class:".col m-1"},lt=L(()=>a("span",{class:"btn-group"},[a("span",{class:"input-group-text me-2 text-center"},"Controls")],-1)),ut=b({__name:"InputControls",setup(t){const n=new WeakMap;async function o(r){r.classList.add("btn-active");const l=W(150);n.set(r,l),await l,n.get(r)===l&&r.classList.remove("btn-active")}const s=x(null);function e(r){var l;m.value="",(l=s.value)==null||l.focus(),o(r.currentTarget)}function i(r){navigator.clipboard.writeText(T.value.join(" ")),o(r.currentTarget)}function u(r){r.preventDefault(),navigator.clipboard.writeText(T.value.join(`
`)),o(r.currentTarget)}function c(r){r.button===1&&(r.preventDefault(),navigator.clipboard.writeText(et(T.value)),o(r.currentTarget))}async function p(r){const{currentTarget:l}=r,d=await navigator.clipboard.readText();console.log("[clipboard] readText:",d),m.value&&!m.value.endsWith(`
`)&&(m.value+=`
`),m.value+=d,o(l)}async function _(r){const{currentTarget:l}=r,d=await navigator.clipboard.readText();console.log("[clipboard] readText:",d),m.value=d,o(l)}return(r,l)=>(h(),v("div",nt,[a("div",ot,[st,B(a("textarea",{id:"urls-textarea",spellcheck:"false","onUpdate:modelValue":l[0]||(l[0]=d=>R(m)?m.value=d:null),ref_key:"textareaEl",ref:s},null,512),[[j,D(m)]])]),a("div",rt,[a("span",at,[a("span",{class:".col m-1"},[ct,a("button",{class:"btn btn-outline-primary me-1",onClick:_},"Replace"),a("button",{class:"btn btn-outline-primary me-1",onClick:p},"Append")]),a("span",it,[lt,a("button",{class:"btn btn-outline-primary me-1",onClick:e},"Clear"),a("button",{class:"btn btn-primary me-1",title:"Copy URLs",onClick:i,onContextmenu:u,onPointerdown:c},"Copy",32)])])])]))}});const k=(t,n)=>{const o=t.__vccOpts||t;for(const[s,e]of n)o[s]=e;return o},pt=k(ut,[["__scopeId","data-v-f9a7f093"]]),dt=["title","onContextmenu"],ft=["href","title"],_t=b({__name:"UrlListItem",props:{ue:null},setup(t){const o=t.ue.url,s=Y("HrefLister","Visits"),e=x(-1);F(async()=>{e.value=await p()||-2,console.log(e.value)});const i=M(u);function u(){return e.value<0?"never visited":r(e.value)}async function c(){const f=Date.now();await Q(o,f,s),e.value=f}function p(){return H(o,s)}async function _(){await X(o,s),e.value=-2}function r(f){return q(f,"YYYY.MM.DD HH:mm:SS",!1)+" — "+l(f)}function l(f){const w=Date.now(),g=Math.trunc((w-f)/1e3);if(g<60)return`${g} second${g>1?"s":""} ago`;if(g<60*60){const y=Math.trunc(g/60);return`${y} minute${y>1?"s":""} ago`}if(g<60*60*24){const y=Math.trunc(g/60);return`${Math.trunc(g/60/60)}:${y} ago`}return Math.trunc(g/60/60/24)+" days ago"}const d=x(!1);function E(){d.value=!0,c()}function N(){d.value=!d.value}function P(){J(e)}function V(f){f.button===1&&(f.preventDefault(),_(),console.log("xxx"))}return(f,w)=>(h(),v("td",{class:S({clicked:d.value})},[a("span",{class:S(["info-dot",{["has-comment"]:t.ue.comment}]),title:D(i),onContextmenu:K(N,["prevent"]),onPointerenter:P,onPointerdown:V},null,42,dt),a("a",{class:"url link-primary",target:"_blank",rel:"noreferrer noopener",href:t.ue.url,title:t.ue.comment,onClick:E},G(t.ue.url),9,ft)],2))}});const mt=k(_t,[["__scopeId","data-v-3b3373cb"]]),gt={class:"table table-borderless"},ht=b({__name:"UrlList",setup(t){return(n,o)=>(h(),v("div",null,[a("table",gt,[a("tbody",null,[(h(!0),v(I,null,Z(D(O),s=>(h(),v("tr",{key:s.url},[C(mt,{ue:s},null,8,["ue"])]))),128))])])]))}}),vt=a("hr",null,null,-1),bt=a("hr",null,null,-1),yt=b({__name:"Main",setup(t){return(n,o)=>(h(),v(I,null,[vt,C(pt),bt,C(ht)],64))}}),xt=t=>(A("data-v-c9a0b7c1"),t=t(),U(),t),Ct=xt(()=>a("a",{class:"readme",title:"Open Readme",href:"https://github.com/AlttiRi/href-lister#keeplister",target:"_blank"},[a("i",null,"i")],-1)),wt=b({__name:"App",setup(t){return(n,o)=>(h(),v(I,null,[C(yt),Ct],64))}});const Tt=k(wt,[["__scopeId","data-v-c9a0b7c1"]]);z(Tt).mount("#app");
//# sourceMappingURL=index.js.map
