import React from 'react';
import { connect } from 'react-redux';

function ErrorMessage(props) {
    if (!props.error) {
      return;
    }
    else if (props.error) {
    return (
      <div className="alert alert-danger" role="alert">
          This is a primary alert—check it out!
      </div>
    )
  }
  }
  
  function mapStateToProps(state) {
      return {
          error: state.error,
      }
  };
  
  export default connect(mapStateToProps)(ErrorMessage);