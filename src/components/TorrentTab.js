import React, { Component } from "react";
import TorrentCard from "./TorrentCard";
import { getTorrents } from "../utils/network_utils";
import { NoContentFound, ServerError } from "../components/CustomError";
import ClipLoader from "react-spinners/ClipLoader";
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
      return <NoContentFound />;
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
      return <ServerError />;
    } else {
      return (
        <div className="row">
          {this.state.torrents.map((e, index) => {
            return (
              <div className="col-lg-4 col-md-12 col-sm-12">
                <TorrentCard
                  torrent={e}
                  Key={`${this.props.website}${index.toString()}`}
                />
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
