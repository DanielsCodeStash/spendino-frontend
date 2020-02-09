<template>

  <div id="topPanel">
        <div id="forwardButton1" v-on:click="showLaterData()" v-bind:class="{ active: laterDataExists }" class="topPanelSquare">&#60;</div>
        <div id="forwardButton2" v-on:click="showEarlierData()" v-bind:class="{ active: earlierDataExists }" class="topPanelSquare">&#62;</div>
        <div id="activeMonth" class="topPanelSquare active">{{ displayDate }}</div>
  </div>
</template>

<script>
import shared from '../shared';

export default {
  name: 'Header',
  mounted() {
    this.$root.$on('changeData', (date) => {
      this.year = date.year;
      this.month = date.month;

      const laterDataDate = shared.addMonth({ year: this.year, month: this.month });
      shared.dataExistsCheck(laterDataDate, (exists) => { this.laterDataExists = exists; });

      const earlierDataDate = shared.subtractMonth({ year: this.year, month: this.month });
      shared.dataExistsCheck(earlierDataDate, (exists) => { this.earlierDataExists = exists; });
    });
  },
  data() {
    return {
      year: '',
      month: '',
      earlierDataExists: false,
      laterDataExists: false,
    };
  },
  methods: {
    showLaterData() {
      const newDate = shared.addMonth({ year: this.year, month: this.month });
      this.year = newDate.year;
      this.month = newDate.month;
      this.$root.$emit('changeData', { year: this.year, month: this.month });
    },
    showEarlierData() {
      const newDate = shared.subtractMonth({ year: this.year, month: this.month });
      this.year = newDate.year;
      this.month = newDate.month;
      this.$root.$emit('changeData', { year: this.year, month: this.month });
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
    color: rgba(228, 228, 228, 0.541);
}

.active {
    color: rgb(0, 152, 212);
}

.topPanelSquare {
    margin-top: 10px;
    margin-right: 10px;
    padding: 2px;
    float: left;


    font-family: verdana;
    text-align: center;
    font-size: 35px;
    background-color: rgb(84, 84, 84);
}

.topPanelSquare:hover {
    background-color: rgb(59, 59, 59);
    cursor: pointer;
}
</style>
