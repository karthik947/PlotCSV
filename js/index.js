//Pseudo code
//Step 1: Define chart properties.
//Step 2: Create the chart with defined properties and bind it to the DOM element.
//Step 3: Add the CandleStick Series.
//Step 4: Set the data and render.

//Code
const log = console.log;

const chartProperties = {
  width: 1500,
  height: 600,
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },
};

const domElement = document.getElementById('tvchart');
const chart = LightweightCharts.createChart(domElement, chartProperties);
const candleSeries = chart.addCandlestickSeries();

fetch(`/data/ohlcdata.csv`)
  .then((res) => res.text())
  .then((data) => {
    const cdata = [...data.split('\n')]
      .filter((d, i) => i > 0)
      .map((row) => {
        row = row.split(',');
        let maprow = { time: 0, open: 0, high: 0, low: 0, close: 0 };
        Object.keys(maprow).forEach((key, i) => {
          maprow[key] =
            key === 'time'
              ? new Date(row[i]).getTime() / 1000
              : parseFloat(row[i]);
        });
        return maprow;
      })
      .filter((f) => f.time);
    candleSeries.setData(cdata);
  })
  .catch((err) => log(err));
