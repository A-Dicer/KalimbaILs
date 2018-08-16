import React from "react";

export const Row = ({ fluid, input, children }) =>
  <div className={`row${fluid ? "-fluid " : " "}` + input}>
    {children}
  </div>;
