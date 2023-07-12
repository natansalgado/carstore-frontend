import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { UsersList } from "./components/UsersList";
import { Box, Button, Container } from "@mui/material";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
    >
      <Box height={100}>
        <h1>CASTORE</h1>
      </Box>
      <Button variant="outlined" color="success">
        <PersonAddOutlinedIcon />
      </Button>
      <UsersList />
    </Container>
  );
}

export default App;
