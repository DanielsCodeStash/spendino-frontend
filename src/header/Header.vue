<template>

  <div id="topPanel">
    <template v-if='inCategoryViewMode'>
      <div id="backButton" v-on:click="backToChartPanel()" class="topPanelSquare">&larr;</div>
    </template>
    <template v-else>
        <div v-on:click="showEarlierData()" v-bind:class="{ active: earlierDataExists }" class="topPanelSquare">&#60;</div>
        <div v-on:click="showLaterData()" v-bind:class="{ active: laterDataExists }" class="topPanelSquare">&#62;</div>
    </template>
    <div class="topPanelSquare psudoActive">{{ displayDate }}</div>
  </div>
</template>

<script>
import shared from '../shared';

export default {
  name: 'Header',

  mounted() {
    this.$root.$on('changeData', (date) => { this.date = date; });
    this.$root.$on('categorySelected', () => { this.inCategoryViewMode = true; });
  },

  data() {
    return {
      inCategoryViewMode: false,
      date: { year: '', month: '' },
      earlierDataExists: false,
      laterDataExists: false,
    };
  },

  methods: {
    showLaterData() {
      this.date = shared.addMonth(this.date);
      this.$root.$emit('changeData', this.date);
    },
    showEarlierData() {
      this.date = shared.subtractMonth(this.date);
      this.$root.$emit('changeData', this.date);
    },
    backToChartPanel() {
      this.inCategoryViewMode = false;
      this.$root.$emit('returnToChart');
    },
  },

  watch: {
    date: {
      handler(newDate) {
        shared.dataExistsCheck(shared.addMonth(newDate), (exists) => { this.laterDataExists = exists; });
        shared.dataExistsCheck(shared.subtractMonth(newDate), (exists) => { this.earlierDataExists = exists; });
      },
    },
  },
  
  computed: {
    displayDate() {
      if (!this.date.year || !this.date.month) {
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

      if (!this.inCategoryViewMode) {
        console.log(`${monthNames[this.date.month - 1]} ${this.date.year}`);
        return `${monthNames[this.date.month - 1]} ${this.date.year}`;
      }

      const monthName = monthNames[this.date.month - 1].substring(0, 3);
      return `${monthName} ${this.date.year - 2} - ${this.date.year}`;
    },
  },
};

</script>

<style scoped>

#backButton {
    margin-top: 10px;
    margin-right: 10px;
    padding: 2px;
    padding-left: 5px;
    padding-right: 10px;
    float: left;

    font-family: verdana;
    text-align: center;
    font-size: 35px;
    background-color: rgba(252, 201, 201, 0.664);
    border-radius: 3px;
    color: rgb(99, 99, 99);
}

#backButton:hover {
    background-color: rgb(194, 69, 69);
    cursor: pointer;
}

#topPanel {
    height: 60px;
    padding-left: 12px;
    color: rgba(228, 228, 228, 0.541);
    overflow: hidden;
}

.active {
    color: rgb(0, 152, 212);
}

.psudoActive {
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
    background-color: #525252;
}

.active:hover {
    background-color: rgb(59, 59, 59);
    cursor: pointer;
}
</style>
