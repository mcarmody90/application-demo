import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startCompleteModule } from '../actions/modules';
import NotFoundPage from './NotFoundPage';

export class ModuleViewPage extends React.Component {
  onClick = (modules) => {
    this.props.startCompleteModule(this.props.match.params.id);
    this.props.history.push('/dashboard');
    // console.log('previous Module unlockTime: ', Math.trunc((this.props.modules[Number(this.props.match.params.id) - 2].moduleComplete) / 1000));
    // console.log('one week from previous module unlock', Math.trunc((this.props.modules[Number(this.props.match.params.id) - 2].moduleComplete) / 1000) + 604800);
    // console.log('current time: ', Math.trunc(Number( moment() ) / 1000));
  };
  render () {
    const previousModuleUnlockTime = (
      typeof this.props.modules[Number(this.props.match.params.id) - 2] === 'undefined'
      ) ? 0 : Math.trunc(this.props.modules[Number(this.props.match.params.id) - 2].moduleComplete);
    const waitTime = 20000;
    const currentTime = Math.trunc(Number(moment()));
    console.log('previousModuleUnlockTime: ', previousModuleUnlockTime);
    console.log('waitTime: ', waitTime);
    console.log('previousModuleUnlockTime + waitTime: ', Number(previousModuleUnlockTime + waitTime));
    console.log('currentTime: ', currentTime);
    //(this.props.modules[Number(this.props.match.params.id) - 2].moduleComplete + 20000) >= Number(moment())
    if ((Number(previousModuleUnlockTime + waitTime) <= currentTime) || Number(this.props.match.params.id) === 1) {
      return (
        <div>
          <div className='page-header'>
            <div className='content-container'>
              <h1 className='page-header__title'>Module {this.props.match.params.id}</h1>
            </div>
          </div>
          <div className='content-container'>
            <button className='button button--secondary' onClick={this.onClick}>Complete Module</button>
          </div>
        </div>
      );
    } else {
      return (
        <NotFoundPage />
      );
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    modules: state.modules
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startCompleteModule: (moduleNumber) => dispatch(startCompleteModule(props.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleViewPage);