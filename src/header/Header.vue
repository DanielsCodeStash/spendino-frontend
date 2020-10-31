<template>

  <div id="topPanel">
        <div v-on:click="showEarlierData()" v-bind:class="{ active: earlierDataExists }" class="topPanelSquare">&#60;</div>
        <div v-on:click="showLaterData()" v-bind:class="{ active: laterDataExists }" class="topPanelSquare">&#62;</div>
        <div v-on:click="showDetails()" class="topPanelSquare active">{{ displayDate }}</div>
  </div>
</template>

<script>
import shared from '../shared';

export default {
  name: 'Header',

  mounted() {
    this.$root.$on('changeData', (date) => { this.date = date; });
  },

  data() {
    return {
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
    showDetails() {
      this.$root.$emit('test');
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

      return `${monthNames[this.date.month - 1]} ${this.date.year}`;
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
