import React, { useState, useContext } from "react";
import { PageLayout } from "./components/header/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { Container, Button } from "react-bootstrap";
import AuthContext from "./store/auth-context";
import Searchform from "./components/searchComponent/SearchForm";
function ProfileContent(props) {
  const { instance, accounts } = useMsal();
  const ctx = useContext(AuthContext);
  // const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        ctx.tokenHandler(response.accessToken);
        console.log(response.accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          ctx.tokenHandler(response.accessToken);
        });
      });
  }

  return (
    <>
      <center>
        <h5 className="card-title align-center">
          Welcome to MS Graph Search API
        </h5>
        {ctx.token ? (
          ""
        ) : (
          <Button
            variant="dark"
            className="ml-auto"
            onClick={RequestProfileData}
          >
            Get Access Token
          </Button>
        )}
      </center>
    </>
  );
}
function App() {
  const [token, setToken] = useState(null);
  const getAccessToken = (token) => setToken(token);

  return (
    <AuthContext.Provider
      value={{ token: token, tokenHandler: getAccessToken }}
    >
      <PageLayout token={token}>
        <AuthenticatedTemplate>
          <ProfileContent />
          <Container>
            <center>
              <p className="w-100 align-center">
                You are signed in! Please Click <b>"Get Access Token"</b> before
                Viewing Profile Info or searching any items
              </p>
              <p>
                use <b>*</b> to search all items.some Demo Items to Search are:
                <b>"vicky","test","azure", "graph"</b>
              </p>
            </center>
          </Container>
          <Searchform />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <center>
            <p>You are not signed in! Please sign in.</p>
          </center>
        </UnauthenticatedTemplate>
      </PageLayout>
    </AuthContext.Provider>
  );
}

export default App;
