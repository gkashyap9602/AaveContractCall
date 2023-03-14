import React, { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export const GlobalContext = createContext();

export const MainProvider = ({ children }) => {

    const [webData, setwebData] = useState({
        name: "",
        price: null,
        eModeLtv: null,
        eModeLiquidationThreshold: null,
        eModeLtvPenalty: null,
        reserveLiquidationThreshold: null,
        baseLTVasCollateral: null,
        availableLiquidity: null,
        underlyingAsset: null,
        supplyCap: null,
        reserveLiquidationPenalty: null,
        optimalUsageRatio:null,
      });

    return (
        <GlobalContext.Provider
          value={{
            webData,setwebData
            // compileContract : compileContract,
            
          }}
        >
          <ToastContainer />
          {children}
        </GlobalContext.Provider>
      );
    



}