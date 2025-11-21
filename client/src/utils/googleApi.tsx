import { gapi } from "gapi-script";

export const initGoogle = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: '1021459374928-a1bg1c6g6h26tc2ui7ah4kp5e91b5mus.apps.googleusercontent.com',
          scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        })
        .then(() => {
          console.log("Google API initialized successfully");
          resolve();
        })
        .catch((error: unknown) => {
          console.error("Error initializing Google API:", error);
          reject(error);
        });
    });
  });
};