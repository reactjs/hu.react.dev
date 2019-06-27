class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Helló {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Tamás" />,
  document.getElementById('hello-example')
);