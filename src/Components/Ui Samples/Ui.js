import React from 'react'
import "./ui.css"
export const Ui = () => {
  return (
    <>
    <div class="nav">
      <input type="checkbox" id="nav-checkbox-1" class="nav-checkbox" />
      <label for="nav-checkbox-1" class="nav-label">Ethereum</label>
      
      <input type="checkbox" id="nav-checkbox-2" class="nav-checkbox" />
      <label for="nav-checkbox-2" class="nav-label">Arbitrum</label>
      
      <input type="checkbox" id="nav-checkbox-3" class="nav-checkbox" />
      <label for="nav-checkbox-3" class="nav-label">Avalanche</label>
      
      <input type="checkbox" id="nav-checkbox-4" class="nav-checkbox" />
      <label for="nav-checkbox-4" class="nav-label">Optimism</label>
      
      <input type="checkbox" id="nav-checkbox-5" class="nav-checkbox" />
      <label for="nav-checkbox-5" class="nav-label">Fantom</label>
      
      <input type="checkbox" id="nav-checkbox-6" class="nav-checkbox" />
      <label for="nav-checkbox-6" class="nav-label">Polygon</label>
    </div>
    
    {/* <!-- Page content --> */}
    <div class="content">
      <h1>BTB's AAVE</h1>
      <p>Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers. 
        <br />
        Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.</p>
    </div>
    </>
  )
}
