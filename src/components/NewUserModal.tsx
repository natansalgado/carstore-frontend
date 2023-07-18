import { useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { ModalDefault } from "./ModalDefault";
import { Input } from "./Input";

interface Props {
  reloadAPI: () => void;
}

export const NewUserModal = ({ reloadAPI }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

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
    setIsOpen(false);
    setName("");
    reloadAPI();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="success"
        sx={{ marginBottom: "10px" }}
        onClick={handleOpen}
      >
        <PersonAddOutlinedIcon />
      </Button>

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
    </>
  );
};
