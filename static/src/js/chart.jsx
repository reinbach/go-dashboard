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
                               height={this.props.height} color="cornflowerblue" />
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
