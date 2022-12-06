import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import "./allPosts.css";
import Heart from "../../assets/Heart";
import { useHistory } from "react-router-dom";
import { PostContext } from "../../store/PostContext";
import Loading from "../loading/Loading";

function AllPosts() {
  const [productList, setProductlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();
  // handleClick
  const handleClick = (obj) => {
    setPostDetails(obj);
    history.push("/view");
  };
  // fetch All posts
  useEffect(() => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const productList = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProductlist(productList);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <Loading
          type="spinningBubbles"
          color="yellowGreen"
          height={"10%"}
          width={"10%"}
        />
      )}

      <div className="main-container">
        {productList?.map((obj) => {
          return (
            <div
              className="card-all"
              key={obj.id}
              onClick={() => handleClick(obj)}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={obj.url} alt="img" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {obj.price}</p>
                <span className="category"> {obj.category} </span>
                <p className="name"> {obj.name}</p>
              </div>
              <div className="date">
                <span>{obj.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllPosts;
