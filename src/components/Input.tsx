import { Typography } from "@mui/material";

interface Props {
  props: {
    isNumber?: boolean;
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
}

export const Input = ({ props }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", width: "80%" }}>
      <Typography>{props.label}</Typography>
      <input
        type={props.isNumber ? "number" : "text"}
        style={{
          border: "1px solid white",
          color: "white",
          padding: "10px",
          background: "#000",
          borderRadius: "5px",
          fontSize: "16px",
        }}
        value={props.value}
        onChange={onChange}
      />
    </label>
  );
};
