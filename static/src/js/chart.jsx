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
            height: 0,
            maxDataPoints: 100
        };
    },
    getInitialState: function() {
        return {
            data: this.props.data
        }
    },
    updateHandler: function(msg) {
        data = JSON.parse(msg);
        this.state.data.push({x: data.Index, y: data.Value});
        if (this.state.data.length > this.props.maxDataPoints) {
            this.state.data.shift();
        }
        this.setState({data: this.state.data});
    },
    componentDidMount: function() {
        socket.on("chart stream", this.updateHandler);
    },
    componentWillUnmount: function() {
        socket.removeListener("chart stream", this.updateHandler);
    },
    render: function() {
        var yScale = d3.scale.linear()
                       .domain(d3.extent(this.state.data, function(d) { return d.y; }))
                       .range([this.props.height, 0]);
        var xScale = d3.time.scale()
                       .domain(d3.extent(this.state.data, function(d) { return d.x; }))
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
            <Path path={line(this.state.data)} color={this.props.color} />
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
    updateHandler: function() {
        socket.emit("chart stream",
                    JSON.stringify({Index: 0, Max: 1000, Min: 0}));
    },
    render: function() {
        var Button = ReactBootstrap.Button;
        return (
            <div>
                <h1>Line Chart (simple)</h1>
                <LineChart width={600} height={300} />
                <Button onClick={this.updateHandler}>Start Streaming</Button>
            </div>
        );
    }
});
