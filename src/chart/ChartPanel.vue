<template>
<div id="mainPanel">
  <div id="graphPanel"></div>
</div>
</template>

<script>

import $ from 'jquery';

window.app = {};
const app = window.app;
const d3plus = window.d3plus;

export default {
  name: 'ChartPanel',
  mounted() {
    this.$root.$on('changeData', (dataFile) => {
      console.log(dataFile);
      app.changeData(dataFile);
    });

    console.log('running mounted');

    $.getJSON('data/201909.json', (json) => {
      app.treemap = new d3plus.Treemap()
        .data(json)
        .groupBy(['g1', 'g2'])
        .select('#graphPanel')
        .sum('value')
        .render();

      app.resizeChart();
    });
  },
  props: {
  },
};

console.log('running js setup');

app.changeData = (datapath) => {
  app.treemap.data(datapath);
  app.treemap.render();
};

app.resizeChart = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  document
    .getElementById('topPanel')
    .setAttribute('style', 'height: 60 + px');

  document
    .getElementById('mainPanel')
    .setAttribute('style', 'padding-left: 10px');

  if (app.treemap) {
    app.treemap.width(w - 20);
    app.treemap.height(h - 60 - 50);

    app.treemap.render();
  }
};

window.addEventListener('load', () => {
  app.resizeChart();
});

window.addEventListener('resize', () => {
  app.resizeChart();
});

</script>


<style scoped>

#graphPanel {
 width: 100%;
 height: 100%;
}

</style>
