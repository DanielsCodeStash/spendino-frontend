<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Header />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ChartPanel />
  </div>
</template>

<script>
import Header from './header/Header.vue';
import ChartPanel from './chart/ChartPanel.vue';

export default {
  name: 'app',
  components: {
    Header,
    ChartPanel,
  },
};
</script>

<style>

body {
    background-color: #525252;
    font-family: 'Courier New',Courier;
    border: 0;
    padding: 0;
    margin: 0;
}
</style>
