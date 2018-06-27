import React, { Component } from "react";

const picStyle = {
  marginLeft: "50px",
  boxShadow: "#495057 0px 4px 50px",
  width: "100%"
};

export default class ImageFrame extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <div>
        <div style={picStyle}>
          <img alt="default" src={this.props.image} />
        </div>
        <div style={{ marginTop: "20px", marginLeft:"50px" }}>
          <a
            className="btn btn-outline-secondary"
            href={this.props.image}
            download="flyImage.jpg"
            target="_blank"
          >
            Download Image
          </a>
        </div>
      </div>
    );
  }
}
