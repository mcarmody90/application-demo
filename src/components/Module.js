import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ModuleViewPage from './ModuleViewPage';

export class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unlock: Math.trunc((props[0].moduleComplete[props.number - 1] + 604800) - (Number(moment() / 1000)))
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      unlock: Math.trunc((this.props[0].moduleComplete[this.props.number - 1] + 604800) - (Number(moment() / 1000)))
    });
  }
  render() {
    if( (this.props[0].moduleComplete[this.props.number - 1] + 604800) <= Math.trunc(Number(moment())/1000) && (this.props[0].moduleComplete[this.props.number - 1] !== 0) || this.props.number === 1) {
      return (
        <div className='content-container'>
          <Link className='module' to={`/module/${this.props.id}`}>
            <h1 className='module__title'>Module {this.props.number}</h1>
          </Link>
        </div>
      );
    } else if(this.props[0].moduleComplete[this.props.number - 1]  > 0) {
      return (
        <div className='content-container'>
          <div className='module module__inactive'>
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
    } else {
      return (
        <div className='content-container'>
          <div className='module module__inactive'>
            <h1 className='module__title'>Module {this.props.number}</h1>
            <p>This module is not unlocked</p>
            <p>Complete Module {this.props.number - 1} to unlock</p>
          </div>
        </div>
      );
    }
  }
}

export default Module;