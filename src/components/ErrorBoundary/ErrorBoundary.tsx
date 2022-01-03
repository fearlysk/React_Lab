import { Component } from "react";
import { Navigate } from "react-router-dom";
import ErrorBoundaryStyles from "./ErrorBoundary.module.scss";
import IErrorBoundary from "@/interfaces/IErrorBoundary";

export default class ErrorBoundary extends Component<unknown, IErrorBoundary> {
  constructor(props: IErrorBoundary) {
    super(props);
    this.state = {
      errorFound: false,
    };

    this.hideModal = this.hideModal.bind(this);
  }

  componentDidCatch(error: unknown, info: unknown) {
    this.setState({
      errorFound: true,
    });
    console.error("Error: ", error);
    console.log("Info: ", info);
  }

  hideModal() {
    this.setState({
      errorFound: false,
    });
  }

  render() {
    if (this.state.errorFound) {
      return (
        <div className={ErrorBoundaryStyles.alert}>
          <Navigate to="/" />
          <div>
            <h1>An error occured!</h1>
          </div>
          <div>
            <button type="button" className={ErrorBoundaryStyles.btn} onClick={this.hideModal}>
              X
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
