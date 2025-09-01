import React from "react";
import { Controller, useFormState } from "react-hook-form";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/es";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment/moment";

const CustomDateField = ({
  name,
  label,
  rules,
  helperText,
  posicion = "top",
  req = false,
  disabled = false,
  readOnly = false,
  maxDate = null,
  sx,
  helperTextSx,
  ...restProps
}) => {
  const formState = useFormState();

  return (
    <Controller
      name={name}
      rules={{
        ...rules,
        validate: (value) => {
          if (maxDate && moment(value).isSameOrAfter(maxDate, "day")) {
            return `La fecha no puede ser posterior a ${moment(maxDate).format(
              "DD/MM/YYYY"
            )}`;
          }
          return true;
        },
      }}
      render={({
        field: { ref, onBlur, name, value, ...field },
        fieldState,
      }) => {
        const formattedValue = value ? moment(value).format("YYYY-MM-DD") : "";

        return (
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            color="success"
          >
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale="es"
            >
              <DesktopDatePicker
                {...field}
                value={value || null}
                inputRef={ref}
                label={label}
                onChange={(date) => field.onChange(date)}
                maxDate={maxDate}
                disableFuture={!!maxDate}
                renderInput={(inputProps) => (
                  <TextField
                    {...inputProps}
                    onBlur={onBlur}
                    type="date"
                    name={name}
                    error={Boolean(formState.errors && formState.errors[name])}
                    helperText={
                      formState.errors[name]
                        ? formState.errors[name].message
                        : helperText
                    }
                    FormHelperTextProps={{
                      sx: helperTextSx,
                    }}
                    required={req}
                    disabled={disabled}
                    {...restProps}
                    value={formattedValue}
                    sx={{
                      ...sx,
                      "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                        color: helperTextSx?.color,
                      },
                    }}

                    helperTextSx
                    inputProps={{
                      ...inputProps.inputProps,
                      readOnly: readOnly,
                    }}
                    InputProps={{
                      ...inputProps.InputProps,
                      endAdornment: readOnly ? null : inputProps.InputProps?.endAdornment,
                    }}
                  />
                )}
                PopperProps={{
                  placement: posicion,
                }}
              />
            </LocalizationProvider>
          </FormControl>
        );
      }}
    />
  );
};

export default CustomDateField;
