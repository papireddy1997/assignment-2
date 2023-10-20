import React, { useState } from "react";
import { Button, Grid, Message, Header, Table } from "semantic-ui-react";
import axios from "axios";

const Phones = ({ id, contactId, name, number, changeReload }) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const removeNumber = async () => {
    await axios
      .delete(`http://localhost:5000/api/contacts/${contactId}/phones/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setStatusMessage("Phone contact deleted");
          setTimeout(function () {
            setStatusMessage("");
            changeReload();
          }, 1500);
        } else {
          setErrorMessage("Issue deleting number");
          setTimeout(function () {
            setErrorMessage("");
          }, 2000);
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <>
      <Table.Row>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{number}</Table.Cell>
        <Table.Cell>
          <Grid centered>
            <Button size="small" color="red" onClick={removeNumber}>
              Delete
            </Button>
          </Grid>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={3}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column ali>
                {statusMessage.length > 0 ? (
                  <Header as="h3" textAlign="center">
                    <Message positive centered>
                      {statusMessage}
                    </Message>
                  </Header>
                ) : (
                  ""
                )}
                {errorMessage.length > 0 ? (
                  <Message negative centered>
                    {errorMessage}
                  </Message>
                ) : (
                  ""
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default Phones;
