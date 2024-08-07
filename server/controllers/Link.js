import Link from "./../models/Link.js";
import User from "./../models/user.js";
const postLink = async (req, res) => {
    try {
        const { title, slug, target, user } = req.body
        const linkurl = new Link({
            title,
            slug,
            target,
            user
        })
        const savedlink = await linkurl.save();
        res.json({
            success: true,
            data: savedlink,
            message: "successfully link created"
        })
    }
    catch (e) {
        res.json({
            success: false,
            data: e.message
        })
    }

}
const getSlugRedirect = async (req, res) => {
    const { slug } = req.params;

   try{
    const link = await Link.findOne({ slug });
    if (!link) {
        return res.json({
            success: false,
            message: "link was not found"
        }
        )
    }
   }
   catch(e){
    res.json({
        success:false,
        data:e.message
    })
   }
    link.views = link.views + 1;
    await link.save();

    return res.redirect(link.target)
    //     res.json({
    //         success:true,
    //         message:"slug added successfully",
    //         slug:slug
    //     }
    //    )
}
const postSignup = async (req, res) => {
    const {
        Name,
        Email,
        password,
        dob } = req.body
    const user = new User(
        {
            Name,
            Email,
            password,
            dob
        }
    )
    try {
        const savedUser = await user.save();
        if (savedUser) {
            res.json({
                success: true,
                message: "user created successfully",
                data: savedUser
            })
        }
        else {
            res.json({
                success: true,
                message: "signup failed"
            })
        }
    }
    catch (e) {
        res.json({
            data: e.message
        })
    }
}
const postLogin = async (req, res) => {
    const { Email, password } = req.body
    try {
        const user = await User.findOne({
            Email: Email,
            password: password
        })
        if (user) {
            res.json({
                success: true,
                message: "user login successfully",
                data: user
            })
        }
        else {
            res.json({
                success: false,
                message: "invalid credentials",
                data: null
            })
        }
    }
    catch (e) {
        res.json({
            success: false,
            message: "not login",
            data: e.message
        })
    }


}
const getLinks = async (req, res) => {
    try {
        const allLinks = await Link.find()
        res.json({
            success: true,
            data: allLinks,
            message: "all links fetched successfully"
        })
    }
    catch (e) {
        res.json({
            success: false,
            data: e.message,
            message: "data not fetched"
        })
    }
}

const getUserLink = async (req, res) => {
    try {
        const { userId } = req.query
        // console.log(userId)
        const user = await User.findById(userId)
        // console.log(user)

       
        const links = await Link.find({ user: userId })
        return res.json({
            success: true,
            message: "records fetched successfullly",
            data: links
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: "user not found",
            data: null
        })
    }
}

export { postLink, getSlugRedirect, postSignup, postLogin, getLinks, getUserLink }