import React, { Component } from "react";
import { getMagnetLink } from "../utils/network_utils";

class TorrentCard extends Component {
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
          <div className="limit-word p-2">{this.state.magnetUrl}</div>
        </a>
      );
    }
  };

  render() {
    return (
      <div className="border-black Br-10px elevated-card grey-bg ">
        <div
          className="text-center p-3"
          style={{
            background: "rgba(0, 0, 0, 0.03)",
          }}
        >
          <strong>{this.props.torrent.name}</strong>
        </div>
        <div className="col justify-content-center pr-3 pl-3 pt-4 pb-4">
          <div className="row justify-content-around">
            <div className="col">
              <span>
                <span className="font-weight-bold">Leechers: </span>
                {this.props.torrent.seeders}
              </span>
            </div>
            <div className="col">
              <span>
                <span className="font-weight-bold">Uploaded On: </span>
                {this.props.torrent.upload_date}
              </span>
            </div>
            <div className="col">
              <span>
                <span className="font-weight-bold">Seeders: </span>
                {this.props.torrent.seeders}
              </span>
            </div>
          </div>
          <div className="row justify-content-around p2">
            <span>
              <span className="font-weight-bold">Uploader: </span>
              {this.props.torrent.uploader}
            </span>
            <span>
              <span className="font-weight-bold">Website: </span>
              {this.props.torrent.website}
            </span>
            <span>
              <span className="font-weight-bold">Size: </span>
              {this.props.torrent.size}
            </span>
          </div>
        </div>

        <div className=" d-flex justify-content-center pb-3">
          <button
            className="btn btn-outline-danger"
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
    );
  }
}

export default TorrentCard;
