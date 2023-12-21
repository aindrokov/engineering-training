import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    loading: state.dataLoaded.loading,
  };
}

class Modal extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
        if (!this.props.loading) {
            return;
          }
      return (
        <div id="modal">
                <div className="background-container">
                        <div className="popup-container">
                                <div className="spinner-container">
                                        <i className="bi bi-arrow-clockwise"></i>
                                </div>
                                <span className="loadingtext">Loading...</span>
                        </div>
                </div>
        </div>
      );
    }
  }

  export default connect(mapStateToProps)(Modal);