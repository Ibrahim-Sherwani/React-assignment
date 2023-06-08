const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="text-center align-items-center">Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
