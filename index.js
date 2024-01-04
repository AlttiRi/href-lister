import{r as b,c as $,d as T,o as d,a as _,b as o,w as Q,v as Z,u as f,i as tt,p as R,e as A,f as nt,g as wt,h as xt,s as St,t as U,j as ot,k as kt,l as C,m as L,n as P,T as at,q as Et,x as Lt,y as ct,F as j,z as G,A as k,B as Ut,C as F,D as Mt,E as mt,G as Pt,H as Dt,I as Vt}from"./vendor.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const _t={input_only:"",input_only_disabled:!1,input_ignore:"",input_ignore_disabled:!1,reverse_input_only:!1,case_sensitive:!1},X=b(_t.input_only),W=b(_t.input_ignore),Ot=$(()=>{let s=X.value.trim().split(/\s+/g).filter(a=>a),t=W.value.trim().split(/\s+/g).filter(a=>a);s=s.map(a=>a.toLowerCase()),t=t.map(a=>a.toLowerCase());let e,n;return e=a=>s.some(r=>a.toLowerCase().includes(r)),n=a=>t.some(r=>a.toLowerCase().includes(r)),{matchOnly:e,matchIgnore:n,onlyParts:s,ignoreParts:t}}),Rt=$(()=>{const{matchOnly:s,matchIgnore:t,onlyParts:e}=Ot.value;return e.length?n=>s(n):n=>!t(n)}),ht=s=>(R("data-v-40d2bd48"),s=s(),A(),s),At={class:"row row-cols-lg-3 g-3 align-items-center","data-comp":"Filters"},qt={class:"col-12"},Ht={class:"input-group"},Nt=ht(()=>o("span",{class:"input-group-text"},"Only",-1)),Bt={class:"col-12"},jt={class:"input-group"},Yt=ht(()=>o("span",{class:"input-group-text"},"Ignore",-1)),Ft=T({__name:"Filters",setup(s){return(t,e)=>(d(),_("div",At,[o("div",qt,[o("label",null,[o("span",Ht,[Nt,Q(o("input",{type:"text",class:"form-control","onUpdate:modelValue":e[0]||(e[0]=n=>tt(X)?X.value=n:null)},null,512),[[Z,f(X)]])])])]),o("div",Bt,[o("label",null,[o("span",jt,[Yt,Q(o("input",{type:"text",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=n=>tt(W)?W.value=n:null)},null,512),[[Z,f(W)]])])])])]))}}),x=(s,t)=>{const e=s.__vccOpts||s;for(const[n,a]of t)e[n]=a;return e},Xt=x(Ft,[["__scopeId","data-v-40d2bd48"]]);function Wt(s){const t=s.split(`
`).map(n=>n.trim()).filter(n=>n),e=[];for(const n of t){const[a,...r]=n.split(/\s+(#|\/\/)/),[c,...l]=a.trim().split(/\s+/);if(c.startsWith("http")){const i=z(c);if(i&&l.every(p=>!z(p))){e.push({url:i,inputComment:[...l,...r].join(" ")});continue}i&&e.push({url:i})}else l.unshift(c);for(const i of l){const p=z(i);p&&e.push({url:p})}}return e}function z(s){const t=s.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);if(console.log(t),t?.groups)return t.groups.url}const J=nt("HrefListerUrlInfo","UrlInfo"),gt=class B{constructor(t,e,n){this.url=t,this.state=e,n&&(this.inputComment=n),e.visited&&(this.initialVisited=e.visited)}static async getInstance({url:t,inputComment:e}){let n=B.stateMap.get(t);return n?new B(t,n,e):(n=await yt(t,J),n===void 0&&(n={}),B.stateMap.set(t,n),new B(t,n,e))}get comment(){return this.state.comment}get visited(){return this.state.visited}get tags(){return this.state.tags}async setComment(t){this.state.comment=t,await this.update()}async delComment(){delete this.state.comment,await this.update()}async setVisited(t){this.state.visited=t,await this.update()}async delVisited(){delete this.state.visited,await this.update()}async addTag(t){this.state.tags||(this.state.tags=[]),!this.state.tags.includes(t)&&(this.state.tags.push(t),await this.update())}async delTag(t){if(!this.state.tags)return;const e=this.state.tags.indexOf(t);e!=-1&&(this.state.tags.splice(e,1),this.state.tags.length===0&&delete this.state.tags,await this.update())}update(){return Object.keys(this.state).length?St(this.url,U(this.state),J):xt(this.url,J)}};gt.stateMap=new Map;let vt=gt;const Jt=nt("HrefListerComments","Comments"),Kt=nt("HrefLister","Visits"),{createStore:Gt,del:zt,get:yt,set:Qt,entries:Zt}=wt;Object.assign(globalThis,{idb:{createStore:Gt,del:zt,get:yt,set:Qt,entries:Zt,commentsStore:Jt,visitsStore:Kt,urlInfoStore:J},UrlInfo:vt});const te=-1,I=b(""),w=b(null),E=b(null),ut=b(null),K=b(new Set),et=b(!1),$t=b([]);ot(async()=>{const s=Wt(I.value),t=[];for(const e of s)t.push(await vt.getInstance(e));$t.value=t});const bt=$(()=>$t.value.filter(s=>Rt.value(s.url))),O=$(()=>bt.value.map(s=>s.url));location.href==="http://localhost:5173/"&&(I.value=`http://localhost:5173/ asdf
http://localhost:5173/#qqq
http://localhost:5173/#qqq
http://localhost:5173/#www
`);function ee(s,t=50){let e=!1,n=!1,a,r;function c(){n?(setTimeout(c,t),s.apply(a,r)):e=!1,n=!1}return function(...l){e?(a=this,r=l,n=!0):(e=!0,setTimeout(c,t),s.apply(this,l))}}function se(s,t=100){const e=l=>`${l.length?'["'+l.join('", "')+'"]':"[]"}`;if(s.length<=t)return`/* ${s.length.toString().padStart(3)} */ ${e(s)},`;const n=l=>l.toString().length,a=Math.trunc(s.length/t),c=[`/* ${s.length.toString().padStart(1+n(s.length))+" ".repeat(3+n(a))} */`];for(let l=0;l<=a;l++){const i=s.slice(t*l,t+t*l),p=`(${l+1})`.padStart(2+n(a)),u=i.length.toString().padStart(1+n(s.length));c.push(`/* ${u} ${p} */ ${e(i)},`)}return c.join(`
`)}function ne(s){const t=Date.now(),e=Math.trunc((t-s)/1e3);if(e<60)return`${e} second${e>1?"s":""} ago`;if(e<60*60){const n=Math.trunc(e/60);return`${n} minute${n>1?"s":""} ago`}if(e<60*60*24){const n=Math.trunc(e/60%60).toString().padStart(2,"0");return`${Math.trunc(e/60/60)}:${n} ago`}return Math.trunc(e/60/60/24)+" days ago"}function oe(s){let t=0;for(let e=0;e<s.length;e++)t=Math.imul(Math.imul(31,t)+s.charCodeAt(e),1);return t}const rt=s=>(R("data-v-09a95f35"),s=s(),A(),s),ae={class:"row row-cols-lg-3 g-3 align-items-end","data-comp":"InputControls"},re={class:"input col-12"},ie=rt(()=>o("label",{for:"urls-textarea",class:"fuck-off-lighthouse"},null,-1)),le={class:"input col-12"},ce={class:"row"},ue=rt(()=>o("span",{class:"btn-group"},[o("span",{class:"input-group-text me-2"},"Clipboard")],-1)),de={class:".col m-1"},pe=rt(()=>o("span",{class:"btn-group"},[o("span",{class:"input-group-text me-2 text-center"},"Controls")],-1)),fe=T({__name:"InputControls",setup(s){const t=new WeakMap;async function e(u){u.classList.add("btn-active");const h=kt(150);t.set(u,h),await h,t.get(u)===h&&u.classList.remove("btn-active")}const n=b(null);function a(u){I.value="",n.value?.focus(),e(u.currentTarget)}function r(u){navigator.clipboard.writeText(O.value.join(" ")),e(u.currentTarget)}function c(u){u.preventDefault(),navigator.clipboard.writeText(O.value.join(`
`)),e(u.currentTarget)}function l(u){u.button===1&&(u.preventDefault(),navigator.clipboard.writeText(se(O.value)),e(u.currentTarget))}async function i(u){const{currentTarget:h}=u,v=await navigator.clipboard.readText();console.log("[clipboard] readText:",v),I.value&&!I.value.endsWith(`
`)&&(I.value+=`
`),I.value+=v,e(h)}async function p(u){const{currentTarget:h}=u,v=await navigator.clipboard.readText();console.log("[clipboard] readText:",v),I.value=v,e(h)}return(u,h)=>(d(),_("div",ae,[o("div",re,[ie,Q(o("textarea",{id:"urls-textarea",spellcheck:"false","onUpdate:modelValue":h[0]||(h[0]=v=>tt(I)?I.value=v:null),ref_key:"textareaEl",ref:n},null,512),[[Z,f(I)]])]),o("div",le,[o("span",ce,[o("span",{class:".col m-1"},[ue,o("button",{class:"btn btn-outline-primary me-1",onClick:p},"Replace"),o("button",{class:"btn btn-outline-primary me-1",onClick:i},"Append")]),o("span",de,[pe,o("button",{class:"btn btn-outline-primary me-1",onClick:a},"Clear"),o("button",{class:"btn btn-primary me-1",title:"Copy URLs",onClick:r,onContextmenu:c,onPointerdown:l},"Copy",32),o("button",{hidden:"",class:"btn btn-outline-primary me-1",title:"Popup",onClick:h[1]||(h[1]=v=>et.value=!f(et))},"Popup")])])])]))}}),me=x(fe,[["__scopeId","data-v-09a95f35"]]),dt=$(()=>{const s=[...new Set(O.value)].sort().join(" ");return Math.abs(oe(s)).toString(16).slice(-8).padStart(8,"0").toUpperCase()}),N=$(()=>{const s=O.value,t=s.length,e=new Set(s).size;return{count:t,uniqueCount:e}}),M=$(()=>{let s=0;const t=new Set;for(const e of O.value)K.value.has(e)&&(s++,t.add(e));return{count:s,uniqueCount:t.size}}),Y=s=>(R("data-v-92a857ba"),s=s(),A(),s),_e={"data-comp":"URLsInfoLine"},he={title:"URLs count"},ge={key:0,title:"URLs count (unique)"},ve=Y(()=>o("span",{class:"grey"}," — ",-1)),ye={title:"URLs hash"},$e=Y(()=>o("span",{class:"grey"},"#",-1)),be={class:"urls-hash"},Te={key:0},Ce=Y(()=>o("span",{class:"grey"}," — ",-1)),Ie=Y(()=>o("span",{class:"grey"},"[",-1)),we={title:"Clicked URLs count"},xe={key:0,title:"Clicked URLs count (unique)"},Se=Y(()=>o("span",{class:"grey"},"]",-1)),ke=T({__name:"URLsInfoLine",setup(s){ot(()=>{const{count:e,uniqueCount:n}=N.value;if(!e){document.title="HrefLister";return}if(document.title=`HrefLister — ${t(e,n)} — #${dt.value}`,M.value.count){const{count:a,uniqueCount:r}=M.value;document.title=`${document.title} — [ ${t(a,r)} ]`}});function t(e,n){let a=e.toString();return n!==length&&(a=`${a} (${n})`),a}return(e,n)=>(d(),_("div",_e,[o("span",null,[o("span",he,C(f(N).count),1),f(N).count!==f(N).uniqueCount?(d(),_("span",ge," ("+C(f(N).uniqueCount)+")",1)):L("",!0)]),ve,o("span",ye,[$e,o("span",be,C(f(dt)),1)]),f(M).count?(d(),_("span",Te,[Ce,o("span",null,[Ie,o("span",we,C(f(M).count),1),f(M).count!==f(M).uniqueCount?(d(),_("span",xe," ("+C(f(M).uniqueCount)+")",1)):L("",!0),Se])])):L("",!0)]))}}),Ee=x(ke,[["__scopeId","data-v-92a857ba"]]);function Tt(s,t){for(const[e,n]of Object.entries(t))s.style[e]=n}function Le(s,{handle:t,onStop:e,onMove:n,state:a}={}){const r=l=>{n?.(l),Tt(s,l)};a&&(r(a),e?.(a));const c=t||s;c.style.userSelect="none",c.style.touchAction="none",s.style.position="absolute",c.addEventListener("pointerdown",l=>{const i=l.clientY-parseInt(getComputedStyle(s).top),p=l.clientX-parseInt(getComputedStyle(s).left);let u;function h(g){!c.hasPointerCapture(g.pointerId)&&c.setPointerCapture(g.pointerId),u={top:g.clientY-i+"px",left:g.clientX-p+"px"},r(u)}function v(){removeEventListener("pointermove",h),u&&e?.(u)}addEventListener("pointermove",h,{passive:!0}),addEventListener("pointerup",v,{once:!0})},{passive:!0})}function Ue(s,{minW:t=32,minH:e=32,size:n=16,onStop:a,onMove:r,state:c}={}){const l=p=>{r?.(p),Tt(s,p)};c&&(l(c),a?.(c));const i=document.createElement("div");i.style.cssText=`width: ${n}px; height: ${n}px; border-radius: ${n/2}px;bottom: ${-(n/2)}px; right: ${-(n/2)}px; position: absolute; background-color: transparent; cursor: se-resize; touch-action: none;`,s.append(i),i.addEventListener("pointerdown",p=>{i.setPointerCapture(p.pointerId);const u=p.clientX-s.offsetLeft-parseInt(getComputedStyle(s).width),h=p.clientY-s.offsetTop-parseInt(getComputedStyle(s).height);let v;function g(S){let D=S.clientX-s.offsetLeft-u,H=S.clientY-s.offsetTop-h;D<t&&(D=t),H<e&&(H=e),v={width:D+"px",height:H+"px"},l(v)}function q(){i.removeEventListener("pointermove",g),v&&a?.(v)}i.addEventListener("pointermove",g,{passive:!0}),i.addEventListener("lostpointercapture",q,{once:!0})},{passive:!0})}function pt({id:s,onMove:t,onStop:e,reset:n,restore:a}){if(n&&s&&localStorage.removeItem(s),!a||!s)return{onMove:t,onStop:e};const r=localStorage.getItem(s);let c;r&&(c=JSON.parse(r));function l(p){localStorage.setItem(s,JSON.stringify(p))}let i;return e?i=function(p){e(p),l(p)}:i=l,{onMove:t,onStop:i,state:c}}const Me=s=>(R("data-v-40ba8c27"),s=s(),A(),s),Pe=Me(()=>o("div",null,"Popup",-1)),De=T({__name:"AutoClickPopup",setup(s){const t=b(),e=b();return ot(()=>{!t.value||!e.value||(Le(t.value,{handle:e.value,...pt({restore:!0,id:"href-lister-popup-move-state"})}),Ue(t.value,{minH:parseInt(getComputedStyle(t.value).height),minW:parseInt(getComputedStyle(t.value).width),...pt({restore:!0,id:"href-lister-popup-resize-state"})}))}),(n,a)=>f(et)?(d(),P(at,{key:0,to:"body"},[o("div",{ref_key:"popupElem",ref:t,class:"popup","data-comp":"AutoClickPopup"},[o("div",{ref_key:"headerElem",ref:e,class:"header"},"Header",512),Pe],512)])):L("",!0)}}),Ve=x(De,[["__scopeId","data-v-40ba8c27"]]),it=1e3*60,ft=it*10,st=it*60,Oe=st*24;class Re{constructor(t){this.timeRef=t,Et(t,e=>{e>0&&this.setTimer()}),Lt(()=>{this.clearTimer()})}setTimer(){this.clearTimer();const t=Date.now()-this.timeRef.value;let e;if(t<ft)e=it;else if(t<st)e=ft;else if(t<Oe)e=st;else return;this.timerId=setTimeout(()=>{ct(this.timeRef),this.setTimer()},e)}clearTimer(){clearTimeout(this.timerId)}forceTrigger(){ct(this.timeRef),this.setTimer()}}const Ae={class:"tag-master","data-comp":"EntryTags"},qe=["data-tag"],He=T({__name:"EntryTags",props:{entry:{}},setup(s){return(t,e)=>(d(),_("div",Ae,[(d(!0),_(j,null,G(t.entry.tags,n=>(d(),_("div",{class:"tag","data-tag":n},C(n),9,qe))),256))]))}}),Ne=s=>(R("data-v-b46d30db"),s=s(),A(),s),Be={class:"tags"},je={key:0,class:"tag add-tag"},Ye=Ne(()=>o("span",{class:"plus"},"+",-1)),Fe=[Ye],Xe=T({__name:"UrlListItemTags",props:{ue:{}},setup(s){const t=s;function e(){U(E.value)===U(t.ue)?E.value=null:E.value=t.ue,console.log(E.value)}return(n,a)=>(d(),_("div",{class:"tags-wrapper",onClick:e,"data-comp":"UrlListItemTags"},[o("div",Be,[k(He,{entry:n.ue},null,8,["entry"])]),n.ue.tags?.length?L("",!0):(d(),_("div",je,Fe))]))}}),We=x(Xe,[["__scopeId","data-v-b46d30db"]]),Je=["data-index"],Ke={class:"col-9 nowrap-text-ceil url url-cell"},Ge={class:"nowrap-text-ceil-content"},ze=["title"],Qe=["href","title"],Ze={class:"comment-content nowrap-text-ceil-content no-dbl-click-select"},ts=T({__name:"UrlListItem",props:{ue:{},index:{}},setup(s){const t=s,e=$(()=>t.ue.visited||te);function n(){t.ue.delVisited()}function a(){const m=Date.now();t.ue.setVisited(m)}function r(m){m.button===1&&(m.preventDefault(),n())}const c=$(()=>{if(t.ue.comment!==void 0){if(!t.ue.inputComment)return"comment-from-store";if(t.ue.comment!==t.ue.inputComment)return"comment-from-store-over"}return""}),l=$(()=>t.ue.comment!==void 0?t.ue.comment.trim():t.ue.inputComment);function i(){U(w.value)===U(t.ue)?w.value=null:w.value=t.ue}const p=$(()=>K.value.has(t.ue.url));function u(){K.value.add(t.ue.url),a(),ut.value=U(t.ue)}function h(m){m.button!==1||document.getRootNode().activeElement!==m.currentTarget||u()}function v(){K.value.delete(t.ue.url)}const g=$(()=>U(ut.value)===U(t.ue)),q=new Re(e);function S(){q.forceTrigger()}const D=ee(S,2e3),H=$(()=>{let m="";return e.value<0?m="never clicked":m=lt(e.value),t.ue.initialVisited&&t.ue.initialVisited!==e.value?`${m}
${lt(t.ue.initialVisited)}`:m});function lt(m){return ne(m)+" — "+Ut(m,"YYYY.MM.DD HH:mm:SS",!1)}const Ct=$(()=>It(e.value));function It(m){if(m<0)return"never-clicked";const V=Date.now(),y=Math.trunc((V-m)/1e3);return y<60?"minute-1":y<60*2?"minute-2":y<60*5?"minute-5":y<60*10?"minute-10":y<60*30?"minute-30":y<60*45?"minute-45":y<60*60?"minute-60":y<3600*2?"hour-2":y<3600*4?"hour-4":y<3600*8?"hour-8":y<3600*14?"hour-14":y<3600*24?"day-1":y<86400*7?"day-7":y<86400*30?"month-1":y<2592e3*3?"month-3":y<2592e3*6?"month-6":"long-ago"}return(m,V)=>(d(),_("tr",{onPointerenter:V[0]||(V[0]=(...y)=>f(D)&&f(D)(...y)),class:F([{clicked:p.value,"last-clicked":g.value},"list-item-row"]),"data-comp":"UrlListItem","data-index":m.index+1},[o("td",Ke,[o("span",Ge,[o("span",{class:F(["info-dot",{"has-comment":m.ue.inputComment,visited:e.value>0,[Ct.value]:!0}]),title:H.value,onContextmenu:Mt(v,["prevent"]),onPointerdown:r},null,42,ze),o("a",{class:"url link-primary",target:"_blank",rel:"noreferrer noopener",href:m.ue.url,title:m.ue.inputComment,onClick:u,onPointerup:h},C(m.ue.url),41,Qe)]),k(We,{class:"tags",ue:m.ue},null,8,["ue"])]),o("td",{class:F(["col-3 comment nowrap-text-ceil",{[c.value]:c.value}]),onDblclick:i},[o("span",Ze,C(l.value||" "),1)],34)],42,Je))}}),es=x(ts,[["__scopeId","data-v-5c0cfb9f"]]),ss={"data-comp":"UrlList"},ns={class:"table table-borderless"},os=T({__name:"UrlList",setup(s){return(t,e)=>(d(),_("div",ss,[o("table",ns,[o("tbody",null,[(d(!0),_(j,null,G(f(bt),(n,a)=>(d(),P(es,{ue:n,index:a},null,8,["ue","index"]))),256))])])]))}}),as={class:"popup-content"},rs={class:"modal-content"},is={class:"modal-header"},ls={class:"modal-title"},cs={class:"modal-body"},us=["value"],ds=T({__name:"MessageEditPopup",setup(s){const t=$(()=>{const i=w.value;return i.comment===void 0?i.inputComment:i.comment});function e(i){i.currentTarget===i.target&&(w.value=null)}function n(i){i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),w.value=null)}const a=b(null);mt(()=>{a.value?.focus()});function c(i){const p=i.currentTarget.value;w.value?.setComment(p)}function l(){w.value?.delComment()}return(i,p)=>(d(),P(at,{to:"body"},[f(w)?(d(),_("div",{key:0,class:"modal message-edit-popup","data-comp":"MessageEditPopup",onPointerdown:e},[o("div",as,[o("div",rs,[o("div",is,[o("h5",ls,C(f(w).url),1),o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:e})]),o("div",cs,[o("textarea",{rows:"5",value:t.value,onInput:c,ref_key:"textareaElem",ref:a,onKeydown:n},null,40,us)]),o("div",{class:"modal-footer"},[o("button",{type:"button",class:"btn btn-secondary",onClick:l},"Reset")])])])],32)):L("",!0)]))}}),ps=x(ds,[["__scopeId","data-v-7eeb70bf"]]),fs=["data-tag"],ms=T({__name:"InputTagsItem",props:{selected:{type:Boolean},tag:{}},setup(s){return(t,e)=>(d(),_("div",{class:F(["tag",{selected:t.selected}]),"data-tag":t.tag,"data-comp":"InputTagsItem"},C(t.tag),11,fs))}}),_s=x(ms,[["__scopeId","data-v-4e0f90f4"]]),hs=T({__name:"InputTags",props:{tagPropsHelper:{}},setup(s){const t=s;function e(n){const r=n.target.dataset.tag;r&&t.tagPropsHelper.toggleTag(r)}return(n,a)=>(d(),_("div",{class:"tag-master",onClick:e,"data-comp":"InputTags"},[(d(!0),_(j,null,G(n.tagPropsHelper.tags.value,r=>(d(),P(_s,{tag:r.tag,selected:n.tagPropsHelper.isSelected(r)},null,8,["tag","selected"]))),256))]))}}),gs={class:"selected-tags","data-comp":"SelectedTags"},vs=["data-tag"],ys={class:"input-wrapper"},$s=["value"],bs=T({__name:"SelectedTags",props:{entry:{},modelValue:{}},emits:["update:modelValue","tabPressed"],setup(s,{emit:t}){const e=s,n=t;function a(g){const S=g.target.dataset.tag;S&&e.entry?.delTag(S)}const r=b(null),l=document.createElement("canvas").getContext("2d");mt(()=>{r.value&&(l.font=window.getComputedStyle(r.value).font)});function i(){if(!r.value)return;const g=l.measureText(r.value.value).width;r.value.style.width=g+6+"px"}function p(){r.value&&(r.value.selectionStart=r.value.selectionEnd,r.value.focus())}function u(){r.value?.select()}function h(g){n("update:modelValue",g.target.value)}function v(g){console.log(g),g.code==="Tab"&&(g.preventDefault(),n("tabPressed"))}return(g,q)=>(d(),_("div",gs,[o("div",{class:"tag-master",onClick:a},[(d(!0),_(j,null,G(g.entry.tags,S=>(d(),_("div",{class:"tag","data-tag":S},C(S),9,vs))),256))]),o("span",{class:"label",onDblclick:u,onClick:p},[o("span",ys,[o("input",Pt({type:"text",ref_key:"tagInput",ref:r,value:g.modelValue},Dt({input:[i,h]},!0),{onKeydown:v}),null,16,$s)])],32)]))}}),Ts=x(bs,[["__scopeId","data-v-d8799467"]]);function Cs(){return JSON.parse(localStorage.getItem("href_lister_all_tags")||"[]")}const Is=b(Cs());class ws{constructor(t,e){this.entry=t,this.allTags=$(()=>Is.value.map(n=>({tag:n,selected:!1}))),this.tags=$(()=>{const n=[],a=[];for(const r of this.allTags.value){const c=r.tag.indexOf(e.value);c!==-1&&(c===0?n.push(r):a.push(r))}return[n,a].flat()})}isSelected(t){const e=typeof t=="string"?t:t.tag;return this.entry.value.tags?.includes(e)}toggleTag(t){return this.isSelected(t)?this.entry.value.delTag(t):this.entry.value.addTag(t)}}const xs={class:"popup-content"},Ss={class:"modal-content"},ks={class:"modal-header"},Es={class:"modal-title"},Ls={class:"modal-body"},Us={class:"tags selected-tags-group"},Ms={class:"tags all-tags-group"},Ps=T({__name:"UrlListItemTagsEditPopup",setup(s){const t=b("");function e(r){r.currentTarget===r.target&&(E.value=null)}const n=new ws(E,t);function a(){t.value=""}return(r,c)=>(d(),P(at,{to:"body"},[f(E)?(d(),_("div",{key:0,class:"modal tags-edit-popup",onPointerdown:e,"data-comp":"URLsInfoLine"},[o("div",xs,[o("div",Ss,[o("div",ks,[o("h5",Es,C(f(E).url),1)]),o("div",Ls,[o("div",Us,[k(Ts,{entry:f(E),modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=l=>t.value=l),onTabPressed:a},null,8,["entry","modelValue"])]),o("div",Ms,[k(hs,{tagPropsHelper:f(n)},null,8,["tagPropsHelper"])])])])])],32)):L("",!0)]))}}),Ds=x(Ps,[["__scopeId","data-v-56f3faa2"]]),Vs={"data-comp":"Main"},Os=o("hr",null,null,-1),Rs=o("hr",null,null,-1),As=o("hr",null,null,-1),qs=o("hr",null,null,-1),Hs=T({__name:"Main",setup(s){return(t,e)=>(d(),_("div",Vs,[Os,k(Xt),Rs,k(me),As,k(Ee),k(Ve),qs,k(os),f(w)?(d(),P(ps,{key:0})):L("",!0),f(E)?(d(),P(Ds,{key:1})):L("",!0)]))}}),Ns=s=>(R("data-v-80fad6c5"),s=s(),A(),s),Bs=Ns(()=>o("a",{class:"readme",title:"Open Readme",href:"https://github.com/AlttiRi/href-lister#keeplister",target:"_blank"},[o("i",null,"i")],-1)),js=T({__name:"App",setup(s){return(t,e)=>(d(),_(j,null,[k(Hs),Bs],64))}}),Ys=x(js,[["__scopeId","data-v-80fad6c5"]]);Vt(Ys).mount("#app");
//# sourceMappingURL=index.js.map
