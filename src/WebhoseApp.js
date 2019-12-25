import React, { Component } from "react";
import CoverageForm from "./components/coverage-form/coverage-form.component";
import StatusPage from "./components/status-page/status-page.component";
import "./shared-styles.scss";
import "./WebhoseApp.scss";

class WebhoseApp extends Component {
  constructor() {
    super();
    this.state = {
      route: "requestForm"
    };
  }

  onClickSwitchButton = () => {
    if (this.state.route === "requestForm") {
      this.setState({ route: "statusPage" });
    } else {
      this.setState({ route: "requestForm" });
    }
  };

  render() {
    let btnLabel, pageComponent, heading;
    if (this.state.route === "requestForm") {
      btnLabel = "view status";
      pageComponent = <CoverageForm />;
      heading = "request coverage form";
    } else {
      btnLabel = "request form";
      pageComponent = <StatusPage />;
      heading = "source coverage status";
    }

    return (
      <div className="webhose-app">
        <button
          className="btn webhose-app__btn"
          onClick={this.onClickSwitchButton}
        >
          {btnLabel}
        </button>
        <h3 className="heading-primary">{heading}</h3>
        {pageComponent}
      </div>
    );
  }
}

export default WebhoseApp;
