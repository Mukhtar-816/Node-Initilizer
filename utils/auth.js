import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// Hash password
const hashPassword = async (saltRounds, password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
};


//verify password
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
};


//Access Token generator
const AccessTokenGenerator = (user) => {

    const Token_Key = process.env.ACCESS_TOKEN_PRIVATE_KEY || 'token';
    jwt.sign({
        _id: user._id,
        email: user.email,
        admin: user.admin
    },
        Token_Key
    )
};


//Refresh Token
const RefreshAccessToken = (user) => {
    const Token_Key = process.env.ACCESS_TOKEN_PRIVATE_KEY || 'token';
    jwt.sign({
        _id: user._id,
    },
        Token_Key
    )
};


export default { verifyPassword, hashPassword, AccessTokenGenerator, RefreshAccessToken };