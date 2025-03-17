import{s as _,e as h,t as m,l as x,a as d,b as c,d as e,m as p,o as F,f as s,i as a,n as q,x as S}from"../chunks/scheduler.-NESPGow.js";import{S as B,i as D}from"../chunks/index.Dly_xxfY.js";import{F as w}from"../chunks/FlowChart.s7bpvTgV.js";function V(k){let r,f,u,y,v,g,n,C,o,E,l,I;return{c(){r=h("div"),f=m(` style working
`),u=h("div"),y=m(` style working
`),v=h("hr"),g=x(),n=h("div"),C=m(` style not working
`),o=h("div"),E=m(` style not working
`),l=h("div"),I=m(" style working"),this.h()},l(t){r=d(t,"DIV",{id:!0}),c(r).forEach(e),f=p(t,` style working
`),u=d(t,"DIV",{id:!0}),c(u).forEach(e),y=p(t,` style working
`),v=d(t,"HR",{}),g=F(t),n=d(t,"DIV",{id:!0,class:!0}),c(n).forEach(e),C=p(t,` style not working
`),o=d(t,"DIV",{id:!0,class:!0}),c(o).forEach(e),E=p(t,` style not working
`),l=d(t,"DIV",{id:!0,width:!0,height:!0}),c(l).forEach(e),I=p(t," style working"),this.h()},h(){s(r,"id","quarterChart"),s(u,"id","quarterChart1"),s(n,"id","quarterChart2"),s(n,"class","halfChart"),s(o,"id","quarterChart3"),s(o,"class","svelte-9vwa1u"),s(l,"id","quarterChart4"),s(l,"width","50vw"),s(l,"height","100vh")},m(t,i){a(t,r,i),a(t,f,i),a(t,u,i),a(t,y,i),a(t,v,i),a(t,g,i),a(t,n,i),a(t,C,i),a(t,o,i),a(t,E,i),a(t,l,i),a(t,I,i)},p:q,i:q,o:q,d(t){t&&(e(r),e(f),e(u),e(y),e(v),e(g),e(n),e(C),e(o),e(E),e(l),e(I))}}}function L(k){const r=`
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
    finsh here`;return S(async()=>{new w({target:document.getElementById("quarterChart"),props:{text:r,class:"halfChart"}}),new w({target:document.getElementById("quarterChart1"),props:{text:r,width:"50vw",height:"80vh"}}),new w({target:document.getElementById("quarterChart2"),props:{text:r}}),new w({target:document.getElementById("quarterChart3"),props:{text:r}}),new w({target:document.getElementById("quarterChart4"),props:{text:r}})}),[]}class $ extends B{constructor(r){super(),D(this,r,L,V,_,{})}}export{$ as component};
