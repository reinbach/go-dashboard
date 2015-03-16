var Chart = React.createClass({
    render: function() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                {this.props.children}
            </svg>
        );
    }
});

var Bar = React.createClass({
    getDefaultProps: function() {
        return {
            width: 0,
            height: 0,
            offset: 0
        }
    },
    render: function() {
        return (
            <rect fill={this.props.color} width={this.props.width}
                  height={this.props.height} x={this.props.offset}
                  y={this.props.availableHeight - this.props.height} />
        );
    }
});

var Path = React.createClass({
    getDefaultProps: function() {
        return {
            path: "",
            color: 'blue',
            width: 2,
            fill: "none"
        };
    },
    render: function() {
        return (
            <path d={this.props.path} stroke={this.props.color}
                  strokeWidth={this.props.width} fill={this.props.fill} />
        );
    }
});

// Bar Chart Simple
var BarDataSeries = React.createClass({
    getDefaultProps: function() {
        return {
            title: "",
            data: []
        };
    },
    render: function() {
        var props = this.props;
        var yScale = d3.scale.linear()
                       .domain([0, d3.max(this.props.data)])
                       .range([0, this.props.height]);
        var xScale = d3.scale.ordinal()
                       .domain(d3.range(this.props.data.length))
                       .rangeRoundBands([0, this.props.width], 0.05);
        var bars = [];
        this.props.data.forEach(function(point, i) {
            bars.push(
                <Bar height={yScale(point)} width={xScale.rangeBand()}
                     offset={xScale(i)} availableHeight={props.height}
                     color={props.color} key={i} />
            );
        });
        return (
            <g>{bars}</g>
        );
    }
});

var BarChart = React.createClass({
    render: function() {
        return (
            <Chart width={this.props.width} height={this.props.height}>
                <BarDataSeries data={[30, 10, 5, 8, 15, 10]}
                               title="Test Chart" width={this.props.width}
                               height={this.props.height}
                               color="cornflowerblue" />
            </Chart>
        );
    }
});

var BarChartSimple = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Bar Chart (simple)</h1>
                <BarChart width={600} height={300} />
            </div>
        );
    }
});

// Line Chart Simple
var LineDataSeries = React.createClass({
    getDefaultProps: function() {
        return {
            data: [],
            interpolate: "linear",
            width: 0,
            height: 0
        };
    },
    render: function() {
        var parseDate = d3.time.format("%d-%b-%y").parse;
        this.props.data.forEach(function(d) {
            d.x = parseDate(d.x);
            d.y = +d.y;
        });
        var yScale = d3.scale.linear()
                       .domain(d3.extent(this.props.data, function(d) { return d.y; }))
                       .range([this.props.height, 0]);
        var xScale = d3.time.scale()
                       .domain(d3.extent(this.props.data, function(d) { return d.x; }))
                       .range([0, this.props.width]);
        var line = d3.svg.line()
                     .x(function(d) {
                         return xScale(d.x);
                     })
                     .y(function(d) {
                         return yScale(d.y);
                     })
                     .interpolate(this.props.interpolate);
        return (
            <Path path={line(this.props.data)} color={this.props.color} />
        );
    }
});

var LineChart = React.createClass({
    getDefaultProps: function() {
        return {
            width: 600,
            height: 300,
            data: []
        };
    },
    render: function() {
        var data = this.props.data;
        return (
            <Chart width={this.props.width} height={this.props.height}>
                <LineDataSeries data={this.props.data}
                                color="cornflowerblue"
                                width={this.props.width}
                                height={this.props.height} />
            </Chart>
        );
    }
});

var LineChartSimple = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Line Chart (simple)</h1>
                <LineChart width={600} height={300} data={lineData} />
            </div>
        );
    }
});

