import React from "react";

const LoadingIndicator = React.createClass({
  render() {
    return (
      // Using code from https://github.com/KyleAMathews/react-spinkit
      // directly to avoid deprecated `transferPropsTo`
      <div className="spinner three-bounce">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
  }
});

export default LoadingIndicator;
