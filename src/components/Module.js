import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ModuleViewPage from './ModuleViewPage';

export class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
      unlock: moment(604800000).format('MMMM Do YYYY, h:mm:ss a')
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    const now = Number(moment());
    console.log('now', now);
    console.log(this.props[0].moduleComplete[this.props.number - 1]);
    const unlock = this.props[0].moduleComplete[this.props.number] + 604800000;
    console.log('unlock', unlock);
    //console.log(moment.unix(1551750145).format("MM/DD/YYYY"));
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString(),
      unlock: moment(604800000).format('MMMM Do YYYY, h:mm:ss a')
    });
  }
  render() {
    if( (this.props[0].moduleComplete[this.props.number - 1] + 604800000) >= Number( moment() ) || this.props.number === 1) {
      return (
        <div className='content-container'>
          <Link className='module' to={`/module/${this.props.id}`}>
            <h1 className='module__title'>Module {this.props.number}</h1>
            <p className='module__subtitle'>The time is {this.state.time}.</p>
          </Link>
        </div>
      );
    } else {
      return (
        <div className='content-container'>
          <div className='module module__inactive'>
            <h1 className='module__title'>Module {this.props.number}</h1>
            <p className='module__subtitle'>This module is locked.{this.state.unlock}</p>
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