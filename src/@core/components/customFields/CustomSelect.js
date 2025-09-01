import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form'

const CustomSelect = ({ name, label, helperText, options, rules, control, variant = "outlined", required, index, errors, formControlSx, selectSx, helperTextSx, ...restProps }) => {
    return (
        <Controller
            name={name} 
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                <FormControl 
                    required={required} 
                    variant={variant} 
                    fullWidth 
                    margin="normal" 
                    error={Boolean(error)} // Si hay error, marca el campo como erróneo
                    sx={formControlSx}
                >
                    <InputLabel id={`${name}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${name}-label`}
                        id={`${name}-select`}
                        value={value || ''} // Evita pasar `undefined` al Select
                        label={label}
                        onChange={onChange}
                        onBlur={onBlur}
                        fullWidth
                        sx={selectSx}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText sx={helperTextSx}>
                        {error ? error.message : helperText}
                    </FormHelperText>
                </FormControl>
            )}
            {...restProps}
        />
    )
}

export default CustomSelect;
