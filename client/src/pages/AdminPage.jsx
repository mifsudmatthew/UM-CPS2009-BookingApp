import { AdminSidebar } from "../components/AdminSidebar";
import { Outlet } from 'react-router-dom';import "../styles/profile.css";

const AdminPage = () => {
    return (
        <div className="profile-container">
            <AdminSidebar />
            <Outlet />
        </div>
    );
}

export default AdminPage;