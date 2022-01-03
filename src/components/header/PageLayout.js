import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import GetButtons from "./GetButtons";
import { Container } from "react-bootstrap";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <a className="navbar-brand" href="/">
          Sample Azure Graph API
        </a>
        {isAuthenticated ? (
          <>
            <GetButtons /> <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )}
      </Navbar>
      <Container>
        <h5>
          <center>
            This site is only a demo made as a task. It is a Single Tentant
            Application.
            <br /> Kindly use E-mail:
            <i>admin@dvigneshkumar3gmailcom.onmicrosoft.com</i>
            <br />
            Password: <i>Dvignesh@9</i>
          </center>
        </h5>
        <br />
        <br />
        {props.children}
      </Container>
    </>
  );
};
