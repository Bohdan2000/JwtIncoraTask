const User = require('../../models/user');
const constants = require('../../../constants/index');

const getAllUsers = async (req, res) => {
    const findAll = await new User().getAllUsers();
    return res.status(constants.STATUS.Ok).json(findAll);
}

const createUser = async (req, res) => {
    const userFromToken = req.user;
    //console.log(userFromToken);
    if (constants.ALLOW_ROLES[2] === userFromToken.userData.role) {
    const userData = req.body;
    const user = await new User().createUser(userData);
    return res.status(constants.STATUS.Ok).json(user);
    }else return res.status(constants.STATUS.NotAllowed).json(constants.BAD_ROLE);
}

const deleteUser = async (req, res) => {
    const userFromToken = req.user;
    const id = req.params.id;
    console.log(id);
    if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
    if (constants.ALLOW_ROLES[2] === userFromToken.userData.role) {

        await new User().deleteUserById(id)
            .then(result => res.status(constants.STATUS.Ok).json(constants.SUCCESS))
            .catch(err => res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND))

    }else return res.status(constants.STATUS.NotAllowed).json(constants.BAD_ROLE); 
}

const getOneUser = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
    const findOne = await new User().getOneUser(id);
    if (findOne) return res.status(constants.STATUS.Ok).json(findOne); 
    return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
    
}

const updateUser = async (req, res) => {
    const userFromToken = req.user;
    const user = req.body;
    const id = req.params.id;
    if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);

    if (constants.ALLOW_ROLES[2] === userFromToken.userData.role) {
        
        await new User().updateUser(user)
            .then(result => res.status(constants.STATUS.Ok).json(constants.SUCCESS))
            .catch(err => res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND))

    }else return res.status(constants.STATUS.NotAllowed).json(constants.BAD_ROLE);

}

module.exports = {
    getAllUsers,
    createUser,
    getOneUser,
    deleteUser,
    updateUser
}