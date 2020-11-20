<template>
  <div id="main">
    <div id="categoryChart"></div>
  </div>
</template>

<script>
import datastore from '../datastore';
import shared from '../shared';

const Highcharts = window.Highcharts;

export default {
  name: 'Category',

  props: {
    selectedCategory: Object,
  },

  activated() {
      const categoryData = datastore.getHistoricalDataForSubcategory(this.selectedCategory.g2);
      
      const chartData = [];
      
      let yMin = Number.MAX_SAFE_INTEGER;
      let yMax = Number.MIN_SAFE_INTEGER;

      categoryData.forEach((e) => {

        const moneyAmount = e.v;

        chartData.push({ x: Date.UTC(e.d.year, e.d.month - 1, 1), y: moneyAmount });

        if (moneyAmount) {
          if (moneyAmount < yMin) yMin = moneyAmount;
          if (moneyAmount > yMax) yMax = moneyAmount;
        }
      });

      yMax *= 1.10;
      yMin *= 0.90;
      
      this.chart = Highcharts.chart('categoryChart', {
        chart: {
          type: 'line',
          backgroundColor: '#919191',                
          marginTop: 25,
        },
        tooltip: {
          xDateFormat: '%A, %b %e, %Y',
          formatter() {
            return `${Highcharts.dateFormat('%b %Y', this.x)} <br/> ${shared.formatMoney(this.y)}</b>`;
          },
        },
        title: {
          text: null,
        },
        xAxis: {
          type: 'datetime',
          tickInterval: 1000 * 3600 * 24 * 30,
          labels: {
            style: {
              color: '#303030',
            },
          },
          lineColor: '#303030',
          tickColor: '#303030',
          maxPadding: 0.03,
        },
        yAxis: {
          title: false,
          gridLineColor: '#7a7a7a',
          labels: {
            style: {
              color: '#303030',
            },
          },
          max: yMax,
          min: yMin, 
        },
        series: [{
          name: this.selectedCategory.g2,
          data: chartData,
          borderColor: '#303030',
          tooltip: {
            valueDecimals: 0,
          },
        }],
      });
  }, 
};

</script>

<style scoped>

#main {
  padding: 10px;
}

</style>
