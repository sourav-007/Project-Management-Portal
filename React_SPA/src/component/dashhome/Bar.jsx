import React, { useState,useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'

function Bar() {
  const [totalTasks, setTotalTasks] = useState(0);
  useEffect(() => {
    var model_json = {
     "collectionName": "tasks"
     }
     axios.post('https://project-management-portal-eosin.vercel.app/getAllDocuments',model_json)
         .then((response) => {
            setBar({
              series: [{
                name: 'Task',
                data: [0, 0, 0, 0, response.data.length, 0, 0, 0, 0, 0, 0, 0]
              }],
              options: {
                chart: {
                  height: 350,
                  type: 'bar',
                },
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    dataLabels: {
                      position: 'top', // top, center, bottom
                    },
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                    return val;
                  },
                  offsetY: -20,
                  style: {
                    fontSize: '12px',
                    colors: ["#ff5b09"]
                  }
                },
        
                xaxis: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  position: 'top',
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  crosshairs: {
                    fill: {
                      type: 'gradient',
                      gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                      },
                    }
                  },
                  tooltip: {
                    enabled: false,
                  }
                },
                yaxis: {
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false,
                  },
                  labels: {
                    show: false,
                    formatter: function (val) {
                      return val;
                    },
                    style:{
                      color:'#ff5b09',
                    },
                  }
        
                },
                title: {
                  text: 'Monthly no. of Tasks of User',
                  floating: false,
                  offsetY: 330,
                  align: 'center',
                  style: {
                    color: '#ff5b09',
                    fontSize:'15px',
                    fontWeight:'900',
                  }
                }
              }
        
            });

         })
         .catch((error) => {
             console.error('Error fetching data: ', error);
         });
 }
    , []);
  const [bar, setBar] = useState({

    series: [{
      name: 'Task',
      data: [0, 0, 0, 0, totalTasks, 0, 0, 0, 0, 0, 0, 0]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#ff5b09"]
        }
      },

      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          }
        },
        tooltip: {
          enabled: false,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val;
          },
          style:{
            color:'#ff5b09',
          },
        }

      },
      title: {
        text: 'Monthly no. of Tasks of User',
        floating: false,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#ff5b09',
          fontSize:'15px',
          fontWeight:'900',
        }
      }
    }

  });

  return (
    <>
      <div>
        <ReactApexChart options={bar.options}
          series={bar.series}
          type="bar"
          height={350}
          width={700} />
      </div>
    </>
  )
}

export default Bar