/**
 * @swagger
 * components:
 *  schemas:
 *    insertNewReview:
 *      type: object
 *      properties: 
 *        itemId: 
 *          type: string
 *        userId:
 *          type: string
 *        rating:
 *          type: number
 *        content: 
 *          type: string
 *        image: 
 *          type: array
 *          items:
 *            type: string
 * 
 * 
 *    saveReviewImageArrayTemp: 
 *      type: object
 *      properties: 
 *        filename: 
 *          type: array
 *          items:
 *            type: string
 *            format: binary
 * 
 *  parameters:
 *    getReviewItemId:
 *      name: itemId
 *      in: query
 *      description: 아이템 아이디
 *      require: true
 *      schema:
 *        type: string
 *      example: 66057bc6e2a3cfd64aec4752
 *    getReviewRating:
 *      name: rating
 *      in: query
 *      description: 리뷰의 평점으로 조회
 *      require: false
 *      schema:
 *        type: number
 *        enum: [-1, 1, 2, 3, 4, 5]
 *        default: -1
 * 
 *  examples:
 *    insertNewReviewExample:
 *      value:
 *        itemId: 66057bc6e2a3cfd64aec4752
 *        userId: 66041fcabcaf7ef6f7eaf5a1
 *        rating: 3
 *        content: 이거 정말 좋네요~? 엄청 만족스러워요!!
 *        image: 
 *          - 86b1314cb7ca44ec9aa9d4cefdce4aca.png
 *          - 1d75b571ce29458c893d87cb38575535.jpg
 *          - 66d009df7d184ae795877a6918f66b10.jpg
 *    insertNewReviewSuccessExample:
 *      value:
 *        code: 1
 *        message: 리뷰 등록 성공
 *        data: {}
 * 
 *    saveReviewImageArraySuccessExample:
 *      value:
 *        code: 1
 *        message: 리뷰 이미지 임시 등록 성공
 *        data:
 *          filename:
 *            - 86b1314cb7ca44ec9aa9d4cefdce4aca.png
 *            - 1d75b571ce29458c893d87cb38575535.jpg
 *            - 66d009df7d184ae795877a6918f66b10.jpg
 *          path:
 *            - cdn\\review_image\\temp\\86b1314cb7ca44ec9aa9d4cefdce4aca.png
 *            - cdn\\review_image\\temp\\1d75b571ce29458c893d87cb38575535.jpg
 *            - cdn\\review_image\\temp\\66d009df7d184ae795877a6918f66b10.jpg
 * 
 *    getItemReviewListSuccessExample:
 *      value: 
 *        result: 
 *           code: 1
 *           message: 리뷰 리스트 조회 성공
 *           data:
 *             list: 
 *              - _id: 661e75a20b2963aaa0c5cded
 *                item: 66057bc6e2a3cfd64aec4752
 *                user: 
 *                  _id: 66041fcabcaf7ef6f7eaf5a1
 *                  name: dd
 *                rating: 3
 *                content: 이거 정말 좋네요~? 엄청 만족스러워요!!
 *                image: 
 *                  - /cdn/review_image/image/86b1314cb7ca44ec9aa9d4cefdce4aca.png
 *                  - /cdn/review_image/image/1d75b571ce29458c893d87cb38575535.jpg
 *                  - /cdn/review_image/image/66d009df7d184ae795877a6918f66b10.jpg
 *                createdAt: 2024-04-16T12:57:06.611Z
 *                updatedAt: 2024-04-16T12:57:06.611Z
 *              - _id: 661e6eb3f5ec55100286ec2c
 *                item: 66057bc6e2a3cfd64aec4752
 *                user: 
 *                  _id: 66041fcabcaf7ef6f7eaf5a1
 *                  name: dd
 *                rating: 4
 *                content: 이거 정말 좋네요~? 엄청 만족스러워요!!
 *                image: []
 *                createdAt: 2024-04-16T12:27:31.185Z
 *                updatedAt: 2024-04-16T12:27:31.185Z
 *             count: 2
 *             page: 1
 * 
 */
