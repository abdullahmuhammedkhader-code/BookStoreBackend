const users = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// Register
exports.registerController = async (req,res) =>{
    console.log("Inside RegisterController");
    console.log(req.body);
    const {username,email,password} = req.body
// Check if email is in db 
const existingUser = await users.findOne({email})
if(existingUser){
    res.status(409).json("User Already Exists.... PLease Login!!!!")
}else{
    let encryptPassword = await bcrypt.hash(password,10)
    const newUser = await users.create({
        username, email, password: encryptPassword
    })
    res.status(201).json(newUser)
}
    
    
}
// login
exports.loginController = async (req,res) =>{
    console.log("Inside loginController");
    console.log(req.body);
    const {username,email,password} = req.body
// Check if email is in db 
const existingUser = await users.findOne({email})
if(existingUser){
    const isPasswordMatch = await bcrypt.compare(password,existingUser.password)
    if(isPasswordMatch){
        const token = jwt.sign({userMail:email,role:existingUser.role},process.env.JWTSECRET)
        res.status(200).json({
            user:existingUser,token
        })
    }else{
        res.status(409).json("Invalid Email / Password !!!!!")
    }
}else{
   res.status(409).json("User Already Exists.... PLease Login!!!!")
}
    
    
}



// user Edit
exports.userEditController = async(req,res)=>{
    console.log("Inside userEditController");
    const {id} = req.params
    const email= req.payload
    const {username,password,bio,picture,role} = req.body
    const encryptPassword = await bcrypt.hash(password,10)
    const updatePicture = req.file?req.file.filename:picture
    const updateUser = await users.findByIdAndUpdate({_id:id},{username,email,password:encryptPassword,picture:updatePicture,bio,role},{new:true})
    res.status(200).json(updateUser)
}

// Admin Edit