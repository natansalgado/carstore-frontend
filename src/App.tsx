import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";

import { UsersList } from "./components/UsersList";
import { ModalDefault } from "./components/ModalDefault";
import { Input } from "./components/Input";

import { Box, Button, Container } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onChange = (value: string) => {
    setName(value);
  };

  const addNewUser = async () => {
    if (!name) return;

    await axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: { name },
    });
    window.location.reload();
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
    >
      <Box height={100}>
        <h1>CASTORE Control Painel</h1>
      </Box>
      <Button
        variant="outlined"
        color="success"
        sx={{ marginBottom: "10px" }}
        onClick={handleOpen}
      >
        <PersonAddOutlinedIcon />
      </Button>
      <UsersList />

      <ModalDefault props={{ isOpen, handleOpen, title: "Adicionar usuário" }}>
        <Input
          props={{
            label: "Nome do usuário",
            value: name,
            onChange: onChange,
          }}
        />
        <Button
          variant="outlined"
          color="success"
          onClick={() => void addNewUser()}
        >
          Adicionar
        </Button>
      </ModalDefault>
    </Container>
  );
}

export default App;
