import React,{useState} from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow'
import Searchresults from '../SearchResults/Searchresults';

function Banner() {
  
  const [category, setCategory] = useState();

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
          <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              <option value="null">ALL CATEGORIES</option>
              <option value="Cars">Cars</option>
              <option value="Cameras & Lenses">Cameras & Lenses</option>
              <option value="Computers & Laptops">Computers & Laptops</option>
              <option value="Mobile">Mobile Phones</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Tablets">Tablets</option>
              <option value="Apartments">Apartments</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("Mobile")} >Mobile Phones</span>
            <span onClick={()=>setCategory("Cars")} >Cars</span>
            <span onClick={()=>setCategory("Cameras & Lenses")} >Cameras & Lenses</span>
            <span onClick={()=>setCategory("Computers & Laptops")} >Computers & Laptops</span>
            <span onClick={()=>setCategory("Motorcycles")} >Motorcycles</span>
            <span onClick={()=>setCategory("Tablets")} >Tablets</span>
            <span onClick={()=>setCategory("Apartments")} >Apartments</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt="bannerimg"
          />
        </div>
      </div>
      { category!=null && <Searchresults category={category} /> }
    </div>
  );
}

export default Banner;
