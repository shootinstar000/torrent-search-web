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
      <div className="App">
        <main className="mt-5">
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
        </main>
        <footer className="page-footer m-5">
          <div className="social-icons">
            <h3 style={{ color: "red" }}>Made with ❤️ in India</h3>
            <div className="row justify-content-center">
              <div className="m-2">
                <a
                  href="https://github.com/Torrent-Search/torrent-search-web"
                  className="social-custom-link"
                >
                  <i
                    class="devicon-github-original"
                    style={{ color: "black" }}
                  ></i>
                </a>
              </div>
              <div className="m-2">
                <a
                  href="mailto:tejasvp25@gmail.com"
                  className="social-custom-link"
                >
                  <i
                    class="devicon-google-plain"
                    style={{ color: "black" }}
                  ></i>
                </a>
              </div>
            </div>
            <div className="row justify-content-center">
              <i
                class="devicon-react-original-wordmark colored"
                style={{ fontSize: "35px" }}
              ></i>
              <h5 className="ml-2">Made with React</h5>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // render() {
  //   return <Result />;
  // }
}

export default App;