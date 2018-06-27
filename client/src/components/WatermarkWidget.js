import React, { Component } from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const watermarkStyle = {
  boxShadow: "rgb(73, 80, 87) 0px 4px 20px",
  padding: "20px",
  background: "transparent",
  marginBottom: "10px",
  borderRadius: "10px"
};

/**
 * Gravity Key-value
 */
const gravity = {
  center: "Center",
  north: "North (Top-Center)",
  south: "South (Bottom-Center)",
  east: "East (Right-Middle)",
  west: "West (Left-Middle)",
  northeast: "North East",
  northwest: "North West",
  southeast: "South East",
  southwest: "South West"
};

export default class WatermarkWidget extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.menuItemClick = this.menuItemClick.bind(this);

    this.state = {
      isOn: true, //controls both watermarkImage and watermarkGravity
      value: this.props.gravity,
      allowToggle: true
    };
  }

  toggleCheckbox() {
    //If we shouldn't allow disabling a field like width, height etc, return
    if (!this.props.allowToggle) {
      alert("You can't disable this field. Required");
      return;
    }

    this.setState(
      {
        isOn: !this.state.isOn
      },
      () => {
        //Update watermarkImage's isOn prop
        this.props.onChange("watermarkImage", {
          isOn: this.state.isOn,
          value: this.props.waterMarkImage
        });
        //also update isOn for watermarkGravity
        //because the toggle controls both the image and gravity
        this.props.onChange("watermarkGravity", {
          isOn: this.state.isOn,
          value: this.state.value
        });
      }
    );
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  menuItemClick(gravity) {
    this.setState({ value: gravity }, () => {
      this.props.onChange("watermarkGravity", {
        value: this.state.value,
        isOn: this.state.isOn
      });
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.props.onChange(this.props.id, {
        value: this.state.value,
        isOn: this.state.isOn
      });
    });
  }

  renderToggle() {
    return this.props.allowToggle ? (
      <Input
        checked={this.props.isOn}
        type="checkbox"
        onChange={this.toggleCheckbox}
      />
    ) : (
      ""
    );
  }

  render() {
    //get all dropdown menu items
    const dropdownItems = Object.keys(gravity).map(key => (
      <DropdownItem
        key={key}
        onClick={() => {
          this.menuItemClick(key);
        }}
      >
        {gravity[key]}
      </DropdownItem>
    ));

    return (
      <FormGroup style={{ marginLeft: "15px" }}>
        {this.renderToggle()}
        <Label for={this.props.label}>{this.props.label}</Label>
        <div>
          <img
            alt="Watermark"
            style={watermarkStyle}
            src={this.props.waterMarkImage}
          />
        </div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle
            className="dropdown-toggle btn btn-outline-secondary "
            caret
          >
            {gravity[this.state.value]}
          </DropdownToggle>

          <DropdownMenu>{dropdownItems}</DropdownMenu>
        </Dropdown>
      </FormGroup>
    );
  }
}
