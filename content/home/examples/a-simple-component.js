class HelloMessage extends React.Component {
  render() {
    return <div>Helló {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Tamás" />);