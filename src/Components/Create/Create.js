import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../store/FirebaseContext";
import { AuthContext } from "../../store/AuthContext";
import Loading from "../loading/Loading";

const Create = () => {
  const history = useHistory();
  let [name, setName] = useState("");
  let [category, setCategory] = useState("");
  let [price, setPrice] = useState("");
  let [image, setImage] = useState();
  let [loading, setLoading] = useState(false);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  // handleSubmit
  const date = new Date();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase
            .firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString(),
            })
            .then(() => {
              history.push("/");
            });
        });
      });
  };

  return (
    <Fragment>
      {/* <Header /> */}

      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              required
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <select
              required
              name="category"
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="input"
            >
              <option label="Please Select" value=""></option>
              <option value="Mobile">Mobile</option>
              <option value="Cars">Cars</option>
              <option value="Cameras & Lenses">Cameras & Lenses</option>
              <option value="Computers & Laptops">Computers & Laptops</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Tablets">Tablets</option>
              <option value="Apartments">Apartments</option>
            </select>
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              required
              type="number"
              id="fname"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <br />

            <br />
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : ""}
            ></img>

            <br />
            <input
              required
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <br />
            {loading && (
              <Loading
                type="spokes"
                color="green"
                height={"20%"}
                width={"20%"}
              />
            )}
            <button className="uploadBtn" type="submit">
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
