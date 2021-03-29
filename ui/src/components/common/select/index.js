import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useStyles } from "./styles";

const Select = ({ name, value, placeholder, handleChange, options }) => {
  const classes = useStyles();

  const [selectedOpt, setSelectedOpt] = useState();

  useEffect(() => {
    if (!value) {
      setSelectedOpt(null);
    } else {
      setSelectedOpt(
        (sOpt) => options.find((opt) => opt.value === value) || sOpt
      );
    }
  }, [value]);

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
    />
  );
};

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
  input: (base) => ({
    ...base,
    fontSize: "0.8rem",
  }),
};
export default Select;
