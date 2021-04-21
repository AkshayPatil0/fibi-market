import React, { useState, useEffect, useRef } from "react";
import Select from "react-select/async";
import { useStyles } from "./styles";

const AsyncSelect = ({
  name,
  value,
  placeholder,
  loadOptions,
  handleChange,
  defaultInputValue,
  disabled,
  multiple,
}) => {
  const [selectedOpt, setSelectedOpt] = useState(value);

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
      value={selectedOpt || value}
      onChange={(opt) => {
        if (opt.value) {
          handleChange({ target: { name, value: opt.value } });
        } else {
          const values = Object.keys(opt).map((k) => opt[k].value);
          handleChange({ target: { name, value: values } });
        }
        setSelectedOpt(opt);
      }}
      styles={selectStyles}
      defaultInputValue={defaultInputValue}
      cacheOptions
      isDisabled={!!disabled}
      isMulti={!!multiple}
    />
  );
};

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

export default AsyncSelect;
