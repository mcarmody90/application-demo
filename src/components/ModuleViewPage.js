import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startCompleteModule } from '../actions/modules';
import NotFoundPage from './NotFoundPage';

export class ModuleViewPage extends React.Component {
  onClick = (modules) => {
    this.props.startCompleteModule(this.props.match.params.id);
    this.props.history.push('/dashboard');
  };
  onClickBack = () => { this.props.history.push('/dashboard'); }
  render () {
    const previousModuleUnlockTime = (
      typeof this.props.modules[Number(this.props.match.params.id) - 2] === 'undefined'
      ) ? 0 : Math.trunc(this.props.modules[Number(this.props.match.params.id) - 2].moduleComplete / 1000);
    const waitTime = 29;
    const currentTime = Math.trunc(Number(moment()) / 1000);
    // if module is unlocked display the page
    if (((Number(previousModuleUnlockTime + waitTime) <= currentTime ) && previousModuleUnlockTime > 0) || Number(this.props.match.params.id) === 1) {
      return (
        <div>
          <div className='page-header'>
            <div className='content-container'>
              <h1 className='page-header__title'>Module {this.props.match.params.id}</h1>
            </div>
          </div>
          <div className='content-container'>
            <div className='content-container--button'>
              {
                this.props.modules[Number(this.props.match.params.id) - 1].moduleComplete > 0 ? (
                  <button className='button button--secondary' onClick={this.onClickBack}>Back to Dashboard</button>
                ) :(
                  <button className='button' onClick={this.onClick}>Complete Module</button>
                )
              }
            </div>
          </div>
        </div>
      );
    // if module is not unlocked return 404 page - prevents manual URL workaround
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

// <iframe src="https://uhcl.co1.qualtrics.com/jfe/form/SV_6G21pFXH5vrRNNH" height="800px" width="100%"></iframe>