const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

let refreshTokens =[]
const authController = {
    registerUser: async (req,res)=>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);

            //create new user
            const newUser = await new User({
                username: req.body.username,
                email:req.body.email,
                password:hashed,
            })

            //save to Db
            const user = await newUser.save();
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err)
        }

    },
    generateAccesToken: async(user)=>{
        return jwt.sign({
            id:user.id,
            admin:user.admin
        },
        process.env.MY_SECRET_KEY,
        { expiresIn: "30s" }
    
    )
    },
    generateRefreshToken: async(user)=>{
        return jwt.sign({
            id:user.id,
            name:user.name,
            admin:user.admin
        },
    process.env.REFRESH_KEY,
    { expiresIn: "3d" }

    )
       
    
    
    },
    //LOGIN USER
    loginUser: async (req, res)=>{
        try {
            const user = await User.findOne({username:req.body.username})
            if(!user){
               return res.status(404).json("Wrong username")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
              return  res.status(404).json("Wrong password")
            }
       
            if(user && validPassword ){
                const accessToken = await authController.generateAccesToken(user)
                const refreshToken = await authController.generateRefreshToken(user)
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,
                    secure:false,
                    path:'/',
                    samsite:'strict'
                })

                const {password, ...other} = user._doc;
                res.status(200).json({...other,accessToken});
            }

        }catch(err){
          return  res.status(500).json(err);
        }
    },
    logOut: async (req,res)=>{
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)
        res.status(200).json("Logged out scuccessfully")
    },
    requestRefreshToken:async(req,res)=>{
        //Lay request token from user
        const refreshToken = req.cookies.refreshToken;
        res.status(200).json(refreshToken)
        if(!refreshToken) return res.status(401).json("you're not authorized");
        if(!refreshTokens.includes(refreshToken)){
             res.status(403).json("refresh token is not valid")
        }
        jwt.verify(refreshToken, process.env.REFRESH_KEY,(err,user)=>{
            if(err){
                console.log(err)
            }
            refreshTokens = refreshTokens.filter((token)=>token !== refreshToken)
            //Create new accessTOken, refresh token
            const newAccessToken = authController.generateAccesToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            refreshTokens.push()
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict"
            })
            res.status(200).json({accessToken: newAccessToken})
        })
    }
}

//STORE TOKEN
//LOCAL STORAGE
module.exports = authController;