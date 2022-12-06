import React, { createContext,useState } from "react";


export const PostContext = createContext()

const ContextPost =({children})=>{
    const[postDetails,setPostDetails]=useState([])

    return (
        <PostContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}
export default ContextPost