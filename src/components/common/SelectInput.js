import React from "react";
import PropTypes from "prop-types";

function SelectInput({
  value,
  label,
  onChange,
  name,
  error,
  defaultOption,
  options,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="fields">
        <select
          value={value}
          name={name}
          onChange={onChange}
          className="form-control"
        >
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

SelectInput.propTypes = {
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
};

export default SelectInput;
