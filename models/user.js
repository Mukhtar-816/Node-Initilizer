import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
        },
        name: {
            type: String,
            minlength: 3,
            required: true,
        },
        avatar: {
            type: String,
            minlength: 5,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/',
                "Please fill a valid email address",
            ],
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
        },
        phoneNo: {
            type: String,
        },
        authType: {
            type: String,
            required: true,
            enum: ["Local", "Google"],
        },
        admin: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        // Mongoose BuiltIn MiddleWares to continiously check date createdAt and updatedAt;
        timestamps: true
    }
);



// 'pre' is one of the middleware of mongoose to ensure that when '<function>' is called it should run as well;


//These middleware will exclude those array where the isdeleted is true means the user doesnt exist so the functions like : 
// find, findone and findoneandupdate will be called only for the data where the isdeleted is false (user exists).


userSchema.pre("find", function () {
    this.where({ isDeleted: false });
});

userSchema.pre("findOne", function () {
    this.where({ isDeleted: false });
});

userSchema.pre("findOneAndUpdate", function () {
    this.where({ isDeleted: false });
});

const User = mongoose.model("User", userSchema);

export default User;