import React from "react";
// import Heart from "../../assets/Heart";
import PostCard from "../postCard/PostCard";

function FreshRecom({ posts }) {
  return (
    <div className="cards">
      {posts.map((product, index) => {
        return <PostCard product={product} index={index} />;
      })}
    </div>
  );
}

export default FreshRecom;
