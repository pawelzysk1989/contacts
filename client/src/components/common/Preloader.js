import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent, time = 1000) {

  class Preloader extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        displayPreloader: true
      };
    }

    whatToRender() {
      if (!this.state.displayPreloader) {
        return <ComposedComponent {...this.props}/>;
      }
      if (this.props.loading) {
        setTimeout(() => {
          this.setState({ displayPreloader: true });
        }, time);
        return this.preload();
      } else {
        setTimeout(() => {
          this.setState({ displayPreloader: false });
        }, time);
        return this.preload();
      }
    }

    preload() {
      return (
        <div className="preloader-wrapper big active loader">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"/>
            </div>
            <div className="gap-patch">
              <div className="circle"/>
            </div>
            <div className="circle-clipper right">
              <div className="circle"/>
            </div>
          </div>
        </div>
      );
    }

    render() {
      return (
        <div>
          {this.whatToRender()}
        </div>
      );
    }
  }

  Preloader.propTypes = {
    loading: PropTypes.bool.isRequired
  };

  function mapStateToProps(state) {
    return {
      loading: state.ajaxCallsInProgress > 0
    };
  }

  return connect(mapStateToProps, null)(Preloader);
}

