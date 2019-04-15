const express = require('express');

const userController = require('./controller');
const middleware = require('../../middleware/index');

const router = express.Router();

router
    /**
     * @api {get} http://localhost:8080/users/ Request All User Infromation
     * @apiName GetUsers
     * @apiGroup User
     * 
     * @apiSuccess {String} _id ID of the User
     * @apiSuccess {String} first_name First_Name of the User
     * @apiSUccess {String} last_name Last_Name of the User
     * @apiSuccess {String} email Email of the User
     * @apiSuccess {String} phone Phone of the User
     * @apiSuccess {String} birthday BirthDate of the User
     * @apiSuccess {String} role User role
     * @apiSuccess {String} password Password about User 
     * 
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 ok
     *   {
     *      "id" : "5cb0668e5e8b142b89679078",
     *      "first_name" : "lala",
     *      "last_name" : "tutu",
     *      "email" : "kkk@gmail.com",
     *      "phone" : "053-665-4676",
     *      "birthday" : "05-05-2000",
     *      "role" : "admin",
     *      "password" : "Aa12345"
     *   },
     *   {
     *      "id" : "5cb0668e5e8b142b89679078",
     *      "first_name" : "mmm",
     *      "last_name" : "rrr",
     *      "email" : "bbb@gmail.com",
     *      "phone" : "053-665-4676",
     *      "birthday" : "05-05-2000",
     *      "role" : "superadmin",
     *      "password" : "Aa12345"
     *   }
     */
    .get('/', userController.getAllUsers)
    

    /**
     * @api {post} http://localhost:8080/users/ Creat User
     * @apiName PostUsers
     * @apiGroup User
     * 
     * @apiParamExample {json} Request-Example:
     *     {
     *           "first_name" : "cccc",
     *           "last_name" : "cccc",
     *           "email" : "xxx@gmail.com",
     *           "phone" : "053-665-4676",
     *           "birthday" : "05-05-2000",
     *           "role" : "user",
     *           "password" : "Aa12345"
     *     }
     * 
     * @apiSuccess {String} _id ID of the User
     * @apiSuccess {String} first_name First_Name of the User
     * @apiSUccess {String} last_name Last_Name of the User
     * @apiSuccess {String} email Email of the User
     * @apiSuccess {String} phone Phone of the User
     * @apiSuccess {String} birthday BirthDate of the User
     * @apiSuccess {String} role User role
     * @apiSuccess {String} password Password of the User 
     * 
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 ok
     *   {
     *      "id" : "5cb0668e5e8b142b89676078",
     *      "first_name" : "cccc",
     *      "last_name" : "cccc",
     *      "email" : "xxx@gmail.com",
     *      "phone" : "053-665-4676",
     *      "birthday" : "05-05-2000",
     *      "role" : "user",
     *      "password" : "Aa12345"
     *   }
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     *
     */
    .post('/', middleware.check, userController.createUser)

        /**
     * @api {get} http://localhost:8080/users/:id Find User
     * @apiGroup User
     * @apiName GetUsers
     * 
     * @apiParam {id} id User id
     * 
     * @apiSuccess {String} _id ID of the User
     * @apiSuccess {String} first_name First_Name of the User
     * @apiSUccess {String} last_name Last_Name of the User
     * @apiSuccess {String} email Email of the User
     * @apiSuccess {String} phone Phone of the User
     * @apiSuccess {String} birthday BirthDate of the User
     * @apiSuccess {String} role User role
     * @apiSuccess {String} password Password of the User 
     * 
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id" : "5cb0668e5e8b142b89676078",
     *      "first_name" : "cccc",
     *      "last_name" : "cccc",
     *      "email" : "xxx@gmail.com",
     *      "phone" : "053-665-4676",
     *      "birthday" : "05-05-2000",
     *      "role" : "user",
     *      "password" : "Aa12345"
     *    }
     * @apiErrorExample {json} User not found
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     */

    .get('/:id', userController.getOneUser)


        /**
     * @api {delete} http://localhost:8080/users/:id Delete User
     * @apiGroup User
     * @apiName DeleteUsers
     * 
     * @apiParam {id} id User id
     * 
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      massege:"Success"
     *    }
     * @apiErrorExample {json} User not found
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     * @apiErrorExample {json} Bad validation
     *    HTTP/1.1 422 Bad validation
     * @apiErrorExample {json} Bad role
     *    HTTP/1.1 422 Bad role
     */
    .delete('/:id', middleware.check , userController.deleteUser)


        /**
     * @api {update} http://localhost:8080/users/:id Update User
     * @apiGroup User
     * @apiName UpdateUsers
     * 
     * @apiParam {id} id User id
     * 
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      massege:"Success"
     *    }
     * @apiErrorExample {json} User not found
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     * @apiErrorExample {json} Bad validation
     *    HTTP/1.1 422 Bad validation
     * @apiErrorExample {json} Bad role
     *    HTTP/1.1 422 Bad role
     */
    .put('/:id', middleware.check , userController.updateUser)

module.exports = router;