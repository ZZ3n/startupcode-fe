import React, { useState } from "react";
import Loading from "./Loading";

const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <>
        {isLoading && <Loading />}
        <WrappedComponent {...(props as P)} setIsLoading={setIsLoading} />
      </>
    );
  };
};

export default withLoading;
