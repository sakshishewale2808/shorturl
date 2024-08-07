import User from "./../models/user.js";
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
export { postSignup, postLogin}