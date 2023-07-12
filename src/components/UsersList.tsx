import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { Box, Button } from "@mui/material";
import { CarsTable } from "./CarsTable";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CarRentalOutlinedIcon from "@mui/icons-material/CarRentalOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { api } from "../api";

export function UsersList() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {api.map((user, i) => (
        <Box key={i} sx={{ display: "flex", gap: "5px" }}>
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
                  membro desde {user.created_at.getFullYear()}
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
            <Button variant="outlined" color="success">
              <CarRentalOutlinedIcon />
            </Button>
            <Button variant="outlined" color="info">
              <EditOutlinedIcon />
            </Button>
            <Button variant="outlined" color="error">
              <DeleteOutlineOutlinedIcon />
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
}
