const jwt = require("jsonwebtoken");
const middlewareController = {

    //veryfyToken
    verifyTonken:(req,res,next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.MY_SECRET_KEY,(err,user)=>{
                if(err){
                    res.status(403).json("token is not valid");
                }
                req.user = user;
                next();
                
            })
           
        } else{
            res.status(401).json("You're not authenticated")
        }
    },
    verifyTokenAndAdminAuth: (req, res, next)=>{
        middlewareController.verifyTonken(req,res, ()=>{
            if(req.user.id==req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json("You're not allowed to delete other")
            }
        })
    }
}
module.exports = middlewareController