var Router = ReactRouter;
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

var App = React.createClass({
    render: function() {
        var Navbar = ReactBootstrap.Navbar;
        var Nav = ReactBootstrap.Nav;
        var NavItem = ReactBootstrap.NavItem;
        return (
            <div>
                <Navbar brand="Dashboard" inverse>
                    <Nav>
                        <NavItem href="#">Home</NavItem>
                        <NavItem href="#/chart">Charts</NavItem>
                    </Nav>
                </Navbar>
                <RouteHandler/>
            </div>
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

var Home = React.createClass({
    render: function() {
        var Jumbotron = ReactBootstrap.Jumbotron;
        var Button = ReactBootstrap.Button;
        return (
            <div>
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
                <div className="container">
                    <hr />
                    <Footer />
                </div>
            </div>
        );
    }
});

var ChartHolder = React.createClass({
    render: function() {
        return (
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
        );
    }
});

var SideMenu = React.createClass({
    render: function() {
        return (
            <div className="col-md-3">
                <h3>Charts</h3>
                <ul className="nav nav-pills nav-stacked">
                    <li>
                        <Link to="bar-simple">
                            Bar Chart (simple)
                        </Link>
                    </li>
                    <li>
                        <Link to="line-simple">
                            Line Chart (simple)
                        </Link>
                    </li>
                </ul>
                <Chat />
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="chart" handler={ChartHolder}>
            <Route name="bar-simple" handler={BarChartSimple}/>
            <Route name="line-simple" handler={LineChartSimple}/>
            <DefaultRoute handler={BarChartSimple}/>
        </Route>
        <Route name="home" handler={Home}/>
        <DefaultRoute handler={Home}/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.body);
});
