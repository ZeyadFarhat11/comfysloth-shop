import React from "react";
import { Grid } from "react-loading-icons";
import { useGlobalContext } from "../context";
import "../style/loading.scss";

function Loading() {
  const { loading } = useGlobalContext();
  return (
    <div className={`loading${loading ? " active" : ""}`}>
      <Grid fill="#ab7b60" />
    </div>
  );
}

export default Loading;
