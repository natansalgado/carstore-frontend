import { ModalDefault } from "./ModalDefault";
import { Input } from "./Input";
import axios from "axios";
import { Button } from "@mui/material";

interface Props {
  newName: string;
  modalIsOpen: boolean;
  userID: string;
  handleModalOpen: () => void;
  reloadAPI: () => void;
  handleNewName: (value: string) => void;
}

export const EditUserModal = ({
  newName,
  modalIsOpen,
  userID,
  handleModalOpen,
  reloadAPI,
  handleNewName,
}: Props) => {
  const editUser = async () => {
    if (!newName) return;

    await axios({
      method: "patch",
      url: `http://localhost:3000/users/${userID}`,
      data: { name: newName },
    });
    reloadAPI();
    handleModalOpen();
  };

  return (
    <>
      <ModalDefault
        props={{
          isOpen: modalIsOpen,
          handleOpen: handleModalOpen,
          title: "Editar usuário",
        }}
      >
        <Input
          props={{
            label: "Nome do usuário",
            value: newName,
            onChange: handleNewName,
          }}
        />
        <Button
          variant="outlined"
          color="success"
          onClick={() => void editUser()}
        >
          Salvar
        </Button>
      </ModalDefault>
    </>
  );
};
