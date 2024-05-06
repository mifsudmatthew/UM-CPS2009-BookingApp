import PropTypes from "prop-types";

// The Selecter component is a component that returns a select element with the specified id, label, classname, data, onChange, disabled, and required props.
const Selecter = ({
  id,
  label,
  classname,
  data,
  onChange,
  disabled,
  required,
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={`inputBox ${classname}`}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        {data.map((value, label) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

Selecter.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classname: PropTypes.string,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

Selecter.defaultProps = {
  classname: "",
  data: ["", ""],
  disabled: false,
  required: false,
};

export default Selecter;
