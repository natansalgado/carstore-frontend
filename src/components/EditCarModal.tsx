import { ModalDefault } from "./ModalDefault";
import { Input } from "./Input";
import { ICar } from "../Types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

interface Props {
  modalIsOpen: boolean;
  handleModalOpen: () => void;
  reloadAPI: () => void;
  carToEdit: ICar | null;
}

export const EditCarModal = ({
  modalIsOpen,
  handleModalOpen,
  reloadAPI,
  carToEdit,
}: Props) => {
  const [carID, setCarID] = useState("");
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
    if (year < 1900) return;
    if (kms < 0) return;
    if (!color) return;
    if (price < 0) return;

    let modificationsA: string[] = [];
    let damaged_parts: string[] = [];

    if (modifications) {
      modificationsA = modifications.split(", ");
    } else {
      modificationsA = ["N/A"];
    }

    if (damagedParts) {
      damaged_parts = damagedParts.split(", ");
    } else {
      damaged_parts = ["N/A"];
    }

    const car = {
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
      method: "patch",
      url: `http://localhost:3000/cars/${carID}`,
      data: car,
    });

    reloadAPI();
  };

  useEffect(() => {
    if (carToEdit) {
      setCarID(carToEdit._id);
      setBrand(carToEdit.brand);
      setModel(carToEdit.model);
      setYear(Number(carToEdit.year));
      setKms(Number(carToEdit.kms));
      setColor(carToEdit.color);
      setPrice(Number(carToEdit.price));
      setModifications(carToEdit.modifications.join(", "));
      setDamagedParts(carToEdit.damaged_parts.join(", "));
    }
  }, [carToEdit]);

  return (
    <>
      <ModalDefault
        props={{
          isOpen: modalIsOpen,
          handleOpen: handleModalOpen,
          title: "Editar carro",
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
          Editar
        </Button>
      </ModalDefault>
    </>
  );
};
