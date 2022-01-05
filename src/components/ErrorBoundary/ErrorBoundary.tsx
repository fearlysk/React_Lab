import { Component, ErrorInfo, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import styles from "./ErrorBoundary.module.scss";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
    this.hideModal = this.hideModal.bind(this);
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  public hideModal() {
    this.setState({
      hasError: false,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.alert}>
          <Navigate to="/" />
          <div>
            <h1>An error occured!</h1>
          </div>
          <div>
            <button type="button" className={styles.btn} onClick={this.hideModal}>
              X
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
