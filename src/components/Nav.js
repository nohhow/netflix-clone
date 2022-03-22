import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css"

const Nav = () => {

  const [show, setShow] = useState(false); 
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener("scroll", ()=>{
      if(window.scrollY > 50){
        setShow(true);
      }else{
        setShow(false);
      }
    })
  
    return () => {
      window.removeEventListener("scroll", () => {})
    }
  }, [])

  const hanleChange=(e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }
  
  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        alt="Netflix Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/400px-Netflix_2015_logo.svg.png"
        className="nav_logo"
        onClick={() => window.location.reload()}
      />

      <input value={searchValue} onChange={hanleChange} className="nav_input" type="text" placeholder="영화를 검색해주세요."/>
      <img
        alt="User Logged"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
        className="nav_avatar"
      />
    </nav>
  );
};

export default Nav;
