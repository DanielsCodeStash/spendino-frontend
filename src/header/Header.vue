<template>

  <div id="topPanel">
        <div id="forwardButton1" v-on:click="setData('2020', '01')" class="topPanelSquare">-</div>
        <div id="forwardButton1" v-on:click="setData('2019', '12')" class="topPanelSquare">-</div>
        <div id="forwardButton2" v-on:click="setData('2019', '11')" class="topPanelSquare">-</div>
        <div id="forwardButton3" v-on:click="setData('2019', '10')" class="topPanelSquare">-</div>
        <div id="forwardButton4" v-on:click="setData('2019', '09')" class="topPanelSquare">-</div>
        <div id="activeMonth" class="topPanelSquare">{{ displayDate }}</div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  mounted() {
    this.$root.$on('changeData', (year, month) => {
      this.year = year;
      this.month = month;
    });
  },
  data() {
    return {
      year: '1990',
      month: '10',
    };
  },
  methods: {
    setData(year, month) {
      this.$root.$emit('changeData', year, month);
      this.year = year;
      this.month = month;
    },
  },
  computed: {
    displayDate() {
      if (!this.year || !this.month) {
        return '';
      }

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

      return `${monthNames[this.month - 1]} ${this.year}`;
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
