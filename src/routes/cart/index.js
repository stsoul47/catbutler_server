const router = require('express').Router();
const { check } = require('express-validator');

const validator = require('../../middlewares/validator');
const authMiddlewares = require('../../middlewares/authMiddlewares');

const cartController = require('../../controller/cart/cartController');

/**
 * @swagger
 * /cart:
 *  put:
 *    tags: 
 *      - cart
 *    summary: Cart 등록
 *    description: Cart 등록
 *    security: 
 *      - bearerAuth: []
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/insertNewCart'
 *          examples:
 *            insertNewCartExample:
 *              $ref: '#/components/examples/insertNewCartExample'
 *    responses:
 *      201: 
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              insertNewCartSuccessExample: 
 *                $ref: '#/components/examples/insertNewCartSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.put(
  '/', 
  validator.validator([
    check(['userId', 'cartList']).exists()
  ]), 
  cartController.insertCart
);

/**
 * @swagger
 * /cart:
 *  get:
 *    tags: 
 *      - cart
 *    summary: 장비구니 리스트 조회
 *    description: 장비구니 리스트 조회
 *    parameters: 
 *      - $ref: '#/components/parameters/getCartUserId'
 * 
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              getCartListSuccessExample:
 *                $ref: '#/components/examples/getCartListSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.get('/', cartController.getCartList);

module.exports = router;