import React, { ErrorInfo } from 'react';
import ErrorPage from './pages/ErrorPage/ErrorPage';

type OwnProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

type OwnState = {
  hasError: boolean;
  error: Error | undefined;
  errorInfo: ErrorInfo;
};

const initialErrorInfo = { componentStack: '' } as const;

export class ErrorBoundary extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: { ...initialErrorInfo },
    };
  }

  static getDerivedStateFromError(error: unknown, info: ErrorInfo) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, info };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.info({ error, info });
  }

  reset() {
    this.setState({ hasError: false, error: undefined, errorInfo: { ...initialErrorInfo } });
  }

  render() {
    if (!this.state.hasError || !this.state.error) {
      return this.props.children;
    }
    // TODO: custom fallback UI
    if (this.props.fallback) {
      return this.props.fallback;
    }

    return <ErrorPage error={this.state.error} />;
  }
}
