import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import axios from 'axios';


class Api extends Component {
    constructor(props) {
        console.log(props);
        super(props);

        this.state = {
            option: {
                yAxis: [
                    {
                        height: "80%"
                    },
                    {
                        top: "80%",
                        height: "20%",
                        offset: 0
                    }
                ],

                series: [
                    {
                        type: "ohlc",
                        data: []
                    },
                    {
                        type: "column",
                        data: [[0, 3], [1, 4], [2, 5], [3, 6]],
                        yAxis: 1
                    }
                ],
                selected: null
            }
        }
    };
    static getDerivedStateFromProps(props) {
        return { selected: props.selected };
    }
    componentDidMount() {
        axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=22HRGRGJGLAELP87&symbol=NFTY')
            .then(response => {
                var array = response.data["Time Series (Daily)"];
                if (array) {
                    // split the data set into ohlc and volume

                    console.log(array);
                    var ohlc = [];
                    Object.keys(array).forEach(function (key) {
                        //console.log(key);
                        var myDate = new Date(key);
                        var mypus = [];
                        mypus[0] = parseInt(myDate.getTime(), 10);
                        mypus[1] = parseInt(array[key]["1. open"], 10);
                        mypus[2] = parseInt(array[key]["2. high"], 10);
                        mypus[3] = parseInt(array[key]["3. low"], 10);
                        mypus[4] = parseInt(array[key]["4. close"], 10);
                        ohlc.push(mypus);
                        ohlc.reverse();

                    });


                    this.setState({
                        option: {
                            yAxis: [
                                {
                                    height: "80%"
                                },
                                {
                                    top: "80%",
                                    height: "20%",
                                    offset: 0
                                }
                            ],

                            series: [
                                {
                                    type: "ohlc",
                                    data: this.state.option.series[0].data
                                },
                                {
                                    type: "ohlc",
                                    data: ohlc,
                                    yAxis: 1
                                }
                            ]
                        }
                    });
                }
            });

    }
    shouldComponentUpdate(props) {
        if (props.selected !== null) {
            return true;
        } else {
            return false;
        }
    }
    componentDidUpdate() {

        console.log(this.state.selected);
        if (this.state.selected) {
            console.log('okkk');
            // setTimeout (() => {
            axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=22HRGRGJGLAELP87&symbol=' + this.state.selected)
                .then(response => {
                  console.log(response.data)
                    var array = response.data["Time Series (Daily)"];
                    if (array) {
                        // split the data set into ohlc and volume

                        console.log(array);
                        var ohlc = [];
                        Object.keys(array).forEach(function (key) {
                            //console.log(key);
                            var myDate = new Date(key);
                            var mypus = [];
                            mypus[0] = parseInt(myDate.getTime(), 10);
                            mypus[1] = parseInt(array[key]["1. open"], 10);
                            mypus[2] = parseInt(array[key]["2. high"], 10);
                            mypus[3] = parseInt(array[key]["3. low"], 10);
                            mypus[4] = parseInt(array[key]["4. close"], 10);
                            ohlc.push(mypus);
                            ohlc.reverse();
                        });


                        this.setState({
                            option: {
                                yAxis: [
                                    {
                                        height: "80%"
                                    },
                                    {
                                        top: "80%",
                                        height: "20%",
                                        offset: 0
                                    }
                                ],

                                series: [
                                    {
                                        type: "ohlc",
                                        data: ohlc
                                    },
                                    {
                                        type: "ohlc",
                                        data: this.state.option.series[1].data,
                                        yAxis: 1
                                    }
                                ]
                            }
                        });
                    }
                });
            //   },5000);
        }
    };
    render() {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={this.state.option}
            />
        );
    }
}


export default Api;