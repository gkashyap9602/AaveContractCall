import React, { useState } from "react";
// import {ethers} from "ethers"
import { ethers } from "ethers";
import PoolAddressProviderAbi from "../ABI/PoolAddressProvider.json";
import PoolAbi from "../ABI/Pool.json";
import LinkAbi from ".././ABI/ChainLink.json";
import UIPoolDataProviderAbi from ".././ABI/UIProviderPoolData.json";

export const Main = () => {
  const [poolAddress, setPoolAddress] = useState();

  const AMOUNT = ethers.utils.parseEther("10");
  console.log(AMOUNT, "Amount--");

  const getPoolContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider, "provider");
      const signer = provider.getSigner();
      console.log(signer, "signer");
      // const contractInstance = new ethers.Contract("0xC911B590248d127aD18546B186cC6B324e99F02c",PoolAddressProviderAbi,signer)

      const wallet = new ethers.Wallet(
        "dcd3578010ab2eea44f9bfd8e4c2a62df48ba9922e8a83d4bd5222e4e600bfee",
        provider
      );

      // cd44cd6fc893d98ca2e53e95d04e807e6ea12d0a587a2a2aa507f2b8b51d9fc2
      // cd44cd6fc893d98ca2e53e95d04e807e6ea12d0a587a2a2aa507f2b8b51d9fc2   // ganache acc
      // ("dcd3578010ab2eea44f9bfd8e4c2a62df48ba9922e8a83d4bd5222e4e600bfee",provider)

      console.log(wallet.address, "wallet.address");
      const signer2 = wallet.provider.getSigner(wallet.address);
      const contractInstance = new ethers.Contract(
        "0xC911B590248d127aD18546B186cC6B324e99F02c",
        PoolAddressProviderAbi,
        signer2
      );

      console.log(contractInstance, "contractInstance");

      const getPoolResult = await contractInstance.getPool();

      setPoolAddress(getPoolResult);

      console.log(getPoolResult, "getPoolResult--");
    } else {
      window.alert("errr");
    }
  };

  const depositeEth = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider, "provider");
      const signer = provider.getSigner();
      console.log(signer, "signer");
      // const contractInstance = new ethers.Contract("0xC911B590248d127aD18546B186cC6B324e99F02c",PoolAddressProviderAbi,signer)

      const wallet = new ethers.Wallet(
        "dcd3578010ab2eea44f9bfd8e4c2a62df48ba9922e8a83d4bd5222e4e600bfee",
        provider
      );

      // cd44cd6fc893d98ca2e53e95d04e807e6ea12d0a587a2a2aa507f2b8b51d9fc2
      // cd44cd6fc893d98ca2e53e95d04e807e6ea12d0a587a2a2aa507f2b8b51d9fc2   // ganache acc
      // ("dcd3578010ab2eea44f9bfd8e4c2a62df48ba9922e8a83d4bd5222e4e600bfee",provider)

      console.log(wallet.address, "wallet.address");
      const signer2 = wallet.provider.getSigner(wallet.address);

      console.log(poolAddress, "poolAddress under deposite fn");
      const contractInstancePool = new ethers.Contract(
        poolAddress,
        PoolAbi,
        signer2
      );

      console.log(contractInstancePool, "contractInstancePool");

      const ERC20LINK = new ethers.Contract(
        "0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29",
        LinkAbi,
        signer2
      );
      console.log(ERC20LINK, "ERC20LINK instance");
      //  const Erc20 = await ethers.getContractAt("IERC20", wallet.address, signer2)
      //  console.log(Erc20,"Erc20")

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, "acccounts");

      //   const res = await ERC20.allowance(wallet.address,poolAddress,{
      //         gasLimit: 300000,
      //       }
      //     )
      //   console.log(res,"resres")
      const approve = await ERC20LINK.approve(poolAddress,AMOUNT)

      console.log(approve,"approve")

      // const supplyResult = await contractInstancePool.supply("0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29",AMOUNT,wallet.address,0)
      const supplyResult = await contractInstancePool.supply(
        "0xe9c4393a23246293a8D31BF7ab68c17d4CF90A29",
        AMOUNT,
        wallet.address,
        0,
        {
          gasLimit: 300000,
        }
      );

      console.log(supplyResult, "supplyResult");

      // console.log(getPoolResult,"getPoolResult--")
    } else {
      window.alert("errr");
    }
  };
  //ends

  const getPools = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider, "provider");
      // const signer = provider.getSigner()
      // console.log(signer,"signer")
      // const contractInstance = new ethers.Contract("0xC911B590248d127aD18546B186cC6B324e99F02c",PoolAddressProviderAbi,signer)

      const wallet = new ethers.Wallet(
        "dcd3578010ab2eea44f9bfd8e4c2a62df48ba9922e8a83d4bd5222e4e600bfee",
        provider
      );

      // cd44cd6fc893d98ca2e53e95d04e807e6ea12d0a587a2a2aa507f2b8b51d9fc2
      // cd44cd6fc893d98ca2e53e95d04e807e6ea12d0a587a2a2aa507f2b8b51d9fc2   // ganache acc
      // ("dcd3578010ab2eea44f9bfd8e4c2a62df48ba9922e8a83d4bd5222e4e600bfee",provider)

      console.log(wallet.address, "wallet.address");
      const signer2 = wallet.provider.getSigner(wallet.address);
      const contractInstancePoolUI = new ethers.Contract(
        "0xb00A75686293Fea5DA122E8361f6815A0B0AF48E",
        UIPoolDataProviderAbi,
        signer2
      );

      console.log(contractInstancePoolUI, "contractInstancePoolUI");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, "acccounts");
      const reserveList = await contractInstancePoolUI.getReservesList(
        "0xC911B590248d127aD18546B186cC6B324e99F02c",
        {
          gasLimit: 300000,
        }
      );
      console.log(reserveList, "reserveList");

      const reservesData = await contractInstancePoolUI.getReservesData(
        "0xC911B590248d127aD18546B186cC6B324e99F02c"
      );

      console.log(reservesData, "reservesData");
    } else {
      window.alert("errr");
    }
  };

  ///ends

 

  return (
    <div>
      <button onClick={getPoolContract}>Get Pool Address</button>

      <br />

      <button onClick={depositeEth}>depositeIn Pool</button>
      <br />

      <button onClick={getPools}>getPool</button>
      <br />
     
    </div>
  );
};
