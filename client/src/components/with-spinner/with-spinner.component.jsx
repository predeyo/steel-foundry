import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles.jsx";

const WithSpinner = WrapperComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrapperComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
