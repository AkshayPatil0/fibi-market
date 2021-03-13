import React from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = ({
  name,
  label,
  type,
  value,
  handleChange,
  handleShowPassword,
  sm,
  autoFocus,
  error,
  ...rest
}) => {
  return (
    <Grid item xs={12} sm={sm ? sm : 12}>
      <TextField
        variant="outlined"
        required={error !== undefined}
        fullWidth
        id={name}
        label={label}
        name={name}
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={handleChange}
        InputProps={
          name === "password"
            ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
            : null
        }
        error={!!error}
        helperText={error}
        {...rest}
      />
    </Grid>
  );
};

export default Input;
