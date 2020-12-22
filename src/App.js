import React, { Component } from "react";
import Result from "./Result";
import "./App.css";

class App extends Component {
  state = {
    show_result: false,
    search_query: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value;
    if (query.trim().length > 0) {
      this.setState({
        show_result: true,
        search_query: query,
      });
    }
  };

  render() {
    return (
      <div
        className="App"
        style={{
          display: "inline-block",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          className="align-content-center my-auto mt-auto h-100"
          style={{ verticalAlign: "middle" }}
        >
          <div className="col">
            <img
              className=" app-logo img-fluid"
              src="app_icon.png"
              alt="Torrent Search"
            ></img>
            <div>
              <span className="h1 app-name">Torrent Search</span>
            </div>
            <div className="container center">
              <form onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg mt-4">
                  <input
                    id="search-input"
                    type="text"
                    className="form-control input-red"
                    placeholder="Search Here"
                  ></input>
                </div>
                <div>
                  <button
                    id="btn-submit"
                    type="submit"
                    className="btn search-button text-white"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {this.state.show_result ? (
          <Result query={this.state.search_query} />
        ) : null}
      </div>
    );
  }

  // render() {
  //   return <Result />;
  // }
}

export default App;
