import React from "react";
import Style from "./Footer.module.css";
import amexpress from "../../Assets/Images/amExpress.png";
import amazonpay from "../../Assets/Images/amazonPay.png";
import mastercard from "../../Assets/Images/masterCard.png";
import paypal from "../../Assets/Images/paypal.png";
import playStore from "../../Assets/Images/playstore.png";
import appleStore from "../../Assets/Images/applestore.png";

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-main-light mt-4">
        <div className="container-fluid padding-container py-4">
          <h1>Get the FreshCart app</h1>
          <p className="text-secondary">
            {" "}
            we will send you a link, open it on your phone to download the app{" "}
          </p>

          <div className="row mt-3 mb-3">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control "
                placeholder="Email"
              />
            </div>
            <div className="col-md-2 text-center">
              <button className="btn bg-main px-4 py-2 w-100 text-white fw-medium">
                Share App Link
              </button>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-md-5 align-items-center  justify-content-center d-flex">
              <div className="d-flex align-items-center  justify-content-center row">
                <span className="col-md-4 " >Payment Partners</span>
                <div className="logoImg px-2 col-md-2">
                  <img src={amazonpay} alt="" className="w-75" />
                </div>
                <div className="logoImg px-2 col-md-2">
                  <img src={amexpress} alt="" className="w-100" />
                </div>
                <div className="logoImg px-2 col-md-2">
                  <img src={mastercard} alt="" className="w-100" />
                </div>
                <div className="logoImg px-2 col-md-2">
                  <img src={paypal} alt="" className="w-100" />
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="d-flex align-items-center row">
                <span className="col-md-5">Get deliveries with FreshCart</span>
                <div className="logoImg2 px-2 d-flex align-items-center col-md-3">
                  <img src={appleStore} alt="" className="w-100" />
                </div>
                <div className="logoImg2 px-2 col-md-3">
                  <img src={playStore} alt="" className="w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
