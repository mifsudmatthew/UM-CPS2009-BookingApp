import React from "react";
import PropTypes from "prop-types";

const Form = ({ classname, onSubmit, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // For future use if we decide to pass the data from the form
    const formData = {};
    React.Children.forEach(children, (child) => {
      if (child.type && child.type.displayName === "InputBox") {
        formData[child.props.id] = child.props.value;
      }
    });

    // Calls the onsubmit prop passed to the form
    onSubmit(formData);
  };

  return (
    <form className={classname} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

Form.propTypes = {
  classname: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Form.defaultProps = {
  classname: "innerContainer",
};

export default Form;
