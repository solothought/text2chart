import{s as g,h as c,t as d,k as m,l as p,d as s,c as f,v as l,w as C,i as n,n as y,x as E}from"../chunks/scheduler.DPAPgQ84.js";import{S as I,i as _}from"../chunks/index.DEEc51ur.js";import{F as w}from"../chunks/FlowChart.9v3ozWEX.js";function k(v){let e,o,a,h,r,u;return{c(){e=c("div"),o=d(` style working
`),a=c("div"),h=d(` style not working
`),r=c("div"),u=d(" style not working"),this.h()},l(t){e=m(t,"DIV",{id:!0}),p(e).forEach(s),o=f(t,` style working
`),a=m(t,"DIV",{id:!0,class:!0}),p(a).forEach(s),h=f(t,` style not working
`),r=m(t,"DIV",{id:!0,style:!0,class:!0}),p(r).forEach(s),u=f(t," style not working"),this.h()},h(){l(e,"id","quarterChart1"),l(a,"id","quarterChart"),l(a,"class","halfChart svelte-1pdsvir"),l(r,"id","quarterChart"),C(r,"width","100%, height:100%"),l(r,"class","svelte-1pdsvir")},m(t,i){n(t,e,i),n(t,o,i),n(t,a,i),n(t,h,i),n(t,r,i),n(t,u,i)},p:y,i:y,o:y,d(t){t&&(s(e),s(o),s(a),s(h),s(r),s(u))}}}function x(v){const e=`
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
    finsh here`;return E(async()=>{new w({target:document.getElementById("quarterChart2"),props:{text:e}}),new w({target:document.getElementById("quarterChart1"),props:{text:e,class:"halfChart"}})}),[]}class L extends I{constructor(e){super(),_(this,e,x,k,g,{})}}export{L as component};
