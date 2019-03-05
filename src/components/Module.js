import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ModuleViewPage from './ModuleViewPage';

export class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // now: new Date().getTime(),
      unlock: Math.round((props[0].moduleComplete[props.number - 1] + 604800) - (Number(moment() / 1000)))
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    // current time
    // const now = Number(moment());
    // console.log('now', now);
    
    // // one week from current time
    // const weekFromNow = now + 604800000;
    // console.log('weekFromNow: ', moment(weekFromNow).format('MMMM Do YYYY, h:mm:ss a'));
    
    // // week from now
    // const waitTime = weekFromNow - now;
    // console.log('waitTime: ', waitTime);
    
    
    console.log('previous module complete time: ', this.props[0].moduleComplete[this.props.number - 1]);
    console.log('module unlock date: ', this.props[0].moduleComplete[this.props.number - 1] + 604800);
    console.log('current time: ', new Date().getTime() / 1000);
    
    // time until unlock
    const unlock = (this.props[0].moduleComplete[this.props.number - 1] + 604800) - (new Date().getTime() / 1000);
      const days = Math.round(unlock/86400);
      const hours = Math.round(unlock%86400/3600);
      const minutes = Math.round(unlock%3600/60);
      const seconds = Math.round(unlock%60);
    console.log('time until unlock: ', unlock);
    console.log(`This module will unlock in ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`);
    // const unlock = this.props[0].moduleComplete[this.props.number] + 604800000;
    // console.log('unlock', unlock);
    // console.log('new Date().getTime() ', new Date().getTime() + 604800000);
    //console.log(moment.unix(1551750145).format("MM/DD/YYYY"));
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      // now: new Date().getTime(),
      unlock: Math.round((this.props[0].moduleComplete[this.props.number - 1] + 604800) - (Number(moment() / 1000)))
    });
  }
  render() {
    if( (this.props[0].moduleComplete[this.props.number - 1] + 604800) >= Number( moment() ) || this.props.number === 1) {
      return (
        <div className='content-container'>
          <Link className='module' to={`/module/${this.props.id}`}>
            <h1 className='module__title'>Module {this.props.number}</h1>
          </Link>
        </div>
      );
    } else {
      return (
        <div className='content-container'>
          <div className='module module__inactive'>
            <h1 className='module__title'>Module {this.props.number}</h1>
            <h1 className='module__subtitle'>
              {('0' + Math.round((this.state.unlock)/86400)).slice(-2)} : 
              {('0' + Math.round((this.state.unlock)%86400/3600)).slice(-2)} : 
              {('0' + Math.round((this.state.unlock)%3600/60)).slice(-2)} : 
              {('0' + Math.round((this.state.unlock)%60)).slice(-2)}
            </h1>
            <p className='module__timer'>Days - Hours - Minutes - Seconds</p>
          </div>
        </div>
      );
    }
  }
}

export default Module;


// const Module = ({ name, id, unlockTime }) => (
//   <div>
//     <h1>{name}</h1>
//     <span>{moment(unlockTime + 604800000).fromNow()}</span>
//   </div>
// );

// export default Module;