import React, { Component } from "react";
import Axios from "axios";
import * as Constants from "../Constants";
import { getMagnetLink } from "../utils/network_utils";

class TorrentCard extends Component {
  onCopyToClipboard(e) {
    console.log(e);
  }

  onMangetBtnClick = (e) => {
    this.onCopyToClipboard(e);
    getMagnetLink(
      this.props.torrent.website.toLowerCase(),
      this.props.torrent.torrent_url
    )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            magnetUrl: res.data["magnet"],
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  state = {
    magnetUrl: this.props.torrent.magnet,

    // magnetUrl: "",
    // loading: "true",
    loading: false,
  };

  bottomLayout = (prop) => {
    if (this.state.loading === true || this.state.magnetUrl === "") {
      return (
        <div
          className="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        ></div>
      );
    } else {
      return (
        <a href={this.state.magnetUrl}>
          <div className="limit-word">{this.state.magnetUrl}</div>
        </a>
      );
    }
  };

  render() {
    return (
      <div className="border-black Br-10px elevated-card grey-bg">
        <div className="container">
          <div className="text-center p-3">
            <strong>{this.props.torrent.name}</strong>
          </div>
          <div className="col pb-3 justify-content-center">
            <div className="row justify-content-around">
              <span>Leechers: {this.props.torrent.seeders}</span>{" "}
              <span>Uploaded On: {this.props.torrent.upload_date}</span>
              <span>Seeders: {this.props.torrent.seeders}</span>
            </div>
            <div className="row justify-content-around">
              <span>Uploader: {this.props.torrent.uploader}</span>
              <span>Website: {this.props.torrent.website}</span>
              <span>Size: {this.props.torrent.size}</span>
            </div>
          </div>

          <div className=" d-flex justify-content-center pb-3">
            <button
              className="btn btn-outline-info"
              type="button"
              data-toggle="collapse"
              data-target={"#c" + this.props.Key}
              aria-expanded="false"
              aria-controls={"#c" + this.props.Key}
              onClick={this.onMangetBtnClick}
            >
              Magnet Link
            </button>
          </div>
          <div className="collapse" id={"c" + this.props.Key}>
            <div className="row justify-content-around pb-3">
              {/* <div className="col text-center">
            <strong>Loading...</strong>
          </div> */}
              <div className="col text-center">
                <this.bottomLayout />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TorrentCard;
