import{s as A,y as v,h as x,j as T,k as E,l as $,d as b,m as D,v as w,i as O,o as k,z as C,A as I,r as P}from"../chunks/scheduler.DPAPgQ84.js";import{S as K,i as q,b as F,c as W,d as R,m as U,t as j,a as z,e as H}from"../chunks/index.DEEc51ur.js";import{F as V}from"../chunks/FlowChart.9v3ozWEX.js";function X(r,o,t){const c=r.value,n=r.selectionStart,u=r.selectionEnd,g=c.split(`
`);let i=0,f=0,d=0,s=0,l=-1;for(let h=0;h<g.length;h++){const e=g[h].trim();e.startsWith("FLOW:")?(s=-1,l++):e.length!==0&&e[0]!=="#"&&s++;const a=g[h].length+1;if(d<=n&&d+a>n&&i===0&&(i=s),d<=u&&d+a>u){f=s;break}d+=a}return o==="ArrowDown"?t?f++:(f++,i++):o==="ArrowUp"&&(t||f--,i--),i>f&&(i=f),{flowIndex:l,nodeIds:B(i,f)}}function B(r,o){const t=r<=o?1:-1,c=[];for(let n=r;t>0?n<=o:n>=o;n+=t)c.push(String(n));return c}function G(r){let o,t,c,n,u,g,i,f,d;function s(e){r[5](e)}function l(e){r[6](e)}let h={style:"padding-left:10px; width:65vw; height:100vh"};return r[1]!==void 0&&(h.text=r[1]),r[0]!==void 0&&(h.selection=r[0]),n=new V({props:h}),v.push(()=>F(n,"text",s)),v.push(()=>F(n,"selection",l)),{c(){o=x("div"),t=x("textarea"),c=T(),W(n.$$.fragment),this.h()},l(e){o=E(e,"DIV",{class:!0});var a=$(o);t=E(a,"TEXTAREA",{id:!0,class:!0}),$(t).forEach(b),c=D(a),R(n.$$.fragment,a),a.forEach(b),this.h()},h(){w(t,"id","text-area"),t.value=r[2]+`

  `,w(t,"class","svelte-rbgd9o"),w(o,"class","container svelte-rbgd9o")},m(e,a){O(e,o,a),k(o,t),k(o,c),U(n,o,null),i=!0,f||(d=[C(t,"keyup",r[4]),C(t,"keydown",r[3])],f=!0)},p(e,[a]){const m={};!u&&a&2&&(u=!0,m.text=e[1],I(()=>u=!1)),!g&&a&1&&(g=!0,m.selection=e[0],I(()=>g=!1)),n.$set(m)},i(e){i||(j(n.$$.fragment,e),i=!0)},o(e){z(n.$$.fragment,e),i=!1},d(e){e&&b(o),H(n),f=!1,P(d)}}}function J(r,o,t){let c=[],n=`

FLOW: passed as parameter
here you go
IF go in loop
  LOOP until
    you're safe here even with a long sentence
    IF not
      but
    ELSE_IF else if
      STOP
    ELSE
      SKIP
finsh here
  `,u="";function g(s){const l=s.target;if(l.id==="text-area"){let y=function(p){l.setSelectionRange(p,p)};console.log(l.id);const h=X(s.target,s.key,s.shiftKey);t(0,c=h);let e=l.value;const a=l.selectionStart,m=l.selectionEnd;if(s.key==="Enter"){s.preventDefault();const p=e.substring(0,a),_=e.substring(m),S=(p.split(`
`).pop()||"").match(/^\s*/)[0]||"";l.value=`${p}
${S}${_}`,y(p.length+1+S.length)}else if(s.key==="Tab"){s.preventDefault();const p="  ",_=e.substring(0,a),L=e.substring(m);l.value=`${_}${p}${L}`,y(_.length+p.length)}}}function i(s){s.target.id==="text-area"&&t(1,u=s.target.value)}function f(s){u=s,t(1,u),t(2,n)}function d(s){c=s,t(0,c)}return t(1,u=n),[c,u,n,g,i,f,d]}class Y extends K{constructor(o){super(),q(this,o,J,G,A,{})}}export{Y as component};
