import React, { useContext, useState } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../store/FirebaseContext";
import { useHistory } from "react-router-dom";
import { AllPostContext } from "../../store/AllPostContext";
import { PostContext } from "../../store/PostContext";
import SearchProduct from "../searchProduct/Searchproduct";

function Header() {
  const { user } = useContext(AuthContext);
  const { allPost } = useContext(AllPostContext);
  const { setPostDetails } = useContext(PostContext);
  const [filteredData, setFilteredData] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const [wordEntered, setWordEntered] = useState("");
  const history = useHistory();

  // handleFilter

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((val) => {
      return val.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  // clearInput
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  // handleSelectedSearch
  const handleSelectedSearch = (value) => {
    setPostDetails(value);
    history.push("/view");
  };
  // handleEmptyClick
  const handleEmptyClick = () => {
    alert("No items found.., please search by product name");
  };

  // logoutHandler
  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          className="brandName"
          onClick={() => {
            history.push("/");
          }}
        >
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          {/* <Search></Search> */}
          <input
            type="text"
            placeholder="Search specific product..."
            value={wordEntered}
            onChange={handleFilter}
          />
          {filteredData.length === 0 ? (
            <div onClick={handleEmptyClick}>
              {" "}
              <Search />{" "}
            </div>
          ) : (
            <div id="clearBtn" onClick={clearInput}>
              {" "}
              <Arrow></Arrow>
            </div>
          )}
          {/* <Arrow></Arrow> */}
          {filteredData.length !== 0 && (
            <div className="dataResult-header">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <div
                    key={key}
                    className="dataItem-header"
                    onClick={() => handleSelectedSearch(value)}
                  >
                    <p>{value.name} </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div >
          {/* <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div> */}
          <SearchProduct />
          {/* <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div> */}
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            `Welcome ${user.displayName}`
          ) : (
            <Link to="/login">
              <span className="login-span">Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={logoutHandler} className="button-55">
            Logout
          </span>
        )}
        <Link to="/create">
          { user && <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div> }
        </Link>
      </div>
    </div>
  );
}

export default Header;
