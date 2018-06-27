import React from "react";

const style = {
  boxShadow: "#9a9da0 0px 0.25rem 0.75rem",
  backgroundColor: "white",
  padding: "10px",
  marginBottom: "20px"
};

export default function CustomHeader() {
  return (
    <div
      className="d-flex flex-column flex-md-row align-items-center"
      style={style}
    >
      <h5 className="my-0 mr-md-auto font-weight-normal">
        Fly Image Plaground
      </h5>

      <a
        className="p-2 text-dark"
        rel="noopener noreferrer"
        href="https://fly.io/docs/apps/api/classes/fly_image.image.html"
        target="_blank"
      >
        Image API
      </a>

      <a
        className="p-2 text-dark"
        rel="noopener noreferrer"
        href="https://github.com/rajaraodv/fly-image-playground"
        target="_blank"
      >
        Github
      </a>
    </div>
  );
}
