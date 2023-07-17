import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import axios from "axios";

import { Box, Button } from "@mui/material";
import { CarsTable } from "./CarsTable";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CarRentalOutlinedIcon from "@mui/icons-material/CarRentalOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { IUser, IUserWithCars } from "../Types";
import { ModalDefault } from "./ModalDefault";
import { Input } from "./Input";

export function UsersList() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [api, setAPI] = React.useState<IUserWithCars[]>([]);

  const [userId, setUserId] = React.useState("");
  const [index, setIndex] = React.useState<number | null>(null);

  const [newCarModalIsOpen, setNewCarModalIsOpen] = React.useState(false);
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState(2010);
  const [kms, setKms] = React.useState(10000);
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState(1000);
  const [modifications, setModifications] = React.useState("");
  const [damagedParts, setDamagedParts] = React.useState("");

  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const handleNewCarModalOpen = () => {
    setNewCarModalIsOpen(!newCarModalIsOpen);
  };

  const handleEditModalOpen = () => {
    setEditModalIsOpen(!editModalIsOpen);
  };

  const onChangeEditName = (value: string) => {
    setNewName(value);
  };

  const fetchAPI = () => {
    axios
      .get<IUserWithCars[]>("http://localhost:3000/userswithcars")
      .then((res) => setAPI(res.data))
      .catch((err) => console.log(err));
  };

  const addCar = async () => {
    if (!brand) return console.log("travou na brand");
    if (!model) return console.log("travou no model");
    if (year < 1900) return console.log("travou no year");
    if (kms < 0) return console.log("travou no kms");
    if (!color) return console.log("travou no color");
    if (price < 0) return console.log("travou no price");

    let modificationsA: string[] = [];
    let damaged_parts: string[] = [];

    if (modifications) modificationsA = modifications.split(", ");

    if (damagedParts) damaged_parts = damagedParts.split(", ");

    const car = {
      owner: userId,
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

    setAPI([]);
    fetchAPI();

    setIndex(null);
    setNewCarModalIsOpen(false);
    setBrand("");
    setModel("");
    setYear(2010);
    setKms(10000);
    setColor("");
    setPrice(1000);
    setModifications("");
    setDamagedParts("");
  };

  const editUser = async () => {
    if (!newName) return;

    await axios({
      method: "patch",
      url: `http://localhost:3000/users/${userId}`,
      data: { name: newName },
    });
    window.location.reload();
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const deleteUser = (id: string) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .catch((err) => console.log(err));
    setAPI((current) => current.filter((user) => user._id !== id));
  };

  React.useEffect(() => {
    axios
      .get<IUserWithCars[]>("http://localhost:3000/userswithcars")
      .then((res) => setAPI(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {api.length > 0 &&
        api.map((user, i) => (
          <Box key={user._id} sx={{ display: "flex", gap: "5px" }}>
            <Box
              width="100%"
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "5px",
              }}
            >
              <Accordion
                expanded={expanded === i.toString()}
                onChange={handleChange(i.toString())}
                color="rgba(255, 255, 255, 0.5)"
                sx={{ background: "#000" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{ display: "flex", "&:hover": { background: "#111" } }}
                >
                  <Typography
                    sx={{ width: "80%", flexShrink: 0, marginRight: "10px" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography>
                    membro desde {user.created_at.toString().slice(0, 4)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.5)" }}
                >
                  <Box sx={{ overflowX: "auto" }}>
                    <CarsTable props={user.cars} />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box sx={{ display: "flex", gap: "5px", maxHeight: "50px" }}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  handleNewCarModalOpen();
                  setUserId(user._id);
                  setIndex(i);
                }}
              >
                <CarRentalOutlinedIcon />
              </Button>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  setUserId(user._id);
                  setNewName("");
                  handleEditModalOpen();
                }}
              >
                <EditOutlinedIcon />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteUser(user._id)}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
            </Box>
          </Box>
        ))}

      <ModalDefault
        props={{
          isOpen: editModalIsOpen,
          handleOpen: handleEditModalOpen,
          title: "Editar usuário",
        }}
      >
        <Input
          props={{
            label: "Nome do usuário",
            value: newName,
            onChange: onChangeEditName,
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

      <ModalDefault
        props={{
          isOpen: newCarModalIsOpen,
          handleOpen: handleNewCarModalOpen,
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
}
