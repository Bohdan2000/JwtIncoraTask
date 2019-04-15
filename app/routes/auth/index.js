const express = require('express');
const middleware = require('../../middleware/index');


const authController = require('../auth/controller'); 

const router = express.Router();

router
     /**
     * @api {post} http://localhost:8080/auth/login Login user
     * @apiGroup auth
     * @apiName PostLogin
     * 
     * @apiSuccess {String} token User token
     * 
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjVjYjA2NjhlNWU4YjE0MmI4OTY3OTA3OCIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoibGxsQGdtYWlsLmNvbSJ9LCJpYXQiOjE1NTUwNjQ0NzB9.XRYpYWUf5KwfPKG2e1SIbsGON2Gd3ON3xle8BcrCSBc"
     *  }
     * @apiErrorExample {json} User not found
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     * @apiErrorExample {json} Bad validation
     *    HTTP/1.1 422 Bad validation
     */
    .post('/login', authController.logIn)


     /**
     * @api {post} http://localhost:8080/auth/singup Login user
     * @apiGroup auth
     * @apiName PostLogin
     * 
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
     *  HTTP/1.1 200 OK
     *  {
     *       "role": "user",
     *       "birthday": "05-05-2000",
     *       "phone": "097-860-5325",
     *       "_id": "5cb09b744138be2d455d3cf9",
     *       "first_name": "rrr",
     *       "last_name": "tuut",
     *       "email": "lll1@gmail.com",
     *       "password": "$2b$10$sJ5xe9VyWj4nCwu5Cl0M2uB5ZHSz/ELHpO0zsmxNLIBUtC7gEkvW6"
     *   }
     * @apiErrorExample {json} User not found
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 500 Internal Server Error
     * @apiErrorExample {json} Bad validation
     *    HTTP/1.1 422 Bad validation
     * @apiErrorExample {json} Bad role
     *    HTTP/1.1 422 Bad role
     * @apiErrorExample {json} Bad password
     *    HTTP/1.1 422 Bad password
     */
    .post('/signup', authController.singUp)

    
module.exports = router;
