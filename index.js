import{r as x,c as T,a as it,d as $,o as b,b as C,e as s,w as lt,v as ut,u as m,i as dt,p as W,f as Y,s as pt,g as G,h as K,j as J,k as ft,l as Q,m as X,n as mt,q as _t,t as vt,x as k,y as I,z as ht,A as U,B as j,F as A,C as gt,D as q,E as Z,T as bt,G as P,H as yt}from"./vendor.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function o(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(r){if(r.ep)return;r.ep=!0;const c=o(r);fetch(r.href,c)}})();const g=x("");location.href==="http://localhost:5173/"&&(g.value=`http://localhost:5173/ asdf
http://localhost:5173/#qwe #qwerty1qwerty2qwerty3qwerty4qwerty5qwerty6
http://localhost:5173/#qqq`);const v=x(null),H=x(null),z=T(()=>{const t=xt(g.value),e=it(t);return console.log(t,e),e}),E=T(()=>z.value.map(t=>t.url));function xt(t){const e=t.split(`
`).map(n=>n.trim()).filter(n=>n),o=[];for(const n of e){const[r,...c]=n.split(/\s+(#|\/\/)/),[u,...d]=r.trim().split(/\s+/);if(u.startsWith("http")){const _=L(u);if(_&&d.every(h=>!L(h))){o.push({url:_,comment:[...d,...c].join(" ")});continue}_&&o.push({url:_})}else d.unshift(u);for(const _ of d){const h=L(_);h&&o.push({url:h})}}return o}function L(t){const e=t.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);if(console.log(e),e!=null&&e.groups)return e.groups.url}function Ct(t,e=100){const o=d=>`${d.length?'["'+d.join('", "')+'"]':"[]"}`;if(t.length<=e)return`/* ${t.length.toString().padStart(3)} */ ${o(t)},`;const n=d=>d.toString().length,r=Math.trunc(t.length/e),u=[`/* ${t.length.toString().padStart(1+n(t.length))+" ".repeat(3+n(r))} */`];for(let d=0;d<=r;d++){const _=t.slice(e*d,e+e*d),h=`(${d+1})`.padStart(2+n(r)),i=_.length.toString().padStart(1+n(t.length));u.push(`/* ${i} ${h} */ ${o(_)},`)}return u.join(`
`)}const V=t=>(W("data-v-95e40442"),t=t(),Y(),t),wt={class:"row row-cols-lg-3 g-3 align-items-end"},Tt={class:"input col-12"},$t=V(()=>s("label",{for:"urls-textarea",class:"fuck-off-lighthouse"},null,-1)),kt={class:"input col-12"},St={class:"row"},Mt=V(()=>s("span",{class:"btn-group"},[s("span",{class:"input-group-text me-2"},"Clipboard")],-1)),Dt={class:".col m-1"},It=V(()=>s("span",{class:"btn-group"},[s("span",{class:"input-group-text me-2 text-center"},"Controls")],-1)),Et=$({__name:"InputControls",setup(t){const e=new WeakMap;async function o(i){i.classList.add("btn-active");const p=pt(150);e.set(i,p),await p,e.get(i)===p&&i.classList.remove("btn-active")}const n=x(null);function r(i){var p;g.value="",(p=n.value)==null||p.focus(),o(i.currentTarget)}function c(i){navigator.clipboard.writeText(E.value.join(" ")),o(i.currentTarget)}function u(i){i.preventDefault(),navigator.clipboard.writeText(E.value.join(`
`)),o(i.currentTarget)}function d(i){i.button===1&&(i.preventDefault(),navigator.clipboard.writeText(Ct(E.value)),o(i.currentTarget))}async function _(i){const{currentTarget:p}=i,y=await navigator.clipboard.readText();console.log("[clipboard] readText:",y),g.value&&!g.value.endsWith(`
`)&&(g.value+=`
`),g.value+=y,o(p)}async function h(i){const{currentTarget:p}=i,y=await navigator.clipboard.readText();console.log("[clipboard] readText:",y),g.value=y,o(p)}return(i,p)=>(b(),C("div",wt,[s("div",Tt,[$t,lt(s("textarea",{id:"urls-textarea",spellcheck:"false","onUpdate:modelValue":p[0]||(p[0]=y=>dt(g)?g.value=y:null),ref_key:"textareaEl",ref:n},null,512),[[ut,m(g)]])]),s("div",kt,[s("span",St,[s("span",{class:".col m-1"},[Mt,s("button",{class:"btn btn-outline-primary me-1",onClick:h},"Replace"),s("button",{class:"btn btn-outline-primary me-1",onClick:_},"Append")]),s("span",Dt,[It,s("button",{class:"btn btn-outline-primary me-1",onClick:r},"Clear"),s("button",{class:"btn btn-primary me-1",title:"Copy URLs",onClick:c,onContextmenu:u,onPointerdown:d},"Copy",32)])])])]))}});const D=(t,e)=>{const o=t.__vccOpts||t;for(const[n,r]of e)o[n]=r;return o},Lt=D(Et,[["__scopeId","data-v-95e40442"]]);function Ut(t,e=50){let o=!1,n=!1,r,c;return function(...u){o?(r=this,c=u,n=!0):(o=!0,setTimeout(function(){n&&t.apply(r,c),o=n=!1},e),t.apply(this,u))}}const tt=G("HrefListerComments","Comments");function Pt(t,e){J(t,e,tt)}function At(t){return K(t,tt)}const N=G("HrefLister","Visits");function qt(t,e){return J(t,e,N)}function Vt(t){return K(t,N)}function Nt(t){return ft(t,N)}const Ot={class:"col-9 nowrap-text-ceil url"},Bt={class:"nowrap-text-ceil-content"},Ft=["title","onContextmenu"],Rt=["href","title"],jt={class:"comment-content nowrap-text-ceil-content no-dbl-click-select"},Ht=$({__name:"UrlListItem",props:{ue:null},setup(t){const e=t,o=e.ue.url,n=x(-1);Q(r),X(r);async function r(){const l=Vt(o),f=At(o);n.value=await l||-2;const a=await f;a&&(e.ue.commentFromStore=a)}function c(){Nt(o),n.value=-2}function u(){const l=Date.now();qt(o,l),n.value=l}const d=T(_);function _(){return n.value<0?"never clicked":et(n.value)}const h=T(()=>{if(e.ue.commentFromStore&&!e.ue.comment)return"comment-from-store";if(e.ue.commentFromStore&&e.ue.commentFromStore!==e.ue.comment)return"comment-from-store-over"});function i(){k(v.value)===k(e.ue)?v.value=null:v.value=e.ue}const p=T(()=>y(n.value));function y(l){if(l<0)return"never-clicked";const f=Date.now(),a=Math.trunc((f-l)/1e3);return a<60?"minute-1":a<60*2?"minute-2":a<60*5?"minute-5":a<60*10?"minute-10":a<60*30?"minute-30":a<60*45?"minute-45":a<60*60?"minute-60":a<3600*2?"hour-2":a<3600*4?"hour-4":a<3600*8?"hour-8":a<3600*14?"hour-14":a<3600*24?"day-1":a<86400*7?"day-7":a<86400*30?"month-1":a<2592e3*3?"month-3":a<2592e3*6?"month-6":"long-ago"}mt(n,l=>{l>0&&B()}),_t(F);let O;const w=1e3*60;function B(){F();const l=Date.now()-n.value;let f;if(l<w*10)f=w;else if(l<w*60)f=w*10;else if(l<w*60*24)f=w*60;else return;console.log("setTimeout",f),O=setTimeout(()=>{j(n),B()},f)}function F(){clearTimeout(O)}function et(l){return nt(l)+" — "+vt(l,"YYYY.MM.DD HH:mm:SS",!1)}function nt(l){const f=Date.now(),a=Math.trunc((f-l)/1e3);if(a<60)return`${a} second${a>1?"s":""} ago`;if(a<60*60){const M=Math.trunc(a/60);return`${M} minute${M>1?"s":""} ago`}if(a<60*60*24){const M=Math.trunc(a/60%60).toString().padStart(2,"0");return`${Math.trunc(a/60/60)}:${M} ago`}return Math.trunc(a/60/60/24)+" days ago"}const S=x(!1);function ot(){S.value=!0,u(),H.value=k(e.ue)}const st=T(()=>k(H.value)===k(e.ue));function rt(){S.value=!S.value}const R=Ut(at,1e3);function at(){j(n)}function ct(l){l.button===1&&(l.preventDefault(),c())}return(l,f)=>(b(),C("tr",{onPointerenter:f[0]||(f[0]=(...a)=>m(R)&&m(R)(...a)),class:I({clicked:S.value,"last-clicked":m(st)})},[s("td",Ot,[s("span",Bt,[s("span",{class:I(["info-dot",{["has-comment"]:t.ue.comment,visited:n.value>0,[m(p)]:!0}]),title:m(d),onContextmenu:ht(rt,["prevent"]),onPointerdown:ct},null,42,Ft),s("a",{class:"url link-primary",target:"_blank",rel:"noreferrer noopener",href:t.ue.url,title:t.ue.comment,onClick:ot},U(t.ue.url),9,Rt)])]),s("td",{class:I(["col-3 comment nowrap-text-ceil",{[m(h)]:m(h)}]),onDblclick:i},[s("span",jt,U(t.ue.commentFromStore||t.ue.comment||" "),1)],34)],34))}});const Wt=D(Ht,[["__scopeId","data-v-a49bb0b3"]]),Yt={class:"table table-borderless"},Gt=$({__name:"UrlList",setup(t){return(e,o)=>(b(),C("div",null,[s("table",Yt,[s("tbody",null,[(b(!0),C(A,null,gt(m(z),n=>(b(),q(Wt,{key:n.url,ue:n},null,8,["ue"]))),128))])])]))}}),Kt={key:0,class:"message-edit-popup modal"},Jt={class:"popup-content"},Qt={class:"modal-content"},Xt={class:"modal-header"},Zt={class:"modal-title"},zt={class:"modal-body"},te=["value"],ee=$({__name:"MessageEditPopup",setup(t){function e(){v.value=null}const o=x(null),n=()=>{var c;return(c=o.value)==null?void 0:c.focus()};Q(n),X(n);function r(c){if(!v.value)return;const u=c.currentTarget.value;v.value.commentFromStore=u,Pt(v.value.url,u)}return(c,u)=>(b(),q(bt,{to:"body"},[m(v)?(b(),C("div",Kt,[s("div",Jt,[s("div",Qt,[s("div",Xt,[s("h5",Zt,U(m(v).url),1),s("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:e})]),s("div",zt,[s("textarea",{rows:"5",value:m(v).commentFromStore||m(v).comment,onInput:r,ref_key:"textareaElem",ref:o},null,40,te)])])])])):Z("",!0)]))}});const ne=D(ee,[["__scopeId","data-v-fc47bbe6"]]),oe=s("hr",null,null,-1),se=s("hr",null,null,-1),re=$({__name:"Main",setup(t){return(e,o)=>(b(),C(A,null,[oe,P(Lt),se,P(Gt),m(v)?(b(),q(ne,{key:0})):Z("",!0)],64))}}),ae=t=>(W("data-v-80fad6c5"),t=t(),Y(),t),ce=ae(()=>s("a",{class:"readme",title:"Open Readme",href:"https://github.com/AlttiRi/href-lister#keeplister",target:"_blank"},[s("i",null,"i")],-1)),ie=$({__name:"App",setup(t){return(e,o)=>(b(),C(A,null,[P(re),ce],64))}});const le=D(ie,[["__scopeId","data-v-80fad6c5"]]);yt(le).mount("#app");
//# sourceMappingURL=index.js.map
