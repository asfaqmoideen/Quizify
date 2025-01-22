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
        setTimeout(() => {document.location = `/index.html`}, 5000)
        throw new Error("Session Expired");
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
}
