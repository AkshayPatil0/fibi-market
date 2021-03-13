import React, { useEffect, useState } from "react";

import ReactSelect from "react-select";

import { useStyles } from "./styles";

const Select = ({ name, value, placeholder, handleChange, options }) => {
  const classes = useStyles();

  const [selectedOpt, setSelectedOpt] = useState();

  useEffect(() => {
    if (!value) {
      setSelectedOpt(null);
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
    />
  );
};

export default Select;
