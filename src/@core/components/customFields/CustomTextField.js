import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Controller, useFormState } from "react-hook-form";
import Icon from "src/@core/components/icon";

// Define un TextField personalizado con los estilos deseados
const CustomStyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main, // Cambia aquí al color que prefieras
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: theme.palette.secondary.main, // Cambia aquí al color que prefieras para el label
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(3.7),
    fontSize: '0.92rem',
  },
}));

const CustomTextField = ({
  name,
  label,
  rules,
  helperText,
  type = "text",
  req,
  rows = 1,
  readOnly = false,
  endAdornment,
  disabled = false,
  inputLabelProps = true,
  iconoClose = false,
  multiline = false,
  startAdornment,
  ...restProps
}) => {
  const formState = useFormState();

  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <CustomStyledTextField
          margin="normal"
          type={type}
          onChange={(e) => {
            let newValue = e.target.value;
            if (type === "number") {
              newValue = newValue.replace(/[^0-9.,]/g, ""); 
            }
            onChange(newValue);
          }}
          onBlur={onBlur}
          value={value}
          rows={rows}
          ref={ref}
          error={Boolean(formState.errors && formState.errors[name] && formState.errors[name]?.message)}
          helperText={formState.errors[name]?.message ? formState.errors[name].message : null}
          label={label}
          variant="outlined"
          fullWidth
          required={req}
          multiline={multiline}
          disabled={disabled}
          {...restProps}
          onWheel={(e) => {
            if (type === "number") e.target.blur();
          }}
          onKeyDown={(e) => {
            if (type === "number" && ["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          InputProps={{
            readOnly: readOnly,
            startAdornment: startAdornment,
            endAdornment,
            endAdornment: (
              <InputAdornment position="end">{iconoClose && <Icon icon="clarity:lock-solid" />}</InputAdornment>
            ),
          }}
          inputProps={
            type === "number"
              ? { inputMode: "numeric", pattern: "[0-9]*" }
              : {}
          }
          InputLabelProps={{ shrink: value ? true : undefined }}
        />
      )}
      rules={rules}
    />
  );
};

export default CustomTextField;
