import jwt from "jsonwebtoken";
const authAdmin = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) 
        return res.status(400).json({ message: "Authentication Failed" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) 
        return res.status(400).json({ message: "Authentication Failed" });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Authentication Failed" });
}
};

const createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2day",
  });
  return token;
};

const verifyJwtToken = (token, next) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (err) {
    next(err);
  }
};

const passwordJwtToken =(payload)=>{
  const token =jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"5m"});
  return token;
};

export  {authAdmin,createJwtToken,verifyJwtToken,passwordJwtToken};