import React from "react";
import { Typography } from "@material-ui/core";

import "./Header.css";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Typography variant="h1">VUTTR</Typography>
        <Typography>Very Useful Tools to Remember</Typography>
      </div>
    </header>
  );
}
