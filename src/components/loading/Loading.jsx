import React from "react";
import loading from "./loading.module.css";

const Loading = () => {
  return (
    <div className={`${loading.container}`}>
      <div className="">Loading....</div>
    </div>
  );
};

export default Loading;
