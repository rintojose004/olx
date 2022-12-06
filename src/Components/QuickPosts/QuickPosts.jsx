import React from "react";
import PostCard from "../postCard/PostCard";

function QuickPosts({ posts }) {
  return (
    <div className="cards">
      {posts.map((product, index) => {
        return <PostCard product={product} index={index} />;
      })}
    </div>
  );
}

export default QuickPosts;
