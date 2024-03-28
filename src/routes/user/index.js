const router = require('express').Router();
const userController = require('../../controller/user/userController');
/**
 * @swagger
 * /user/register:
 *  post:
 *    tags: 
 *      - user
 *    summary: '회원가입 요청'
 *    description: 회원가입을 요청하는 api
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/registerUser'
 *          examples:
 *            registerUserExample:
 *              $ref: '#/components/examples/registerUserExample'
 *    responses:
 *      201: 
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              registerUserSuccessExample: 
 *                $ref: '#/components/examples/registerUserSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /user/check:
 *  get:
 *    tags: 
 *      - user
 *    summary: '이메일 중복검사 요청'
 *    description: 이메일 중복 검사를 요청합니다.
 *    parameters: 
 *      - $ref: '#/components/parameters/emailCheckParam'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              emailCheckSuccessExample:
 *                $ref: '#/components/examples/emailCheckSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *              example: 
 *                message: '중복된 이메일'
 *                data: {}
 */
router.get('/check', userController.emailCheck);
module.exports = router;