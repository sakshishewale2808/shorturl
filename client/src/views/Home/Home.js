import React from 'react';
import "./Home.css";
import axios from "axios";
import { useState ,useEffect} from 'react';
import toast, {Toaster} from "react-hot-toast";
import LinkCard from '../../components/LinkCard/LinkCard';

function Home() {
    const [linkData,setlinkData]=useState({
        title:"",
        target:"",
        slug:""
    })

const [links,setLinks] = useState([])   

    const shortUrl = async () =>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`,linkData)

        if (response.data.success){
            toast.success("Link shorted successfully...")
            setlinkData({
                title:"",
                target:"",
                slug:""
            })
        }
        else{
            toast.error(response.data.message)
        }
    }
const fetchAlllinks = async ()=>{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/Links`)
    setLinks(response.data.data)
    toast.success("links fetched successfully")

}
useEffect(()=>{
    fetchAlllinks()
},[])
    return (
    <div>
        <h1>Link Smarter, Not Harder</h1>
        <div className='main-container-parent'>
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
             <button className='btn' onClick={shortUrl} type='button'>Shorten</button>
        </form>
        <div className='all-links-container'>
            <div className='h1-div'>
                <h1>All-Links</h1>
                </div>
            <div>

                {links.map((link,i)=>{
                     const {title,slug,target,views,createdAt} = link
                    return <LinkCard 
                    title={title}
                    slug={slug}
                    target={target} 
                    views={views}
                    createdAt={createdAt}                  
                    />
                }
            )}
            </div>
        </div>
        </div>

        <Toaster/>
     </div>
  )
}

export default Home