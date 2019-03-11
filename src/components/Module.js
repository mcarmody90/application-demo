import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class Module extends React.Component {
  constructor(props) {
    super(props);
    this.waitTime = 30;
    // sets variable to 0 if value is undefined, otherwise retrieves and stores value
    this.previousModuleUnlockTime = (
      typeof this.props.modules[Number(this.props.number) - 2] === 'undefined'
      ) ? 0 : Math.trunc(this.props.modules[Number(this.props.number) - 2].moduleComplete / 1000);
    // set value for unlock time
    this.state = {
      unlock: (this.previousModuleUnlockTime + this.waitTime) - Math.trunc(Number(moment()) / 1000)
    };
  }
  componentDidMount() {
    // update state defined in tick() every second to display timer
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    // set new value for variable
    this.previousModuleUnlockTime = (
      typeof this.props.modules[Number(this.props.number) - 2] === 'undefined'
      ) ? 0 : Math.trunc(this.props.modules[Number(this.props.number) - 2].moduleComplete / 1000);
    // set new value for unlock time
    this.setState({
      unlock: (this.previousModuleUnlockTime + this.waitTime) - Math.trunc(Number(moment()) / 1000)
    });
  }
  render() {
    // if the previous module + wait time is less than the current time the module will unlock. Module 1 is always unlocked.
    if( (this.previousModuleUnlockTime + this.waitTime) <= Math.trunc(Number(moment())/1000) && (this.previousModuleUnlockTime !== 0) || Number(this.props.number) === 1) {
      return (
        <div className='content-container'>
          <Link className='module' to={`/module/${this.props.number}`}>
            <h1 className='module__title'>Module {this.props.number}</h1>
          </Link>
        </div>
      );
    // if the previous module has been unlocked the countdown will display
    } else if((this.previousModuleUnlockTime > 0) && this.state.unlock > 0) {
      return (
        <div className='content-container'>
          <div className='module module--inactive'>
            <h1 className='module__title'>Module {this.props.number}</h1>
            <h1 className='module__subtitle'>
              {('0' + Math.trunc((this.state.unlock)/86400)).slice(-2)} :<span> </span>
              {('0' + Math.trunc((this.state.unlock)%86400/3600)).slice(-2)} :<span> </span>
              {('0' + Math.trunc((this.state.unlock)%3600/60)).slice(-2)} :<span> </span>
              {('0' + Math.trunc((this.state.unlock)%60)).slice(-2)}
            </h1>
            <p className='module__timer'>Days - Hours - Minutes - Seconds</p>
          </div>
        </div>
      );
    // if the above conditions are not met the module is not unlocked or unlocking - will display locked module
    } else {
      return (
        <div className='content-container'>
          <div className='module module--inactive'>
            <h1 className='module__title'>Module {this.props.number}</h1>
            <p>This module is not unlocked</p>
            <p>Complete Module {this.props.number - 1} to unlock</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    modules: state.modules
  };
};

export default connect(mapStateToProps)(Module);