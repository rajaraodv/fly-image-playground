import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Configurator from "./components/Configurator";
import ImageFrame from "./components/ImageFrame";
import { defaultImage } from "./components/Image";
import CustomHeader from "./components/CustomHeader";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateImage = this.updateImage.bind(this);
    this.state = {
      image: defaultImage
    };
  }

  updateImage(url) {
    this.setState({ image: url });
  }

  render() {
    return (
      <div>
        <CustomHeader />
        <Container>
          <Row>
            <Col xs="4" md="4" lg="4" xl="4">
              <Configurator updateImage={this.updateImage} />
            </Col>
            <Col xs="8" md="8" lg="8" xl="8">
              <ImageFrame image={this.state.image} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
