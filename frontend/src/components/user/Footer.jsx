import React from "react";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import instagram from "../../assets/instagram.png";
const Footer = () => {
  return (
    <div className="px-24 py-1 bg-[#d8d6d5]">
      <div className="flex justify-between my-3">
        <div>
          <div className="logo text-2xl font-bold">
            Shoe<span className="">Shack.</span>
          </div>
          <div>A classic collection of branded shoes.</div>
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
      <div className="border-t-2 border-gray-300 py-4 font-thin">
        ShoeShack. © 2024-2028. All Rights Reserved
      </div>
      <div className="border-t-2 border-gray-300 py-4 flex justify-center items-center">
        <div className="mx-2">
          Built by <span className="font-bold">Sachin Choudhary</span>
        </div>
        <div className="flex space-x-4 mx-2 w-[150px] ">
          <a
            href="https://github.com/Sach-123"
            target="_blank"
            className="hover:scale-105"
          >
            <img src={github} alt="github" />
          </a>
          <a
            href="https://www.linkedin.com/in/sachin0203/"
            target="_blank"
            className="hover:scale-105"
          >
            <img src={linkedin} alt="linkedin" />
          </a>
          <a
            href="https://www.instagram.com/sach_0203/"
            target="_blank"
            className="hover:scale-105"
          >
            <img src={instagram} alt="instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
