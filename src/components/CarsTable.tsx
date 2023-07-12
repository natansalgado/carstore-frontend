import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Button } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface ICar {
  brand: string;
  model: string;
  year: number;
  kms: number;
  color: string;
  price: number;
  damaged_parts: string[];
  modifications: string[];
}

interface Props {
  props: ICar[];
}

export const CarsTable = (props: Props) => {
  const headCellStyle = { color: "#000", fontSize: "16px", fontWeight: "bold" };
  const rowCellStyle = { color: "#fff" };

  return (
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
        {props.props.map((car, i) => (
          <TableRow
            key={i}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              "&:hover": { background: "#111" },
            }}
          >
            <TableCell sx={rowCellStyle}>{car.brand}</TableCell>
            <TableCell sx={rowCellStyle}>{car.model}</TableCell>
            <TableCell sx={rowCellStyle}>{car.year}</TableCell>
            <TableCell sx={rowCellStyle}>{car.kms}</TableCell>
            <TableCell sx={rowCellStyle}>{car.color}</TableCell>
            <TableCell sx={rowCellStyle}>
              R$ {car.price.toLocaleString("pt-BR")},00
            </TableCell>
            <TableCell sx={rowCellStyle}>
              {car.modifications.join(", ")}
            </TableCell>
            <TableCell sx={rowCellStyle}>
              {car.damaged_parts.join(", ")}
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", gap: "5px", maxHeight: "50px" }}>
                <Button variant="outlined" color="info" sx={{ padding: 0 }}>
                  <EditOutlinedIcon />
                </Button>
                <Button variant="outlined" color="error">
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
