import React from 'react'

export default class O2tStocksValue extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      value: props.value
    }
  }
  handleClick () {
    this.setState({editing: true})
  }
  handleBlur () {
    this.setState({editing: false})
    this.props.onUpdate(parseFloat(this.state.value), this.props.identifier)
  }
  handleChange (event) {
    this.setState({value: event.target.value})
  }
  renderEditing () {
    return (
      <input
        autoFocus={true}
        value={this.state.value}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
      />
    )
  }
  renderView () {
    return (
      <span onClick={this.handleClick.bind(this)}>
        {parseFloat(this.state.value).toFixed(2)}
      </span>
    )
  }
  render () {
    if (this.state.editing) {
      return this.renderEditing()
    } else {
      return this.renderView()
    }
  }
}

O2tStocksValue.propTypes = {
  value: React.PropTypes.number.isRequired,
  identifier: React.PropTypes.object.isRequired,
  onUpdate: React.PropTypes.func.isRequired
}
