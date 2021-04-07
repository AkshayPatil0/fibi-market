import React from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = ({
  id,
  name,
  label,
  type,
  value,
  handleChange,
  handleShowPassword,
  xs,
  sm,
  autoFocus,
  error,
  smaller,
  ...rest
}) => {
  return (
    <Grid item xs={xs ? xs : 12} sm={sm ? sm : 12}>
      <TextField
        variant="outlined"
        required={error !== undefined}
        fullWidth
        id={id}
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
        inputProps={
          smaller && {
            style: {
              fontSize: "0.8rem",
            },
          }
        }
        {...rest}
      />
    </Grid>
  );
};

export default Input;
