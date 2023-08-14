import React from "react";

export default function ImgFallback(props) {
  return (
    <img
      src={props.src}
      style={props.style}
      className={props.className ? props.className : ""}
      // alt={props.alt}
      onError={(e) => {
        // console.log("detail image wasn't loaded", props.src);
        e.target.src = "/plane.jpg";
      }}
    />
  );
}
