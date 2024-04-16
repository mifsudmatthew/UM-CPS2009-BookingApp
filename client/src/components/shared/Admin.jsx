import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import { useProfile } from "../../context/ProfileContext";

const Admin = ({ children }) => {
  const { user } = useProfile();

  const [isAdmin, setIsAdmin] = useState(null);

  const checkAdminStatus = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <>{children}</> : <></>;
};

Admin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Admin;
