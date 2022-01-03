import { Form, Row, Col, Button, Container } from "react-bootstrap";
import SearchInputGroup from "./SeachInputGroup";
import { useContext, useState } from "react";
import { useRef } from "react";
import AuthContext from "../../store/auth-context";
import TableView from "../layouts/TableView";
const Searchform = (props) => {
  const ctx = useContext(AuthContext);
  const searchBy = useRef();
  const searchTerm = useRef();
  const [data, setData] = useState(null);
  const getBooksHandler = async (event) => {
    event.preventDefault();
    const headers = new Headers();
    const bearer = `Bearer ${ctx.token}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        requests: [
          {
            entityTypes: [searchBy.current.value],
            query: {
              queryString: searchTerm.current.value,
            },
          },
        ],
      }),
    };

    return fetch("https://graph.microsoft.com/beta/search/query", options)
      .then((response) => response.json())
      .then((response) => {
        const items = response.value[0].hitsContainers[0].hits.map((item) => {
          return (
            <tr key={item.rank}>
              <td>{item.rank}</td>
              <td>{item.resource.name}</td>
              <td>{item.resource.lastModifiedDateTime}</td>
              <td>
                <a href={item.resource.webUrl} rel="noreferrer" target="_blank">
                  Go to Page
                </a>
              </td>
            </tr>
          );
        });
        setData(items);
      })
      .catch((error) => {
        alert("Access token Not provided or the Search has no Results");
        console.log(error);
      });
  };
  return (
    <>
      <Container>
        <center>
          <Form>
            <Row className="mt-3">
              <Col>
                <SearchInputGroup ref={{ searchBy, searchTerm }} />
              </Col>
              <Col xs={4} className="my-1 ">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={getBooksHandler}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <TableView searchItems={data} />
        </center>
      </Container>
    </>
  );
};

export default Searchform;
