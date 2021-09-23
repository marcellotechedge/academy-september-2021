import axios from "axios";

export enum APIStatus { IDLE, PENDING, READY };

export default axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      common: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    },
  });
  