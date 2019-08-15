import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';

export class Stats extends React.Component {
  constructor(props) {
    super(props)
  }
  getChartSettings = (data, primaryColor, secondaryColor) => {
    return {
      type: 'doughnut',
      data: {
        labels: ["Wins", "Losses"],
        datasets: [{
          label: '',
          data: data,
          backgroundColor: [
            primaryColor,
            secondaryColor
          ],
          borderColor: [
            primaryColor,
            secondaryColor
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 20,
            padding: 24,
            fontSize: 16
          }
        },
        title: {
          display: false
        },
        scales: {
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    }
  };
  componentDidMount() {
    const theme = this.props.theme;
    const primaryColor = theme === 'light' ? '#06b4dc' : '#034e60';
    const secondaryColor = theme === 'light' ? '#d3dddf' : '#8aa4a9';
    const statsCtx = document.getElementById('stats-chart').getContext('2d');
    const data = [this.props.stats.wins, this.props.stats.losses];
    const statsChartSettings = this.getChartSettings(data, primaryColor, secondaryColor);
    const statsChart = new Chart(statsCtx, statsChartSettings);
  }
  componentDidUpdate() {
    const theme = this.props.theme;
    const primaryColor = theme === 'light' ? '#06b4dc' : '#034e60';
    const secondaryColor = theme === 'light' ? '#d3dddf' : '#8aa4a9';
    const statsCtx = document.getElementById('stats-chart').getContext('2d');
    const data = [this.props.stats.wins, this.props.stats.losses];
    const statsChartSettings = this.getChartSettings(data, primaryColor, secondaryColor);
    const statsChart = new Chart(statsCtx, statsChartSettings);
  }
  render() {
    return (
      <div>
        <h3 className="module__title">Stats</h3>
        <div className="stats-chart">
          <canvas id="stats-chart" width="200" height="200"></canvas>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  stats: state.player.stats,
  theme: state.settings.theme
});

export default connect(mapStateToProps)(Stats);
