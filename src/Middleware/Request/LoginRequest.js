const Joi = require("@hapi/joi");
const createError = require("http-errors");
const {dbHelper} = require("../../Helper/Helper");
module.exports = {
  login: async (req, res, next) => {

    try{
      const schema = Joi.object({
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(6).max(255).required(),
      });
      
      const result = await schema.validateAsync(req.body);
      
      //check if email already exist
      const helper  = new dbHelper({email:result.email});
      const user = await helper.getUserIfExist();
      if(!user) throw createError.NotFound(`User not registered.`);
  
      //check password
      const isPasswordMatch = await user.isValidPassword(result.password);
      if(!isPasswordMatch) throw createError.Unauthorized('Email/Password is wrong');

      next();
    }catch(error){
      if(error.isJoi === true) 
        return next(createError.BadRequest('Invalid Email or Password.'))
      next(error);
    }

    
  },
};
