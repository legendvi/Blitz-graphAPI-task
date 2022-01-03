import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import ModalView from "../layouts/ModalView";
const GetButtons = (props) => {
  const [isValid, setIsValid] = useState(true);
  const ctx = useContext(AuthContext);
  const [data, setData] = useState(undefined);
  const getProfileInfo = async (event) => {
    const headers = new Headers();
    const bearer = `Bearer ${ctx.token}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch("https://graph.microsoft.com/v1.0/me", options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) throw new Error("Kindly Get Access Token and Try");
        setData(response);
        console.log(response);
        setIsValid(false);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  };
  const resetState = () => {
    setIsValid(() => true);
  };
  return (
    <>
      <Button
        variant="warning"
        className="ml-auto me-3"
        onClick={getProfileInfo}
      >
        Get Profile Info
      </Button>
      {isValid || <ModalView data={data} onClose={resetState} />}
    </>
  );
};

export default GetButtons;
