const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../auth");
const auth = require("../auth");

module.exports.registerUser = (req, res) => {
    // Checks if the email is in the right format
    if (!req.body.email.includes("@")){
        return res.status(400).send({message: "Invalid email"});
    }
    // Checks if the mobile number has the correct number of characters
    else if (req.body.mobileNo.length !== 11){
        return res.status(400).send({message: "Invalide mobile number"});
    }
    // Checks if the password has atleast 8 characters
    else if (req.body.password.length < 8) {
        return res.status(400).send({message: "Password must have atleast 8 characters"});
    // If all needed requirements are achieved
    } else {

        let newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            mobileNo : req.body.mobileNo,
            // 10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password
            password : bcrypt.hashSync(req.body.password, 10)
        })

        return newUser.save()
        .then((result) => res.status(201).send({
        	message: "Successfully registered user",
        	result: result
        }))
        .catch(error => errorHandler(error, req, res));
        
    }
};

module.exports.authenticateUser = (req, res) => {
	if(!req.body || !req.body.email){
		return res.status(400).send({message: "No email found"});
	}

    if(req.body.email.includes("@")) {  

        return User.findOne({ email: req.body.email })
        .then(result => {


            if(result == null) {

                return res.status(404).send({message: "No email found"});
            } else {

                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

                if(isPasswordCorrect) {
                    console.log(isPasswordCorrect)
                    return res.status(200).send({ access : auth.createAccessToken(result)});
                } else {
                    return res.status(401).send({message: "Incorrect password"});
                }
            }
        })
        .catch(error => errorHandler(error, req, res));

    } else {
        return res.status(400).send({message: "Email is invalid"});
    }
};

module.exports.retrieveUserDetails = (req, res) => {
    return User.findById(req.user.id)
    .then(user => {
    	if(user){
    		user.password = "";
        	return res.status(200).send(user)
    	} else {
    		return res.status(404).send({message: "User not found"})
    	}
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.updateUserAsAdmin = (req, res) => {
	let updateUser = { isAdmin: true };
    return User.findByIdAndUpdate(req.params.id, updateUser) 
    .then(user => {
        if (user){
            user.password = "";
            return res.status(200).send({success: true, message: "User updated as admin successfully"});
        } else {
           return res.status(404).send({message:"Can't Find User"}); 
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.updatePassword = (req, res) => {
	// if(req.body.password.length < 8) {
    //     return res.status(400).send({message: "Password must be atleast 8 characters long"});
    // }

    // let existingPasswordHash = User.findById(req.user.id)
    // 	.then(user => user.password)
    // 	.catch(error => errorHandler(error, req, res));

    // if(existingPasswordHash == bcrypt.hashSync(req.body.password, 10)){
    // 	return res.status(400).send({message: "New password is the same as the old password"});
    // }

    let newPassword = {
    	password: bcrypt.hashSync(req.body.newPassword, 10)
    }

    return User.findByIdAndUpdate(req.user.id, newPassword)
    	.then(user => {
    		if(user){
    			res.status(200).send({message: "Password has been updated"})
    		} else {
    			res.status(404).send({message: "Failed updating password"})
    		}
    	})
    	.catch(error => errorHandler(error, req, res));
};