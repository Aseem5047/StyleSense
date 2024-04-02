const UserModel = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = async (req, res) => {

    const id = req.params.id;
    const { _id } = req.body;

    try {
        const user = await UserModel.findById(_id || id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        }

        else {
            res.status(404).json("No such user exists")
        }
    } catch (error) {
        res.status(500).json(error);
    }

}

// Get all users
const getAllUsers = async (req, res) => {

    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc
            return otherDetails
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};


// edit current user's profile

const editProfile = async (req, res) => {
    const id = req.params?.id;
    const { _id, password, ...otherFields } = req.body;


    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            } else {
                // Remove the password field from the update object
                delete otherFields.password;
            }

            const user = await UserModel.findByIdAndUpdate(id, otherFields, {
                new: true,
            });
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).cookie('token', token, { sameSite: 'None', secure: true }).json({ user, token });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! You can update only your own Account.");
    }
};

// Edit theme preferences
const editThemePreference = async (req, res) => {
    const { id, ...otherFields } = req.body;

    try {
        const user = await UserModel.findByIdAndUpdate(id, otherFields, {
            new: true,
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};


// get a User via token cookie

const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        const decodedToken = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        let expired = false;

        if (decodedToken.exp < currentTime) {
            console.log('Token has expired');
            expired = true;
            // Perform actions for an expired token
        } else {
            expired = false;
            // Perform actions for a valid token
        }

        jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {
            if (expired) {
                res.status(401).json("Invalid or Expired token");
            } else {
                try {
                    const userDetails = await UserModel.findById(userData.id);
                    if (!userDetails) {
                        res.status(404).json("User not found");
                        return;
                    }
                    const { password, ...otherDetails } = userDetails._doc;
                    res.status(200).json(otherDetails);
                } catch (error) {
                    console.error("Error retrieving user details:", error);
                    res.status(500).json("Internal Server Error");
                }
            }
        });
    } else {
        res.status(401).json("Invalid or expired token");
    }
};




module.exports = {
    getProfile,
    getUser,
    getAllUsers,
    editProfile,
    editThemePreference
};