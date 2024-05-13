/**
 * @file InputBox.jsx
 * @desc A component that returns an input element with the specified id, label, classname, type, placeholder, value, disabled, onChange, and required props.
 */

import PropTypes from "prop-types";

// The InputBox component is a component that returns an input element with the specified id, label, classname, type, placeholder, value, disabled, onChange, and required props.
const InputBox = ({
  id,
  label,
  classname,
  type,
  placeholder,
  value,
  disabled,
  onChange,
  required,
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`inputBox ${classname}`}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(event) => onChange(event)}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

InputBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classname: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "number", "email"]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

InputBox.defaultProps = {
  classname: "",
  type: "text",
  placeholder: "",
  value: null,
  disabled: false,
  required: false,
};

export default InputBox;
