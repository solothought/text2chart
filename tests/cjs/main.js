const {FlowChart} = require('@solothought/text2chart');
require('@solothought/text2chart/style.css');

new FlowChart({
  target: document.getElementById('app'),
  props: {
    text: `
    FLOW: cjs
    step1
    step end`
  }
});