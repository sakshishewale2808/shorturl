import React from 'react';
import "./Home.css";
import axios from "axios";
import { useState } from 'react';

function Home() {
    const [linkData,setlinkData]=useState({
        title:"",
        target:"",
        slug:""
    })
  return (
    <div>
        <h1>Link Smarter, Not Harder</h1>
        <form className='form'>
            <input 
            type="text"
             placeholder="Title" 
             value={linkData.title}
             onChange={(e)=>{
                setlinkData({
                    ...linkData,
                    title:e.target.value
                })
             }}
             className="input-fields"
             />
              <input 
            type="text"
             placeholder="Target URL" 
             value={linkData.target}
             onChange={(e)=>{
                setlinkData({
                    ...linkData,
                    target:e.target.value
                })
             }}
              className="input-fields"
             />
              <input 
            type="text"
             placeholder="Slug" 
             value={linkData.slug}
             onChange={(e)=>{
                setlinkData({
                    ...linkData,
                    slug:e.target.value
                })
             }}
              className="input-fields"
             />
             <button className='btn' type='button'>Shorten</button>
        </form>
     </div>
  )
}

export default Home