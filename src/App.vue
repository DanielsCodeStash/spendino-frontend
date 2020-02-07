<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Header />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ChartPanel />
  </div>
</template>

<script>
import axios from 'axios';
import Header from './header/Header.vue';
import ChartPanel from './chart/ChartPanel.vue';
import shared from './shared';

export default {
  name: 'app',
  components: {
    Header,
    ChartPanel,
  },
  mounted() {
    this.$nextTick(() => {
      console.log('Finished rendering the complete view');

      const date = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
      };

      this.initialDateExploration(date, 1, (dateWithData) => {
        console.log(`${JSON.stringify(dateWithData)} has data`);
        this.$root.$emit('changeData', dateWithData);
      });
    });
  },

  methods: {
    initialDateExploration(date, count, onSuccess) {
      const filename = shared.toJsonFilename(date);
      console.log(`Checking if ${JSON.stringify(date)} has data ${count} - ${filename}`);

      if (count > 100) {
        return;
      }

      axios
        .get(filename)
        .then((res) => {
          onSuccess(date);
        })
        .catch(() => {
          this.initialDateExploration(shared.subtractMonth(date), count + 1, onSuccess);
        });
    },
  },
};
</script>

<style>
body {
  background-color: #525252;
  font-family: "Courier New", Courier;
  border: 0;
  padding: 0;
  margin: 0;
}
</style>
