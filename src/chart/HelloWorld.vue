<template>
  <div class="hello">
    <div class="topPanelSquare active"><span v-html="text"></span></div>
  </div>
</template>

<script>

import shared from '../shared';
import datastore from '../datastore';

export default {
  name: 'HelloWorld',

  mounted() {
    this.$root.$on('test', (data) => {
      console.log(`hej ${JSON.stringify(data)}`);

      const d = datastore.getHistoricalDataForSubcategory(data.g2);
      let out = '';
      d.forEach((e) => {
        out += `${e.d.year} ${e.d.month}: ${e.v}<br />`;
      });

      this.text = out;
    });
  },

  data() {
    return {
      text: 'yoDef',
    };
  },

  computed: {
    displayDate() {
      return 'fiks';
    },
  },
};

</script>

<style scoped>

</style>
