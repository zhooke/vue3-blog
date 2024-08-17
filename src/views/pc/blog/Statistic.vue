<script setup>
import * as echarts from 'echarts';
import {onMounted} from 'vue';

onMounted(() => {
  initSmoothedLineChart();
  initStackedAreaChart();
  initBumpChart();
})

function initSmoothedLineChart() {
  let chartDom = document.getElementById('smoothedLineChart');
  let myChart = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };

  option && myChart.setOption(option);
}

function initStackedAreaChart() {
  let chartDom = document.getElementById('stackedAreaChart');
  let myChart = echarts.init(chartDom);
  let option;

  option = {
    title: {
      text: 'Stacked Area Chart'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

  option && myChart.setOption(option);

}

function initBumpChart() {
  let app = {};

  let chartDom = document.getElementById('bumpChart');
  let myChart = echarts.init(chartDom);
  let option;

  const names = [
    'Orange',
    'Tomato',
    'Apple',
    'Sakana',
    'Banana',
    'Iwashi',
    'Snappy Fish',
    'Lemon',
    'Pasta'
  ];
  const years = ['2001', '2002', '2003', '2004', '2005', '2006'];
  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex = 0;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }
    return array;
  };
  const generateRankingData = () => {
    const map = new Map();
    const defaultRanking = Array.from({length: names.length}, (_, i) => i + 1);
    for (const _ of years) {
      const shuffleArray = shuffle(defaultRanking);
      names.forEach((name, i) => {
        map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
      });
    }
    return map;
  };
  const generateSeriesList = () => {
    const seriesList = [];
    const rankingMap = generateRankingData();
    rankingMap.forEach((data, name) => {
      const series = {
        name,
        symbolSize: 20,
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        endLabel: {
          show: true,
          formatter: '{a}',
          distance: 20
        },
        lineStyle: {
          width: 4
        },
        data
      };
      seriesList.push(series);
    });
    return seriesList;
  };
  option = {
    title: {
      text: 'Bump Chart (Ranking)'
    },
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: 30,
      right: 110,
      bottom: 30,
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 30,
        fontSize: 16
      },
      boundaryGap: false,
      data: years
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 30,
        fontSize: 16,
        formatter: '#{value}'
      },
      inverse: true,
      interval: 1,
      min: 1,
      max: names.length
    },
    series: generateSeriesList()
  };

  option && myChart.setOption(option);
}

</script>

<template>
  <div class="bodyBox">
    <div id="smoothedLineChart"></div>
    <div id="stackedAreaChart"></div>
    <div id="bumpChart"></div>
    <div style="height: 0"></div>
  </div>
</template>

<style lang="less" scoped>
.bodyBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: auto;

  > div {
    width: 45%;
    height: 80%;
  }
}
</style>
