import{s as K,y as Y,i as A,n as R,d as S,x as oe,e as $,l as P,a as k,b as x,w as ce,o as C,f as p,E as q,p as E,F as N,r as de,B as V,G as H,v as ue}from"../chunks/scheduler.DTHlAZnd.js";import{S as ae,i as ne,f as G,b as D,d as W,m as B,a as I,c as fe,t as O,e as M,g as me}from"../chunks/index.Dk9_-4rI.js";import{F as he,T as pe}from"../chunks/TextArea.e3IAdOBz.js";import{w as ge}from"../chunks/index.BRxS71dU.js";import{F as we}from"../chunks/FlowChart.BJdgxjEZ.js";const _e=`
FLOW: Binary Search Algorithm
LOOP searching for target in array
  read low (initial index of array)
  read high (last index of array)
  IF low <=  high
    THEN calculate mid ((low + high) / 2)
    IF array[mid] = target
      found target at mid
      STOP
    ELSE_IF array[mid] < target
      update low to mid + 1
    ELSE
      update high to mid - 1
  ELSE
    ERR Target not found
    STOP
`,ye=`
FLOW: Binary Search
LOOP searching for target in array
  read low (initial index of array)
  read high (last index of array)
  IF low <= high
    THEN calculate mid ((low + high) / 2)
    IF array[mid] = target
      found target at mid
      END
    ELSE
      FOLLOW update boundaries
  ELSE
    ERR Target not found
    END

FLOW: update boundaries
IF array[mid] < target
  update low to mid + 1
ELSE
  update high to mid - 1
`;let J=[{name:"Binary Search",successPercentage:93,errors:1,minExecutionTime:300,avgExecutionTime:634,maxExecutionTime:1300},{name:"Binary Search with Multiple Flows",successPercentage:0}],j={"Binary Search":_e,"Binary Search with Multiple Flows":ye};function z(t){let o,e,n,l='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',c,s,i,a,f,d,v;return{c(){o=$("div"),e=$("div"),n=$("button"),n.innerHTML=l,c=P(),s=$("div"),i=$("img"),this.h()},l(h){o=k(h,"DIV",{class:!0});var w=x(o);e=k(w,"DIV",{class:!0});var b=x(e);n=k(b,"BUTTON",{class:!0,"aria-label":!0,"data-svelte-h":!0}),ce(n)!=="svelte-12ep2do"&&(n.innerHTML=l),c=C(b),s=k(b,"DIV",{class:!0,role:!0,tabindex:!0});var m=x(s);i=k(m,"IMG",{src:!0,alt:!0,class:!0}),m.forEach(S),b.forEach(S),w.forEach(S),this.h()},h(){p(n,"class","close-button svelte-afdadd"),p(n,"aria-label","Close ad"),q(i.src,a=t[1].image)||p(i,"src",a),p(i,"alt",f=t[1].alt),p(i,"class","svelte-afdadd"),p(s,"class","ad-content svelte-afdadd"),p(s,"role","button"),p(s,"tabindex","0"),p(e,"class","popup-container svelte-afdadd"),p(o,"class","popup-overlay svelte-afdadd")},m(h,w){A(h,o,w),E(o,e),E(e,n),E(e,c),E(e,s),E(s,i),d||(v=[N(n,"click",t[2]),N(s,"click",t[4]),N(s,"keydown",t[5]),N(o,"click",t[3])],d=!0)},p(h,w){w&2&&!q(i.src,a=h[1].image)&&p(i,"src",a),w&2&&f!==(f=h[1].alt)&&p(i,"alt",f)},d(h){h&&S(o),d=!1,de(v)}}}function ve(t){let o,e=t[0]&&t[1]&&z(t);return{c(){e&&e.c(),o=Y()},l(n){e&&e.l(n),o=Y()},m(n,l){e&&e.m(n,l),A(n,o,l)},p(n,[l]){n[0]&&n[1]?e?e.p(n,l):(e=z(n),e.c(),e.m(o.parentNode,o)):e&&(e.d(1),e=null)},i:R,o:R,d(n){n&&S(o),e&&e.d(n)}}}function Se(t,o,e){const n=[{image:"https://solothought.com/products/assets/images/wishin/YouTubeThumbnail.png",url:"https://play.google.com/store/apps/details?id=com.solothought.wishin",alt:"Wishin Product"},{image:"https://solothought.com/products/assets/images/wishin/self-doubt-evidence.png",url:"https://play.google.com/store/apps/details?id=com.solothought.wishin",alt:"Wishin Product"},{image:"https://solothought.com/products/assets/images/wishin/WishIn_ad_banner.png",url:"https://play.google.com/store/apps/details?id=com.solothought.wishin",alt:"Wishin Product"}];let l=!1,c=null;oe(()=>{const d=localStorage.getItem("adLastShown"),v=new Date().toDateString();d!==v&&(e(1,c=n[Math.floor(Math.random()*n.length)]),e(0,l=!0),localStorage.setItem("adLastShown",v))});function s(){e(0,l=!1)}function i(d){d.target===d.currentTarget&&s()}function a(){c&&c.url&&window.open(c.url,"_blank")}return[l,c,s,i,a,d=>d.key==="Enter"&&a()]}class be extends ae{constructor(o){super(),ne(this,o,Se,ve,K,{})}}const le="flow-text-",se="selected-flow",ie="flow-list";let U;function X(t,o){clearTimeout(U),U=setTimeout(()=>{localStorage.setItem(`${le}${t}`,o)},500)}function Q(t){return localStorage.getItem(`${le}${t}`)||null}function Z(t){localStorage.setItem(se,t)}function Fe(){return typeof window<"u"?localStorage.getItem(se):1}function ee(t){localStorage.setItem(ie,JSON.stringify(t))}function Ee(){if(typeof window<"u"){const t=localStorage.getItem(ie);return t?JSON.parse(t):null}else return null}function te(t){let o,e,n,l;function c(a){t[11](a)}function s(a){t[12](a)}let i={style:"padding-left:10px; width:65vw; height:100%"};return t[2]!==void 0&&(i.text=t[2]),t[1]!==void 0&&(i.selection=t[1]),o=new we({props:i}),V.push(()=>G(o,"text",c)),V.push(()=>G(o,"selection",s)),{c(){D(o.$$.fragment)},l(a){W(o.$$.fragment,a)},m(a,f){B(o,a,f),l=!0},p(a,f){const d={};!e&&f&4&&(e=!0,d.text=a[2],H(()=>e=!1)),!n&&f&2&&(n=!0,d.selection=a[1],H(()=>n=!1)),o.$set(d)},i(a){l||(O(o.$$.fragment,a),l=!0)},o(a){I(o.$$.fragment,a),l=!1},d(a){M(o,a)}}}function Te(t){let o,e,n,l,c,s,i,a,f,d,v=t[3],h;o=new be({}),s=new he({props:{flows:t[4],selectedFlowName:t[0]}}),s.$on("flowSelected",t[5]),s.$on("addFlow",t[6]),s.$on("removeFlow",t[7]);function w(r){t[10](r)}let b={selection:t[1]};t[2]!==void 0&&(b.text=t[2]),a=new pe({props:b}),V.push(()=>G(a,"text",w)),a.$on("textChange",t[8]),a.$on("lineSelection",t[9]);let m=te(t);return{c(){D(o.$$.fragment),e=P(),n=$("div"),l=$("div"),c=$("div"),D(s.$$.fragment),i=P(),D(a.$$.fragment),d=P(),m.c(),this.h()},l(r){W(o.$$.fragment,r),e=C(r),n=k(r,"DIV",{class:!0});var g=x(n);l=k(g,"DIV",{class:!0});var F=x(l);c=k(F,"DIV",{class:!0});var _=x(c);W(s.$$.fragment,_),i=C(_),W(a.$$.fragment,_),_.forEach(S),d=C(F),m.l(F),F.forEach(S),g.forEach(S),this.h()},h(){p(c,"class","left-panel svelte-11bilyg"),p(l,"class","workspace svelte-11bilyg"),p(n,"class","container-fluid")},m(r,g){B(o,r,g),A(r,e,g),A(r,n,g),E(n,l),E(l,c),B(s,c,null),E(c,i),B(a,c,null),E(l,d),m.m(l,null),h=!0},p(r,[g]){const F={};g&1&&(F.selectedFlowName=r[0]),s.$set(F);const _={};g&2&&(_.selection=r[1]),!f&&g&4&&(f=!0,_.text=r[2],H(()=>f=!1)),a.$set(_),g&8&&K(v,v=r[3])?(me(),I(m,1,1,R),fe(),m=te(r),m.c(),O(m,1),m.m(l,null)):m.p(r,g)},i(r){h||(O(o.$$.fragment,r),O(s.$$.fragment,r),O(a.$$.fragment,r),O(m),h=!0)},o(r){I(o.$$.fragment,r),I(s.$$.fragment,r),I(a.$$.fragment,r),I(m),h=!1},d(r){r&&(S(e),S(n)),M(o,r),M(s),M(a),m.d(r)}}}function Le(t,o,e){var _;let n,l=ge([...J]);ue(t,l,u=>e(13,n=u));let c=Fe()||((_=J[0])==null?void 0:_.name),s=[],i="",a=0;const f=Ee();f&&l.set(f);function d(){const u=n.find(y=>y.name===c);e(2,i=Q(u==null?void 0:u.name)||j[c]||"")}function v(u){const y=u.detail.flow.name,T=Q(y);e(2,i=T||j[y]||""),e(0,c=y),Z(y),e(3,a++,a)}function h(u){const y=u.detail.name.trim();n.some(T=>T.name.toLowerCase()===y.toLowerCase())?alert("Flow with this name already exists"):l.update(T=>{const L={name:y,successPercentage:0};return X(L.name,""),ee([...T,L]),e(0,c=L.name),Z(L.name),d(),e(3,a++,a),[...T,L]})}function w(u){const y=u.detail.flowName;l.update(T=>{const L=T.filter(re=>re.name!==y);return ee(L),L})}oe(async()=>{typeof window<"u"&&d()});function b(u){e(2,i=u.detail.text),X(c,i)}function m(u){e(1,s=u.detail.selectedLines)}function r(u){i=u,e(2,i)}function g(u){i=u,e(2,i)}function F(u){s=u,e(1,s)}return[c,s,i,a,l,v,h,w,b,m,r,g,F]}class Ne extends ae{constructor(o){super(),ne(this,o,Le,Te,K,{})}}export{Ne as component};
