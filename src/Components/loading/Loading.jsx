import React from "react";
import ReactLoading from "react-loading";

function Loading({ type, color, height, width }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
}

export default Loading;
