<template>

  <div id="topPanel">
        <div id="forwardButton1" v-on:click="setData('201912')" class="topPanelSquare">-</div>
        <div id="forwardButton2" v-on:click="setData('201911')" class="topPanelSquare">-</div>
        <div id="forwardButton3" v-on:click="setData('201910')" class="topPanelSquare">-</div>
        <div id="forwardButton4" v-on:click="setData('201909')" class="topPanelSquare">-</div>
        <div id="activeMonth" class="topPanelSquare"></div>
  </div>
</template>

<script>

import $ from 'jquery';

export default {
  name: 'Header',
  props: {
  },
  methods: {
    setData(month) {
      this.$root.$emit('changeData', `data/${month}.json`);
      this.displayMonth(month);
    },
    displayMonth(month) {
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

      const year = month.substring(0, 4);
      const monthNum = month.substring(4, 6);
      const text = `${monthNames[monthNum - 1]} ${year}`;

      $('#activeMonth').text(text);
    },
  },
};

</script>


<style scoped>

#topPanel {
    height: 60px;
    padding-left: 12px;
}

.topPanelSquare {
    margin-top: 10px;
    margin-right: 10px;
    padding: 2px;
    float: left;


    font-family: verdana;
    text-align: center;
    font-size: 35px;
    color: rgb(0, 152, 212);
    background-color: rgb(84, 84, 84);
}

.topPanelSquare:hover {
    background-color: rgb(59, 59, 59);
    cursor: pointer;
}
</style>
