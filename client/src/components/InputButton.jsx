import { useState } from "react";
import PropTypes from "prop-types";

const InputButton = ({ label, type, classname, onClick, colour }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) {
      onClick();
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
        backgroundColor: isClicked ? { colour } : "",
        cursor: isClicked ? "not-allowed" : "pointer",
      }}>
      {label}
    </button>
  );
};

InputButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  classname: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  colour: PropTypes.string.isRequired,
};

InputButton.defaultProps = {
  type: "button",
  classname: "inputButton",
  colour: "#CCCCCC",
};

export default InputButton;
