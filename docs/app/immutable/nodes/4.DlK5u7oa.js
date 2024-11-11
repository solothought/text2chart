import{s as J,B as R,e as S,t as Q,d as A,f as L,h as x,j as X,k as v,l as N,x as W,w as I,m as z,o as E,Q as B,R as O,S as V,T as Y,r as Z,y as ee,n as te}from"../chunks/scheduler.RmzKSWap.js";import{S as ae,i as ne,f as K,b as oe,d as re,m as se,t as ie,a as le,e as ce}from"../chunks/index.D8l_s2E6.js";import{e as j,F as ue}from"../chunks/FlowChart.CWnWSCri.js";import{w as fe}from"../chunks/index.X6h1T_c5.js";function de(t,e,a){const i=t.value,n=t.selectionStart,f=t.selectionEnd,u=i.split(`
`);let o=0,l=0,p=0,d=0,b=-1;for(let m=0;m<u.length;m++){const _=u[m].trim();_.startsWith("FLOW:")?(d=-1,b++):_.length!==0&&_[0]!=="#"&&d++;const y=u[m].length+1;if(p<=n&&p+y>n&&o===0&&(o=d),p<=f&&p+y>f){l=d;break}p+=y}return e==="ArrowDown"?a?l++:(l++,o++):e==="ArrowUp"&&(a||l--,o--),o>l&&(o=l),{flowIndex:b,nodeIds:he(o,l)}}function he(t,e){const a=t<=e?1:-1,i=[];for(let n=t;a>0?n<=e:n>=e;n+=a)i.push(String(n));return i}const ge=`
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
`,pe=`
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
`,k={"Binary Search":ge,"Binary Search with Multiple Flows":pe};function me(t){const e=t.target;let a=e.value;const i=e.selectionStart,n=e.selectionEnd;if(t.key==="Enter"){t.preventDefault();const f=a.substring(0,i),u=a.substring(n),l=(f.split(`
`).pop()||"").match(/^\s*/)[0]||"";e.value=`${f}
${l}${u}`,q(e,f.length+1+l.length)}else if(t.key==="Tab"){t.preventDefault();const f="  ",u=a.substring(0,i),o=a.substring(n);e.value=`${u}${f}${o}`,q(e,u.length+f.length)}}function q(t,e){t.setSelectionRange(e,e)}function H(t,e,a){const i=t.slice();return i[13]=e[a],i}function M(t){let e,a=t[13]+"",i;return{c(){e=S("option"),i=Q(a),this.h()},l(n){e=L(n,"OPTION",{});var f=x(e);i=X(f,a),f.forEach(v),this.h()},h(){e.__value=t[13],B(e,e.__value)},m(n,f){z(n,e,f),E(e,i)},p:te,d(n){n&&v(e)}}}function _e(t){let e,a,i,n,f,u,o,l,p,d,b,m,_,y,C,s=j(Object.keys(k)),c=[];for(let r=0;r<s.length;r+=1)c[r]=M(H(t,s,r));function T(r){t[7](r)}function G(r){t[8](r)}let D={style:"padding-left:10px; width:65vw; height:100%"};return t[1]!==void 0&&(D.text=t[1]),t[0]!==void 0&&(D.selection=t[0]),d=new ue({props:D}),R.push(()=>K(d,"text",T)),R.push(()=>K(d,"selection",G)),{c(){e=S("div"),a=S("div"),i=S("div"),n=S("div"),f=Q(`Load Example Flow of 
        `),u=S("select");for(let r=0;r<c.length;r+=1)c[r].c();o=A(),l=S("textarea"),p=A(),oe(d.$$.fragment),this.h()},l(r){e=L(r,"DIV",{class:!0});var w=x(e);a=L(w,"DIV",{class:!0});var g=x(a);i=L(g,"DIV",{class:!0});var h=x(i);n=L(h,"DIV",{});var F=x(n);f=X(F,`Load Example Flow of 
        `),u=L(F,"SELECT",{style:!0});var P=x(u);for(let $=0;$<c.length;$+=1)c[$].l(P);P.forEach(v),F.forEach(v),o=N(h),l=L(h,"TEXTAREA",{id:!0,class:!0}),x(l).forEach(v),h.forEach(v),p=N(g),re(d.$$.fragment,g),g.forEach(v),w.forEach(v),this.h()},h(){W(u,"margin-left","10px"),W(u,"padding","4px"),I(l,"id","text-area"),I(l,"class","svelte-1h7v6am"),I(i,"class","left-panel svelte-1h7v6am"),I(a,"class","workspace svelte-1h7v6am"),I(e,"class","container-fluid")},m(r,w){z(r,e,w),E(e,a),E(a,i),E(i,n),E(n,f),E(n,u);for(let g=0;g<c.length;g+=1)c[g]&&c[g].m(u,null);E(i,o),E(i,l),B(l,t[1]),E(a,p),se(d,a,null),_=!0,y||(C=[O(u,"change",t[5]),O(l,"input",t[6]),O(l,"keyup",t[3]),O(l,"keydown",t[2]),O(l,"mouseup",t[4])],y=!0)},p(r,[w]){if(w&0){s=j(Object.keys(k));let h;for(h=0;h<s.length;h+=1){const F=H(r,s,h);c[h]?c[h].p(F,w):(c[h]=M(F),c[h].c(),c[h].m(u,null))}for(;h<c.length;h+=1)c[h].d(1);c.length=s.length}w&2&&B(l,r[1]);const g={};!b&&w&2&&(b=!0,g.text=r[1],V(()=>b=!1)),!m&&w&1&&(m=!0,g.selection=r[0],V(()=>m=!1)),d.$set(g)},i(r){_||(ie(d.$$.fragment,r),_=!0)},o(r){le(d.$$.fragment,r),_=!1},d(r){r&&v(e),Y(c,r),ce(d),y=!1,Z(C)}}}const U="st-flow-algo";function we(t,e,a){const i=fe("");let n,f="",u=[],o=k["Binary Search"];ee(async()=>{if(typeof window<"u"){const s=localStorage.getItem(U);a(1,o=s||k["Binary Search"]),n=T=>{clearTimeout(n.timeout),n.timeout=setTimeout(()=>{localStorage.setItem(U,T)},500)};const c=i.subscribe(T=>{n(T)});return()=>{c(),clearTimeout(n.timer)}}});function l(s){s.target.id==="text-area"&&(p(s),me(s))}function p(s){const c=de(s.target,s.key,s.shiftKey);a(0,u=c)}function d(s){s.target.id==="text-area"&&(o.length!==f.length||o!==f)&&(i.set(o),n(o),f=o)}function b(s){s.target.id==="text-area"&&p(s)}function m(s){a(1,o=k[s.target.value])}function _(){o=this.value,a(1,o)}function y(s){o=s,a(1,o)}function C(s){u=s,a(0,u)}return[u,o,l,d,b,m,_,y,C]}class Se extends ae{constructor(e){super(),ne(this,e,we,_e,J,{})}}export{Se as component};
