import{r as T,c as $,d as x,o as g,a as b,b as r,w as W,v as Y,u as y,i as q,p as O,e as P,s as F,f as H,g as K,h as G,j as J,n as U,k as Q,t as E,l as X,m as Z,q as z,F as I,x as tt,y as et,z as k,A as nt}from"./vendor.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(e){if(e.ep)return;e.ep=!0;const c=n(e);fetch(e.href,c)}})();const h=T(""),B=$(()=>ot(h.value)),M=$(()=>B.value.map(t=>t.url));function ot(t){const s=t.split(`
`).map(o=>o.trim()).filter(o=>o),n=[];for(const o of s){const[e,...c]=o.split(/\s+(#|\/\/)/),[l,...i]=e.trim().split(/\s+/);if(l.startsWith("http")){const d=D(l);if(d&&i.every(m=>!D(m))){n.push({url:d,comment:[...i,...c].join(" ")});continue}d&&n.push({url:d})}else i.unshift(l);for(const d of i){const m=D(d);m&&n.push({url:m})}}return n}function D(t){const s=t.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);if(console.log(s),s!=null&&s.groups)return s.groups.url}function st(t,s=100){const n=i=>`${i.length?'["'+i.join('", "')+'"]':"[]"}`;if(t.length<=s)return`/* ${t.length.toString().padStart(3)} */ ${n(t)},`;const o=i=>i.toString().length,e=Math.trunc(t.length/s),l=[`/* ${t.length.toString().padStart(1+o(t.length))+" ".repeat(3+o(e))} */`];for(let i=0;i<=e;i++){const d=t.slice(s*i,s+s*i),m=`(${i+1})`.padStart(2+o(e)),a=d.length.toString().padStart(1+o(t.length));l.push(`/* ${a} ${m} */ ${n(d)},`)}return l.join(`
`)}const L=t=>(O("data-v-f9a7f093"),t=t(),P(),t),rt={class:"row row-cols-lg-3 g-3 align-items-end"},at={class:"input col-12"},ct=L(()=>r("label",{for:"urls-textarea",class:"fuck-off-lighthouse"},null,-1)),it={class:"input col-12"},lt={class:"row"},ut=L(()=>r("span",{class:"btn-group"},[r("span",{class:"input-group-text me-2"},"Clipboard")],-1)),pt={class:".col m-1"},dt=L(()=>r("span",{class:"btn-group"},[r("span",{class:"input-group-text me-2 text-center"},"Controls")],-1)),ft=x({__name:"InputControls",setup(t){const s=new WeakMap;async function n(a){a.classList.add("btn-active");const u=F(150);s.set(a,u),await u,s.get(a)===u&&a.classList.remove("btn-active")}const o=T(null);function e(a){var u;h.value="",(u=o.value)==null||u.focus(),n(a.currentTarget)}function c(a){navigator.clipboard.writeText(M.value.join(" ")),n(a.currentTarget)}function l(a){a.preventDefault(),navigator.clipboard.writeText(M.value.join(`
`)),n(a.currentTarget)}function i(a){a.button===1&&(a.preventDefault(),navigator.clipboard.writeText(st(M.value)),n(a.currentTarget))}async function d(a){const{currentTarget:u}=a,v=await navigator.clipboard.readText();console.log("[clipboard] readText:",v),h.value&&!h.value.endsWith(`
`)&&(h.value+=`
`),h.value+=v,n(u)}async function m(a){const{currentTarget:u}=a,v=await navigator.clipboard.readText();console.log("[clipboard] readText:",v),h.value=v,n(u)}return(a,u)=>(g(),b("div",rt,[r("div",at,[ct,W(r("textarea",{id:"urls-textarea",spellcheck:"false","onUpdate:modelValue":u[0]||(u[0]=v=>q(h)?h.value=v:null),ref_key:"textareaEl",ref:o},null,512),[[Y,y(h)]])]),r("div",it,[r("span",lt,[r("span",{class:".col m-1"},[ut,r("button",{class:"btn btn-outline-primary me-1",onClick:m},"Replace"),r("button",{class:"btn btn-outline-primary me-1",onClick:d},"Append")]),r("span",pt,[dt,r("button",{class:"btn btn-outline-primary me-1",onClick:e},"Clear"),r("button",{class:"btn btn-primary me-1",title:"Copy URLs",onClick:c,onContextmenu:l,onPointerdown:i},"Copy",32)])])])]))}});const S=(t,s)=>{const n=t.__vccOpts||t;for(const[o,e]of s)n[o]=e;return n},_t=S(ft,[["__scopeId","data-v-f9a7f093"]]);function mt(t,s=50){let n=!1,o=!1,e,c;return function(...l){n?(e=this,c=l,o=!0):(n=!0,setTimeout(function(){o&&t.apply(e,c),n=o=!1},s),t.apply(this,l))}}const ht={class:"col-9 nowrap-text-ceil"},vt={class:"nowrap-text-ceil-content"},gt=["title","onContextmenu"],yt=["href","title"],bt={class:"col-3 comment nowrap-text-ceil"},xt={class:"comment-content nowrap-text-ceil-content"},wt=x({__name:"UrlListItem",props:{ue:null},setup(t){const n=t.ue.url,o=H("HrefLister","Visits"),e=T(-1);K(async()=>{e.value=await m()||-2,console.log(e.value)});const c=$(l);function l(){return e.value<0?"never clicked":u(e.value)}const i=$(()=>{if(e.value<0)return"never-clicked";const f=Date.now(),p=Math.trunc((f-e.value)/1e3);return p<60?"minute-1":p<60*2?"minute-2":p<60*5?"minute-5":p<60*10?"minute-10":p<60*30?"minute-30":p<60*60?"hour-1":p<60*60*2?"hour-2":p<60*60*24?"day-1":"day-n"});async function d(){const f=Date.now();await X(n,f,o),e.value=f}function m(){return G(n,o)}async function a(){await Z(n,o),e.value=-2}function u(f){return v(f)+" — "+J(f,"YYYY.MM.DD HH:mm:SS",!1)}function v(f){const p=Date.now(),_=Math.trunc((p-f)/1e3);if(_<60)return`${_} second${_>1?"s":""} ago`;if(_<60*60){const C=Math.trunc(_/60);return`${C} minute${C>1?"s":""} ago`}if(_<60*60*24){const C=Math.trunc(_/60%60).toString().padStart(2,"0");return`${Math.trunc(_/60/60)}:${C} ago`}return Math.trunc(_/60/60/24)+" days ago"}const w=T(!1);function N(){w.value=!0,d()}function V(){w.value=!w.value}const A=mt(j,1e3);function j(){z(e)}function R(f){f.button===1&&(f.preventDefault(),a())}return(f,p)=>(g(),b("tr",{class:U({clicked:w.value}),onPointerenter:p[0]||(p[0]=(..._)=>y(A)&&y(A)(..._))},[r("td",ht,[r("span",vt,[r("span",{class:U(["info-dot",{["has-comment"]:t.ue.comment,visited:e.value>0,[y(i)]:!0}]),title:y(c),onContextmenu:Q(V,["prevent"]),onPointerdown:R},null,42,gt),r("a",{class:"url link-primary",target:"_blank",rel:"noreferrer noopener",href:t.ue.url,title:t.ue.comment,onClick:N},E(t.ue.url),9,yt)])]),r("td",bt,[r("span",xt,E(t.ue.comment),1)])],34))}});const Ct=S(wt,[["__scopeId","data-v-cc59fe4c"]]),Tt={class:"table table-borderless"},$t=x({__name:"UrlList",setup(t){return(s,n)=>(g(),b("div",null,[r("table",Tt,[r("tbody",null,[(g(!0),b(I,null,tt(y(B),o=>(g(),et(Ct,{key:o.url,ue:o},null,8,["ue"]))),128))])])]))}}),Mt=r("hr",null,null,-1),Dt=r("hr",null,null,-1),kt=x({__name:"Main",setup(t){return(s,n)=>(g(),b(I,null,[Mt,k(_t),Dt,k($t)],64))}}),It=t=>(O("data-v-80fad6c5"),t=t(),P(),t),Lt=It(()=>r("a",{class:"readme",title:"Open Readme",href:"https://github.com/AlttiRi/href-lister#keeplister",target:"_blank"},[r("i",null,"i")],-1)),St=x({__name:"App",setup(t){return(s,n)=>(g(),b(I,null,[k(kt),Lt],64))}});const At=S(St,[["__scopeId","data-v-80fad6c5"]]);nt(At).mount("#app");
//# sourceMappingURL=index.js.map
