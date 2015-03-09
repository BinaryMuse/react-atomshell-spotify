import request from "superagent";

import credentials from "./credentials.json";

const { clientId, clientSecret } = credentials,
      base64auth = new Buffer(`${clientId}:${clientSecret}`).toString("base64");

const doReq = (req) => {
  return new Promise((resolve, reject) => {
    req.end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
};

const getToken = () => {
  return new Promise((resolve, reject) => {
    request
      .post("https://accounts.spotify.com/api/token")
      .send("grant_type=client_credentials")
      .set("Authorization", `Basic ${base64auth}`)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
};

class SpotifyClient {
  constructor() {
    this.token = null;
    this.expiresAt = new Date().getTime();
  }

  async refreshToken() {
    const resp = await getToken();
    this.token = resp.access_token;
    this.expiresAt = new Date().getTime() + resp.expires_in * 1000;
  }

  async makeReq(type, url) {
    if (!this.token || new Date().getTime() > this.expiresAt) {
      await this.refreshToken();
    }

    if (url.indexOf("https://") !== 0) {
      if (url[0] !== "/") url = "/" + url;
      url = "https://api.spotify.com/v1" + url;
    }

    return request[type](url).set({"Authorization": `Bearer ${this.token}`});
  }

  async get(url) {
    const req = await this.makeReq("get", url);
    return await doReq(req);
  }
}

SpotifyClient.__instance = null;
SpotifyClient.get = () => {
  if (!SpotifyClient.__instance) {
    SpotifyClient.__instance = new SpotifyClient();
  }

  return SpotifyClient.__instance;
};

export default SpotifyClient;
