import React from "react";
import footer from "./footer.module.css";

const Footer = () => {
  return (
    <div className={`${footer.footer}`}>
      <div className={`${footer.footerContent} `}>
        <div className="">
          <h5>Social</h5>
          <hr />
          <div className={`${footer.links}`}>
            <p className="">Facebook</p>
            <p className="">Twitter</p> <p className="">Github</p>
          </div>
        </div>
        <div className="">
          <h5>Quick Links</h5> <hr />
          <div className={`${footer.links}`}>
            <p> Thanks for coming.</p>
            <p> Ipsum is.</p>
            <p>Lorem Ipsum is.</p>
          </div>
        </div>
        <div className="">
          <h5>Other</h5>
          <hr />
          <div className={`${footer.links}`}>
            <p>You are welcome.</p>
            <p>This website is awesome.</p>
            <p>Lorem is not simply random text.</p>
          </div>
        </div>
        {/* <div className="">1</div> */}
      </div>
    </div>
  );
};

export default Footer;
