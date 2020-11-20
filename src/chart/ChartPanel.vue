<template>
<div id="mainPanel">
  <div id="graphPanel"></div>
</div>
</template>

<script>
import shared from '../shared';

const $ = window.$;
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
    this.$root.$on('changeData', (date) => {
      this.changeData(date);
    });
    this.initTreemap();
    this.onResize();
  },

  activated() {
    if (this.treemap && shared.is_touch_device()) {
      console.log('rerendering');
      // maybe only on mobile? Because category is still selected
      this.treemap.render();
    }
  },

  methods: {
    initTreemap() {
      this.treemap
        .groupBy(['g1', 'g2'])
        .loadingMessage(false)
        .select('#graphPanel')
        .tooltipConfig({
          body: (d, f) => {
            const title = Array.isArray(d.g2) ? d.g1 : d.g2;
            let table = `<b>${title}</b><br/>`;
            table += shared.formatMoney(d.value);
            return table;
          },
          title: d => d.id,
        })        
        .on('click', (data) => {
          // https://github.com/d3/d3-selection#selection_on
          // console.log(`data for shape clicked: ${JSON.stringify(data)}`);
          $('.d3plus-tooltip').remove();
          this.$root.$emit('categorySelected', data);
          
        })
        .sum('value');
    },

    changeData(date) {
      const filename = shared.toJsonFilename(date);
      console.log(`filename ${filename}`);
      this.treemap.data(filename);
      this.treemap.render();
    },
    
    onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;

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

#topPanel {
  height: 60px;
}

#mainPanel {
  padding-left: 10px;
}

#graphPanel {
 width: 100%;
 height: 100%;
}

</style>
