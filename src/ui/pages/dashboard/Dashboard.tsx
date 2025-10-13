import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './Dashboard.scss';

function Dashboard() {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentOption, setCurrentOption] = useState("INICIO");
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`dashboard ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-container" onClick={handleToggleSidebar}>
                    {isSidebarCollapsed ? (
                        <span className="material-icons logo-icon">menu</span>
                    ) : (
                        <h2 className="logo">My Data-Lab</h2>
                    )}
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/dashboard" onClick={() => setCurrentOption("INICIO")}>
                                <span className="material-icons">home</span>
                                {!isSidebarCollapsed && <span>INICIO</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="sensors" onClick={() => setCurrentOption("SENSORES")}>
                                <span className="material-icons">sensors</span>
                                {!isSidebarCollapsed && <span>SENSORES</span>}
                            </Link>
                        </li>
                        <li>
                            <a >
                                <span className="material-icons">bar_chart</span>
                                {!isSidebarCollapsed && <span>ESTADISTICAS</span>}
                            </a>
                        </li>
                        <li>
                            <Link to="reports" onClick={() => setCurrentOption("REPORTES")}>
                                <span className="material-icons">assignment</span>
                                {!isSidebarCollapsed && <span>REPORTES</span>}
                            </Link>
                        </li>
                        <li>
                            <a >
                                <span className="material-icons">settings</span>
                                {!isSidebarCollapsed && <span>CONFIGURACION</span>}
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="main">
                {/* Topbar */}
                <div className="topbar">
                    <span className='header-title'>{currentOption}</span>
                    <button className="logout-button" onClick={() => navigate("/")}>
                        <span className="material-icons Logout-icon">account_circle</span>
                        Login Out
                    </button>
                </div>

                {/* Outlet carga las rutas hijas */}
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;