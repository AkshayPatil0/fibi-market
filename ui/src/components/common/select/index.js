import { useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useStyles } from "./styles";

const Select = ({
  name,
  value,
  placeholder,
  handleChange,
  options,
  disableSearch,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    }),
    input: (base) => ({
      ...base,
      fontSize: "0.8rem",
      color: theme.palette.text.primary,
    }),
    control: (base) => ({
      ...base,
      backgroundColor: theme.palette.background.paper,
    }),
    singleValue: (base) => ({
      ...base,
      color: theme.palette.text.primary,
    }),
    placeholder: (base) => ({
      ...base,
      color: theme.palette.text.primary,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme.palette.action.focus
        : theme.palette.background.paper,
    }),
  };

  const [selectedOpt, setSelectedOpt] = useState();

  useEffect(() => {
    if (!value) {
      setSelectedOpt(null);
    } else {
      setSelectedOpt(
        (sOpt) => options.find((opt) => opt.value === value) || sOpt
      );
    }
  }, [value, options]);

  return (
    <ReactSelect
      options={options}
      placeholder={placeholder}
      className={classes.select}
      value={selectedOpt}
      onChange={(opt) => {
        handleChange({ target: { name, value: opt.value } });
        setSelectedOpt(opt);
      }}
      styles={selectStyles}
      isSearchable={!disableSearch}
      c
    />
  );
};

export default Select;
