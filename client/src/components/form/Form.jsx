/**
 * @file Form.jsx
 * @desc A component that returns a form element with the specified classname and children.
 */

import PropTypes from "prop-types";

// The Form component is a component that returns a form element with the specified classname and children.
const Form = ({ classname, children }) => {
  return <form className={classname}>{children}</form>;
};

// The classname prop is a string that specifies the class name of the form element.
Form.propTypes = {
  classname: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// The classname prop is set to "innerContainer" by default, meaning that the form element will have the class name "innerContainer" if no classname prop is provided.
Form.defaultProps = {
  classname: "innerContainer",
};

export default Form;
