import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class Module extends React.Component {
  constructor(props) {
    super(props);
    const previousModuleUnlockTime = (
      typeof props.modules[Number(props.number) - 2] === 'undefined'
      ) ? 0 : (props.modules[Number(props.number) - 2].moduleComplete / 1000);
    this.state = {
      unlock: Math.trunc((previousModuleUnlockTime + 604800) - (Number(moment()) / 1000))
    };
    // console.log('props from Module component: ', this.props);
    // console.log('current module number: ', Number(this.props.number));
    // console.log('previous module number: ', previousModuleNumber);
    // console.log('current module unlockTime: ', this.props.modules[Number(this.props.number) - 1].moduleComplete);
    console.log('previousModuleUnlockTime: ', previousModuleUnlockTime);
    console.log('currentTime: ', (Number(moment()) / 1000));
    console.log('previousModuleUnlockTime - currentTime: ', previousModuleUnlockTime - (Number(moment()) / 1000));
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    const previousModuleUnlockTime = (
      typeof this.props.modules[Number(this.props.number) - 2] === 'undefined'
      ) ? 0 : (this.props.modules[Number(this.props.number) - 2].moduleComplete / 1000);
      console.log('previousModuleUnlockTime: ', Math.trunc(previousModuleUnlockTime));
      console.log('current Time: ', Math.trunc((Number(moment()) / 1000)));
      console.log('weekFromNow: ', Math.trunc(previousModuleUnlockTime + 604800));
    this.setState({
      unlock: Math.trunc((previousModuleUnlockTime + 604800) - (Number(moment()) / 1000))
    });
  }
  render() {
    const previousModuleUnlockTime = (
      typeof this.props.modules[Number(this.props.number) - 2] === 'undefined'
      ) ? 0 : (this.props.modules[Number(this.props.number) - 2].moduleComplete / 1000);
    if( (previousModuleUnlockTime + 604800) <= Math.trunc(Number(moment())/1000) && (previousModuleUnlockTime !== 0) || Number(this.props.number) === 1) {
      return (
        <div className='content-container'>
          <Link className='module' to={`/module/${this.props.number}`}>
            <h1 className='module__title'>Module {this.props.number}</h1>
          </Link>
        </div>
      );
    } else if(previousModuleUnlockTime  > 0) {
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

const mapStateToProps = (state) => {
  return {
    modules: state.modules
  };
};

export default connect(mapStateToProps)(Module);

// import React from 'react';
// import { Link } from 'react-router-dom';
// import moment from 'moment';

// export class Module extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       unlock: Math.trunc((props[0].moduleComplete[props.number - 1] + 604800) - (Number(moment() / 1000)))
//     };
//     console.log('props in Module component: ', this.props);
//   }
//   componentDidMount() {
//     this.intervalID = setInterval(() => this.tick(), 1000);
//   }
//   componentWillUnmount() {
//     clearInterval(this.intervalID);
//   }
//   tick() {
//     this.setState({
//       unlock: Math.trunc((this.props[0].moduleComplete[this.props.number - 1] + 604800) - (Number(moment() / 1000)))
//     });
//   }
//   render() {
//     if( (this.props[0].moduleComplete[this.props.number - 1] + 604800) <= Math.trunc(Number(moment())/1000) && (this.props[0].moduleComplete[this.props.number - 1] !== 0) || this.props.number === 1) {
//       return (
//         <div className='content-container'>
//           <Link className='module' to={`/module/${this.props.id}`}>
//             <h1 className='module__title'>Module {this.props.number}</h1>
//           </Link>
//         </div>
//       );
//     } else if(this.props[0].moduleComplete[this.props.number - 1]  > 0) {
//       return (
//         <div className='content-container'>
//           <div className='module module__inactive'>
//             <h1 className='module__title'>Module {this.props.number}</h1>
//             <h1 className='module__subtitle'>
//               {('0' + Math.trunc((this.state.unlock)/86400)).slice(-2)} :<span> </span>
//               {('0' + Math.trunc((this.state.unlock)%86400/3600)).slice(-2)} :<span> </span>
//               {('0' + Math.trunc((this.state.unlock)%3600/60)).slice(-2)} :<span> </span>
//               {('0' + Math.trunc((this.state.unlock)%60)).slice(-2)}
//             </h1>
//             <p className='module__timer'>Days - Hours - Minutes - Seconds</p>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className='content-container'>
//           <div className='module module__inactive'>
//             <h1 className='module__title'>Module {this.props.number}</h1>
//             <p>This module is not unlocked</p>
//             <p>Complete Module {this.props.number - 1} to unlock</p>
//           </div>
//         </div>
//       );
//     }
//   }
// }

// export default Module;