import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../store/FirebaseContext";
import { PostContext } from "../../store/PostContext";

import "./View.css";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  // fetching userDetails who posted (seller details)
  useEffect(() => {
    const { userId } = postDetails;
    if (userId === undefined) {
      history.push("/");
    } else {
      firebase
        .firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [history, postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.url} alt="postdetails" />
      </div>

      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>Name : {postDetails?.name}</span>
          <p>Category : {postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>

        {/* user Details */}
        {userDetails && (
          <div className="contactDetails">
            <h3>Seller details</h3>
            <p>Name : {userDetails.userName}</p>
            <p>Phone : {userDetails.phone}</p>
          </div>
        )}
        <div className="home-btn">
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Back to Home{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default View;
