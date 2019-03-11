import React from 'react';
import { connect } from 'react-redux';
import Module from './Module';

const Modules = (props) => {
  return (
    <div className='module-list'>
      {
        props.modules.map((module) => (
          <Module key={module.number} {...module} />
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules
  };
};

export default connect(mapStateToProps)(Modules);