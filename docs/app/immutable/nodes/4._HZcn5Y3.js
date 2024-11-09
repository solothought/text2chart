import{s as X,A as P,h as S,t as M,j as R,k as x,l as F,c as U,d as L,m as W,w as B,v as C,i as G,o as v,D as A,E as O,F as N,G as z,r as J,n as Q}from"../chunks/scheduler.Ba9yt8OU.js";import{S as Y,i as Z,f as K,b as ee,d as te,m as ae,t as ne,a as se,e as re}from"../chunks/index.dhTnPvHL.js";import{e as j,F as ie}from"../chunks/FlowChart.D54-fYY0.js";function q(n,t,r){const o=n.value,i=n.selectionStart,s=n.selectionEnd,w=o.split(`
`);let l=0,p=0,h=0,m=0,y=-1;for(let _=0;_<w.length;_++){const a=w[_].trim();a.startsWith("FLOW:")?(m=-1,y++):a.length!==0&&a[0]!=="#"&&m++;const d=w[_].length+1;if(h<=i&&h+d>i&&l===0&&(l=m),h<=s&&h+d>s){p=m;break}h+=d}return t==="ArrowDown"?r?p++:(p++,l++):t==="ArrowUp"&&(r||p--,l--),l>p&&(l=p),{flowIndex:y,nodeIds:le(l,p)}}function le(n,t){const r=n<=t?1:-1,o=[];for(let i=n;r>0?i<=t:i>=t;i+=r)o.push(String(i));return o}const oe=`
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
`,ce=`
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
`,D={"Binary Search":oe,"Binary Search with Multiple Flows":ce};function H(n,t,r){const o=n.slice();return o[10]=t[r],o}function V(n){let t,r=n[10]+"",o;return{c(){t=S("option"),o=M(r),this.h()},l(i){t=x(i,"OPTION",{});var s=F(t);o=U(s,r),s.forEach(L),this.h()},h(){t.__value=n[10],A(t,t.__value)},m(i,s){G(i,t,s),v(t,o)},p:Q,d(i){i&&L(t)}}}function fe(n){let t,r,o,i,s,w,l,p,h,m,y,_,a,d,E=j(Object.keys(D)),c=[];for(let e=0;e<E.length;e+=1)c[e]=V(H(n,E,e));function T(e){n[7](e)}function I(e){n[8](e)}let b={style:"padding-left:10px; width:65vw; height:100%"};return n[1]!==void 0&&(b.text=n[1]),n[0]!==void 0&&(b.selection=n[0]),h=new ie({props:b}),P.push(()=>K(h,"text",T)),P.push(()=>K(h,"selection",I)),{c(){t=S("div"),r=S("div"),o=S("div"),i=M(`Load Example Flow of 
      `),s=S("select");for(let e=0;e<c.length;e+=1)c[e].c();w=R(),l=S("textarea"),p=R(),ee(h.$$.fragment),this.h()},l(e){t=x(e,"DIV",{class:!0});var u=F(t);r=x(u,"DIV",{class:!0});var g=F(r);o=x(g,"DIV",{});var f=F(o);i=U(f,`Load Example Flow of 
      `),s=x(f,"SELECT",{style:!0});var k=F(s);for(let $=0;$<c.length;$+=1)c[$].l(k);k.forEach(L),f.forEach(L),w=W(g),l=x(g,"TEXTAREA",{id:!0,class:!0}),F(l).forEach(L),g.forEach(L),p=W(u),te(h.$$.fragment,u),u.forEach(L),this.h()},h(){B(s,"margin-left","10px"),B(s,"padding","4px"),C(l,"id","text-area"),C(l,"class","svelte-1h7v6am"),C(r,"class","left-panel svelte-1h7v6am"),C(t,"class","workspace svelte-1h7v6am")},m(e,u){G(e,t,u),v(t,r),v(r,o),v(o,i),v(o,s);for(let g=0;g<c.length;g+=1)c[g]&&c[g].m(s,null);v(r,w),v(r,l),A(l,n[1]),v(t,p),ae(h,t,null),_=!0,a||(d=[O(s,"change",n[5]),O(l,"input",n[6]),O(l,"keyup",n[3]),O(l,"keydown",n[2]),O(l,"mouseup",n[4])],a=!0)},p(e,[u]){if(u&0){E=j(Object.keys(D));let f;for(f=0;f<E.length;f+=1){const k=H(e,E,f);c[f]?c[f].p(k,u):(c[f]=V(k),c[f].c(),c[f].m(s,null))}for(;f<c.length;f+=1)c[f].d(1);c.length=E.length}u&2&&A(l,e[1]);const g={};!m&&u&2&&(m=!0,g.text=e[1],N(()=>m=!1)),!y&&u&1&&(y=!0,g.selection=e[0],N(()=>y=!1)),h.$set(g)},i(e){_||(ne(h.$$.fragment,e),_=!0)},o(e){se(h.$$.fragment,e),_=!1},d(e){e&&L(t),z(c,e),re(h),a=!1,J(d)}}}function he(n,t,r){let o="",i=[],s=D["Binary Search"];function w(a){const d=a.target;if(d.id==="text-area"){let b=function(e){d.setSelectionRange(e,e)};const E=q(a.target,a.key,a.shiftKey);r(0,i=E);let c=d.value;const T=d.selectionStart,I=d.selectionEnd;if(a.key==="Enter"){a.preventDefault();const e=c.substring(0,T),u=c.substring(I),f=(e.split(`
`).pop()||"").match(/^\s*/)[0]||"";d.value=`${e}
${f}${u}`,b(e.length+1+f.length)}else if(a.key==="Tab"){a.preventDefault();const e="  ",u=c.substring(0,T),g=c.substring(I);d.value=`${u}${e}${g}`,b(u.length+e.length)}}}function l(a){a.target.id==="text-area"&&(s.length!==o.length||s!==o)&&(o=s)}function p(a){if(a.target.id==="text-area"){const E=q(a.target,a.key,a.shiftKey);r(0,i=E)}}function h(a){r(1,s=D[a.target.value])}function m(){s=this.value,r(1,s)}function y(a){s=a,r(1,s)}function _(a){i=a,r(0,i)}return[i,s,w,l,p,h,m,y,_]}class pe extends Y{constructor(t){super(),Z(this,t,he,fe,X,{})}}export{pe as component};
