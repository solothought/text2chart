import{s as G,B as v,e as x,l as D,a as $,b as I,o as A,d as L,f as O,i as ee,p as T,E as N,v as te,x as ne,n as ae}from"../chunks/scheduler.-NESPGow.js";import{S as oe,i as le,f as k,b as P,d as B,m as C,a as S,c as re,t as E,e as R,g as ie}from"../chunks/index.Dly_xxfY.js";import{F as se,T as ce}from"../chunks/TextArea.DqbUlNZm.js";import{w as fe}from"../chunks/index.BiOvVL5Z.js";import{F as de}from"../chunks/FlowChart.s7bpvTgV.js";const ue=`
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
`,me=`
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
`;let M=[{name:"Binary Search",successPercentage:93,errors:1,minExecutionTime:300,avgExecutionTime:634,maxExecutionTime:1300},{name:"Binary Search with Multiple Flows",successPercentage:0}],H={"Binary Search":ue,"Binary Search with Multiple Flows":me};const X="flow-text-",j="selected-flow",Q="flow-list";let K;function V(e,a){clearTimeout(K),K=setTimeout(()=>{localStorage.setItem(`${X}${e}`,a)},500)}function J(e){return localStorage.getItem(`${X}${e}`)||null}function Y(e){localStorage.setItem(j,e)}function we(){return typeof window<"u"?localStorage.getItem(j):1}function q(e){localStorage.setItem(Q,JSON.stringify(e))}function he(){if(typeof window<"u"){const e=localStorage.getItem(Q);return e?JSON.parse(e):null}else return null}function z(e){let a,t,c,l;function d(n){e[11](n)}function i(n){e[12](n)}let s={style:"padding-left:10px; width:65vw; height:100%"};return e[2]!==void 0&&(s.text=e[2]),e[1]!==void 0&&(s.selection=e[1]),a=new de({props:s}),v.push(()=>k(a,"text",d)),v.push(()=>k(a,"selection",i)),{c(){P(a.$$.fragment)},l(n){B(a.$$.fragment,n)},m(n,h){C(a,n,h),l=!0},p(n,h){const m={};!t&&h&4&&(t=!0,m.text=n[2],N(()=>t=!1)),!c&&h&2&&(c=!0,m.selection=n[1],N(()=>c=!1)),a.$set(m)},i(n){l||(E(a.$$.fragment,n),l=!0)},o(n){S(a.$$.fragment,n),l=!1},d(n){R(a,n)}}}function ge(e){let a,t,c,l,d,i,s,n,h=e[3],m;l=new se({props:{flows:e[4],selectedFlowName:e[0]}}),l.$on("flowSelected",e[5]),l.$on("addFlow",e[6]),l.$on("removeFlow",e[7]);function b(o){e[10](o)}let y={selection:e[1]};e[2]!==void 0&&(y.text=e[2]),i=new ce({props:y}),v.push(()=>k(i,"text",b)),i.$on("textChange",e[8]),i.$on("lineSelection",e[9]);let f=z(e);return{c(){a=x("div"),t=x("div"),c=x("div"),P(l.$$.fragment),d=D(),P(i.$$.fragment),n=D(),f.c(),this.h()},l(o){a=$(o,"DIV",{class:!0});var u=I(a);t=$(u,"DIV",{class:!0});var p=I(t);c=$(p,"DIV",{class:!0});var g=I(c);B(l.$$.fragment,g),d=A(g),B(i.$$.fragment,g),g.forEach(L),n=A(p),f.l(p),p.forEach(L),u.forEach(L),this.h()},h(){O(c,"class","left-panel svelte-11bilyg"),O(t,"class","workspace svelte-11bilyg"),O(a,"class","container-fluid")},m(o,u){ee(o,a,u),T(a,t),T(t,c),C(l,c,null),T(c,d),C(i,c,null),T(t,n),f.m(t,null),m=!0},p(o,[u]){const p={};u&1&&(p.selectedFlowName=o[0]),l.$set(p);const g={};u&2&&(g.selection=o[1]),!s&&u&4&&(s=!0,g.text=o[2],N(()=>s=!1)),i.$set(g),u&8&&G(h,h=o[3])?(ie(),S(f,1,1,ae),re(),f=z(o),f.c(),E(f,1),f.m(t,null)):f.p(o,u)},i(o){m||(E(l.$$.fragment,o),E(i.$$.fragment,o),E(f),m=!0)},o(o){S(l.$$.fragment,o),S(i.$$.fragment,o),S(f),m=!1},d(o){o&&L(a),R(l),R(i),f.d(o)}}}function pe(e,a,t){var W;let c,l=fe([...M]);te(e,l,r=>t(13,c=r));let d=we()||((W=M[0])==null?void 0:W.name),i=[],s="",n=0;const h=he();h&&l.set(h);function m(){const r=c.find(w=>w.name===d);t(2,s=J(r==null?void 0:r.name)||H[d]||"")}function b(r){const w=r.detail.flow.name,_=J(w);t(2,s=_||H[w]||""),t(0,d=w),Y(w),t(3,n++,n)}function y(r){const w=r.detail.name.trim();c.some(_=>_.name.toLowerCase()===w.toLowerCase())?alert("Flow with this name already exists"):l.update(_=>{const F={name:w,successPercentage:0};return V(F.name,""),q([..._,F]),t(0,d=F.name),Y(F.name),m(),t(3,n++,n),[..._,F]})}function f(r){const w=r.detail.flowName;l.update(_=>{const F=_.filter(Z=>Z.name!==w);return q(F),F})}ne(async()=>{typeof window<"u"&&m()});function o(r){t(2,s=r.detail.text),V(d,s)}function u(r){t(1,i=r.detail.selectedLines)}function p(r){s=r,t(2,s)}function g(r){s=r,t(2,s)}function U(r){i=r,t(1,i)}return[d,i,s,n,l,b,y,f,o,u,p,g,U]}class Le extends oe{constructor(a){super(),le(this,a,pe,ge,G,{})}}export{Le as component};
