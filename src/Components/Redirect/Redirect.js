import React, { useState, useEffect, useContext } from "react";
import "./Redirect.css"
import { GlobalContext } from "../../context/MainContext";
const Redirect = () => {
	const { webData,setwebData } =
  useContext(GlobalContext);
  console.log(webData,"webData");
  return (
<>
<header>
  <div class="logo">
    <h1>AAVE</h1>
  </div>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>
<div class="container">
		<div class="field">
			<h2 class="name">Currency Name</h2>
			<p class="data">{webData.name}</p>
		</div>
		<div class="field">
			<h2 class="name">Price</h2>
			<p class="data">{webData.price}$</p>
		</div>
		<div class="field">
			<h2 class="name">Supply</h2>
			<p class="data">{webData.supplyCap}</p>
		</div>
		<div class="field">
			<h2 class="name">MAX LTV</h2>
			<p class="data">{webData.baseLTVasCollateral}%</p>
		</div>
		<div class="field">
			<h2 class="name">Liqidation Thereshold</h2>
			<p class="data">{webData.reserveLiquidationThreshold}%</p>
		</div>
		<div class="field">
			<h2 class="name">Liquidation Penalty</h2>
			<p class="data">{webData.reserveLiquidationPenalty}%</p>
		</div>
		<div class="field">
			<h2 class="name">Underlying Asset</h2>
			<p class="data">{webData.underlyingAsset}</p>
		</div>
		<div class="field">
			<h2 class="name">Available Liquidity</h2>
			<p class="data">{webData.availableLiquidity}</p>
		</div>
		<div class="field">
			<h2 class="name">Emode Ltv</h2>
			<p class="data">{webData.eModeLtv}%</p>
		</div>
		<div class="field">
			<h2 class="name">eModeLiquidationThreshold</h2>
			<p class="data">{webData.eModeLiquidationThreshold}%</p>
		</div>
		<div class="field">
			<h2 class="name">eModeLtvPenalty</h2>
			<p class="data">{webData.eModeLtvPenalty}%</p>
		</div>
		<div class="field">
			<h2 class="name">Optimal Usage Ratio</h2>
			<p class="data">{webData.optimalUsageRatio}%</p>
		</div>
	</div>
</>

    )
}

export default Redirect