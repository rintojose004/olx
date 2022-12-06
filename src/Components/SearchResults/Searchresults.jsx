import React, { useContext } from "react";
import "./searchresults.css";
import { Link } from "react-router-dom";
import { AllPostContext } from "../../store/AllPostContext";
import PostCard from "../postCard/PostCard";

function Searchresults({ category }) {
  const { allPost } = useContext(AllPostContext);
  // filtering
  const displayCards = allPost
    .filter((obj) => obj.category === category)
    .map((product, index) => {
      return <PostCard product={product} index={index} key={index} />;
    });
  return (
    <>
      {category !== "null" && (
        <div>
          <div className="moreView">
            <div className="heading">
              <span>{category}</span>
              <Link to="./viewmore">
                <span>View more</span>
              </Link>
            </div>
            <div className="cards">{displayCards}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Searchresults;