lineData = [
    {x: "1-May-12", y: "582.13"},
    {x: "30-Apr-12", y: "583.98"},
    {x: "27-Apr-12", y: "603.00"},
    {x: "26-Apr-12", y: "607.70"},
    {x: "25-Apr-12", y: "610.00"},
    {x: "24-Apr-12", y: "560.28"},
    {x: "23-Apr-12", y: "571.70"},
    {x: "20-Apr-12", y: "572.98"},
    {x: "19-Apr-12", y: "587.44"},
    {x: "18-Apr-12", y: "608.34"},
    {x: "17-Apr-12", y: "609.70"},
    {x: "16-Apr-12", y: "580.13"},
    {x: "13-Apr-12", y: "605.23"},
    {x: "12-Apr-12", y: "622.77"},
    {x: "11-Apr-12", y: "626.20"},
    {x: "10-Apr-12", y: "628.44"},
    {x: "9-Apr-12", y: "636.23"},
    {x: "5-Apr-12", y: "633.68"},
    {x: "4-Apr-12", y: "624.31"},
    {x: "3-Apr-12", y: "629.32"},
    {x: "2-Apr-12", y: "618.63"},
    {x: "30-Mar-12", y: "599.55"},
    {x: "29-Mar-12", y: "609.86"},
    {x: "28-Mar-12", y: "617.62"},
    {x: "27-Mar-12", y: "614.48"},
    {x: "26-Mar-12", y: "606.98"},
    {x: "23-Mar-12", y: "596.05"},
    {x: "22-Mar-12", y: "599.34"},
    {x: "21-Mar-12", y: "602.50"},
    {x: "20-Mar-12", y: "605.96"},
    {x: "19-Mar-12", y: "601.10"},
    {x: "16-Mar-12", y: "585.57"},
    {x: "15-Mar-12", y: "585.56"},
    {x: "14-Mar-12", y: "589.58"},
    {x: "13-Mar-12", y: "568.10"},
    {x: "12-Mar-12", y: "552.00"},
    {x: "9-Mar-12", y: "545.17"},
    {x: "8-Mar-12", y: "541.99"},
    {x: "7-Mar-12", y: "530.69"},
    {x: "6-Mar-12", y: "530.26"},
    {x: "5-Mar-12", y: "533.16"},
    {x: "2-Mar-12", y: "545.18"},
    {x: "1-Mar-12", y: "544.47"},
    {x: "29-Feb-12", y: "542.44"},
    {x: "28-Feb-12", y: "535.41"},
    {x: "27-Feb-12", y: "525.76"},
    {x: "24-Feb-12", y: "522.41"},
    {x: "23-Feb-12", y: "516.39"},
    {x: "22-Feb-12", y: "513.04"},
    {x: "21-Feb-12", y: "514.85"},
    {x: "17-Feb-12", y: "502.12"},
    {x: "16-Feb-12", y: "502.21"},
    {x: "15-Feb-12", y: "497.67"},
    {x: "14-Feb-12", y: "509.46"},
    {x: "13-Feb-12", y: "502.60"},
    {x: "10-Feb-12", y: "493.42"},
    {x: "9-Feb-12", y: "493.17"},
    {x: "8-Feb-12", y: "476.68"},
    {x: "7-Feb-12", y: "468.83"},
    {x: "6-Feb-12", y: "463.97"},
    {x: "3-Feb-12", y: "459.68"},
    {x: "2-Feb-12", y: "455.12"},
    {x: "1-Feb-12", y: "456.19"},
    {x: "31-Jan-12", y: "456.48"},
    {x: "30-Jan-12", y: "453.01"},
    {x: "27-Jan-12", y: "447.28"},
    {x: "26-Jan-12", y: "444.63"},
    {x: "25-Jan-12", y: "446.66"},
    {x: "24-Jan-12", y: "420.41"},
    {x: "23-Jan-12", y: "427.41"},
    {x: "20-Jan-12", y: "420.30"},
    {x: "19-Jan-12", y: "427.75"},
    {x: "18-Jan-12", y: "429.11"},
    {x: "17-Jan-12", y: "424.70"},
    {x: "13-Jan-12", y: "419.81"},
    {x: "12-Jan-12", y: "421.39"},
    {x: "11-Jan-12", y: "422.55"},
    {x: "10-Jan-12", y: "423.24"},
    {x: "9-Jan-12", y: "421.73"},
    {x: "6-Jan-12", y: "422.40"},
    {x: "5-Jan-12", y: "418.03"},
    {x: "4-Jan-12", y: "413.44"},
    {x: "3-Jan-12", y: "411.23"},
    {x: "30-Dec-11", y: "405.00"},
    {x: "29-Dec-11", y: "405.12"},
    {x: "28-Dec-11", y: "402.64"},
    {x: "27-Dec-11", y: "406.53"},
    {x: "23-Dec-11", y: "403.43"},
    {x: "22-Dec-11", y: "398.55"},
    {x: "21-Dec-11", y: "396.44"},
    {x: "20-Dec-11", y: "395.95"},
    {x: "19-Dec-11", y: "382.21"},
    {x: "16-Dec-11", y: "381.02"},
    {x: "15-Dec-11", y: "378.94"},
    {x: "14-Dec-11", y: "380.19"},
    {x: "13-Dec-11", y: "388.81"},
    {x: "12-Dec-11", y: "391.84"},
    {x: "9-Dec-11", y: "393.62"},
    {x: "8-Dec-11", y: "390.66"},
    {x: "7-Dec-11", y: "389.09"},
    {x: "6-Dec-11", y: "390.95"},
    {x: "5-Dec-11", y: "393.01"},
    {x: "2-Dec-11", y: "389.70"},
    {x: "1-Dec-11", y: "387.93"},
    {x: "30-Nov-11", y: "382.20"},
    {x: "29-Nov-11", y: "373.20"},
    {x: "28-Nov-11", y: "376.12"},
    {x: "25-Nov-11", y: "363.57"},
    {x: "23-Nov-11", y: "366.99"},
    {x: "22-Nov-11", y: "376.51"},
    {x: "21-Nov-11", y: "369.01"},
    {x: "18-Nov-11", y: "374.94"},
    {x: "17-Nov-11", y: "377.41"},
    {x: "16-Nov-11", y: "384.77"},
    {x: "15-Nov-11", y: "388.83"},
    {x: "14-Nov-11", y: "379.26"},
    {x: "11-Nov-11", y: "384.62"},
    {x: "10-Nov-11", y: "385.22"},
    {x: "9-Nov-11", y: "395.28"},
    {x: "8-Nov-11", y: "406.23"},
    {x: "7-Nov-11", y: "399.73"},
    {x: "4-Nov-11", y: "400.24"},
    {x: "3-Nov-11", y: "403.07"},
    {x: "2-Nov-11", y: "397.41"},
    {x: "1-Nov-11", y: "396.51"},
    {x: "31-Oct-11", y: "404.78"},
    {x: "28-Oct-11", y: "404.95"},
    {x: "27-Oct-11", y: "404.69"},
    {x: "26-Oct-11", y: "400.60"},
    {x: "25-Oct-11", y: "397.77"},
    {x: "24-Oct-11", y: "405.77"},
    {x: "21-Oct-11", y: "392.87"},
    {x: "20-Oct-11", y: "395.31"},
    {x: "19-Oct-11", y: "398.62"},
    {x: "18-Oct-11", y: "422.24"},
    {x: "17-Oct-11", y: "419.99"},
    {x: "14-Oct-11", y: "422.00"},
    {x: "13-Oct-11", y: "408.43"},
    {x: "12-Oct-11", y: "402.19"},
    {x: "11-Oct-11", y: "400.29"},
    {x: "10-Oct-11", y: "388.81"},
    {x: "7-Oct-11", y: "369.8"},
    {x: "6-Oct-11", y: "377.37"},
    {x: "5-Oct-11", y: "378.25"},
    {x: "4-Oct-11", y: "372.50"},
    {x: "3-Oct-11", y: "374.60"},
    {x: "30-Sep-11", y: "381.32"},
    {x: "29-Sep-11", y: "390.57"},
    {x: "28-Sep-11", y: "397.01"},
    {x: "27-Sep-11", y: "399.26"},
    {x: "26-Sep-11", y: "403.17"},
    {x: "23-Sep-11", y: "404.30"},
    {x: "22-Sep-11", y: "401.82"},
    {x: "21-Sep-11", y: "412.14"},
    {x: "20-Sep-11", y: "413.45"},
    {x: "19-Sep-11", y: "411.63"},
    {x: "16-Sep-11", y: "400.50"},
    {x: "15-Sep-11", y: "392.96"},
    {x: "14-Sep-11", y: "389.30"},
    {x: "13-Sep-11", y: "384.62"},
    {x: "12-Sep-11", y: "379.94"},
    {x: "9-Sep-11", y: "377.48"},
    {x: "8-Sep-11", y: "384.14"},
    {x: "7-Sep-11", y: "383.93"},
    {x: "6-Sep-11", y: "379.74"},
    {x: "2-Sep-11", y: "374.05"},
    {x: "1-Sep-11", y: "381.03"},
    {x: "31-Aug-11", y: "384.83"},
    {x: "30-Aug-11", y: "389.99"},
    {x: "29-Aug-11", y: "389.97"},
    {x: "26-Aug-11", y: "383.58"},
    {x: "25-Aug-11", y: "373.72"},
    {x: "24-Aug-11", y: "376.18"},
    {x: "23-Aug-11", y: "373.60"},
    {x: "22-Aug-11", y: "356.44"},
    {x: "19-Aug-11", y: "356.03"},
    {x: "18-Aug-11", y: "366.0"},
    {x: "17-Aug-11", y: "380.44"},
    {x: "16-Aug-11", y: "380.48"},
    {x: "15-Aug-11", y: "383.41"},
    {x: "12-Aug-11", y: "376.99"},
    {x: "11-Aug-11", y: "373.70"},
    {x: "10-Aug-11", y: "363.69"},
    {x: "9-Aug-11", y: "374.01"},
    {x: "8-Aug-11", y: "353.21"},
    {x: "5-Aug-11", y: "373.62"},
    {x: "4-Aug-11", y: "377.37"},
    {x: "3-Aug-11", y: "392.57"},
    {x: "2-Aug-11", y: "388.91"},
    {x: "1-Aug-11", y: "396.75"},
    {x: "29-Jul-11", y: "390.48"},
    {x: "28-Jul-11", y: "391.82"},
    {x: "27-Jul-11", y: "392.59"},
    {x: "26-Jul-11", y: "403.41"},
    {x: "25-Jul-11", y: "398.50"},
    {x: "22-Jul-11", y: "393.30"},
    {x: "21-Jul-11", y: "387.29"},
    {x: "20-Jul-11", y: "386.90"},
    {x: "19-Jul-11", y: "376.85"},
    {x: "18-Jul-11", y: "373.80"},
    {x: "15-Jul-11", y: "364.92"},
    {x: "14-Jul-11", y: "357.77"},
    {x: "13-Jul-11", y: "358.02"},
    {x: "12-Jul-11", y: "353.75"},
    {x: "11-Jul-11", y: "354.00"},
    {x: "8-Jul-11", y: "359.71"},
    {x: "7-Jul-11", y: "357.20"},
    {x: "6-Jul-11", y: "351.76"},
    {x: "5-Jul-11", y: "349.43"},
    {x: "1-Jul-11", y: "343.26"},
    {x: "30-Jun-11", y: "335.67"},
    {x: "29-Jun-11", y: "334.0"},
    {x: "28-Jun-11", y: "335.26"},
    {x: "27-Jun-11", y: "332.04"},
    {x: "24-Jun-11", y: "326.35"},
    {x: "23-Jun-11", y: "331.23"},
    {x: "22-Jun-11", y: "322.61"},
    {x: "21-Jun-11", y: "325.30"},
    {x: "20-Jun-11", y: "315.32"},
    {x: "17-Jun-11", y: "320.26"},
    {x: "16-Jun-11", y: "325.16"},
    {x: "15-Jun-11", y: "326.75"},
    {x: "14-Jun-11", y: "332.44"},
    {x: "13-Jun-11", y: "326.60"},
    {x: "10-Jun-11", y: "325.90"},
    {x: "9-Jun-11", y: "331.49"},
    {x: "8-Jun-11", y: "332.24"},
    {x: "7-Jun-11", y: "332.04"},
    {x: "6-Jun-11", y: "338.04"},
    {x: "3-Jun-11", y: "343.44"},
    {x: "2-Jun-11", y: "346.10"},
    {x: "1-Jun-11", y: "345.51"},
    {x: "31-May-11", y: "347.83"},
    {x: "27-May-11", y: "337.41"},
    {x: "26-May-11", y: "335.00"},
    {x: "25-May-11", y: "336.78"},
    {x: "24-May-11", y: "332.19"},
    {x: "23-May-11", y: "334.40"},
    {x: "20-May-11", y: "335.22"},
    {x: "19-May-11", y: "340.53"},
    {x: "18-May-11", y: "339.87"},
    {x: "17-May-11", y: "336.14"},
    {x: "16-May-11", y: "333.30"},
    {x: "13-May-11", y: "340.50"},
    {x: "12-May-11", y: "346.57"},
    {x: "11-May-11", y: "347.23"},
    {x: "10-May-11", y: "349.4"},
    {x: "9-May-11", y: "347.60"},
    {x: "6-May-11", y: "346.66"},
    {x: "5-May-11", y: "346.75"},
    {x: "4-May-11", y: "349.57"},
    {x: "3-May-11", y: "348.20"},
    {x: "2-May-11", y: "346.28"},
    {x: "29-Apr-11", y: "350.13"},
    {x: "28-Apr-11", y: "346.75"},
    {x: "27-Apr-11", y: "350.15"},
    {x: "26-Apr-11", y: "350.42"},
    {x: "25-Apr-11", y: "353.01"},
    {x: "21-Apr-11", y: "350.70"},
    {x: "20-Apr-11", y: "342.41"},
    {x: "19-Apr-11", y: "337.86"},
    {x: "18-Apr-11", y: "331.85"},
    {x: "15-Apr-11", y: "327.46"},
    {x: "14-Apr-11", y: "332.42"},
    {x: "13-Apr-11", y: "336.13"},
    {x: "12-Apr-11", y: "332.40"},
    {x: "11-Apr-11", y: "330.80"},
    {x: "8-Apr-11", y: "335.06"},
    {x: "7-Apr-11", y: "338.08"},
    {x: "6-Apr-11", y: "338.04"},
    {x: "5-Apr-11", y: "338.89"},
    {x: "4-Apr-11", y: "341.19"},
    {x: "1-Apr-11", y: "344.56"},
    {x: "31-Mar-11", y: "348.51"},
    {x: "30-Mar-11", y: "348.63"},
    {x: "29-Mar-11", y: "350.96"},
    {x: "28-Mar-11", y: "350.44"},
    {x: "25-Mar-11", y: "351.54"},
    {x: "24-Mar-11", y: "344.97"},
    {x: "23-Mar-11", y: "339.19"},
    {x: "22-Mar-11", y: "341.20"},
    {x: "21-Mar-11", y: "339.30"},
    {x: "18-Mar-11", y: "330.67"},
    {x: "17-Mar-11", y: "334.64"},
    {x: "16-Mar-11", y: "330.01"},
    {x: "15-Mar-11", y: "345.43"},
    {x: "14-Mar-11", y: "353.56"},
    {x: "11-Mar-11", y: "351.99"},
    {x: "10-Mar-11", y: "346.67"},
    {x: "9-Mar-11", y: "352.47"},
    {x: "8-Mar-11", y: "355.76"},
    {x: "7-Mar-11", y: "355.36"},
    {x: "4-Mar-11", y: "360.00"},
    {x: "3-Mar-11", y: "359.56"},
    {x: "2-Mar-11", y: "352.12"},
    {x: "1-Mar-11", y: "349.31"},
    {x: "28-Feb-11", y: "353.21"},
    {x: "25-Feb-11", y: "348.16"},
    {x: "24-Feb-11", y: "342.88"},
    {x: "23-Feb-11", y: "342.62"},
    {x: "22-Feb-11", y: "338.61"},
    {x: "18-Feb-11", y: "350.56"},
    {x: "17-Feb-11", y: "358.30"},
    {x: "16-Feb-11", y: "363.13"},
    {x: "15-Feb-11", y: "359.90"},
    {x: "14-Feb-11", y: "359.18"},
    {x: "11-Feb-11", y: "356.85"},
    {x: "10-Feb-11", y: "354.54"},
    {x: "9-Feb-11", y: "358.16"},
    {x: "8-Feb-11", y: "355.20"},
    {x: "7-Feb-11", y: "351.88"},
    {x: "4-Feb-11", y: "346.50"},
    {x: "3-Feb-11", y: "343.44"},
    {x: "2-Feb-11", y: "344.32"},
    {x: "1-Feb-11", y: "345.03"},
    {x: "31-Jan-11", y: "339.32"},
    {x: "28-Jan-11", y: "336.10"},
    {x: "27-Jan-11", y: "343.21"},
    {x: "26-Jan-11", y: "343.85"},
    {x: "25-Jan-11", y: "341.40"},
    {x: "24-Jan-11", y: "337.45"},
    {x: "21-Jan-11", y: "326.72"},
    {x: "20-Jan-11", y: "332.68"},
    {x: "19-Jan-11", y: "338.84"},
    {x: "18-Jan-11", y: "340.65"},
    {x: "14-Jan-11", y: "348.48"},
    {x: "13-Jan-11", y: "345.68"},
    {x: "12-Jan-11", y: "344.42"},
    {x: "11-Jan-11", y: "341.64"},
    {x: "10-Jan-11", y: "342.46"},
    {x: "7-Jan-11", y: "336.12"},
    {x: "6-Jan-11", y: "333.73"},
    {x: "5-Jan-11", y: "334.00"},
    {x: "4-Jan-11", y: "331.29"},
    {x: "3-Jan-11", y: "329.57"}
];
