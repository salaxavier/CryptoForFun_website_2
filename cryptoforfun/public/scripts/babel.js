var Messages = React.createClass({
  getInitialState: function(){
    return({
      messages: []
    })
  },
  render: function(){
    var messages = this.state.messages;
    messages = messages.map(function(message, index){
      return(
        <li key={index}>
          <span className={message.obj.available}></span>
          <span className="from">{message.obj.from_user}</span>
          <span className="cipher">{message.obj.cipher}</span>
          <span className="param">{message.obj.param}</span>
          <span className="message">{message.obj.message_ciphered}</span>
          </li>
      )
    });
    return(
      <div class="container">
        <form id="inbox" onSubmit={this.handleSubmit}>

        </form>
        <ul>{messages}</ul>
      </div>
    );
  },
  handleSubmit: function(e){
    e.preventDefault();
    var to = {{username}};

    fetch('/dashboard/inbox?to=' + to).then(function(data){
      return data.json();
    }).then( json => {
      this.setState({
        messages: json
      });
    });
  }
});

ReactDOM.render(<Messages/>, document.getElementById('messages'));
