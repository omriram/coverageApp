import React, { Component } from "react";
import CoverageForm from "./components/coverage-form/coverage-form.component";
import StatusPage from "./components/status-page/status-page.component";
import { ReactComponent as Spinner } from "./assets/spinner.svg";
import "./shared-styles.scss";
import "./WebhoseApp.scss";

class WebhoseApp extends Component {
  constructor() {
    super();
    this.state = {
      route: "requestForm",
      citiesList: [],
      showComponent: false
    };
  }

  onClickSwitchButton = () => {
    if (this.state.route === "requestForm") {
      this.setState({ route: "statusPage" });
    } else {
      this.setState({ route: "requestForm" });
    }
  };

  componentDidMount() {
    const countries = [];
    fetch("https://cors-anywhere.herokuapp.com/https://webhose.io/names.json")
      .then(response => response.json())
      .then(countriesObj => {
        Object.keys(countriesObj).map(key => countries.push(countriesObj[key]));
        this.setState({ citiesList: countries.sort(), showComponent: true });
      })
      .catch(err => console.log(err));
  }

  render() {
    let btnLabel, pageComponent, heading;
    if (this.state.route === "requestForm") {
      btnLabel = "view status";
      pageComponent = <CoverageForm citiesList={this.state.citiesList} />;
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
        {this.state.showComponent ? (
          pageComponent
        ) : (
          <Spinner className="loading" />
        )}
      </div>
    );
  }
}

export default WebhoseApp;
