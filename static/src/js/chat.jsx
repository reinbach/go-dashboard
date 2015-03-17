var socket = window.io();

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
        this.setState({messages: this.state.messages, userInput: ""});
    },
    componentDidMount: function() {
        socket.on("chat message", this.updateHandler);
    },
    componentWillUnmount: function() {
        socket.removeListener("chat message", this.updateHandler);
    },
    render: function() {
        var Button = ReactBootstrap.Button;
        var Input = ReactBootstrap.Input
        var msgs = []
        this.state.messages.forEach(function(msg){
            msgs.push(<ChatRow message={msg} />);
        });
        return (
            <div>
                <hr />
                <h3>Chat</h3>
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
