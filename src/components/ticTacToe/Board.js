import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import TicButton from './TicButton'

class Board extends PureComponent{
  static propTypes = {
    board: PropTypes.arrayOf(PropTypes.string).isRequired,
    clickAction: PropTypes.func.isRequired
  }

  render(){
    const {board} = this.props

    console.log(this.props)
    return(
      <div className="col-md-12 offset-md-4">
        <div className="row">
          <div className="col">
            <TicButton onClick={() => this.props.clickAction(0)} key={0} value={board[0]} />
            <TicButton onClick={() => this.props.clickAction(1)} key={1} value={board[1]} />
            <TicButton onClick={() => this.props.clickAction(2)} key={2} value={board[2]} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <TicButton onClick={() => this.props.clickAction(3)} key={3} value={board[3]} />
            <TicButton onClick={() => this.props.clickAction(4)} key={4} value={board[4]} />
            <TicButton onClick={() => this.props.clickAction(5)} key={5} value={board[5]} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <TicButton onClick={() => this.props.clickAction(6)} key={6} value={board[6]} />
            <TicButton onClick={() => this.props.clickAction(7)} key={7} value={board[7]} />
            <TicButton onClick={() => this.props.clickAction(8)} key={8} value={board[8]} />
          </div>
        </div>
      </div>
    )
  }
}

export default Board
