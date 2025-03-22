const User = require("../models/User")

const userController = {
    //GET ALL USERS
    getAllUsers: async (req,res)=>{
        try{
            const user = await User.find()
            res.status(200).json(user)
        }catch(err){
            res.status(500).json(err);
        }

    },
    //DELETE USER
    deleteUsers: async (req,res)=>{
        try{
            //
            const user = await User.findById(req.params.id) //????? khong hiue
            res.status(200).json(`DELETE SUCCESSFULY`)
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = userController