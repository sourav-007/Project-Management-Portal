import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

function Pie() {

    const [pie, setPie] = useState({

        series: [20,50,30],
        // labels: ['To-do','In-progress','Done'],
        options: {
            chart: {
                width: 380,
                height:500,
                type: 'donut',
            },
            labels: ['To-do', 'In-progress', 'Done'],
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270
                }
            },
            dataLabels: {
                enabled: true,
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function (val, opts) {
                    return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
            },
            title: {
                text: 'Status of Tasks',
                style:{
                    color:'#ff5b09',
                    fontWeight:'900',
                    fontSize:'15px'
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
        },

    });

    return (
        <>
            <div>
                <ReactApexChart options={pie.options}
                    series={pie.series}
                    type="donut"
                    width={380}/>
            </div>
        </>
    )
}

export default Pie