import * as ChartJs from 'chart.js'
import * as React from 'react'

export default class Chart extends React.Component<{}> {
  canvasRef: any = React.createRef()

  componentDidMount () {
    new ChartJs(this.canvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Good Price', 'Average Price', 'Bad Price'],
        datasets: [{
          label: 'Dollars',
          data: [625.01, 1000, 1309.32],
          backgroundColor: [
            '#8CC836',
            '#4B8FE1',
            '#D0373B',
          ],
        }]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    })
  }

  render () {
    return <canvas ref={this.canvasRef} />
  }
}