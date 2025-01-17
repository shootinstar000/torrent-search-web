import React, { Component } from "react";
import Result from "./Result";
import "./App.css";
import $ from "jquery/dist/jquery.slim";
import Cookies from "js-cookie";
class App extends Component {
  state = {
    show_result: false,
    search_query: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query.length > 0 && query !== this.state.search_query) {
      document.getElementById("search-input").value = "";
      this.setState({
        show_result: true,
        search_query: query,
      });
    }
  };

  componentDidMount() {
    if ($("body").hasClass("body-dark")) {
      document.getElementById("btn-dark-mode").innerHTML = "Light Mode";
    }
    $("#search-input").on("keypress", function (e) {
      if (e.key === "Enter") {
        $("#btn-submit").trigger("click");
      }
    });
  }

  toggleDarkMode = (e) => {
    $("body").toggleClass("body-dark");
    $("body").toggleClass("body-light");
    if ($("body").hasClass("body-dark")) {
      Cookies.set("dark", 1);
      document.getElementById("btn-dark-mode").innerHTML = "Light Mode";
    } else {
      Cookies.set("dark", 0);
      document.getElementById("btn-dark-mode").innerHTML = "Dark Mode";
    }
  };

  TermsAndConditionsLayout = (props) => {
    return (
      <div>
        <div
          className="modal fade"
          id="tnc"
          role="dialog"
          aria-labelledby="#tnc_title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="tnc_title">
                  Terms and Conditions
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <span style={{ color: "red" }}>
                    BY USING THE SITE, YOU AGREE TO THESE TERMS OF USE; IF YOU
                    DO NOT AGREE, DO NOT USE THE SITE.
                  </span>
                  You should make sure therefore that you read them carefully
                  before using the website. You’re not allowed to copy, or
                  modify the website, any part of the website, or our trademarks
                  in any way. You’re not allowed to attempt to extract the
                  source code of the website, and you also shouldn’t try to
                  translate the website into other languages. The website
                  itself, and all the trade marks, copyright, database rights
                  and other intellectual property rights related to it, still
                  belong to Developer.
                </div>
                <br />
                <div>
                  Developer is committed to ensuring that the Website is as
                  useful and efficient as possible. For that reason, we reserve
                  the right to make changes to the website or to charge for its
                  services, at any time and for any reason. We will never charge
                  you for the website or its services without making it very
                  clear to you exactly what you’re paying for.
                </div>
                <br />
                <div>
                  You should be aware that there are certain things that
                  Developer will not take responsibility for. Certain functions
                  of the website will require the website to have an active
                  internet connection. The connection can be Wi-Fi, or provided
                  by your mobile network provider, but Developer cannot take
                  responsibility for the website not working at full
                  functionality if you don’t have access to Wi-Fi, and you don’t
                  have any of your data allowance left.
                </div>
                <br />
                <div>
                  I may update our Terms and Conditions from time to time. Thus,
                  you are advised to review this page periodically for any
                  changes. I will notify you of any changes by posting the new
                  Terms and Conditions on this page.These terms and conditions
                  are effective as of 21-1-2021
                </div>
                <br />
                <div>
                  If you have any questions or suggestions about my Terms and
                  Conditions, do not hesitate to contact me at
                  tejasvp25@gmail.com
                </div>
                <br />
                <div>
                  All the content generated by Software comes from the Internet.
                  The Website is not responsible or liable for the validity and
                  authenticity of the content, such as disputes. Contact the
                  source website for processing
                </div>
                <br />
                <div style={{ color: "red" }}>
                  This Website uses Crawler technology to integrate resources
                  from internet, into the website. Convenient search and find,
                  Only for learning materials, films and television
                  entertainment, Please use it reasonably. It's forbidden to use
                  P2P technology in some countries and regions. Do not use this
                  Website.
                </div>
                <br />
                <div style={{ color: "red" }}>
                  All links/Content of this application are collected from
                  network, no resources files are stored, no resources are
                  downloaded. If the internet infringment issues are involved,
                  please contact the source website and the developer does not
                  assume any legal responsibility
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-2">
          <a
            href="#"
            data-toggle="modal"
            data-target="#tnc"
            className="social-custom-link"
          >
            Terms and Conditions
          </a>
        </div>
      </div>
    );
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
                alt="Sagar's MovieS Hub"
              ></img>
              <div>
                <span className="h1 app-name">Sagar MovieS Hub</span>
              </div>
              <div className="container center">
                <div className="input-group input-group-lg mt-4">
                  <input
                    id="search-input"
                    type="text"
                    className="form-control input-red"
                    placeholder="Type movie or series name here"
                    autoComplete="off"
                  ></input>
                </div>
                <div className="row justify-content-center">
                  <div className="pl-2 pr-2">
                    <button
                      id="btn-submit"
                      type="submit"
                      className="btn search-button text-white"
                      onClick={this.handleSubmit}
                    >
                      Search
                    </button>
                  </div>
                  <div className="pl-2 pr-2">
                    <button
                      id="btn-dark-mode"
                      className="btn btn-light dark-mode-button"
                      onClick={this.toggleDarkMode}
                    >
                      Dark Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.show_result ? (
            <Result query={this.state.search_query} />
          ) : null}
        </main>
        <footer className="page-footer m-5">
          <div>
            <div className="row justify-content-center">
              <div className="m-2">
                <a
                  href="https://www.facebook.com/sagar.panja.904"
                  className="social-custom-link"
                >
                  <i className="devicon-facebook-plain colored"></i>
                </a>
              </div>
              <div className="m-2">
                <a
                  href="mailto:sagarpanja20@gmail.com"
                  className="social-custom-link"
                >
                  <i className="devicon-google-plain social-icons"></i>
                </a>
              </div>
            </div>
            <div className="row justify-content-center">
              <h5 className="ml-2">Made with React</h5>&nbsp;
              <i
                className="devicon-react-original-wordmark colored"
                style={{ fontSize: "30px" }}
              ></i>
            </div>
          </div>
          <div className="row justify-content-center text-center pt-1">
            <div className="row justify-content-center text-secondary">
              <span className="text-secondary">
                SagarPanja ©2022 · Made with{" "}
                <span role="img">
                  <img
                    src="https://madewithlove.org.in/favicon-16x16.png?v=ngkxyOrw9y"
                    alt="love"
                  />
                  &nbsp;
                </span>
                in India
              </span>
            </div>{" "}
          </div>
          <this.TermsAndConditionsLayout />
          <a href="https://upayi.ml/sagarpanja1-3@okhdfcbank/49" target="_blank">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
              alt="Buy Me A Coffee"
              className="bmc mt-3"
            />
          </a>
        </footer>
      </div>
    );
  }

  // render() {
  //   return <Result />;
  // }
}

export default App;
