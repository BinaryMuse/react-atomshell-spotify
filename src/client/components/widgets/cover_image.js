import React from "react";
import assign from "object-assign";

const CoverImage = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired
  },

  render() {
    const {style, ...other} = this.props;
    const newStyle = assign({
      width: this.props.size,
      height: this.props.size,
      backgroundImage: `url(${this.props.src})`,
      backgroundSize: "cover"
    }, style || {});

    return (
      <div {...other} style={newStyle} />
    );
  }
});

export default CoverImage;
