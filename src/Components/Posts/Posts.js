import React, { useEffect, useState, useContext } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../store/FirebaseContext";
import { AllPostContext } from "../../store/AllPostContext";
import QuickPosts from "../QuickPosts/QuickPosts";
import Loading from "../loading/Loading";
import PostCard from "../postCard/PostCard";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setAllPost } = useContext(AllPostContext);
  let [posts, setPosts] = useState([]); // ascending order of date
  let [posts2, setPosts2] = useState([]); // Decending order of date
  let [loading, setLoading] = useState(false);
  let [loadingAsc, setLoadingAsc] = useState(false);

  // useeffect
  useEffect(() => {
    setLoading(true);
    setLoadingAsc(true);
    // descending order
    firebase
      .firestore()
      .collection("products")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        const allDescendingOrder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setPosts2(allDescendingOrder);
        setAllPost(allDescendingOrder);
        setLoading(false);
      });

    // ascending order
    firebase
      .firestore() //fetching all posts from firebase in asecnding order of date
      .collection("products")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const allAscendingOrder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setPosts(allAscendingOrder);
        setLoadingAsc(false);
      });
  }, []);
  // freshRecomendationCards
  const freshRecomendationCards = posts.map((product, index) => {
    if (index < 4) {
      return (
        <div className="fresh-recomendation-card" key={index}>
          <PostCard product={product} index={index} />
        </div>
      );
    }
    return null;
  });

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <Link to="/viewmore">
            <span>View more</span>
          </Link>
        </div>
        {loading && (
          <Loading type="bars" color="grey" height={"10%"} width={"10%"} />
        )}
        <QuickPosts posts={posts2} />
      </div>

      {/* Fresh Recommendations */}
      <div
        style={{
          margin: "16px 16px 24px",
          padding: "16px 16px 32px",
          backgroundColor: "#ebeeef",
          borderRadius: "4px",
        }}
      >
        <div className="heading">
          <span>Fresh Recommendations</span>
        </div>
        {loadingAsc ? (
          <Loading type="bars" color="grey" height={"10%"} width={"10%"} />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {freshRecomendationCards}
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
