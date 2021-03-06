<template>
  <div id="app">
    <Header />

    <keep-alive>
      <component v-bind:is="mainComponent" v-bind="currentProperties"></component>
    </keep-alive>

  </div>
</template>

<script>
import axios from 'axios';
import Header from './header/Header.vue';
import ChartPanel from './chart/ChartPanel.vue';
import CategoryPanel from './chart/CategoryPanel.vue';
import shared from './shared';
import datastore from './datastore';

export default {
  name: 'app',
  components: {
    Header,
    CategoryPanel,
    ChartPanel,
  },

  mounted() {
    this.$nextTick(() => {
      console.log('Finished rendering the complete view');

      const date = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      };

      // TODO: make datastore responsible for finding first date with data 
      // and then setup data function
      this.initialDateExploration(date, 1, (dateWithData) => {
        datastore.initDatastore(dateWithData);
        this.$root.$emit('changeData', dateWithData);
      });
    });

    this.$root.$on('categorySelected', (category) => {
      this.selectedCategory = category;
      this.toggleCategoryPanel();
    });

    this.$root.$on('returnToChart', () => {
      this.toggleCategoryPanel();
    });    
  },

  data() {
    return {
      mainComponent: 'ChartPanel',
      selectedCategory: '',
    };
  },

  computed: {
    currentProperties() {
      if (this.mainComponent === 'CategoryPanel') {
        return { selectedCategory: this.selectedCategory };
      } 
      return {};
    },
  },
  
  methods: {
    toggleCategoryPanel() {
      if (this.mainComponent === 'ChartPanel') {
        this.mainComponent = 'CategoryPanel';
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

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

html, 
body {
    height: 100%;
}

#app {
  height: 100%;
}
</style>
