import React from "react";
import PropTypes from "prop-types";

function TextInput({ type, value, name, placeholder, label, onChange, error }) {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="fields">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
