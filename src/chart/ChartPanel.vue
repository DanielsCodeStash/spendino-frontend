<template>
<div id="mainPanel">
  <div id="graphPanel"></div>
</div>
</template>

<script>

const d3plus = window.d3plus;

export default {
  name: 'ChartPanel',
  created() {
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  data() {
    return {
      treemap: new d3plus.Treemap(),
    };
  },
  mounted() {
    this.$root.$on('changeData', (year, month) => {
      console.log(`${year}-${month}`);
      this.changeData(year, month);
    });
    this.initTreemap();
    this.onResize();
  },
  methods: {
    initTreemap() {
      this.treemap
        .groupBy(['g1', 'g2'])
        .select('#graphPanel')
        .sum('value');
    },
    changeData(year, month) {
      const filename = `data/${year}${month}.json`;
      this.treemap.data(filename);
      this.treemap.render();
    },
    onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      document
        .getElementById('topPanel')
        .setAttribute('style', 'height: 60 + px');

      document
        .getElementById('mainPanel')
        .setAttribute('style', 'padding-left: 10px');

      if (this.treemap) {
        this.treemap.width(w - 20);
        this.treemap.height(h - 60 - 50);

        this.treemap.render();
      }
    },
  },
  props: {
  },
};

</script>

<style scoped>

#graphPanel {
 width: 100%;
 height: 100%;
}

</style>
