import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import './TicButton.css'

class TicButton extends PureComponent{
  static propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render(){
    return(
      <button onClick={this.props.onClick} value={this.props.value} className="tic-button" type="button"> {this.props.value} </button>
    )
  }
}

export default TicButton
