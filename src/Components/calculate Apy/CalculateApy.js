import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import "./main.css";
import PoolAbi from "../../ABI/Pool.json";
import PoolContractAbi from "../../ABI/PoolContract.json";

import { ethers } from "ethers";
import UIPoolDataProviderAbi from "../../ABI/UIProviderPoolData.json";

export const CalculateApy = () => {
  const { webData, setwebData } = useContext(GlobalContext);
  let navigate = useNavigate();

  const providerGlobal = new ethers.providers.Web3Provider(window.ethereum);
  const walletGlobal = new ethers.Wallet(
    "9c8a482060f0926097a2c6f3d4b38fd67e392f2c2c04e4e536b37fe6484e1491",
    providerGlobal
  );
  const signerGlobal = walletGlobal.provider.getSigner(walletGlobal.address);

  const supply = async () => {
    if (window.ethereum) {
      console.log(walletGlobal.address, "address");
      const supply = new ethers.Contract(
        "0xb00A75686293Fea5DA122E8361f6815A0B0AF48E",
        UIPoolDataProviderAbi,
        signerGlobal
      );
      console.log(supply);
      const poolCont = new ethers.Contract(
        "0x7b5C526B7F8dfdff278b4a3e045083FBA4028790",
        PoolContractAbi,
        signerGlobal
      );
      console.log(poolCont, "pool");
    } else {
      window.alert("Metamask not installed");
    }
  };
  const calculateApy = async (num) => {
    if (window.ethereum) {
      const contractInstancePoolUI = new ethers.Contract(
        "0xb00A75686293Fea5DA122E8361f6815A0B0AF48E",
        UIPoolDataProviderAbi,
        signerGlobal
      );
      const reservesData = await contractInstancePoolUI.getReservesData(
        "0xC911B590248d127aD18546B186cC6B324e99F02c"
      );
      console.log(reservesData, "reservesData");

      // const [liquidityIndex, variableBorrowIndex,
      //   currentLiquidityRate, currentVariableBorrowRate,
      //   currentStableBorrowRate,
      //   aTokenAddress, stableDebtTokenAddress,
      //   variableDebtTokenAddress] = await contractInstancePoolUI.getReservesData("0xC911B590248d127aD18546B186cC6B324e99F02c")

      const poolData = await contractInstancePoolUI.getReservesData(
        "0xC911B590248d127aD18546B186cC6B324e99F02c"
      );

      const convertNum = function (num) {
        if (num > 1000000000000) {
          return (num / 100000000000000000000).toFixed(1) + "T";
        } else if (num > 1000000000) {
          return (num / 1000000000).toFixed(1) + "B"; // convert to B for number from > 1 Billion
        } else if (num > 1000000) {
          return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
        } else {
          return num;
        }
      };

      const {
        name,
        underlyingAsset,
        availableLiquidity,
        supplyCap,
        baseLTVasCollateral,
        reserveLiquidationThreshold,
        eModeLtv,
        eModeLiquidationThreshold,
        priceInMarketReferenceCurrency,
        optimalUsageRatio,
        // aTokenAddress,
        // liquidityIndex,
        // variableBorrowIndex,
        liquidityRate,
        variableBorrowRate,
        // stableBorrowRate,
        // stableDebtTokenAddress,
        // variableDebtTokenAddress
      } = poolData[0][num];

      setwebData((prev) => ({
        ...prev,
        name: name,
        price: (Number(priceInMarketReferenceCurrency) / 100000000).toFixed(2),
        eModeLtv: Number(eModeLtv) / 100,
        eModeLiquidationThreshold: Number(eModeLiquidationThreshold) / 100,
        eModeLtvPenalty: Math.round(
          ((Number(eModeLiquidationThreshold) / 100 - Number(eModeLtv) / 100) *
            2) /
            2
        ),
        reserveLiquidationThreshold: Number(
          String(Number(reserveLiquidationThreshold)).substring(0, 2)
        ),
        reserveLiquidationPenalty: Math.round(
          ((Number(reserveLiquidationThreshold) / 100 -
            Number(baseLTVasCollateral) / 100) *
            2) /
            2
        ),
        optimalUsageRatio: (
          Number(optimalUsageRatio) / 10000000000000000000000000
        ).toFixed(),
        baseLTVasCollateral: Number(baseLTVasCollateral) / 100,
        availableLiquidity: convertNum(Number(availableLiquidity)),
        underlyingAsset: Number(underlyingAsset),
        supplyCap: convertNum(Number(supplyCap)),
      }));
      navigate("/redirect");

      // console.log("name",name,
      //   "availableLiquidity",Number(availableLiquidity),
      //   "priceInMarketReferenceCurrency",Number(priceInMarketReferenceCurrency)/100000000,
      //   "underlyingAsset",Number(underlyingAsset),
      //   "supplyCap",convertNum(Number(supplyCap)),
      //   "baseLTVasCollateral",Number(baseLTVasCollateral)/100,
      //   "reserveLiquidationThreshold",Number(reserveLiquidationThreshold),
      //   "ltvPenalty",Math.round((((Number(reserveLiquidationThreshold)/100)-(Number(baseLTVasCollateral)/100))*2)/2),
      //   "eModeLtv",Number(eModeLtv)/100,
      //   "eModeLtv",Number(eModeLiquidationThreshold)/100,
      //   "eModeLtv penalty",Math.round((((Number(eModeLiquidationThreshold)/100)-(Number(eModeLtv)/100))*2)/2),
      // )

      // aTokenAddress,
      // liquidityIndex,
      // variableBorrowIndex,
      // liquidityRate,
      // variableBorrowRate,
      // stableBorrowRate,
      // stableDebtTokenAddress,
      // variableDebtTokenAddress,
      // "atoken"
      // );

      const RAY = 10 ** 27; // 10 to the power 27

      const SECONDS_PER_YEAR = 31536000;

      const depositAPR = liquidityRate / RAY;
      const variableBorrowAPR = variableBorrowRate / RAY;
      const stableBorrowAPR = variableBorrowRate / RAY;

      console.log(
        depositAPR * 100,
        "depositAPR",
        variableBorrowAPR * 100,
        "variableBorrowAPR",
        stableBorrowAPR * 100,
        "stableBorrowAPR"
      );

      const depositAPY =
        ((1 + depositAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1;
      const variableBorrowAPY =
        ((1 + variableBorrowAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1;
      const stableBorrowAPY =
        ((1 + stableBorrowAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1;

      // const depositApy =
      //   ((1 + depositAPR / SECONDS_PER_YEAR)^SECONDS_PER_YEAR) - 1;

      console.log(
        depositAPY * 100,
        "depositApy",
        variableBorrowAPY * 100,
        "variableBorrowAPY",
        stableBorrowAPY * 100,
        "stableBorrowAPY"
      );

      // console.log(liquidityIndex, variableBorrowIndex,
      //   currentLiquidityRate, currentVariableBorrowRate,
      //   currentStableBorrowRate,
      //   aTokenAddress, stableDebtTokenAddress,
      //   variableDebtTokenAddress);

      //       RAY = 10**27 // 10 to the power 27
      // SECONDS_PER_YEAR = 31536000

      // Deposit and Borrow calculations
      // APY and APR are returned here as decimals, multiply by 100 to get the percents

      // depositAPR = liquidityRate/RAY
      // variableBorrowAPR = variableBorrowRate/RAY
      // stableBorrowAPR = variableBorrowRate/RAY

      // depositAPY = ((1 + (depositAPR / SECONDS_PER_YEAR)) ^ SECONDS_PER_YEAR) - 1
      // variableBorrowAPY = ((1 + (variableBorrowAPR / SECONDS_PER_YEAR)) ^ SECONDS_PER_YEAR) - 1
      // stableBorrowAPY = ((1 + (stableBorrowAPR / SECONDS_PER_YEAR)) ^ SECONDS_PER_YEAR) - 1

      // Incentives calculation

      // aEmissionPerYear = aEmissionPerSecond * SECONDS_PER_YEAR
      // vEmissionPerYear = vEmissionPerSecond * SECONDS_PER_YEAR

      // WEI_DECIMALS = 10**18 // All emissions are in wei units, 18 decimal places

      //  UNDERLYING_TOKEN_DECIMALS will be the decimals of token underlying the aToken or debtToken
      // For Example, UNDERLYING_TOKEN_DECIMALS for aUSDC will be 10**6 because USDC has 6 decimals

      // incentiveDepositAPRPercent = 100 * (aEmissionPerYear * REWARD_PRICE_ETH * WEI_DECIMALS)/
      //                           (totalATokenSupply * TOKEN_PRICE_ETH * UNDERLYING_TOKEN_DECIMALS)

      // incentiveBorrowAPRPercent = 100 * (vEmissionPerYear * REWARD_PRICE_ETH * WEI_DECIMALS)/
      //                           (totalCurrentVariableDebt * TOKEN_PRICE_ETH * UNDERLYING_TOKEN_DECIMALS)
    } else {
      window.alert("Metamask not installed");
    }
  };
  return (
    <>
      <button className="buttonss" onClick={() => calculateApy(0)}>
        Calculate Apy
      </button>
      <br />
      <div class="containers">
        <div class="row">
          <div class="col-10">DAI</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(0)}>
              Click
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-10">LINK</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(1)}>
              Click
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-10">USDC</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(2)}>
              Click
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-10">WBTC</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(3)}>
              Click
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-10">WETH</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(4)}>
              Click
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-10">USDT</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(5)}>
              Click
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-10">AAVE</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(6)}>
              Click
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-10">EURS</div>
          <div class="col-2">
            <button className="buttonss" onClick={() => calculateApy(7)}>
              Click
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
