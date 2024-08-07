import React from 'react';
import "./Home.css";
import axios from "axios";
import { useState ,useEffect} from 'react';
import toast, {Toaster} from "react-hot-toast";
import LinkCard from '../../components/LinkCard/LinkCard';

function Home() {
    const [user,setUser] = useState('')
    const [linkData,setlinkData]=useState({
        title:"",
        target:"",
        slug:"",
        user: ""
    })

    const [links,setLinks] = useState([])   
    useEffect(()=>{
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))

        if(currentUser){
            setUser(currentUser)
            setlinkData({...linkData, user: currentUser._id})
        }
        if(!currentUser){
            window.location.href = "/login"
        }
    },[]
    )
   const loadLinks = async()=>{
        if(!user._id){
            return
        }
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/userlink?userId=${user._id}`)  
    setLinks(response.data.data)
    toast.dismiss()  

    }
    useEffect(()=>{
        loadLinks()
    },[user])

    const shortUrl = async () =>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`,linkData)

        if (response.data.success){
            toast.success("Link shorted successfully...")
            setlinkData({
                title:"",
                target:"",
                slug:"",
                user: ""
            })
        }
        else{
            toast.error("error found")
        }
    }
    return (
    <div>
        <h1>Link Smarter, Not Harder</h1>
        <div className='greet'>
            <span>Hello {user.Name}</span>
            <p className='logout' onClick={()=>{
                localStorage.clear()
                toast.success("user logged out successfully")
                setTimeout(()=>{
                    window.location.href = "/login"
                },4000)
            }}>Logout</p>
        </div>
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