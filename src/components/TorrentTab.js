import React, { Component } from "react";
import TorrentCard from "./TorrentCard";
import { getTorrents } from "../utils/network_utils";
import { NoContentFound, ServerError } from "../components/CustomError";
class TorrentTab extends Component {
  PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  state = {
    // torrents: [
    // {
    //   name: "Avengers: Endgame (2019) [WEBRip] [1080p] [YTS] [YIFY]26",
    //   torrent_url:
    //     "https://1337x.to/torrent/3911065/Avengers-Endgame-2019-WEBRip-1080p-YTS-YIFY/",
    //   seeders: "27340",
    //   leechers: "17654",
    //   upload_date: "Jul. 29th '19",
    //   size: "3.0 GB",
    //   uploader: "YTSAGx",
    //   magnet: "",
    //   website: "1337x",
    //   torrent_file_url: "",
    // },
    // ],
    torrents: undefined,
    no_content_found: false,
    server_error: false,
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
  }

  render() {
    if (this.state.no_content_found) {
      return <NoContentFound />;
    } else if (this.state.torrents === undefined) {
      return (
        <div className="d-flex justify-content-center">
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (this.state.server_error) {
      return <ServerError />;
    } else {
      return (
        <div className="row">
          {this.state.torrents.map((e, index) => {
            return (
              <div className="col-lg-6 col-md-12 col-sm-12">
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
