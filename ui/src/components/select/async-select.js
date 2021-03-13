import React, { useState, useEffect } from "react";
import Select from "react-select/async";
import { useStyles } from "./styles";

const AsyncSelect = ({
  name,
  value,
  placeholder,
  loadOptions,
  handleChange,
}) => {
  const [selectedOpt, setSelectedOpt] = useState();

  useEffect(() => {
    if (!value) {
      setSelectedOpt(null);
    }
  }, [value]);

  const classes = useStyles();

  return (
    <Select
      loadOptions={loadOptions}
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

export default AsyncSelect;
