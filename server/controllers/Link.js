import Link from "./../models/Link.js";
const postLink = async(req,res)=>{
    const {title,slug,target}=req.body
    const linkurl  =  new Link({
        title,
        slug,
        target
    })
    const savedlink = await linkurl.save();
    res.json({
        success:true,
        data:savedlink,
        message:"successfully link created"
    })

}
const getSlugRedirect = async(req,res)=>{
    const {slug} = req.params;

    const link =await Link.findOne({slug});
    if(!link){
        return res.json({
            success:false,
            message:"link not found"
        }
        );
    }
    link.views = link.views+1;
    await link.save();

return res.redirect(link.target)
    // // res.json({
    // //     success:true,
    // //     message:"slug added successfully",
    // //     slug:slug
    // // }
    // )
}
export {postLink,getSlugRedirect}