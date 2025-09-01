import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomCheckbox = ({ name, label, rules, ...restProps }) => {

  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              sx={{ color: "success" }}
              {...restProps}
            />
          }
          label={label}
        />
      )}
      rules={rules}
    />
  );
};

export default CustomCheckbox;
