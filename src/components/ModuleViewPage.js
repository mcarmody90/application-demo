import React from 'react';
import { connect } from 'react-redux';
import { startCompleteModule } from '../actions/modules';

export class ModuleViewPage extends React.Component {
  onClick = (module) => {
    this.props.startCompleteModule(this.props.match.params.id);
    this.props.history.push('/dashboard');
  };
  render () {
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
  }
}

const mapStateToProps = (state, props) => {
  return {
    module: state.modules
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startCompleteModule: (moduleNumber) => dispatch(startCompleteModule(props.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleViewPage);