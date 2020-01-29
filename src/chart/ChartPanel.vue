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
    console.log('running mounted');
    $('#forwardButton1').click(() => {
      console.log('running 1');
      app.changeData('data/201912.json');
    });

    $('#forwardButton2').click(() => {
      console.log('running 2');
      app.changeData('data/201911.json');
    });

    $('#forwardButton3').click(() => {
      console.log('running 3');
      app.changeData('data/201910.json');
    });

    $('#forwardButton4').click(() => {
      console.log('running 4');
      app.changeData('data/201909.json');
    });

    app.displayMonth('data/201909.json');

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
  app.displayMonth(datapath);
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

app.displayMonth = (datapath) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const prefixLength = 'data/'.length;
  const yearLength = 4;
  const monthLength = 2;

  const year = datapath.substring(prefixLength, prefixLength + yearLength);
  const month = datapath.substring(
    prefixLength + yearLength,
    prefixLength + yearLength + monthLength,
  );

  const text = `${monthNames[month - 1]} ${year}`;

  $('#activeMonth').text(text);

  console.log('done with js');
};

</script>


<style scoped>

#graphPanel {
 width: 100%;
 height: 100%;
}

</style>
