import React from 'react';
import "./LinkCard.css";

function LinkCard({ title, slug, target, views, createdAt }) {
    const slugUrl = `${process.env.REACT_APP_API_URL}/${slug}`
    const mainimg = 'https://cdn-icons-png.flaticon.com/128/3176/3176382.png'
    const targetimg = 'https://cdn-icons-png.flaticon.com/128/455/455691.png'
  return (
    <div className="link-card">
      <h2 className="link-card-title">{title || "No title"}</h2>
   
    <a href={slugUrl}
      target="_blank"
      className='link-card-url'>
      <span>
        <img src={mainimg} height="20" />
      </span>
        {slugUrl}
    </a>
    
    <a href={target}
    target="_blank"
    className='link-card-url'>
      <span>
        <img src={targetimg} height="20" />
      </span>
      {target.substring(0,20)}
      {target.length > 20 ? "..." : null}
       </a>
      
      <span className='link-card-views'>
       <span> Views:</span>
        {views > 0 ? `${views} peoples visited` : "share this link"} 
        </span>
      <p className="link-card-created-at">
        
        {new Date(createdAt).toLocaleString()}
        </p>
    </div>
  );
}

export default LinkCard;
