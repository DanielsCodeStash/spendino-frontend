<template>

  <div id="topPanel">
    <template v-if='inCategoryViewMode'>
      <div id="backButton" v-on:click="backToChartPanel()" class="headerButton active">&#60;</div>
    </template>
    <template v-else>
        <div v-on:click="showEarlierData()" v-bind:class="{ active: earlierDataExists }" class="headerButton">&#60;</div>
        <div v-on:click="showLaterData()" v-bind:class="{ active: laterDataExists }" class="headerButton">&#62;</div>
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
    this.$root.$on('categorySelected', (data) => { 
      this.category = data.g2;
      this.inCategoryViewMode = true; 
    });
  },

  data() {
    return {
      inCategoryViewMode: false,
      category: '',
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

      return `${this.category}`;
    },
  },
};

</script>

<style scoped>

.headerButton {
    background-color: #3d3d3d;
    float: left;
    margin-right: 10px;
    margin-bottom: 5px;
    margin-top: 10px;
    font-size: 35px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  
    height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 3px;
    line-height: 40px;
}

.topPanelSquare {
    margin-top: 10px;
    margin-right: 10px;
    padding: 2px;
    float: left;
    font-family: verdana;
    text-align: center;
    font-size: 30px;
    background-color: #525252;
}

@media (pointer: fine) {
    .active:hover {
      background-color: black;
      cursor: pointer;
   }
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

#topPanel {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

</style>
