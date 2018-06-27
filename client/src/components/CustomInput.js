import React, { Component } from "react";

import { FormGroup, Label, Input } from "reactstrap";

const inputStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.09)",
  boxShadow: "0 1px 0px 0px rgba(0, 0, 0, 0.09) inset",
  borderRadius: "3px",
  padding: "13px 12px",
  width: "100%"
};

export default class CustomInput extends Component {
  constructor(props) {
    super(props);

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isOn: true,
      value: this.props.value,
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
        this.props.onChange(this.props.id, {
          value: this.state.value,
          isOn: this.state.isOn
        });
      }
    );
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
    return (
      <FormGroup style={{ marginLeft: "15px" }}>
        {this.renderToggle()}
        <Label for={this.props.id}>{this.props.label}</Label>

        <Input
          type={this.props.type}
          name={this.props.id}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          style={inputStyle}
        />
      </FormGroup>
    );
  }
}
