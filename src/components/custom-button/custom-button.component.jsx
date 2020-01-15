import React from "react";

import { CustomButtonContainer } from "./custom-button.styles.jsx";

const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props} className="custom-button">
    {children}
  </CustomButtonContainer>
);

export default CustomButton;
