import React, { Component } from "react";
import { Form } from "reactstrap";
import { buildURL, defaultImage, defaultWaterMarkImage } from "./Image.js";
import CustomInput from "./CustomInput";
import WatermarkWidget from "./WatermarkWidget";
import NegateWidget from "./NegateWidget";

export default class Configurator extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      width: { value: 850, isOn: true },
      height: { value: 570, isOn: true },
      background: { value: "red", isOn: true },
      extend: { value: "50", isOn: true },
      image: { value: defaultImage, isOn: true },
      watermarkImage: { value: defaultWaterMarkImage, isOn: true },
      watermarkGravity: { value: "northwest", isOn: true },
      negate: { value: true, isOn: true },
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateImage(buildURL(this.state));
  };

  handleChange(id, obj) {
    this.setState({ [id]: obj });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <CustomInput
          label="Width (px)"
          type="number"
          name="width"
          id="width"
          placeholder="Enter width"
          value={this.state.width.value}
          isOn={this.state.width.isOn}
          onChange={this.handleChange}
          allowToggle={false}
        />

        <CustomInput
          label="Height (px)"
          type="number"
          name="height"
          id="height"
          placeholder="Enter height"
          value={this.state.height.value}
          isOn={this.state.height.isOn}
          onChange={this.handleChange}
          allowToggle={false}
        />

        <CustomInput
          label="Background Color(#ffffff)"
          type="text"
          name="background"
          id="background"
          placeholder="Enter Background color"
          value={this.state.background.value}
          isOn={this.state.background.isOn}
          onChange={this.handleChange}
          allowToggle={true}
        />

        <CustomInput
          label="Border Size (px)"
          type="number"
          name="extend"
          id="extend"
          placeholder="Enter Border size in px"
          value={this.state.extend.value}
          isOn={this.state.extend.isOn}
          onChange={this.handleChange}
          allowToggle={true}
        />

        <WatermarkWidget
          label="Apply Watermark"
          waterMarkImage={this.state.watermarkImage.value}
          gravity={this.state.watermarkGravity.value}
          isOn={this.state.watermarkGravity.isOn}
          onChange={this.handleChange}
          allowToggle={true}
        />


        <NegateWidget
          label="Negate Image"
          name="negate"
          id="negate"
          placeholder="Enter Border size in px"
          value={this.state.negate.value}
          isOn={this.state.negate.isOn}
          onChange={this.handleChange}
          allowToggle={true}
        />

        <input
          className="btn btn-primary"
          type="submit"
          value="Submit"
          style={{
            boxShadow: "0px 4px 20px rgba(0,0,0,.4)",
            width: "100%",
            marginTop: "10px"
          }}
        />
      </Form>
    );
  }
}
