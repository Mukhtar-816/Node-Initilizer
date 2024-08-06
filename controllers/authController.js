import User from '../models/user.js'
import auth from '../utils/auth.js';
import REFRESHTOKEN from '../models/RefreshToken.js';


const SignUp = async (req, res, next) => {
    try {
        //Extracting Data
        let { password, ...userObj } = req.body;

        //Hashing Password
        let Hashed_Password = auth.hashPassword(10, password);

        //Making A Model Based on Specific Schema
        let user = new User({
            ...userObj,
            password: Hashed_Password,
            authType: 'Local'
        });

        //Saving the User Data in Database
        let createdUser = await user.save({ new: true });

        //If User doesnt gets created
        if (!createdUser) {
            next(console.log('Error saving'))
        }

        //Generate an Access Token For new User (Short-Term_Token)
        let accessToken = auth.AccessTokenGenerator(createdUser)
        let refreshToken;

        //If there exsists a refresh token (Long-Term_Token) then find it.
        let existing = await REFRESHTOKEN.findOne(
            { userId: createdUser._id },
            { refreshToken: 1, _id: 0 }
        );

        if (!existing) {
            refreshToken = auth.RefreshAccessToken(createdUser);
            REFRESHTOKEN.create({ userId: createdUser._id, refreshToken });
        }
        else {
            refreshToken = existing.refreshToken;
        }

        //delete user.password to not send password to client in response
        let responseUser = { ...createdUser._doc }
        delete responseUser.password;
        delete responseUser.isDeleted;
        delete responseUser.emailVerified;
        delete responseUser.__v;

        return res
            .status(201)
            .setHeader("Content-Type", "application/json")
            .json({ status: "OK", accessToken, refreshToken, user: responseUser });

    } catch (error) {
        next(error);
    }
};

const Login = () => {
    console.log('Sign Up Successfully')
};

const RefreshAccessToken = () => {
    console.log('Refresh Token Successfully')
};



export default { Login, SignUp, RefreshAccessToken };  