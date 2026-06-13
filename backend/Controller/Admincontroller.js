

const adminemail = "aplod@gmail.com"
const adminpass  = "aplod123"


export const Login =(req,res)=>{
    const {email,password} = req.body;
    if (email === adminemail && password ===adminpass) {
        
        return res.json({
            success: true,
           
          });
    } 
    return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
}