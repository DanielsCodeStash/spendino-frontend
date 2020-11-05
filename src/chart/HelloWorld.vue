<template>
  <div class="hello">
    <span>foo {{foo}}</span>
    <div class="topPanelSquare active"><span v-html="text"></span></div>
  </div>
</template>

<script>

import shared from '../shared';
import datastore from '../datastore';

export default {
  name: 'HelloWorld',

  props: {
    foo: String,
  },

  mounted() {
    this.$root.$on('test', (data) => {
      if (!data) {
        return;
      }

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
