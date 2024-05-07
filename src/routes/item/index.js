const router = require('express').Router();
const itemController = require('../../controller/item/index');
const authMiddlewares = require('../../middlewares/authMiddlewares');
const multerMiddlewares = require('../../middlewares/multer');
const imageManager = require('../../middlewares/imageManager');

const { check } = require('express-validator');
const validator = require('../../middlewares/validator');

/**
 * @swagger
 * /item:
 *  post:
 *    tags: 
 *      - item
 *    summary: '상품 등록(아이템 등록)'
 *    description: 상품 등록
 *    security: 
 *      - bearerAuth: []
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/insertItem'
 *          examples:
 *            insertItemExample:
 *              $ref: '#/components/examples/insertItemExample'
 *    responses:
 *      201: 
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              insertItemSuccessExample: 
 *                $ref: '#/components/examples/insertItemSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.post(
  '/', 
  authMiddlewares.authenticated, 
  validator.validator([
    check([
      'category','productName','price','option','mainImage','detailImage'
    ]).exists(),
  ]),
  imageManager.moveImage('/cdn/item_main_image/temp/','/cdn/item_main_image/image/','mainImage','mainFileUrl'),
  imageManager.moveImage('/cdn/item_detail_image/temp/','/cdn/item_detail_image/image/','detailImage','detailFileUrl'),
  itemController.insertItem
  );



/**
 * @swagger
 * /item/main-image/temp:
 *  post:
 *    tags: 
 *      - item
 *    summary: 'main image 임시 저장'
 *    description: main image 임시 저장
 *    security: 
 *      - bearerAuth: []
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        multipart/form-data: 
 *          schema:
 *            $ref: '#/components/schemas/saveItemMainImageTemp'
 *    responses:
 *      201: 
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              saveItemMainImageSuccessExample: 
 *                $ref: '#/components/examples/saveItemMainImageSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.post(
  '/main-image/temp', 
  authMiddlewares.authenticated,
  multerMiddlewares.singleTemp('cdn/item_main_image/temp','filename'), 
  itemController.uploadMainImageTemp
);


/**
 * @swagger
 * /item/detail-image/temp:
 *  post:
 *    tags: 
 *      - item
 *    summary: detail image 임시 저장
 *    description: detail image 임시 저장
 *    security: 
 *      - bearerAuth: []
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        multipart/form-data: 
 *          schema:
 *            $ref: '#/components/schemas/saveItemDetailImageTemp'
 *    responses:
 *      201: 
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              saveItemDetailImageSuccessExample: 
 *                $ref: '#/components/examples/saveItemDetailImageSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.post(
  '/detail-image/temp', 
  authMiddlewares.authenticated,
  multerMiddlewares.ArrayTemp('cdn/item_detail_image/temp','filename'), 
  itemController.uploadDetailImageTemp
);


/**
 * @swagger
 * /item:
 *  get:
 *    tags: 
 *      - item
 *    summary: '상품 리스트 조회'
 *    description: 상품 리스트 조회(삭제된 상품은 제외)
 *    parameters: 
 *      - $ref: '#/components/parameters/viewCount'
 *      - $ref: '#/components/parameters/pageNumber'
 *      - $ref: '#/components/parameters/getItemCategory'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              getItemListAllSuccessExample:
 *                $ref: '#/components/examples/getItemListAllSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 *      404:
 *        description: Not Found
 *        $ref: '#/components/responses/NotFound'
 */
router.get(
  '/',
  validator.validator([
    check(['pageNumber','viewCount']).exists(),
  ]),
  itemController.getItemList
);


/**
 * @swagger
 * /item/{id}:
 *  get:
 *    tags: 
 *      - item
 *    summary: '상품 상세 조회'
 *    description: 상품 상세 조회(삭제된 상품은 제외)
 *    parameters: 
 *      - $ref: '#/components/parameters/getItemDetailId'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              getItemDetailInfoSuccessExample:
 *                $ref: '#/components/examples/getItemDetailInfoSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 *      404:
 *        description: Not Found
 *        $ref: '#/components/responses/NotFound'
 */
router.get('/:id', validator.validator([
  check('id').isMongoId()
]), itemController.getItemDetail);

module.exports = router;