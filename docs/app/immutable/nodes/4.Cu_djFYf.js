import{s as G,z as P,e as x,d as B,f as O,h as v,l as H,k as I,w as k,m as U,o as L,A as N,q as Z,y as ee,n as te}from"../chunks/scheduler.DPgjqrYG.js";import{S as ne,i as oe,b as C,c as R,d as W,m as D,a as S,f as ae,t as E,e as A,g as ie}from"../chunks/index.C_aA0q2r.js";import{F as le,T as re}from"../chunks/TextArea.DJ0zcIwH.js";import{w as se}from"../chunks/index.yL0Kxjci.js";import{F as de}from"../chunks/FlowChart.-yWqMC2z.js";const ce=`
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
`,fe=`
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
`;let ue=[{id:1,name:"Binary Search",successPercentage:93,errors:1,minExecutionTime:300,avgExecutionTime:634,maxExecutionTime:1300},{id:2,name:"Binary Search with Multiple Flows",successPercentage:0}],K={1:ce,2:fe};const T="flow-text-",X="selected-flow",j="flow-list";let M;function V(e,o,t){clearTimeout(M),M=setTimeout(()=>{localStorage.setItem(`${T}${e}`,t),localStorage.setItem(`${T}${o}`,t)},500)}function q(e,o){return localStorage.getItem(`${T}${e}`)||localStorage.getItem(`${T}${o}`)||null}function z(e){localStorage.setItem(X,e)}function me(){return typeof window<"u"?Number(localStorage.getItem(X)):1}function J(e){localStorage.setItem(j,JSON.stringify(e))}function ge(){if(typeof window<"u"){const e=localStorage.getItem(j);return e?JSON.parse(e):null}else return null}function Y(e){let o,t,r,a;function f(n){e[11](n)}function s(n){e[12](n)}let d={style:"padding-left:10px; width:65vw; height:100%"};return e[2]!==void 0&&(d.text=e[2]),e[1]!==void 0&&(d.selection=e[1]),o=new de({props:d}),P.push(()=>C(o,"text",f)),P.push(()=>C(o,"selection",s)),{c(){R(o.$$.fragment)},l(n){W(o.$$.fragment,n)},m(n,p){D(o,n,p),a=!0},p(n,p){const g={};!t&&p&4&&(t=!0,g.text=n[2],N(()=>t=!1)),!r&&p&2&&(r=!0,g.selection=n[1],N(()=>r=!1)),o.$set(g)},i(n){a||(E(o.$$.fragment,n),a=!0)},o(n){S(o.$$.fragment,n),a=!1},d(n){A(o,n)}}}function he(e){let o,t,r,a,f,s,d,n,p=e[3],g;a=new le({props:{flows:e[4],selectedFlowId:e[0]}}),a.$on("flowSelected",e[5]),a.$on("addFlow",e[6]),a.$on("removeFlow",e[7]);function b(i){e[10](i)}let y={};e[2]!==void 0&&(y.text=e[2]),s=new re({props:y}),P.push(()=>C(s,"text",b)),s.$on("textChange",e[8]),s.$on("lineSelection",e[9]);let u=Y(e);return{c(){o=x("div"),t=x("div"),r=x("div"),R(a.$$.fragment),f=B(),R(s.$$.fragment),n=B(),u.c(),this.h()},l(i){o=O(i,"DIV",{class:!0});var h=v(o);t=O(h,"DIV",{class:!0});var _=v(t);r=O(_,"DIV",{class:!0});var F=v(r);W(a.$$.fragment,F),f=H(F),W(s.$$.fragment,F),F.forEach(I),n=H(_),u.l(_),_.forEach(I),h.forEach(I),this.h()},h(){k(r,"class","left-panel svelte-11bilyg"),k(t,"class","workspace svelte-11bilyg"),k(o,"class","container-fluid")},m(i,h){U(i,o,h),L(o,t),L(t,r),D(a,r,null),L(r,f),D(s,r,null),L(t,n),u.m(t,null),g=!0},p(i,[h]){const _={};h&1&&(_.selectedFlowId=i[0]),a.$set(_);const F={};!d&&h&4&&(d=!0,F.text=i[2],N(()=>d=!1)),s.$set(F),h&8&&G(p,p=i[3])?(ie(),S(u,1,1,te),ae(),u=Y(i),u.c(),E(u,1),u.m(t,null)):u.p(i,h)},i(i){g||(E(a.$$.fragment,i),E(s.$$.fragment,i),E(u),g=!0)},o(i){S(a.$$.fragment,i),S(s.$$.fragment,i),S(u),g=!1},d(i){i&&I(o),A(a),A(s),u.d(i)}}}function we(e,o,t){let r,a=se([...ue]);Z(e,a,l=>t(13,r=l));let f=me()||1,s=[],d="",n=0;const p=ge();p&&a.set(p);function g(){const l=r.find(c=>c.id===f);t(2,d=q(f,l==null?void 0:l.name)||K[f]||"")}function b(l){const c=l.detail.flowId,m=r.find($=>$.id===c),w=q(c,m==null?void 0:m.name);t(2,d=w||K[c]||""),t(0,f=c),z(c),t(3,n++,n)}function y(l){const c=l.detail.name.trim();r.some(m=>m.name.toLowerCase()===c.toLowerCase())?alert("Flow with this name already exists"):a.update(m=>{const w={id:m.length+1,name:c,successPercentage:0};return V(w.id,w.name,""),J([...m,w]),t(0,f=w.id),z(w.id),g(),t(3,n++,n),[...m,w]})}function u(l){const c=l.detail.flowId;a.update(m=>{const w=m.filter($=>$.id!==c);return J(w),w})}ee(async()=>{typeof window<"u"&&g()});function i(l){t(2,d=l.detail.text);const c=r.find(m=>m.id===f);V(f,c==null?void 0:c.name,d)}function h(l){t(1,s=l.detail.selectedLines)}function _(l){d=l,t(2,d)}function F(l){d=l,t(2,d)}function Q(l){s=l,t(1,s)}return[f,s,d,n,a,b,y,u,i,h,_,F,Q]}class ye extends ne{constructor(o){super(),oe(this,o,we,he,G,{})}}export{ye as component};
