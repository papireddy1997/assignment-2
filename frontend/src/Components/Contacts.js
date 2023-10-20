import React, { useState, useEffect } from "react";
import axios from "axios";
import Phones from "./Phones";
import {
  Accordion,
  Table,
  Message,
  Header,
  Button,
  Form,
  Grid,
} from "semantic-ui-react";

const Contacts = ({ id, name, reloadHome }) => {
  const [reload, setReload] = useState(true);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [numberValidationMessage, setNumberValidationMessage] = useState("");
  const [numberName, setNumberName] = useState("");
  const [number, setNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changeReload = (message) => {
    setReload(true);
  };

  const [open, setOpen] = useState(false);

  function createNumberValidation() {
    setNumberValidationMessage("");
    if (numberName.length < 3) {
      setNumberValidationMessage("Set Valid Name");
    } else if (number.length !== 10) {
      setNumberValidationMessage("Set Valid Number");
    } else {
      setNumberValidationMessage("");
      createNumber();
    }
  }

  const createNumber = async () => {
    let numberPayload = { name: numberName, number: number };
    await axios
      .post(`http://localhost:5000/api/contacts/${id}/phones`, numberPayload)
      .then((res) => {
        if (res.status === 200) {
          setStatusMessage("Number added");
          setTimeout(function () {
            setStatusMessage("");
          }, 2000);
          setNumberName("");
          setNumber("");
          setReload(true);
        } else {
          setErrorMessage("Issue creating number");
          setTimeout(function () {
            setErrorMessage("");
          }, 2000);
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };

  const removeContact = async () => {
    await axios
      .delete(`http://localhost:5000/api/contacts/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setStatusMessage("Contact Deleted");
          setTimeout(function () {
            setStatusMessage("");
            reloadHome(true);
          }, 1000);

          changeReload();
        } else {
          setErrorMessage("Issue deleting contact");
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
        .get(`http://localhost:5000/api/contacts/${id}/phones`)
        .then(({ data }) => {
          setPhoneNumbers(data);
        })
        .catch((error) => {
          console.log(error);
        });
      setReload(false);
    }
  }, [reload]);

  return (
    <div>
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
      <Accordion.Title>
        <Grid>
          <Grid.Row columns={3} onClick={(e) => setOpen(!open)}>
            <Grid.Column floated="left" width={7}>
              <Header as="h2">{name}</Header>
            </Grid.Column>
            <Grid.Column floated="left" width={1}></Grid.Column>

            <Grid.Column floated="right" width={4}>
              <Button size="small" color="red" onClick={removeContact}>
                Delete
              </Button>{" "}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Accordion.Title>

      <Accordion.Content active={open}>
        <div>
          <Form onSubmit={createNumberValidation}>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Name"
                name="name"
                value={numberName}
                onChange={(e) => setNumberName(e.target.value)}
              />
              <Form.Input
                placeholder="Number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <Form.Button content="Save" color="green" />
            </Form.Group>
          </Form>
          {numberValidationMessage.length > 0 ? (
            <Message negative>{numberValidationMessage}</Message>
          ) : (
            ""
          )}
          <Table celled compact definition>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Number</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {phoneNumbers.map((res, i) => {
                return (
                  <Phones
                    changeReload={changeReload}
                    contactId={id}
                    id={parseInt(res.id)}
                    number={res.number}
                    name={res.name}
                  />
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Accordion.Content>
    </div>
  );
};

export default Contacts;
