import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IProps {
  isLoading: boolean;
}

const Loading: React.FC<IProps> = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
