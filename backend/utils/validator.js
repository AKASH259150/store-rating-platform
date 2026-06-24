const validator =require("validator");

// req.body 

const validate = (data)=>{
   
    const mandatoryField = ['name','email','password', 'address'];

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Some Field Missing");

    if(!validator.isEmail(data.email))
        throw new Error("Invalid Email");

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

        if (!passwordRegex.test(data.password)) {
            throw new Error("Invalid Password");
        }

    if (!validator.isLength(data.address, { max: 400 })) {
        throw new Error("Address cannot be greater than 400 characters");
    }
    if (!validator.isLength(data.name, {min:20, max: 60 })) {
        throw new Error("name should be between 20 and 60 character");
    }
}

module.exports = validate;