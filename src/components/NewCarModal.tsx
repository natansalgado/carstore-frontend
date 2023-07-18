import { useState } from "react";
import { ModalDefault } from "./ModalDefault";
import axios from "axios";
import { Input } from "./Input";
import { Button } from "@mui/material";

interface Props {
  modalIsOpen: boolean;
  userID: string;
  handleModalOpen: () => void;
  reloadAPI: () => void;
}

export const NewCarModal = ({
  modalIsOpen,
  userID,
  handleModalOpen,
  reloadAPI,
}: Props) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [kms, setKms] = useState(0);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [modifications, setModifications] = useState("");
  const [damagedParts, setDamagedParts] = useState("");

  const addCar = async () => {
    if (!brand) return;
    if (!model) return;
    if (year < 1886) return;
    if (kms < 0) return;
    if (!color) return;
    if (price < 0) return;

    let modificationsA: string[] = [];
    let damaged_parts: string[] = [];

    if (modifications) modificationsA = modifications.split(", ");

    if (damagedParts) damaged_parts = damagedParts.split(", ");

    const car = {
      owner: userID,
      brand,
      model,
      year,
      kms,
      color,
      price,
      modifications: modificationsA,
      damaged_parts,
    };

    await axios({
      method: "post",
      url: "http://localhost:3000/cars",
      data: car,
    });

    reloadAPI();
    handleModalOpen()

    handleModalOpen;
    setBrand("");
    setModel("");
    setYear(2010);
    setKms(10000);
    setColor("");
    setPrice(1000);
    setModifications("");
    setDamagedParts("");
  };

  return (
    <>
      <ModalDefault
        props={{
          isOpen: modalIsOpen,
          handleOpen: handleModalOpen,
          title: "Adicionar novo carro",
        }}
      >
        <Input
          props={{
            label: "Marca",
            value: brand,
            onChange: (v) => setBrand(v),
          }}
        />
        <Input
          props={{
            label: "Modelo",
            value: model,
            onChange: (v) => setModel(v),
          }}
        />
        <Input
          props={{
            isNumber: true,
            label: "Ano de lançamento",
            value: year.toString(),
            onChange: (v) => setYear(Number(v)),
          }}
        />
        <Input
          props={{
            isNumber: true,
            label: "Kms rodados",
            value: kms.toString(),
            onChange: (v) => setKms(Number(v)),
          }}
        />
        <Input
          props={{
            label: "Cor",
            value: color,
            onChange: (v) => setColor(v),
          }}
        />
        <Input
          props={{
            isNumber: true,
            label: "Preço R$",
            value: price.toString(),
            onChange: (v) => setPrice(Number(v)),
          }}
        />
        <Input
          props={{
            label: "Modificações (separar com vírgula)",
            value: modifications,
            onChange: (v) => setModifications(v),
          }}
        />
        <Input
          props={{
            label: "Partes danificadas (separar com vírgula)",
            value: damagedParts,
            onChange: (v) => setDamagedParts(v),
          }}
        />
        <Button
          variant="outlined"
          color="success"
          onClick={() => void addCar()}
        >
          Adicionar
        </Button>
      </ModalDefault>
    </>
  );
};
