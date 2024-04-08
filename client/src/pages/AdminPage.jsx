import { AdminSidebar } from "../components/AdminSidebar";
import { Outlet, Navigate } from 'react-router-dom';
import "../styles/profile.css";
import { useUser } from "../context/User";
import {useAuth} from "../context/Auth";

/**
 * Renders the admin page.
 *
 * @returns {JSX.Element} The rendered admin page.
 */
const AdminPage = () => {
    // Check if the user is an admin based on token
    const {user, setUser} = useUser();
    const { token, setToken } = useAuth();

    if (!user.admin || token === "") { // Redirect to the home page if the user is not an admin
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="profile-container">
            <AdminSidebar />
            <Outlet />
        </div>
    );
}

export default AdminPage;