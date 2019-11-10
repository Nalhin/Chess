import * as React from 'react';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError)
      return (
        <span data-testid="error-boundary">
          There was an error. Please reload page.
        </span>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
