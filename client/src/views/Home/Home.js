import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import LinkCard from '../../components/LinkCard/LinkCard';
import Header from "./../../components/Header/Header.js";
import "./Home.css";

function Home() {
  const [user, setUser] = useState('');
  const [linkData, setlinkData] = useState({
    title: "",
    target: "",
    slug: "",
    user: ""
  });

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      setUser(currentUser);
      setlinkData({ ...linkData, user: currentUser._id });
    }
    if (!currentUser) {
      window.location.href = "/login";
    }
  }, []);

  const loadLinks = async () => {
    if (!user._id) {
      return;
    }
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/userlink?userId=${user._id}`);
    setLinks(response.data.data);
    toast.dismiss();
  }

  useEffect(() => {
    loadLinks();
  }, [user]);

  const shortUrl = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`, linkData);

    if (response.data.success) {
      toast.success("Link shorted successfully...");
      setlinkData({
        title: "",
        target: "",
        slug: "",
        user: ""
      });
    } else {
      toast.error("Error found");
    }
  }

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h1 className="text-center">Link Smarter, Not Harder</h1>
        <div className="d-flex justify-content-between align-items-center mt-4 greet">
          <span className='usergreet'>Hello 👋{user.Name}...,short your url with us</span>
          <p className="logout" onClick={() => {
            localStorage.clear();
            toast.success("User logged out successfully");
            setTimeout(() => {
              window.location.href = "/login";
            }, 4000);
          }}>Logout</p>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <form className="form">
              <input
                type="text"
                placeholder="Title"
                value={linkData.title}
                onChange={(e) => {
                  setlinkData({
                    ...linkData,
                    title: e.target.value
                  });
                }}
                className="form-control input-fields"
              />
              <input
                type="text"
                placeholder="Target URL"
                value={linkData.target}
                onChange={(e) => {
                  setlinkData({
                    ...linkData,
                    target: e.target.value
                  });
                }}
                className="form-control input-fields"
              />
              <input
                type="text"
                placeholder="Slug"
                value={linkData.slug}
                onChange={(e) => {
                  setlinkData({
                    ...linkData,
                    slug: e.target.value
                  });
                }}
                className="form-control input-fields"
              />
              <button className="btn " onClick={shortUrl} type="button">Shorten</button>
            </form>
          </div>
          <div className="col-md-6 all-links-container">
            <div className="h1-div">
              <h1>All-Links</h1>
            </div>
            <div>
              {links.map((link, i) => {
                const { title, slug, target, views, createdAt } = link;
                return <LinkCard
                  key={i}
                  title={title}
                  slug={slug}
                  target={target}
                  views={views}
                  createdAt={createdAt}
                />
              })}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
