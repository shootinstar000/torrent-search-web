import React, { Component, Suspense, lazy } from "react";

import { getTorrents } from "../utils/network_utils";
import ClipLoader from "react-spinners/ClipLoader";

const Card = lazy(() =>
  import(/* webpackChunkName: "TorrentCard" */ "./TorrentCard")
);
const ServerError = lazy(() => {
  return import(/* webpackChunkName: "ServerError" */ "./ServerError");
});

const NoContentFound = lazy(() => {
  return import(/* webpackChunkName: "NoContentFound" */ "./NoContentFound");
});
class TorrentTab extends Component {
  PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  state = {
    torrents: undefined,
    no_content_found: false,
    server_error: false,
    server_is_waking: false,
  };

  componentDidMount() {
    getTorrents(this.props.endpoint, this.props.query)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            torrents: res.data["data"],
          });
        } else if (res.status === 204) {
          this.setState({
            no_content_found: true,
          });
        } else {
          this.setState({
            server_error: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(this.setServerIsWaking, 10000);
  }

  setServerIsWaking = () => {
    if (this.state.torrents === undefined) {
      this.setState({
        server_is_waking: true,
      });
    }
  };

  render() {
    if (this.state.no_content_found) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <NoContentFound />;
        </Suspense>
      );
    } else if (this.state.torrents === undefined) {
      return this.state.server_is_waking ? (
        <div className="container p-5">
          <div className="col">
            <h4 className="text-monospace text-muted">
              Sorry for inconvenience <br /> Wait for Few Seconds while server
              is Waking
            </h4>
            <ClipLoader color="red" />
          </div>
        </div>
      ) : (
        <div className="container p-5">
          <ClipLoader color="red" />
        </div>
      );
    } else if (this.state.server_error) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <ServerError />;
        </Suspense>
      );
    } else {
      return (
        <div className="row">
          {this.state.torrents.map((e, index) => {
            return (
              <div
                className="col-lg-4 col-md-12 col-sm-12"
                key={`${this.props.website}${index.toString()}`}
              >
                <Suspense fallback={<div>loading</div>}>
                  <Card torrent={e} />
                </Suspense>

                <br></br>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default TorrentTab;
