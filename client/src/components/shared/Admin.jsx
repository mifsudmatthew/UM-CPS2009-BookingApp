import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useProfile } from "../../context/ProfileContext";

const Admin = ({ children, fallback }) => {
  const { user } = useProfile();

  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (
        user == undefined ||
        user == null ||
        user.admin == undefined ||
        user.admin == null
      ) {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(user.admin);
    };

    checkAdminStatus();
  }, [user]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <>{children}</> : <>{fallback}</>;
};

Admin.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

Admin.defaultProps = {
  fallback: <div>Loading...</div>,
};

export default Admin;
