import { useState } from "react";
import PropTypes from "prop-types";

const InputButton = ({ label, type, classname, onClick, color }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event) => {
    setIsClicked(true);
    if (onClick) {
      onClick(event);
    } else {
      console.log("This button doesn't have a function attached on click");
    }

    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  return (
    <button
      type={type}
      className={classname}
      onClick={handleClick}
      disabled={isClicked}
      style={{
        backgroundColor: isClicked ? color : "",
        cursor: isClicked ? "not-allowed" : "pointer",
      }}>
      {label}
    </button>
  );
};

InputButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  classname: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

InputButton.defaultProps = {
  type: "button",
  classname: "inputButton",
  color: "#CCCCCC",
};

export default InputButton;
