import React from "react";

const Footer = () => {
  return (
    <div className="px-24 py-3 bg-[#d8d6d5]">
      <div className="flex justify-between my-6">
        <div>
          <div className="logo text-2xl font-bold">
            Shoe<span className="">Shack.</span>
          </div>
          <div>A classic collections of branded shoes.</div>
        </div>
        <div>
          <h1 className="font-bold">Company</h1>
          <ul>
            <li>About</li>
            <li>Feature</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold">Help</h1>
          <ul>
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold">FAQ</h1>
          <ul>
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-gray-300  py-4 font-thin ">
        ShoeShack. © 2024-2028. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
