import { useState, useEffect, SyntheticEvent } from "react";
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

import { IUserWithCars } from "../Types";
import { NewUserModal } from "./NewUserModal";
import { NewCarModal } from "./NewCarModal";
import { EditUserModal } from "./EditUserModal";

export function UsersList() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [api, setAPI] = useState<IUserWithCars[]>([]);

  const [userID, setUserID] = useState("");

  const [newCarModalIsOpen, setNewCarModalIsOpen] = useState(false);
  const [editUserModalIsOpen, setEditUserModalIsOpen] = useState(false);

  const [newName, setNewName] = useState("");

  const handleNewName = (value: string) => {
    setNewName(value);
  };

  const handleNewCarModalOpen = () => {
    setNewCarModalIsOpen(!newCarModalIsOpen);
  };

  const handleEditUserModalOpen = () => {
    setEditUserModalIsOpen(!editUserModalIsOpen);
  };

  const fetchAPI = () => {
    axios
      .get<IUserWithCars[]>("http://localhost:3000/userswithcars")
      .then((res) => setAPI(res.data))
      .catch((err) => console.log(err));
  };

  const reloadAPI = () => {
    setAPI([]);
    fetchAPI();
  };

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const deleteUser = (id: string) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .catch((err) => console.log(err));
    reloadAPI();
    reloadAPI();
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <NewUserModal reloadAPI={reloadAPI} />
      <NewCarModal
        handleModalOpen={handleNewCarModalOpen}
        modalIsOpen={newCarModalIsOpen}
        reloadAPI={reloadAPI}
        userID={userID}
      />
      <EditUserModal
        handleModalOpen={handleEditUserModalOpen}
        handleNewName={handleNewName}
        modalIsOpen={editUserModalIsOpen}
        newName={newName}
        reloadAPI={reloadAPI}
        userID={userID}
      />

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
                    <CarsTable props={user.cars} reloadAPI={reloadAPI} />
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
                  setUserID(user._id);
                }}
              >
                <CarRentalOutlinedIcon />
              </Button>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  setUserID(user._id);
                  setNewName(user.name);
                  handleEditUserModalOpen();
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
    </>
  );
}
