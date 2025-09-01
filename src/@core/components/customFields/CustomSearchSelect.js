import { FormHelperText, InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Controller, useFormState } from "react-hook-form";
import Icon from "src/@core/components/icon";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  },
}));

const CustomSearchSelect = ({
  name,
  lab,
  value,
  helperText,
  rules,
  options = [],
  ultimaOpcion,
  handleChange = null,
  onClick = null,
  disabled = false,
  readOnly = false,
  iconoClose = false,
  req = false,
  startAdornment,
  ...restProps
}) => {
  const formState = useFormState();
  const control = formState ? formState.control : null;
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    return () => {
      active = false;
    };
  }, [loading]);

  const handleInputClick = (event) => {
    setIsClicked(true);
    if (onClick) onClick(event);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref, ...field } }) => (
        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          color="success"
          error={Boolean(formState.errors && formState.errors[name])}
        >
          <Autocomplete
            open={!readOnly && open}
            disabled={disabled}
            readOnly={readOnly}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onOpen={() => {
              if (!readOnly) setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            value={value || ""}
            loading={loading}
            loadingText="Cargando..."
            options={options.map((option) => ({ ...option, key: option.value }))}
            getOptionSelected={(option, value) => option.value === value.value}
            getOptionLabel={(option) => option.label || ""}
            onChange={(_, data) => {
              onChange(data);
              handleChange && handleChange(data);
            }}
            onBlur={() => {
              onBlur();
              setIsClicked(false);
            }}
            fullWidth
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={lab}
                variant="outlined"
                error={Boolean(formState.errors && formState.errors[name])}
                required={req}
                onClick={handleInputClick}
                InputProps={{
                  ...params.InputProps,
                  readOnly: readOnly,
                  startAdornment: startAdornment,
                  endAdornment: readOnly ? null : (
                    <>
                      {loading && <CircularProgress color="inherit" size={20} />}
                      {params.InputProps.endAdornment}
                      {iconoClose && (
                        <InputAdornment position="end">
                          <Icon icon="clarity:lock-solid" />
                        </InputAdornment>
                      )}
                    </>
                  ),
                }}
              />
            )}
          />
          <FormHelperText>{formState.errors[name] ? helperText : null}</FormHelperText>
        </FormControl>
      )}
      rules={rules}
      {...restProps}
    />
  );
};

export default CustomSearchSelect;
