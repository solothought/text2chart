import{s as z,A,h as L,t as U,j as R,k as x,l as F,c as Q,d as v,m as B,w as N,v as C,i as X,o as S,P,Q as k,R as W,S as G,r as J,x as Y,n as Z}from"../chunks/scheduler.DWOLFMnV.js";import{S as ee,i as te,f as K,b as ae,d as ne,m as oe,t as re,a as se,e as ie}from"../chunks/index.DeeQCrJW.js";import{e as V,F as le}from"../chunks/FlowChart.Co6LBUp9.js";import{w as ce}from"../chunks/index.9T-3Ep38.js";function ue(n,e,o){const l=n.value,i=n.selectionStart,r=n.selectionEnd,u=l.split(`
`);let a=0,f=0,c=0,m=0,w=-1;for(let p=0;p<u.length;p++){const _=u[p].trim();_.startsWith("FLOW:")?(m=-1,w++):_.length!==0&&_[0]!=="#"&&m++;const y=u[p].length+1;if(c<=i&&c+y>i&&a===0&&(a=m),c<=r&&c+y>r){f=m;break}c+=y}return e==="ArrowDown"?o?f++:(f++,a++):e==="ArrowUp"&&(o||f--,a--),a>f&&(a=f),{flowIndex:w,nodeIds:fe(a,f)}}function fe(n,e){const o=n<=e?1:-1,l=[];for(let i=n;o>0?i<=e:i>=e;i+=o)l.push(String(i));return l}const de=`
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
`,he=`
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
`,I={"Binary Search":de,"Binary Search with Multiple Flows":he};function ge(n){const e=n.target;let o=e.value;const l=e.selectionStart,i=e.selectionEnd;if(n.key==="Enter"){n.preventDefault();const r=o.substring(0,l),u=o.substring(i),f=(r.split(`
`).pop()||"").match(/^\s*/)[0]||"";e.value=`${r}
${f}${u}`,j(e,r.length+1+f.length)}else if(n.key==="Tab"){n.preventDefault();const r="  ",u=o.substring(0,l),a=o.substring(i);e.value=`${u}${r}${a}`,j(e,u.length+r.length)}}function j(n,e){n.setSelectionRange(e,e)}function q(n,e,o){const l=n.slice();return l[13]=e[o],l}function H(n){let e,o=n[13]+"",l;return{c(){e=L("option"),l=U(o),this.h()},l(i){e=x(i,"OPTION",{});var r=F(e);l=Q(r,o),r.forEach(v),this.h()},h(){e.__value=n[13],P(e,e.__value)},m(i,r){X(i,e,r),S(e,l)},p:Z,d(i){i&&v(e)}}}function pe(n){let e,o,l,i,r,u,a,f,c,m,w,p,_,y,E=V(Object.keys(I)),t=[];for(let s=0;s<E.length;s+=1)t[s]=H(q(n,E,s));function b(s){n[7](s)}function T(s){n[8](s)}let D={style:"padding-left:10px; width:65vw; height:100%"};return n[1]!==void 0&&(D.text=n[1]),n[0]!==void 0&&(D.selection=n[0]),c=new le({props:D}),A.push(()=>K(c,"text",b)),A.push(()=>K(c,"selection",T)),{c(){e=L("div"),o=L("div"),l=L("div"),i=U(`Load Example Flow of 
      `),r=L("select");for(let s=0;s<t.length;s+=1)t[s].c();u=R(),a=L("textarea"),f=R(),ae(c.$$.fragment),this.h()},l(s){e=x(s,"DIV",{class:!0});var g=F(e);o=x(g,"DIV",{class:!0});var h=F(o);l=x(h,"DIV",{});var d=F(l);i=Q(d,`Load Example Flow of 
      `),r=x(d,"SELECT",{style:!0});var O=F(r);for(let $=0;$<t.length;$+=1)t[$].l(O);O.forEach(v),d.forEach(v),u=B(h),a=x(h,"TEXTAREA",{id:!0,class:!0}),F(a).forEach(v),h.forEach(v),f=B(g),ne(c.$$.fragment,g),g.forEach(v),this.h()},h(){N(r,"margin-left","10px"),N(r,"padding","4px"),C(a,"id","text-area"),C(a,"class","svelte-1h7v6am"),C(o,"class","left-panel svelte-1h7v6am"),C(e,"class","workspace svelte-1h7v6am")},m(s,g){X(s,e,g),S(e,o),S(o,l),S(l,i),S(l,r);for(let h=0;h<t.length;h+=1)t[h]&&t[h].m(r,null);S(o,u),S(o,a),P(a,n[1]),S(e,f),oe(c,e,null),p=!0,_||(y=[k(r,"change",n[5]),k(a,"input",n[6]),k(a,"keyup",n[3]),k(a,"keydown",n[2]),k(a,"mouseup",n[4])],_=!0)},p(s,[g]){if(g&0){E=V(Object.keys(I));let d;for(d=0;d<E.length;d+=1){const O=q(s,E,d);t[d]?t[d].p(O,g):(t[d]=H(O),t[d].c(),t[d].m(r,null))}for(;d<t.length;d+=1)t[d].d(1);t.length=E.length}g&2&&P(a,s[1]);const h={};!m&&g&2&&(m=!0,h.text=s[1],W(()=>m=!1)),!w&&g&1&&(w=!0,h.selection=s[0],W(()=>w=!1)),c.$set(h)},i(s){p||(re(c.$$.fragment,s),p=!0)},o(s){se(c.$$.fragment,s),p=!1},d(s){s&&v(e),G(t,s),ie(c),_=!1,J(y)}}}const M="st-flow-algo";function me(n,e,o){const l=ce("");let i,r="",u=[],a=I["Binary Search"];Y(async()=>{if(typeof window<"u"){const t=localStorage.getItem(M);o(1,a=t||I["Binary Search"]),i=T=>{clearTimeout(i.timeout),i.timeout=setTimeout(()=>{localStorage.setItem(M,T)},500)};const b=l.subscribe(T=>{i(T)});return()=>{b(),clearTimeout(i.timer)}}});function f(t){t.target.id==="text-area"&&(c(t),ge(t))}function c(t){const b=ue(t.target,t.key,t.shiftKey);o(0,u=b)}function m(t){t.target.id==="text-area"&&(a.length!==r.length||a!==r)&&(l.set(a),i(a),r=a)}function w(t){t.target.id==="text-area"&&c(t)}function p(t){o(1,a=I[t.target.value])}function _(){a=this.value,o(1,a)}function y(t){a=t,o(1,a)}function E(t){u=t,o(0,u)}return[u,a,f,m,w,p,_,y,E]}class be extends ee{constructor(e){super(),te(this,e,me,pe,z,{})}}export{be as component};
