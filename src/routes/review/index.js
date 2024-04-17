const router = require('express').Router();
const { check } = require('express-validator');

const validator = require('../../middlewares/validator');
const authMiddlewares = require('../../middlewares/authMiddlewares');
const multerMiddlewares = require('../../middlewares/multer');
const imageManager = require('../../middlewares/imageManager');

const reviewController = require('../../controller/review/reviewController');

/**
 * @swagger
 * /review/temp:
 *  post:
 *    tags: 
 *      - review
 *    summary: Review 이미지 임시 저장
 *    description: Review 이미지 임시 저장
 *    security: 
 *      - bearerAuth: []
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        multipart/form-data: 
 *          schema:
 *            $ref: '#/components/schemas/saveReviewImageArrayTemp'
 *    responses:
 *      201: 
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              saveReviewImageArraySuccessExample: 
 *                $ref: '#/components/examples/saveReviewImageArraySuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.post(
  '/temp', 
  authMiddlewares.authenticated,
  multerMiddlewares.ArrayTemp('cdn/review_image/temp', 'filename', 5), 
  reviewController.uploadImageTemp
);

/**
 * @swagger
 * /review:
 *  post:
 *    tags: 
 *      - review
 *    summary: 리뷰 등록
 *    description: 리뷰 등록
 *    security: 
 *      - bearerAuth: []
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/insertNewReview'
 *          examples:
 *            insertNewReviewExample:
 *              $ref: '#/components/examples/insertNewReviewExample'
 *    responses:
 *      201: 
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              insertNewReviewSuccessExample: 
 *                $ref: '#/components/examples/insertNewReviewSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.post(
  '/', 
  authMiddlewares.authenticated, 
  validator.validator([
    check(['itemId', 'userId', 'rating', 'content', 'image']).exists(),
  ]),
  imageManager.moveImage(
    '/cdn/review_image/temp/',
    '/cdn/review_image/image/',
    'image',
    'imageUrl'
  ),
  reviewController.insertReview
);

/**
 * @swagger
 * /review:
 *  get:
 *    tags: 
 *      - review
 *    summary: 리뷰 리스트 조회
 *    description: 상품에 맞는 리뷰 리스트 조회
 *    parameters: 
 *      - $ref: '#/components/parameters/viewCount'
 *      - $ref: '#/components/parameters/pageNumber'
 *      - $ref: '#/components/parameters/getReviewItemId'
 *      - $ref: '#/components/parameters/getReviewRating'
 * 
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              getItemReviewListSuccessExample:
 *                $ref: '#/components/examples/getItemReviewListSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 *      404:
 *        description: Not Found
 *        $ref: '#/components/responses/NotFound'
 */
router.get('/', validator.validator([
  check(['viewCount', 'pageNumber', 'itemId']).exists(),
  check(['viewCount', 'pageNumber', 'rating']).isInt()
]), reviewController.getReviewList);

module.exports = router;