import Axios from "axios";
import * as Constants from "../Constants";

export async function getMagnetLink(website, torrent_url) {
  let url = `${Constants.BASE_URL}${website}_mg?url=${torrent_url}`;

  return new Promise(function (resolve, reject) {
    Axios.get(url)
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export async function getTorrents(endpoint, search) {
  let url = `${Constants.BASE_URL}${endpoint}?search=${search}`;

  return new Promise(function (resolve, reject) {
    Axios.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
