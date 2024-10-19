import React from "react";
import { TEInput, TERipple } from "tw-elements-react";

const Footer = () => {
  return (
    <footer className="bg-bg text-center text-white">
      <div className="container px-6 pt-6 mx-auto">
        <div className="">
          <p className="text-sm text-gray-500">
            Welcome to Occasion Style, your ultimate destination for renting
            exquisite bridal dresses for both men and women. At Occasion Style,
            we believe in making every moment special, whether it's the day you
            say "I do" or any other memorable occasion in your life. With our
            curated selection of designer bridal attire, we aim to provide you
            with unparalleled convenience, flexibility, and sustainability in
            the world of fashion
          </p>
        </div>

        {/* <!-- Links section --> */}
        <div className="grid md:grid-cols-2 md:grid-cols-3">
          <div className="">
            <h5 className="mb-2.5 text-lg text-left ml-8">Company</h5>

            <ul className="mb-0 list-none text-left ">
              <li>
                <a href="/about" className="text-sm text-gray-500 text-left">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/policy" className="text-sm text-gray-500">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="/return" className="text-sm text-gray-500">
                  Return and Refund Policy
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-sm text-gray-500">
                  Shipping and Delivery Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h5 className="mb-2.5 text-lg text-left ml-8">Our Products</h5>

            <ul className="mb-0 list-none text-left ">
              <li>
                <a href="#" className="text-sm text-gray-500 text-left">
                  Women's Lehnga
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500">
                  Women's Maxi
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500">
                  Women's Traditional Dresses
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500">
                  Men's Three piece
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500">
                  Men's Shalwar Qameez
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500">
                  Men's Sherwani
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <h5 className="mb-2.5 text-lg text-left ml-8">Contact Us</h5>

            <ul className="mb-0 list-none text-left ">
              <li>
                <p className="text-sm text-gray-500">
                  <span className="text-2xl text-center justity-center">
                    <ion-icon name="location-outline"></ion-icon>{" "}
                  </span>{" "}
                  398-A Shershah Colony Link Raiwind Road Lahore, Pakistan
                </p>
              </li>

              <li>
                <p className="text-sm text-gray-500">
                  <span className="text-2xl text-center justity-center">
                    <ion-icon name="mail-outline"></ion-icon>{" "}
                  </span>
                  sales@occasionstyle.com
                </p>
              </li>
              <li>
                <p className="text-sm text-gray-500">
                  <span className="text-2xl text-center justity-center">
                    <ion-icon name="call-outline"></ion-icon>{" "}
                  </span>{" "}
                  03014717085
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!-- Copyright section --> */}
      <div className="bg-footer p-3 text-center">
        © 2024 Copyright:{" "}
        <a className="text-white text-bold" href="#">
          Occasion Style
        </a>
      </div>
      <div className="bg-footer flex flex-col items-center w-full space-y-4">
        <div className="flex justify-center space-x-4">
          <div className="flex flex-col items-center">
            <TERipple rippleColor="light">
              <a>
                <ion-icon name="logo-facebook" className="text-5xl"></ion-icon>
              </a>
            </TERipple>
          </div>

          <div className="flex flex-col items-center">
            <TERipple rippleColor="light">
              <a>
                <ion-icon name="logo-linkedin" className="text-5xl"></ion-icon>
              </a>
            </TERipple>
          </div>

          <div className="flex flex-col items-center">
            <TERipple rippleColor="light">
              <a>
                <ion-icon name="logo-instagram" className="text-5xl"></ion-icon>
              </a>
            </TERipple>
          </div>

          <div className="flex flex-col items-center">
            <TERipple rippleColor="light">
              <a>
                <ion-icon name="logo-github" className="text-5xl"></ion-icon>
              </a>
            </TERipple>
          </div>

          <div className="flex flex-col items-center">
            <TERipple rippleColor="light">
              <a>
                <ion-icon name="logo-skype" className="text-5xl"></ion-icon>
              </a>
            </TERipple>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
