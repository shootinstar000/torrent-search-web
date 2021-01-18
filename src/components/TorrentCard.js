import React, { Component } from "react";
import { getMagnetLink } from "../utils/network_utils";
import ClipLoader from "react-spinners/ClipLoader";
class TorrentCard extends Component {
  copyToClipBoard = (e) => {
    var mgDiv = document.getElementById(this.state.mgid);
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(mgDiv);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  onMangetBtnClick = (e) => {
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
    loading: false,
    mgid: "mg" + this.props.Key,
  };

  BottomLayout = (prop) => {
    if (this.state.loading === true || this.state.magnetUrl === "") {
      return (
        <div className="container p-5">
          <ClipLoader color="red" />
        </div>
      );
    } else {
      return (
        <a href={this.state.magnetUrl}>
          <div className="limit-word p-2" id={this.state.mgid}>
            {this.state.magnetUrl}
          </div>
        </a>
      );
    }
  };

  render() {
    return (
      <div className="border-black Br-10px elevated-card grey-bg ">
        <div className="text-center p-3 card-title-custom br-10px-top">
          <strong>{this.props.torrent.name}</strong>
        </div>
        <div className="col justify-content-center pr-3 pl-3 pt-4 pb-4">
          <div className="row justify-content-around">
            <div className="col">
              <span className="font-small">Leechers: </span>
              <span className="font-weight-bold">
                {this.props.torrent.leechers}
              </span>
            </div>
            <div className="col">
              <span className="font-small">Seeders: </span>
              <span className="font-weight-bold">
                {this.props.torrent.seeders}
              </span>
            </div>
          </div>
          {/* <br /> */}
          <div className="row justify-content-around p2 mt-2">
            <div className="col">
              <span className="font-small">Website: </span>
              <span className="font-weight-bold">
                {this.props.torrent.website}
              </span>
            </div>

            <div className="col">
              <span className="font-small">Size: </span>{" "}
              <span className="font-weight-bold">
                {this.props.torrent.size}
              </span>
            </div>
          </div>
          <div className="row justify-content-around p2 mt-2">
            <div className="col">
              <span className="font-small">Uploaded On: </span>
              <span className="font-weight-bold">
                {this.props.torrent.upload_date}
              </span>
            </div>
            <div className="col">
              <span className="font-small">Uploader: </span>
              <span className="font-weight-bold">
                {this.props.torrent.uploader}
              </span>
            </div>
          </div>
        </div>

        <div className="row justify-content-around pb-3">
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

          {this.state.magnetUrl !== "" ? (
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={this.copyToClipBoard}
            >
              Copy to Clipboard
            </button>
          ) : null}
        </div>
        <div className="collapse" id={"c" + this.props.Key}>
          <div className="row justify-content-around pb-3">
            <div className="col text-center">
              <this.BottomLayout />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TorrentCard;
