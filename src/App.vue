<template>
  <div id="app">
    <Header />

    <keep-alive>
      <component v-bind:is="mainComponent"></component>
    </keep-alive>

  </div>
</template>

<script>
import axios from 'axios';
import Header from './header/Header.vue';
import ChartPanel from './chart/ChartPanel.vue';
import HelloWorld from './chart/HelloWorld.vue';
import shared from './shared';
import datastore from './datastore';

export default {
  name: 'app',
  components: {
    Header,
    ChartPanel,
    HelloWorld,
  },

  mounted() {
    this.$nextTick(() => {
      console.log('Finished rendering the complete view');

      const date = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      };

      datastore.initDatastore(date);

      this.initialDateExploration(date, 1, (dateWithData) => {
        console.log(`${JSON.stringify(dateWithData)} has data`);
        this.$root.$emit('changeData', dateWithData);
      });
    });

    this.$root.$on('test', () => {
      this.test();
    });
  },

  data() {
    return {
      mainComponent: 'ChartPanel',
    };
  },
  
  methods: {
    test() {
      if (this.mainComponent === 'ChartPanel') {
        this.mainComponent = 'HelloWorld';
      } else {
        this.mainComponent = 'ChartPanel';
      }
    },
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
