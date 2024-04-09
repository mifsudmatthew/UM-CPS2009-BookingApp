import PropTypes from "prop-types";

const Form = ({ classname, children }) => {
  return <form className={classname}>{children}</form>;
};

Form.propTypes = {
  classname: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Form.defaultProps = {
  classname: "innerContainer",
};

export default Form;
