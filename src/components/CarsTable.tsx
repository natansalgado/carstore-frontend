import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Button, Typography } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { ICar } from "../Types";
import { useState } from "react";
import { EditCarModal } from "./EditCarModal";

interface Props {
  props: ICar[];
  reloadAPI: () => void;
}

export const CarsTable = ({ props, reloadAPI }: Props) => {
  const [cars, setCars] = useState<ICar[]>(props);

  const [editCarModalIsOpen, setEditCarModalIsOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<ICar | null>(null);

  const headCellStyle = { color: "#000", fontSize: "16px", fontWeight: "bold" };
  const rowCellStyle = { color: "#fff" };

  const handleEditCarModalOpen = () => {
    setEditCarModalIsOpen(!editCarModalIsOpen);
  };

  const deleteCar = (id: string) => {
    axios
      .delete(`http://localhost:3000/cars/${id}`)
      .catch((err) => console.log(err));
    setCars((current) => current.filter((car) => car._id !== id));
  };

  return (
    <>
      <EditCarModal
        handleModalOpen={handleEditCarModalOpen}
        modalIsOpen={editCarModalIsOpen}
        reloadAPI={reloadAPI}
        carToEdit={carToEdit}
      />
      {cars.length > 0 ? (
        <Table
          aria-label="customized table"
          sx={{
            minWidth: 650,
            background: "#000",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <TableHead sx={{ background: "#fff" }}>
            <TableRow>
              <TableCell sx={headCellStyle}>Marca</TableCell>
              <TableCell sx={headCellStyle}>Modelo</TableCell>
              <TableCell sx={headCellStyle}>Ano</TableCell>
              <TableCell sx={headCellStyle}>Kms</TableCell>
              <TableCell sx={headCellStyle}>Cor</TableCell>
              <TableCell sx={headCellStyle}>Preço</TableCell>
              <TableCell sx={headCellStyle}>Modificações</TableCell>
              <TableCell sx={headCellStyle}>Partes danificadas</TableCell>
              <TableCell sx={headCellStyle}>Editar ou excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow
                key={car._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { background: "#111" },
                }}
              >
                <TableCell sx={rowCellStyle}>{car.brand}</TableCell>
                <TableCell sx={rowCellStyle}>{car.model}</TableCell>
                <TableCell sx={rowCellStyle}>{car.year}</TableCell>
                <TableCell sx={rowCellStyle}>
                  {car.kms.toLocaleString()}
                </TableCell>
                <TableCell sx={rowCellStyle}>{car.color}</TableCell>
                <TableCell sx={rowCellStyle}>
                  R$ {car.price.toLocaleString()},00
                </TableCell>
                <TableCell sx={rowCellStyle}>
                  {car.modifications.join(", ")}
                </TableCell>
                <TableCell sx={rowCellStyle}>
                  {car.damaged_parts.join(", ")}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "5px", maxHeight: "50px" }}>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => {
                        setCarToEdit(car);
                        handleEditCarModalOpen();
                      }}
                    >
                      <EditOutlinedIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteCar(car._id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography sx={{ paddingTop: "8px" }}>Não possui carros</Typography>
      )}
    </>
  );
};
