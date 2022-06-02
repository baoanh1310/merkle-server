const User = require('../models/user.model')
const errorHandler = require('../helpers/dbErrorHandler')

const authenticate = require('./../helpers/web2_auth')

const signin = async (req, res) => {
    try {
        let { isValid, type, message } = await authenticate(req.body.account, req.body.signature, req.body.publicKey);
        if (!isValid) {
            return res.status('401').json({
                error: message
            })
        }

        let user = await User.findOne({ account: req.body.account });
        if (!user) {
            try {
                const newUser = new User({account: req.body.account})
                await newUser.save();

                return res.status(200).json({
                    message: "Successfully signed up!",
                    user: {
                        _id: newUser._id,
                        account: newUser.account
                    }
                });
            } catch (err) {
                console.log(err.message);
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                });
            }
        } else {
            return res.json({
                message: "Successfully signed in!",
                user: {
                    _id: user._id,
                    account: user.account
                }
            })
        }
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

module.exports = {
    signin
}