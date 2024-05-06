import { useState } from "react";
import PropTypes from "prop-types";

// The InputButton component is a component that returns a button element with the specified label, type, classname, onClick, and color props.
const InputButton = ({ label, type, classname, onClick, color }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Function to set isClicked state to true when the button is clicked and calls the onClick function if it exists.
  const handleClick = (event) => {
    setIsClicked(true);
    if (onClick) {
      onClick(event);
    } else {
      console.log("This button doesn't have a function attached on click");
    }
    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsClicked(false); // Reset the isClicked state to false after 2 seconds.
    }, 2000);
  };

  return (
    <button
      type={type}
      className={classname}
      onClick={handleClick}
      disabled={isClicked}
      style={{
        background: isClicked ? color : "",
        cursor: isClicked ? "not-allowed" : "pointer",
      }}
    >
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
