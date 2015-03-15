var socket = window.io();

var Router = ReactRouter;
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

var Button = ReactBootstrap.Button;

var Header = React.createClass({
    render: function() {
        var Navbar = ReactBootstrap.Navbar;
        var Nav = ReactBootstrap.Nav;
        var NavItem = ReactBootstrap.NavItem;
        return (
            <Navbar brand="Dashboard" inverse>
                <Nav>
                    <NavItem href="#">Home</NavItem>
                    <NavItem href="#/chart">Charts</NavItem>
                </Nav>
            </Navbar>
        );
    }
});

var Jumbotron = React.createClass({
    render: function() {
        var Jumbotron = ReactBootstrap.Jumbotron;

        return (
            <Jumbotron>
                <div className="container">
                    <h1>Dashboard</h1>
                    <p>
                        A simple dashboard prototype making use of ReactJS, Socket.IO, and d3js.
                        <br />
                        With a bunch of simple reports/charts used to demonstrate data streaming from server.
                    </p>
                    <p><Link to="chart"><Button bsStyle="primary" bsSize="large">Learn more &raquo;</Button></Link></p>
                </div>
            </Jumbotron>
        );
    }
});

var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <p>&copy; Reinbach 2015</p>
            </footer>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <RouteHandler/>
            </div>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <Jumbotron />
                <div className="container">
                    <hr />
                    <Footer />
                </div>
            </div>
        );
    }
});

var Chat = React.createClass({
    getInitialState: function() {
        return {
            messages: [],
            userInput: ""
        };
    },
    changeHandler: function(e) {
        this.setState({userInput: e.target.value});
    },
    updateHandler: function(msg) {
        this.state.messages.push(msg);
        this.setState({messages: this.state.messages,
                       userInput: this.state.userInput});
    },
    submitHandler: function() {
        if (this.state.userInput === "") {
            return;
        }
        socket.emit("chat message", this.state.userInput);
        // this.updateHandler(this.state.userInput);
        this.setState({messages: this.state.messages, userInput: ""});
    },
    componentDidMount: function() {
        socket.on("chat message", this.updateHandler);
    },
    componentWillUnmount: function() {
        socket.removeListener("chat message", this.updateHandler);
    },
    render: function() {
        var Input = ReactBootstrap.Input
        var msgs = []
        this.state.messages.forEach(function(msg){
            msgs.push(<ChatRow message={msg} />);
        });
        return (
            <div>
                <hr />
                <ul className="messages">{msgs}</ul>
                <Input type="text" autoComplete="off"
                       placeholder="Message" value={this.state.userInput}
                       onChange={this.changeHandler} />
                <Button onClick={this.submitHandler}
                        className="btn btn-success">
                    Send
                </Button>
            </div>
        );
    }
});

var ChatRow = React.createClass({
    render: function() {
        return (
            <li>{this.props.message}</li>
        )
    }
});

var SideMenu = React.createClass({
    render: function() {
        return (
            <div className="col-md-3">
                <h3>Charts</h3>
                <ul>
                    <li>
                        <Link to="bar-simple">
                            Bar Chart (simple)
                        </Link>
                    </li>
                </ul>
                <Chat />
            </div>
        );
    }
});

var ChartHolder = React.createClass({
    render: function() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <SideMenu />
                        <div className="col-md-9">
                            <RouteHandler />
                        </div>
                    </div>
                    <hr />
                    <Footer />
                </div>
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="chart" handler={ChartHolder}>
            <Route name="bar-simple" handler={BarChartSimple}/>
            <DefaultRoute handler={BarChartSimple}/>
        </Route>
        <Route name="home" handler={Home}/>
        <DefaultRoute handler={Home}/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.body);
});
