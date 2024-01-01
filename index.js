import{r as $,c as v,d as T,o as u,a as _,b as o,w as X,v as Z,u as f,i as tt,e as K,f as ct,g as ut,s as dt,h as Ct,t as E,j as pt,k as b,l as It,m as P,p as W,n as Y,q as wt,x as xt,y as Ut,z as at,F as V,A as J,B as U,C as kt,D as H,E as Et,G as D,H as _t,T as ft,I as Lt,J as St,K as Mt}from"./vendor.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const mt={input_only:"",input_only_disabled:!1,input_ignore:"",input_ignore_disabled:!1,reverse_input_only:!1,case_sensitive:!1},q=$(mt.input_only),B=$(mt.input_ignore),Pt=v(()=>{let n=q.value.trim().split(/\s+/g).filter(a=>a),t=B.value.trim().split(/\s+/g).filter(a=>a);n=n.map(a=>a.toLowerCase()),t=t.map(a=>a.toLowerCase());let e,s;return e=a=>n.some(r=>a.toLowerCase().includes(r)),s=a=>t.some(r=>a.toLowerCase().includes(r)),{matchOnly:e,matchIgnore:s,onlyParts:n,ignoreParts:t}}),Dt=v(()=>{const{matchOnly:n,matchIgnore:t,onlyParts:e}=Pt.value;return e.length?s=>n(s):s=>!t(s)}),Vt={class:"row row-cols-lg-3 g-3 align-items-center"},Ot={class:"col-12"},Rt={style:{display:"contents"}},Nt={class:"input-group"},At=o("span",{class:"input-group-text"},"Only",-1),Ht={class:"col-12"},qt={style:{display:"contents"}},Bt={class:"input-group"},jt=o("span",{class:"input-group-text"},"Ignore",-1),Ft=T({__name:"Filters",setup(n){return(t,e)=>(u(),_("div",Vt,[o("div",Ot,[o("label",Rt,[o("span",Nt,[At,X(o("input",{type:"text",class:"form-control","onUpdate:modelValue":e[0]||(e[0]=s=>tt(q)?q.value=s:null)},null,512),[[Z,f(q)]])])])]),o("div",Ht,[o("label",qt,[o("span",Bt,[jt,X(o("input",{type:"text",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=s=>tt(B)?B.value=s:null)},null,512),[[Z,f(B)]])])])])]))}});function Kt(n){const t=n.split(`
`).map(s=>s.trim()).filter(s=>s),e=[];for(const s of t){const[a,...r]=s.split(/\s+(#|\/\/)/),[d,...c]=a.trim().split(/\s+/);if(d.startsWith("http")){const l=G(d);if(l&&c.every(y=>!G(y))){e.push({url:l,inputComment:[...c,...r].join(" ")});continue}l&&e.push({url:l})}else c.unshift(d);for(const l of c){const y=G(l);y&&e.push({url:y})}}return e}function G(n){const t=n.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);if(console.log(t),t!=null&&t.groups)return t.groups.url}const j=K("HrefListerUrlInfo","UrlInfo"),gt=class N{constructor(t,e,s){this.url=t,this.state=e,s&&(this.inputComment=s),e.visited&&(this.initialVisited=e.visited)}static async getInstance({url:t,inputComment:e}){let s=N.stateMap.get(t);return s?new N(t,s,e):(s=await ut(t,j),s===void 0&&(s={}),N.stateMap.set(t,s),new N(t,s,e))}get comment(){return this.state.comment}get visited(){return this.state.visited}get tags(){return this.state.tags}async setComment(t){this.state.comment=t,await this.update()}async delComment(){delete this.state.comment,await this.update()}async setVisited(t){this.state.visited=t,await this.update()}async delVisited(){delete this.state.visited,await this.update()}async addTag(t){this.state.tags||(this.state.tags=[]),!this.state.tags.includes(t)&&(this.state.tags.push(t),await this.update())}async delTag(t){if(!this.state.tags)return;const e=this.state.tags.indexOf(t);e!=-1&&(this.state.tags.splice(e,1),this.state.tags.length===0&&delete this.state.tags,await this.update())}update(){return Object.keys(this.state).length?dt(this.url,E(this.state),j):ct(this.url,j)}};gt.stateMap=new Map;let ht=gt;const Wt=K("HrefListerComments","Comments"),Yt=K("HrefLister","Visits");Object.assign(globalThis,{idb:{createStore:K,del:ct,get:ut,set:dt,entries:Ct,commentsStore:Wt,visitsStore:Yt,urlInfoStore:j},UrlInfo:ht});const Jt=-1,I=$(""),w=$(null),x=$(null),rt=$(null),F=$(new Set),vt=$([]);pt(async()=>{const n=Kt(I.value),t=[];for(const e of n)t.push(await ht.getInstance(e));vt.value=t});const yt=v(()=>vt.value.filter(n=>Dt.value(n.url))),M=v(()=>yt.value.map(n=>n.url));location.href==="http://localhost:5173/"&&(I.value=`http://localhost:5173/ asdf
http://localhost:5173/#qqq
http://localhost:5173/#qqq
http://localhost:5173/#www
`);function zt(n,t=50){let e=!1,s=!1,a,r;function d(){s?(setTimeout(d,t),n.apply(a,r)):e=!1,s=!1}return function(...c){e?(a=this,r=c,s=!0):(e=!0,setTimeout(d,t),n.apply(this,c))}}function Gt(n,t=100){const e=c=>`${c.length?'["'+c.join('", "')+'"]':"[]"}`;if(n.length<=t)return`/* ${n.length.toString().padStart(3)} */ ${e(n)},`;const s=c=>c.toString().length,a=Math.trunc(n.length/t),d=[`/* ${n.length.toString().padStart(1+s(n.length))+" ".repeat(3+s(a))} */`];for(let c=0;c<=a;c++){const l=n.slice(t*c,t+t*c),y=`(${c+1})`.padStart(2+s(a)),i=l.length.toString().padStart(1+s(n.length));d.push(`/* ${i} ${y} */ ${e(l)},`)}return d.join(`
`)}function Qt(n){const t=Date.now(),e=Math.trunc((t-n)/1e3);if(e<60)return`${e} second${e>1?"s":""} ago`;if(e<60*60){const s=Math.trunc(e/60);return`${s} minute${s>1?"s":""} ago`}if(e<60*60*24){const s=Math.trunc(e/60%60).toString().padStart(2,"0");return`${Math.trunc(e/60/60)}:${s} ago`}return Math.trunc(e/60/60/24)+" days ago"}function Xt(n){let t=0;for(let e=0;e<n.length;e++)t=Math.imul(Math.imul(31,t)+n.charCodeAt(e),1);return t}const lt=v(()=>{const n=[...new Set(M.value)].sort().join(" ");return Math.abs(Xt(n)).toString(16).slice(-8).padStart(8,"0").toUpperCase()}),Q=v(()=>{const n=M.value,t=n.length,e=new Set(n).size;return{count:t,uniqueCount:e}}),R=v(()=>{let n=0;const t=new Set;for(const e of M.value)F.value.has(e)&&(n++,t.add(e));return{count:n,uniqueCount:t.size}}),A=n=>(W("data-v-b4bb7936"),n=n(),Y(),n),Zt={class:"URLsInfoLine--comp"},te={title:"URLs count, (unique one)"},ee=A(()=>o("span",{class:"grey"}," — ",-1)),se={title:"URLs hash"},ne=A(()=>o("span",{class:"grey"},"#",-1)),oe={class:"urls-hash"},ae={key:0},re=A(()=>o("span",{class:"grey"}," — ",-1)),le={title:"Clicked URLs count, (unique one)"},ie=A(()=>o("span",{class:"grey"},"[",-1)),ce=A(()=>o("span",{class:"grey"},"]",-1)),ue=T({__name:"URLsInfoLine",setup(n){pt(()=>{const{count:e,uniqueCount:s}=Q.value;if(!e){document.title="HrefLister";return}if(document.title=`HrefLister — ${t(e,s)} — #${lt.value}`,R.value.count){const{count:a,uniqueCount:r}=R.value;document.title=`${document.title} — [ ${t(a,r)} ]`}});function t(e,s){let a=e.toString();return s!==length&&(a=`${a} (${s})`),a}return(e,s)=>(u(),_("div",Zt,[o("span",te,b(f(Q).count)+" ("+b(f(Q).uniqueCount)+")",1),ee,o("span",se,[ne,o("span",oe,b(f(lt)),1)]),f(R).count?(u(),_("span",ae,[re,o("span",le,[ie,It(" "+b(f(R).count)+" ("+b(f(R).uniqueCount)+") ",1),ce])])):P("",!0)]))}});const k=(n,t)=>{const e=n.__vccOpts||n;for(const[s,a]of t)e[s]=a;return e},de=k(ue,[["__scopeId","data-v-b4bb7936"]]),st=n=>(W("data-v-ca1aa4d1"),n=n(),Y(),n),pe={class:"row row-cols-lg-3 g-3 align-items-end"},_e={class:"input col-12"},fe=st(()=>o("label",{for:"urls-textarea",class:"fuck-off-lighthouse"},null,-1)),me={class:"input col-12"},ge={class:"row"},he=st(()=>o("span",{class:"btn-group"},[o("span",{class:"input-group-text me-2"},"Clipboard")],-1)),ve={class:".col m-1"},ye=st(()=>o("span",{class:"btn-group"},[o("span",{class:"input-group-text me-2 text-center"},"Controls")],-1)),Te=T({__name:"InputControls",setup(n){const t=new WeakMap;async function e(i){i.classList.add("btn-active");const g=wt(150);t.set(i,g),await g,t.get(i)===g&&i.classList.remove("btn-active")}const s=$(null);function a(i){var g;I.value="",(g=s.value)==null||g.focus(),e(i.currentTarget)}function r(i){navigator.clipboard.writeText(M.value.join(" ")),e(i.currentTarget)}function d(i){i.preventDefault(),navigator.clipboard.writeText(M.value.join(`
`)),e(i.currentTarget)}function c(i){i.button===1&&(i.preventDefault(),navigator.clipboard.writeText(Gt(M.value)),e(i.currentTarget))}async function l(i){const{currentTarget:g}=i,C=await navigator.clipboard.readText();console.log("[clipboard] readText:",C),I.value&&!I.value.endsWith(`
`)&&(I.value+=`
`),I.value+=C,e(g)}async function y(i){const{currentTarget:g}=i,C=await navigator.clipboard.readText();console.log("[clipboard] readText:",C),I.value=C,e(g)}return(i,g)=>(u(),_("div",pe,[o("div",_e,[fe,X(o("textarea",{id:"urls-textarea",spellcheck:"false","onUpdate:modelValue":g[0]||(g[0]=C=>tt(I)?I.value=C:null),ref_key:"textareaEl",ref:s},null,512),[[Z,f(I)]])]),o("div",me,[o("span",ge,[o("span",{class:".col m-1"},[he,o("button",{class:"btn btn-outline-primary me-1",onClick:y},"Replace"),o("button",{class:"btn btn-outline-primary me-1",onClick:l},"Append")]),o("span",ve,[ye,o("button",{class:"btn btn-outline-primary me-1",onClick:a},"Clear"),o("button",{class:"btn btn-primary me-1",title:"Copy URLs",onClick:r,onContextmenu:d,onPointerdown:c},"Copy",32)])])])]))}});const $e=k(Te,[["__scopeId","data-v-ca1aa4d1"]]),nt=1e3*60,it=nt*10,et=nt*60,be=et*24;class Ce{constructor(t){this.timeRef=t,xt(t,e=>{e>0&&this.setTimer()}),Ut(()=>{this.clearTimer()})}setTimer(){this.clearTimer();const t=Date.now()-this.timeRef.value;let e;if(t<it)e=nt;else if(t<et)e=it;else if(t<be)e=et;else return;this.timerId=setTimeout(()=>{at(this.timeRef),this.setTimer()},e)}clearTimer(){clearTimeout(this.timerId)}forceTrigger(){at(this.timeRef),this.setTimer()}}const Ie={class:"tag-master EntryTags--comp"},we=["data-tag"],xe=T({__name:"EntryTags",props:{entry:{}},setup(n){return(t,e)=>(u(),_("div",Ie,[(u(!0),_(V,null,J(t.entry.tags,s=>(u(),_("div",{class:"tag","data-tag":s},b(s),9,we))),256))]))}}),Ue=n=>(W("data-v-c1cfd714"),n=n(),Y(),n),ke={class:"tags"},Ee={key:0,class:"tag add-tag"},Le=Ue(()=>o("span",{class:"plus"},"+",-1)),Se=[Le],Me=T({__name:"UrlListItemTags",props:{ue:{}},setup(n){const t=n;function e(){E(x.value)===E(t.ue)?x.value=null:x.value=t.ue,console.log(x.value)}return(s,a)=>{var r;return u(),_("div",{class:"tags-wrapper",onClick:e},[o("div",ke,[U(xe,{entry:s.ue},null,8,["entry"])]),(r=s.ue.tags)!=null&&r.length?P("",!0):(u(),_("div",Ee,Se))])}}});const Pe=k(Me,[["__scopeId","data-v-c1cfd714"]]),De={class:"col-9 nowrap-text-ceil url url-cell"},Ve={class:"nowrap-text-ceil-content"},Oe=["title"],Re=["href","title"],Ne={class:"comment-content nowrap-text-ceil-content no-dbl-click-select"},Ae=T({__name:"UrlListItem",props:{ue:{}},setup(n){const t=n,e=v(()=>t.ue.visited||Jt);function s(){t.ue.delVisited()}function a(){const p=Date.now();t.ue.setVisited(p)}function r(p){p.button===1&&(p.preventDefault(),s())}const d=v(()=>{if(t.ue.comment!==void 0){if(!t.ue.inputComment)return"comment-from-store";if(t.ue.comment!==t.ue.inputComment)return"comment-from-store-over"}return""}),c=v(()=>t.ue.comment!==void 0?t.ue.comment.trim():t.ue.inputComment);function l(){E(w.value)===E(t.ue)?w.value=null:w.value=t.ue}const y=v(()=>F.value.has(t.ue.url));function i(){F.value.add(t.ue.url),a(),rt.value=E(t.ue)}function g(p){p.button!==1||document.getRootNode().activeElement!==p.currentTarget||i()}function C(){F.value.delete(t.ue.url)}const h=v(()=>E(rt.value)===E(t.ue)),z=new Ce(e);function L(){z.forceTrigger()}const O=zt(L,2e3),Tt=v(()=>{let p="";return e.value<0?p="never clicked":p=ot(e.value),t.ue.initialVisited&&t.ue.initialVisited!==e.value?`${p}
${ot(t.ue.initialVisited)}`:p});function ot(p){return Qt(p)+" — "+kt(p,"YYYY.MM.DD HH:mm:SS",!1)}const $t=v(()=>bt(e.value));function bt(p){if(p<0)return"never-clicked";const S=Date.now(),m=Math.trunc((S-p)/1e3);return m<60?"minute-1":m<60*2?"minute-2":m<60*5?"minute-5":m<60*10?"minute-10":m<60*30?"minute-30":m<60*45?"minute-45":m<60*60?"minute-60":m<3600*2?"hour-2":m<3600*4?"hour-4":m<3600*8?"hour-8":m<3600*14?"hour-14":m<3600*24?"day-1":m<86400*7?"day-7":m<86400*30?"month-1":m<2592e3*3?"month-3":m<2592e3*6?"month-6":"long-ago"}return(p,S)=>(u(),_("tr",{onPointerenter:S[0]||(S[0]=(...m)=>f(O)&&f(O)(...m)),class:H([{clicked:y.value,"last-clicked":h.value},"list-item-row"])},[o("td",De,[o("span",Ve,[o("span",{class:H(["info-dot",{"has-comment":p.ue.inputComment,visited:e.value>0,[$t.value]:!0}]),title:Tt.value,onContextmenu:Et(C,["prevent"]),onPointerdown:r},null,42,Oe),o("a",{class:"url link-primary",target:"_blank",rel:"noreferrer noopener",href:p.ue.url,title:p.ue.inputComment,onClick:i,onPointerup:g},b(p.ue.url),41,Re)]),U(Pe,{class:"tags",ue:p.ue},null,8,["ue"])]),o("td",{class:H(["col-3 comment nowrap-text-ceil",{[d.value]:d.value}]),onDblclick:l},[o("span",Ne,b(c.value||" "),1)],34)],34))}});const He=k(Ae,[["__scopeId","data-v-6bf316ef"]]),qe={class:"table table-borderless"},Be=T({__name:"UrlList",setup(n){return(t,e)=>(u(),_("div",null,[o("table",qe,[o("tbody",null,[(u(!0),_(V,null,J(f(yt),s=>(u(),D(He,{ue:s},null,8,["ue"]))),256))])])]))}}),je={class:"popup-content"},Fe={class:"modal-content"},Ke={class:"modal-header"},We={class:"modal-title"},Ye={class:"modal-body"},Je=["value"],ze=T({__name:"MessageEditPopup",setup(n){const t=v(()=>{const l=w.value;return l.comment===void 0?l.inputComment:l.comment});function e(l){l.currentTarget===l.target&&(w.value=null)}function s(l){l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),w.value=null)}const a=$(null);_t(()=>{var l;(l=a.value)==null||l.focus()});function d(l){var i;const y=l.currentTarget.value;(i=w.value)==null||i.setComment(y)}function c(){var l;(l=w.value)==null||l.delComment()}return(l,y)=>(u(),D(ft,{to:"body"},[f(w)?(u(),_("div",{key:0,class:"modal message-edit-popup",onPointerdown:e},[o("div",je,[o("div",Fe,[o("div",Ke,[o("h5",We,b(f(w).url),1),o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:e})]),o("div",Ye,[o("textarea",{rows:"5",value:t.value,onInput:d,ref_key:"textareaElem",ref:a,onKeydown:s},null,40,Je)]),o("div",{class:"modal-footer"},[o("button",{type:"button",class:"btn btn-secondary",onClick:c},"Reset")])])])],32)):P("",!0)]))}});const Ge=k(ze,[["__scopeId","data-v-d8ee5e30"]]),Qe=["data-tag"],Xe=T({__name:"InputTagsItem",props:{selected:{type:Boolean},tag:{}},setup(n){return(t,e)=>(u(),_("div",{class:H(["tag InputTagsItem--comp",{selected:t.selected}]),"data-tag":t.tag},b(t.tag),11,Qe))}});const Ze=k(Xe,[["__scopeId","data-v-9a548a01"]]),ts=T({__name:"InputTags",props:{tagPropsHelper:{}},setup(n){const t=n;function e(s){const r=s.target.dataset.tag;r&&t.tagPropsHelper.toggleTag(r)}return(s,a)=>(u(),_("div",{class:"tag-master InputTags--comp",onClick:e},[(u(!0),_(V,null,J(s.tagPropsHelper.tags.value,r=>(u(),D(Ze,{tag:r.tag,selected:s.tagPropsHelper.isSelected(r)},null,8,["tag","selected"]))),256))]))}}),es={class:"selected-tags SelectedTags--comp"},ss=["data-tag"],ns={class:"input-wrapper"},os=["value"],as=T({__name:"SelectedTags",props:{entry:{},modelValue:{}},emits:["update:modelValue","tabPressed"],setup(n,{emit:t}){const e=n,s=t;function a(h){var O;const L=h.target.dataset.tag;L&&((O=e.entry)==null||O.delTag(L))}const r=$(null),c=document.createElement("canvas").getContext("2d");_t(()=>{r.value&&(c.font=window.getComputedStyle(r.value).font)});function l(){if(!r.value)return;const h=c.measureText(r.value.value).width;r.value.style.width=h+6+"px"}function y(){r.value&&(r.value.selectionStart=r.value.selectionEnd,r.value.focus())}function i(){var h;(h=r.value)==null||h.select()}function g(h){s("update:modelValue",h.target.value)}function C(h){console.log(h),h.code==="Tab"&&(h.preventDefault(),s("tabPressed"))}return(h,z)=>(u(),_("div",es,[o("div",{class:"tag-master",onClick:a},[(u(!0),_(V,null,J(h.entry.tags,L=>(u(),_("div",{class:"tag","data-tag":L},b(L),9,ss))),256))]),o("span",{class:"label",onDblclick:i,onClick:y},[o("span",ns,[o("input",Lt({type:"text",ref_key:"tagInput",ref:r,value:h.modelValue},St({input:[l,g]},!0),{onKeydown:C}),null,16,os)])],32)]))}});const rs=k(as,[["__scopeId","data-v-7f530c6c"]]);function ls(){return JSON.parse(localStorage.getItem("href_lister_all_tags")||"[]")}const is=$(ls());class cs{constructor(t,e){this.entry=t,this.allTags=v(()=>is.value.map(s=>({tag:s,selected:!1}))),this.tags=v(()=>{const s=[],a=[];for(const r of this.allTags.value){const d=r.tag.indexOf(e.value);d!==-1&&(d===0?s.push(r):a.push(r))}return[s,a].flat()})}isSelected(t){var s;const e=typeof t=="string"?t:t.tag;return(s=this.entry.value.tags)==null?void 0:s.includes(e)}toggleTag(t){return this.isSelected(t)?this.entry.value.delTag(t):this.entry.value.addTag(t)}}const us={class:"popup-content"},ds={class:"modal-content"},ps={class:"modal-header"},_s={class:"modal-title"},fs={class:"modal-body"},ms={class:"tags selected-tags-group"},gs={class:"tags all-tags-group"},hs=T({__name:"UrlListItemTagsEditPopup",setup(n){const t=$("");function e(r){r.currentTarget===r.target&&(x.value=null)}const s=new cs(x,t);function a(){t.value=""}return(r,d)=>(u(),D(ft,{to:"body"},[f(x)?(u(),_("div",{key:0,class:"modal tags-edit-popup",onPointerdown:e},[o("div",us,[o("div",ds,[o("div",ps,[o("h5",_s,b(f(x).url),1)]),o("div",fs,[o("div",ms,[U(rs,{entry:f(x),modelValue:t.value,"onUpdate:modelValue":d[0]||(d[0]=c=>t.value=c),onTabPressed:a},null,8,["entry","modelValue"])]),o("div",gs,[U(ts,{tagPropsHelper:f(s)},null,8,["tagPropsHelper"])])])])])],32)):P("",!0)]))}});const vs=k(hs,[["__scopeId","data-v-fd3c1861"]]);const ys=o("hr",null,null,-1),Ts=o("hr",null,null,-1),$s=o("hr",null,null,-1),bs=o("hr",null,null,-1),Cs=T({__name:"Main",setup(n){return(t,e)=>(u(),_(V,null,[ys,U(Ft),Ts,U($e),$s,U(de),bs,U(Be),f(w)?(u(),D(Ge,{key:0})):P("",!0),f(x)?(u(),D(vs,{key:1})):P("",!0)],64))}}),Is=n=>(W("data-v-80fad6c5"),n=n(),Y(),n),ws=Is(()=>o("a",{class:"readme",title:"Open Readme",href:"https://github.com/AlttiRi/href-lister#keeplister",target:"_blank"},[o("i",null,"i")],-1)),xs=T({__name:"App",setup(n){return(t,e)=>(u(),_(V,null,[U(Cs),ws],64))}});const Us=k(xs,[["__scopeId","data-v-80fad6c5"]]);Mt(Us).mount("#app");
//# sourceMappingURL=index.js.map
