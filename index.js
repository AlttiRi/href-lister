import{r as w,c as b,d as T,o as y,a as x,b as s,w as O,v as F,u as f,i as N,e as vt,p as X,f as Z,s as ht,g as z,h as tt,j as et,k as gt,l as nt,m as ot,n as yt,q as bt,t as Ct,x as k,y as U,z as wt,A as V,B as J,F as q,C as xt,D as B,E as st,T as Tt,G as D,H as $t}from"./vendor.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const rt={input_only:"",input_only_disabled:!1,input_ignore:"",input_ignore_disabled:!1,reverse_input_only:!1,case_sensitive:!1},E=w(rt.input_only),I=w(rt.input_ignore),kt=b(()=>{let t=E.value.trim().split(/\s+/g).filter(o=>o),e=I.value.trim().split(/\s+/g).filter(o=>o);t=t.map(o=>o.toLowerCase()),e=e.map(o=>o.toLowerCase());let r,n;return r=o=>t.some(i=>o.toLowerCase().includes(i)),n=o=>e.some(i=>o.toLowerCase().includes(i)),{matchOnly:r,matchIgnore:n,onlyParts:t,ignoreParts:e}}),Mt=b(()=>{const{matchOnly:t,matchIgnore:e,onlyParts:r}=kt.value;return r.length?n=>t(n):n=>!e(n)}),St={class:"row row-cols-lg-3 g-3 align-items-center"},Dt={class:"col-12"},Et={style:{display:"contents"}},It={class:"input-group"},Lt=s("span",{class:"input-group-text"},"Only",-1),Ut={class:"col-12"},Pt={style:{display:"contents"}},At={class:"input-group"},Ot=s("span",{class:"input-group-text"},"Ignore",-1),Ft=T({__name:"Filters",setup(t){return(e,r)=>(y(),x("div",St,[s("div",Dt,[s("label",Et,[s("span",It,[Lt,O(s("input",{type:"text",class:"form-control","onUpdate:modelValue":r[0]||(r[0]=n=>N(E)?E.value=n:null)},null,512),[[F,f(E)]])])])]),s("div",Ut,[s("label",Pt,[s("span",At,[Ot,O(s("input",{type:"text",class:"form-control","onUpdate:modelValue":r[1]||(r[1]=n=>N(I)?I.value=n:null)},null,512),[[F,f(I)]])])])])]))}}),g=w("");location.href==="http://localhost:5173/"&&(g.value=`http://localhost:5173/ asdf
http://localhost:5173/#qwe #qwerty1qwerty2qwerty3qwerty4qwerty5qwerty6
http://localhost:5173/#qqq`);const v=w(null),Q=w(null),lt=b(()=>{const t=Nt(g.value),e=vt(t);return console.log(t,e),e}),at=b(()=>lt.value.filter(t=>Mt.value(t.url)));b(()=>lt.value.map(t=>t.url));const P=b(()=>at.value.map(t=>t.url));function Nt(t){const e=t.split(`
`).map(n=>n.trim()).filter(n=>n),r=[];for(const n of e){const[o,...i]=n.split(/\s+(#|\/\/)/),[a,...d]=o.trim().split(/\s+/);if(a.startsWith("http")){const _=A(a);if(_&&d.every(h=>!A(h))){r.push({url:_,comment:[...d,...i].join(" ")});continue}_&&r.push({url:_})}else d.unshift(a);for(const _ of d){const h=A(_);h&&r.push({url:h})}}return r}function A(t){const e=t.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);if(console.log(e),e!=null&&e.groups)return e.groups.url}function Vt(t,e=100){const r=d=>`${d.length?'["'+d.join('", "')+'"]':"[]"}`;if(t.length<=e)return`/* ${t.length.toString().padStart(3)} */ ${r(t)},`;const n=d=>d.toString().length,o=Math.trunc(t.length/e),a=[`/* ${t.length.toString().padStart(1+n(t.length))+" ".repeat(3+n(o))} */`];for(let d=0;d<=o;d++){const _=t.slice(e*d,e+e*d),h=`(${d+1})`.padStart(2+n(o)),u=_.length.toString().padStart(1+n(t.length));a.push(`/* ${u} ${h} */ ${r(_)},`)}return a.join(`
`)}const R=t=>(X("data-v-3429ac97"),t=t(),Z(),t),qt={class:"row row-cols-lg-3 g-3 align-items-end"},Bt={class:"input col-12"},Rt=R(()=>s("label",{for:"urls-textarea",class:"fuck-off-lighthouse"},null,-1)),jt={class:"input col-12"},Ht={class:"row"},Kt=R(()=>s("span",{class:"btn-group"},[s("span",{class:"input-group-text me-2"},"Clipboard")],-1)),Wt={class:".col m-1"},Yt=R(()=>s("span",{class:"btn-group"},[s("span",{class:"input-group-text me-2 text-center"},"Controls")],-1)),Gt=T({__name:"InputControls",setup(t){const e=new WeakMap;async function r(u){u.classList.add("btn-active");const p=ht(150);e.set(u,p),await p,e.get(u)===p&&u.classList.remove("btn-active")}const n=w(null);function o(u){var p;g.value="",(p=n.value)==null||p.focus(),r(u.currentTarget)}function i(u){navigator.clipboard.writeText(P.value.join(" ")),r(u.currentTarget)}function a(u){u.preventDefault(),navigator.clipboard.writeText(P.value.join(`
`)),r(u.currentTarget)}function d(u){u.button===1&&(u.preventDefault(),navigator.clipboard.writeText(Vt(P.value)),r(u.currentTarget))}async function _(u){const{currentTarget:p}=u,C=await navigator.clipboard.readText();console.log("[clipboard] readText:",C),g.value&&!g.value.endsWith(`
`)&&(g.value+=`
`),g.value+=C,r(p)}async function h(u){const{currentTarget:p}=u,C=await navigator.clipboard.readText();console.log("[clipboard] readText:",C),g.value=C,r(p)}return(u,p)=>(y(),x("div",qt,[s("div",Bt,[Rt,O(s("textarea",{id:"urls-textarea",spellcheck:"false","onUpdate:modelValue":p[0]||(p[0]=C=>N(g)?g.value=C:null),ref_key:"textareaEl",ref:n},null,512),[[F,f(g)]])]),s("div",jt,[s("span",Ht,[s("span",{class:".col m-1"},[Kt,s("button",{class:"btn btn-outline-primary me-1",onClick:h},"Replace"),s("button",{class:"btn btn-outline-primary me-1",onClick:_},"Append")]),s("span",Wt,[Yt,s("button",{class:"btn btn-outline-primary me-1",onClick:o},"Clear"),s("button",{class:"btn btn-primary me-1",title:"Copy URLs",onClick:i,onContextmenu:a,onPointerdown:d},"Copy",32)])])])]))}});const L=(t,e)=>{const r=t.__vccOpts||t;for(const[n,o]of e)r[n]=o;return r},Jt=L(Gt,[["__scopeId","data-v-3429ac97"]]);function Qt(t,e=50){let r=!1,n=!1,o,i;return function(...a){r?(o=this,i=a,n=!0):(r=!0,setTimeout(function(){n&&t.apply(o,i),r=n=!1},e),t.apply(this,a))}}const it=z("HrefListerComments","Comments");function Xt(t,e){et(t,e,it)}function Zt(t){return tt(t,it)}const j=z("HrefLister","Visits");function zt(t,e){return et(t,e,j)}function te(t){return tt(t,j)}function ee(t){return gt(t,j)}const ne={class:"col-9 nowrap-text-ceil url"},oe={class:"nowrap-text-ceil-content"},se=["title","onContextmenu"],re=["href","title"],le={class:"comment-content nowrap-text-ceil-content no-dbl-click-select"},ae=T({__name:"UrlListItem",props:{ue:null},setup(t){const e=t,r=e.ue.url,n=w(-1);nt(o),ot(o);async function o(){const c=te(r),m=Zt(r);n.value=await c||-2;const l=await m;l&&(e.ue.commentFromStore=l)}function i(){ee(r),n.value=-2}function a(){const c=Date.now();zt(r,c),n.value=c}const d=b(_);function _(){return n.value<0?"never clicked":ct(n.value)}const h=b(()=>{if(e.ue.commentFromStore&&!e.ue.comment)return"comment-from-store";if(e.ue.commentFromStore&&e.ue.commentFromStore!==e.ue.comment)return"comment-from-store-over"});function u(){k(v.value)===k(e.ue)?v.value=null:v.value=e.ue}const p=b(()=>C(n.value));function C(c){if(c<0)return"never-clicked";const m=Date.now(),l=Math.trunc((m-c)/1e3);return l<60?"minute-1":l<60*2?"minute-2":l<60*5?"minute-5":l<60*10?"minute-10":l<60*30?"minute-30":l<60*45?"minute-45":l<60*60?"minute-60":l<3600*2?"hour-2":l<3600*4?"hour-4":l<3600*8?"hour-8":l<3600*14?"hour-14":l<3600*24?"day-1":l<86400*7?"day-7":l<86400*30?"month-1":l<2592e3*3?"month-3":l<2592e3*6?"month-6":"long-ago"}yt(n,c=>{c>0&&K()}),bt(W);let H;const $=1e3*60;function K(){W();const c=Date.now()-n.value;let m;if(c<$*10)m=$;else if(c<$*60)m=$*10;else if(c<$*60*24)m=$*60;else return;console.log("setTimeout",m),H=setTimeout(()=>{J(n),K()},m)}function W(){clearTimeout(H)}function ct(c){return ut(c)+" — "+Ct(c,"YYYY.MM.DD HH:mm:SS",!1)}function ut(c){const m=Date.now(),l=Math.trunc((m-c)/1e3);if(l<60)return`${l} second${l>1?"s":""} ago`;if(l<60*60){const S=Math.trunc(l/60);return`${S} minute${S>1?"s":""} ago`}if(l<60*60*24){const S=Math.trunc(l/60%60).toString().padStart(2,"0");return`${Math.trunc(l/60/60)}:${S} ago`}return Math.trunc(l/60/60/24)+" days ago"}const M=w(!1);function dt(c){c.button!==1||document.getRootNode().activeElement!==c.currentTarget||Y()}function Y(){M.value=!0,a(),Q.value=k(e.ue)}const pt=b(()=>k(Q.value)===k(e.ue));function mt(){M.value=!M.value}const G=Qt(ft,1e3);function ft(){J(n)}function _t(c){c.button===1&&(c.preventDefault(),i())}return(c,m)=>(y(),x("tr",{onPointerenter:m[0]||(m[0]=(...l)=>f(G)&&f(G)(...l)),class:U({clicked:M.value,"last-clicked":f(pt)})},[s("td",ne,[s("span",oe,[s("span",{class:U(["info-dot",{["has-comment"]:t.ue.comment,visited:n.value>0,[f(p)]:!0}]),title:f(d),onContextmenu:wt(mt,["prevent"]),onPointerdown:_t},null,42,se),s("a",{class:"url link-primary",target:"_blank",rel:"noreferrer noopener",href:t.ue.url,title:t.ue.comment,onClick:Y,onPointerup:dt},V(t.ue.url),41,re)])]),s("td",{class:U(["col-3 comment nowrap-text-ceil",{[f(h)]:f(h)}]),onDblclick:u},[s("span",le,V(t.ue.commentFromStore||t.ue.comment||" "),1)],34)],34))}});const ie=L(ae,[["__scopeId","data-v-29f57139"]]),ce={class:"table table-borderless"},ue=T({__name:"UrlList",setup(t){return(e,r)=>(y(),x("div",null,[s("table",ce,[s("tbody",null,[(y(!0),x(q,null,xt(f(at),n=>(y(),B(ie,{key:n.url,ue:n},null,8,["ue"]))),128))])])]))}}),de={class:"popup-content"},pe={class:"modal-content"},me={class:"modal-header"},fe={class:"modal-title"},_e={class:"modal-body"},ve=["value"],he=T({__name:"MessageEditPopup",setup(t){function e(a){a.currentTarget===a.target&&(v.value=null)}function r(a){a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),v.value=null)}const n=w(null),o=()=>{var a;return(a=n.value)==null?void 0:a.focus()};nt(o),ot(o);function i(a){if(!v.value)return;const d=a.currentTarget.value;v.value.commentFromStore=d,Xt(v.value.url,d)}return(a,d)=>(y(),B(Tt,{to:"body"},[f(v)?(y(),x("div",{key:0,class:"message-edit-popup modal",onClick:e},[s("div",de,[s("div",pe,[s("div",me,[s("h5",fe,V(f(v).url),1),s("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:e})]),s("div",_e,[s("textarea",{rows:"5",value:f(v).commentFromStore||f(v).comment,onInput:i,ref_key:"textareaElem",ref:n,onKeydown:r},null,40,ve)])])])])):st("",!0)]))}});const ge=L(he,[["__scopeId","data-v-c6abb4ea"]]),ye=s("hr",null,null,-1),be=s("hr",null,null,-1),Ce=s("hr",null,null,-1),we=T({__name:"Main",setup(t){return(e,r)=>(y(),x(q,null,[ye,D(Ft),be,D(Jt),Ce,D(ue),f(v)?(y(),B(ge,{key:0})):st("",!0)],64))}}),xe=t=>(X("data-v-80fad6c5"),t=t(),Z(),t),Te=xe(()=>s("a",{class:"readme",title:"Open Readme",href:"https://github.com/AlttiRi/href-lister#keeplister",target:"_blank"},[s("i",null,"i")],-1)),$e=T({__name:"App",setup(t){return(e,r)=>(y(),x(q,null,[D(we),Te],64))}});const ke=L($e,[["__scopeId","data-v-80fad6c5"]]);$t(ke).mount("#app");
//# sourceMappingURL=index.js.map
