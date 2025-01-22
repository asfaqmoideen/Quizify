"use strict";
import { BASE_URL } from "../constants";
export class AccessValidationService {
  validateCurrentUser = async (accessToken) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.status == 400) {
        const newToken =  this.tryRefreshingToken(accessToken);
        this.validateCurrentUser(newToken);
      }
      if (response.status !== 200) {
        throw new Error("Could not fetch data");
      }
      const user = await response.json();
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      throw err;
    }
  };

  tryRefreshingToken = async (accessToken)=> {
    try{
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },

      });
      if(!response.ok){
        throw new Error("Couldn't refresh the session");
      }
      const token = response.json();
      return token.access_token;
    }
    catch (err) {
      throw err;
    }
  }
}
