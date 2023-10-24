import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[var(--primary)] text-white  mt-auto mx-auto py-8 border-t">
      <div className="w-[90%] grid xl:grid-cols-4 mx-auto mb-5 gap-4 sm:grid-cols-2 grid-cols-6 ">
        <div className="max-sm:col-span-6 space-y-4 ">
          <p
            className="logo text-2xl sora font-extrabold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            UrbanCart<span className="text-[var(--secondary)]"> .</span>
          </p>
          <p className="max-w-md mt-2">
            The fully functional ecommerce website made using MERN stack.
          </p>
        </div>
        <div className="space-y-4 max-sm:col-span-3">
          <h5 className="text-xl font-bold">Discover More</h5>

          <ul className="!underline">
            <li>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
            </li>
            <li>
              <Link to={"/cart"}>Cart</Link>
            </li>
            <li>
              <Link to={"/orders"}>Orders</Link>
            </li>
            <li>
              <li>
                <Link to={"/payment"}>Payments</Link>
              </li>
            </li>
          </ul>
        </div>
        <div className="space-y-4 max-sm:col-span-3">
          <h5 className="text-xl font-bold">User Info</h5>
          <ul className="space-y-2 !underline">
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>

            <li>
              <Link to={"/user/inbox"}>Inbox</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4 max-sm:col-span-5">
          <h5 className="text-xl font-bold">Socials</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="bg-white rounded-full"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <p className="max-w-sm">
            Do you like this project? then give us a{" "}
            <a
              href="https://github.com/Shreedhar03/UrbanCart"
              className="underline"
            >
              star on github{" "}
            </a>
          </p>
        </div>
      </div>
      <div className="text-center text-[var(--secondary)]">
        &copy;UrbanCart. All Rights Reserved
      </div>
    </footer>
  );
}
