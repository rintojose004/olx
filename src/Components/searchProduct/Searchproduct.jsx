import React, { useState, useContext } from "react";
import Search from "../../assets/Search";
// import CloseIcon from "..//../assets/CloseIcon/CloseIcon";
import { useHistory } from "react-router";
import { AllPostContext } from "../../store/AllPostContext";
import { PostContext } from "../../store/PostContext";
import "./searchProduct.css"

function SearchProduct() {
  const { allPost, setAllPost } = useContext(AllPostContext);
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.category.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch = (item) => {
    setPostDetails(item);
    history.push("/view");
  };
  const handleSearchClick = () => {
    if (filteredData.length === 0) {
      alert(
        "No items found.., please search by product category or product name"
      );
    } else {
      setAllPost(filteredData);
      history.push("/view");
    }
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Find Cars,Mobile,Motorcycles and more..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          <div onClick={handleSearchClick}>
            {" "}
            <Search />{" "}
          </div>
          {filteredData.length !== 0 && (
            <div id="clearBtn" onClick={clearInput}>
              <h4>x</h4>
            </div>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div
                key={key}
                className="dataItem"
                onClick={() => handleSelectedSearch(value)}
              >
                <p>{value.name} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
