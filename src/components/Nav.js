import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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
  // {`nav ${show && "nav_black"}`} show가 true 일때 nav_black css가 나오도록

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/seach?q=${e.target.value}`);

  };
  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        alt="Netflix logo"
        src="data:image/png;base64,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"
        className="nav_logo"
        onClick={() => {
          window.location.reload();
        }}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요."
      />
      {/* 검색 기능을위해 input bar 생성 */}
      <img
        alt="User logged"
        src="https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_400x400.jpg"
        className="nav_avator"
      />
    </nav>
  );
}
