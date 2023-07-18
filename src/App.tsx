import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { UsersList } from "./components/UsersList";

import { Box, Container } from "@mui/material";

function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
    >
      <Box height={100}>
        <h1>CASTORE Control Painel</h1>
      </Box>

      <UsersList />
    </Container>
  );
}

export default App;
