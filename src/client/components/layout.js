import React from "react";
import assign from "object-assign";

const nullOr = (val, other) => {
  if (val === null || typeof val === "undefined") {
    return other;
  } else {
    return val;
  }
}

export const Flex = React.createClass({
  displayName: "Flex",

  render() {
    const style = this.props.style || {};
    let customStyle;

    if (this.props.flex) {
      customStyle = {
        flex: this.props.flex
      };
    } else {
      customStyle = {
        flexGrow: nullOr(this.props.grow, 0),
        flexShrink: nullOr(this.props.shrink, 1),
        flexBasis: nullOr(this.props.basis, "auto"),
      };
    }

    customStyle = assign(customStyle, {
      alignSelf: this.props.alignSelf || "stretch",

      display: "flex",
      flexDirection: this.props.direction || "row",
      flexWrap: this.props.wrap || "nowrap",
      justifyContent: this.props.justifyContent || "flex-start",
      alignItems: this.props.alignItems || "stretch",
      alignContent: this.props.alignContent || "stretch"
    });

    const finalStyle = assign(customStyle, style);

    return <div {...this.props} style={finalStyle}>{this.props.children}</div>
  }
});

export const Block = React.createClass({
  render() {
    return <div {...this.props}>{this.props.children}</div>;
  }
});

export const Inline = React.createClass({
  render() {
    return <span {...this.props}>{this.props.children}</span>;
  }
});

export const InlineBlock = React.createClass({
  render() {
    const style = assign({
      display: "inline-block"
    }, this.props.style || {});
    return <span {...this.props} style={style}>{this.props.children}</span>;
  }
});
