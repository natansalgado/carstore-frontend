import { Box, Modal, Typography } from "@mui/material";

interface Props {
  props: {
    title: string;
    isOpen: boolean;
    handleOpen: () => void;
  };
  children: React.ReactNode;
}

export const ModalDefault = ({ props, children }: Props) => {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleOpen}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 800,
          background: "#000",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "5px",
          padding: "20px",
          height: "fit-content",
        }}
      >
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="center">
            {props.title}
          </Typography>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};
