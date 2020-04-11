import React from "react";
import loaderGif from "../../img/loader.gif";

function Loader() {
  return (
    <div className="row center">
      <img className="loader" src={loaderGif} alt="loader" />
    </div>
  );
}

export default Loader;
