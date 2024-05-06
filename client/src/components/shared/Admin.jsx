import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useProfile } from "../../context/ProfileContext";

// Creating an admin component that checks if the user is an admin
const Admin = ({ children, fallback }) => {
  // Get the user from the ProfileContext
  const { user } = useProfile();

  // State to store the admin status
  const [isAdmin, setIsAdmin] = useState(null);

  // Check if the user is an admin
  useEffect(() => {
    // Function to check if the user is an admin
    const checkAdminStatus = async () => {
      if (
        // If the user is not defined or null or admin is not defined or null
        user == undefined ||
        user == null ||
        user.admin == undefined ||
        user.admin == null
      ) {
        setIsAdmin(false); // Set the admin status to false
        return;
      }

      setIsAdmin(user.admin); // Set the admin status to the user's admin status
    };

    checkAdminStatus(); // Call the function to check the admin status
  }, [user]);

  // If the admin status is null, return a loading message
  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  // If the user is an admin, return the children, else return the fallback
  return isAdmin ? <>{children}</> : <>{fallback}</>;
};

// Prop types for the Admin component
Admin.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

// Default prop values for the Admin component
Admin.defaultProps = {
  fallback: <div>Loading...</div>,
};

export default Admin; // Export the Admin component
