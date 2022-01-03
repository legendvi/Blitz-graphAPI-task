export const msalConfig = {
  auth: {
    clientId: "c341075d-3467-440e-9807-f72d64d0a92e",
    authority:
      "https://login.microsoftonline.com/ab854128-7a74-468f-b913-2aec2e9c8d56", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "https://blitz-api-task.netlify.app/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
