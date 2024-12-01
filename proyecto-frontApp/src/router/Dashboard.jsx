import React, { useEffect, useState } from 'react';
import '../css/dashboard.css';
import { useSelector } from 'react-redux';



const Dashboard = () => {

    //aqui llamamos los payload necesarios que necestiamos para poder realizar el login
    const { authPayload, status } = useSelector(state => state.auth);


    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        if (tokenString) {
            /* authPayload, status, tokenString */
            /*  console.log("VIENDO LA DATA",tokenString, authPayload); */
        }
    }, [authPayload, status]);

    return (
        <div className="dashboard-container">
            <main className="dashboard-main">
                <h2>Dashboard Overview</h2>
                <div className="stats">
                    <div className="stat-item">
                        <h3>Total Sales</h3>
                        <p>$10,000</p>
                    </div>
                    <div className="stat-item">
                        <h3>New Users</h3>
                        <p>150</p>
                    </div>
                    <div className="stat-item">
                        <h3>Revenue</h3>
                        <p>$5,000</p>
                    </div>
                </div>
                <div className="charts">
                    <div className="chart-item">
                        <h3>Sales Chart</h3>
                        {/* Placeholder for chart */}
                        <div className="chart-placeholder">Chart Placeholder</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
