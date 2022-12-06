import React,{useContext} from 'react'
import Heart from "../../assets/Heart";
import { useHistory } from "react-router-dom";
import { PostContext } from '../../store/PostContext';

function PostCard({product,index}) {
    const {setPostDetails} = useContext(PostContext)
    const history = useHistory()
    // handleClick
    const handleClick = ()=>{
        setPostDetails(product)
        history.push("/view");
    }
  return (
    <div className="card" key={index} onClick={handleClick} >
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.url} alt="" />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p>
          <span className="category"> {product.category} </span>
          <p className="name"> {product.name}</p>
        </div>
        <div className="date">
          <span>{product.createdAt}</span>
        </div>
      </div>
  )
}

export default PostCard