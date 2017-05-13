import echarts from './echarts.min';
import toString from '../../util/toString';

export default function renderChart(props) {
  const height = props.height || 400;
  return `
    document.getElementById('main').style.height = "${height}px";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
    myChart.on('click', function(params) {
      var seen = [];
      var paramsString = JSON.stringify(params, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      window.postMessage(JSON.stringify(paramsString));
    });
  `
}
