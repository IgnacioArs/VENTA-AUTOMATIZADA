import React, { useEffect, useState } from 'react';
import '../../../css/menu/dashboard.css';
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

    const products = [
        { id: 1, name: "VENGEANCE® 32GB (2x16GB) DDR5 DRAM 6000MT/s CL36 Memory Kit — Black", price: "61.98 €", image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Memory/vengeance-ddr5-blk-config/Gallery/VENGEANCE_DDR5_BLK_01_2up.webp" },
        { id: 2, name: "K65 PLUS WIRELESS Artist Series Edition", price: "89.99 €", image: "https://assets.corsair.com/image/upload/f_auto/q_auto:low/pg_name:80-016166/v1713567720/pages/universal-configurator/psd/K65-PLUS-WL/K65_Plus_Top.png" },
        { id: 3, name: "Headset Logitech G935", price: "129.50 €", image: "https://www.logitechg.com/content/dam/gaming/en/products/g935/g935-gallery-1.png" },
      ];
      
      return (
        <div className="dashboard-container">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-img-box">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
      
              <div className="product-content-box">
                <h3>{product.name}</h3>
                <h2 className="product-price">
                  {product.price}
                </h2>
                <a href="#" className="product-buy-btn">
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>
      );
      
};

export default Dashboard;
