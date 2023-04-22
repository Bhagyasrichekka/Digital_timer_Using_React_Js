// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timerValue: 25, secondsCount: 0}

  cancelInterval = () => clearInterval(this.id)

  runTimer = () => {
    this.setState(prevState => ({secondsCount: prevState.secondsCount + 1}))
  }

  componentWillUnMount = () => {
    clearInterval(this.id)
  }

  onClickStartPause = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.cancelInterval()
    } else {
      this.id = setInterval(this.runTimer, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onClickReset = () => {
    this.cancelInterval()
    this.setState({timerValue: 25, isTimerRunning: false, secondsCount: 0})
  }

  onClickIncrement = () => {
    this.setState(prevState => ({timerValue: prevState.timerValue + 1}))
  }

  onClickDecrement = () => {
    const {timerValue, isTimerRunning} = this.state
    if (timerValue > 1 && !isTimerRunning) {
      this.setState(prevState => ({timerValue: prevState.timerValue - 1}))
    }
  }

  getTimerValue = () => {
    let time
    const {timerValue, secondsCount} = this.state
    if (secondsCount === timerValue * 60) {
      this.cancelInterval()
      this.setState({isTimerRunning: false})
    } else {
      const count = timerValue * 60 - secondsCount
      const minutes = Math.floor(count / 60)
      const sec = Math.floor(count % 60)
      const stringMin = minutes > 9 ? minutes : `0${minutes}`
      const stringSec = sec > 9 ? sec : `0${sec}`
      time = `${stringMin}:${stringSec}`
    }
    return time
  }

  renderTimer = () => {
    const {isTimerRunning} = this.state
    const value = this.getTimerValue()
    return (
      <div className="timer-background">
        <div className="timer-container">
          <h1 className="running-timer">{value}</h1>
          <p className="timer-text">{isTimerRunning ? 'Running' : 'Paused'}</p>
        </div>
      </div>
    )
  }

  render() {
    const playUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pauseUrl =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const {isTimerRunning, timerValue} = this.state
    return (
      <div className="bg">
        <h1>Digital Timer</h1>
        <div className="img-start-reset-limit-section">
          {this.renderTimer()}

          <div className="start-reset-limit-section">
            <div className="start-reset-section">
              <div>
                <button
                  className="align-row btn"
                  type="button"
                  onClick={this.onClickStartPause}
                >
                  <img
                    src={isTimerRunning ? pauseUrl : playUrl}
                    alt={isTimerRunning ? 'pause icon' : 'play icon'}
                    className="reset-play-btn"
                  />
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
              </div>
              <div>
                <button
                  className="align-row btn"
                  type="button"
                  onClick={this.onClickReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="reset-play-btn"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div className="limit-section">
              <p className="limit-text">set Timer limit</p>
              <div className="increment-decrement-section">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onClickDecrement}
                >
                  -
                </button>
                <p className="set-timer">{timerValue}</p>
                <button
                  type="button"
                  className="btn"
                  onClick={this.onClickIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
