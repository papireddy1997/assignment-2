import React, { useState, useEffect } from "react";
import axios from "axios";
import Contacts from "./Components/Contacts";
import {
  Accordion,
  Button,
  Form,
  Grid,
  Header,
  Divider,
  Icon,
  Message,
} from "semantic-ui-react";

function App() {
  const [allContacts, setAllContacts] = useState([]);
  const [reload, setReload] = useState(true);
  const [contactName, setContactName] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const reloadHome = (message) => {
    setReload(true);
  };

  function createContactValidation() {
    setValidationMessage("");
    if (contactName.length < 3) {
      setValidationMessage(
        "Set Valid Contact Name : Length should be greater than 2",
      );
    } else {
      setValidationMessage("");
      createContact();
    }
  }

  const createContact = async () => {
    let contactPayload = { name: contactName };
    await axios
      .post("http://localhost:5000/api/contacts/", contactPayload)
      .then((res) => {
        if (res.status === 200) {
          setStatusMessage("Contact Created");
          setTimeout(function () {
            setStatusMessage("");
          }, 2000);
          setReload(true);
          setContactName("");
          setValidationMessage("");
        } else {
          setErrorMessage("Issue creating contact");
          setTimeout(function () {
            setErrorMessage("");
          }, 2000);
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };

  useEffect(() => {
    if (reload) {
      axios
        .get("http://localhost:5000/api/contacts/")
        .then(({ data }) => {
          setAllContacts(data);
        })
        .catch((error) => {
          console.log(error);
        });
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h2" textAlign="center">
            <Message>Contactor</Message>
            {statusMessage.length > 0 ? (
              <Message positive>{statusMessage}</Message>
            ) : (
              ""
            )}
            {errorMessage.length > 0 ? (
              <Message positive>{errorMessage}</Message>
            ) : (
              ""
            )}
          </Header>
          <Header as="h3" color="teal" textAlign="center">
            <Form>
              <Form.Input
                size="huge"
                placeholder="Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              {validationMessage.length > 0 ? (
                <Message negative>{validationMessage}</Message>
              ) : (
                ""
              )}
              <Button
                size="large"
                color="teal"
                onClick={createContactValidation}
              >
                Create Contact
              </Button>
            </Form>

            <Divider horizontal>
              <Header as="h4">
                <Icon name="user" />
                Contacts
              </Header>
            </Divider>

            <Accordion fluid styled>
              {allContacts.map((res, i) => {
                return (
                  <Contacts
                    id={res.id}
                    name={res.name}
                    reloadHome={reloadHome}
                  />
                );
              })}
            </Accordion>
          </Header>
          <Header as="h4">
            click a contact to view associated phone numbers
          </Header>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default App;
