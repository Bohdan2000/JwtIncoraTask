const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const User = require('../../models/user');
const constants = require('../../../constants/index');

const logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(constants.STATUS.BadValidation).json(constants.BAD_EMAIL);
    if (!password) return res.status(constants.STATUS.BadValidation).json(constants.PASSWORD_NOT_CORRECT);

    const user = await new User().getByEmail(email);
    if (!user) return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
    const userData = {
        id: user.id,
        role: user.role,
        email: user.email
    }
    const isValid = await new User().checkPassword(password, user.password);
    if (isValid){
        jwt.sign({userData}, config.jwt.secretKey,(err,token)=> {
            res.json({
                token
            })
        });
    }else{
        res.status(constants.STATUS.BadValidation).json(constants.PASSWORD_NOT_CORRECT);
    }
    
}

const singUp = async (req, res) => {
   const userData = req.body;
 //  if (!userData.email) return res.status(422).json(constants.BAD_EMAIL);
 //  if (!userData.password) return res.status(422).json(constants.PASSWORD_NOT_CORRECT);

//    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//    if (!validEmail.test(userData.email) && userData.email)  return res.status(422).json(constants.BAD_EMAIL);

//    const validPhone = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/i;
//    if (!validPhone.test(userData.phone) && userData.phone)  return res.status(422).json(constants.BAD_PHONE);

//    const validBirthday = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/i;
//    if (!validBirthday.test(userData.birthday) && userData.birthday)  return res.status(422).json(constants.BAD_BIRTHDAY);

   if (!constants.ALLOW_ROLES.includes(userData.role)) return res.status(constants.STATUS.BadValidation).json(constants.BAD_ROLE);

   try {
        const findOne = await new User().getByEmail(userData.email);
        if (findOne) return res.status(constants.STATUS.BadValidation).json(constants.USER_EXIST);
        const user = await new User().createUser(userData);
        console.log(user);
        return res.status(constants.STATUS.Ok).json(user);
   } catch (err) {
        return res.status(constants.STATUS.BadValidation).json(err.message);
   }
}

module.exports = {
     logIn,
     singUp
}

