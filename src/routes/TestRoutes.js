const router = require('express').Router();
const TestController = require('../controller/testController');

/**
 * @swagger
 * /test:
 *  get:
 *    tags: 
 *      - test
 *    summary: '테스트 조회'
 *    description: 테스트 조회
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              getTestSuccessExample:
 *                $ref: '#/components/examples/getTestSuccessExample'
 *      204:
 *        description: No Content
 *        content:
 *          application/json: 
 *            example: 응답을 보내지 않습니다.
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 *      404:
 *        description: Not Found
 *        $ref: '#/components/responses/NotFound'
 */
router.get('/', TestController.getTest);


module.exports = router;
