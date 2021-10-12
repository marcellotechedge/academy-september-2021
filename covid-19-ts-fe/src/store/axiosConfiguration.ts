import axios from "axios";

export enum APIStatus { IDLE, PENDING, READY };

export default axios.create({
    baseURL: "http://academy-2021-be-226760054.eu-west-1.elb.amazonaws.com",
    headers: {
      common: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    },
  });
  