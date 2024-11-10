import {FlowChart} from '@solothought/text2chart';
import '@solothought/text2chart/style.css';

new FlowChart({
  target: document.getElementById('app'),
  props: {
    text: `
    FLOW: cjs
    step1
    step end`
  }
});
