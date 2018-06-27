import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";


export default class Negate extends Component {
  constructor(props) {
    super(props);

    this.toggleCheckbox = this.toggleCheckbox.bind(this);

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

      </FormGroup>
    );
  }
}
