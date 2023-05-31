import React, { useState, useEffect } from "react";
import "./Nav.css";
export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("window.scrollY", window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // scroll 내릴때 50보다 크면 setshow를 true로 해서 
  // {`nav ${show && "nav_black"}`} show가 true 일때 nav_blakc css가 나오도록
  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Netflix.png"
        className="nav_logo"
        onClick={() => {
          window.location.reload();
        }}
      />
      <img
        alt="User logged"
        src="https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_400x400.jpg"
        className="nav_avator"
      />
    </nav>
  );
}
