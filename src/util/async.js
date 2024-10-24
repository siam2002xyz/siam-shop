import axios from "axios";

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateAccessToken() {
    // console.log("check", process.env.CLIENT_ID)
    const response = await axios({
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    //   url: process.env.BASE_URL + "/v1/oauth2/token",
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: import.meta.env.VITE_CLIENT_ID,
        password: import.meta.env.VITE_CLIENT_SECRET,
      },
    });
    console.log("res", response.data)
    return response.data.access_token;
  }