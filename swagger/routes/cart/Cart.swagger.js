/**
 * @swagger
 * components:
 *  schemas:
 *    insertNewCart:
 *      type: object
 *      properties: 
 *        userId: 
 *          type: string
 *        cartList:
 *          type: Array
 *          items:
 *            type: object
 *            properties:
 *              item:
 *                type: string
 *              quantity:
 *                type: number
 *              selectOption:
 *                type: string
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
 *    getCartUserId:
 *      name: userId
 *      in: query
 *      description: |  
 *        현재 로그인한 유저의 uuid(아이디: _id)
 *      require: true
 *      schema:
 *        type: string
 *      example: 66041fcabcaf7ef6f7eaf5a1
 * 
 *  examples:
 *    insertNewCartExample:
 *      value:
 *        userId: 66041fcabcaf7ef6f7eaf5a1
 *        cartList: 
 *          - item: 66212b794cae23fbdf129e21
 *            quantity: 1
 *            selectOption: 피부/관절
 *          - item: 662130734cae23fbdf129e25
 *            quantity: 2
 *            selectOption: 비프 피스트 85g
 *          - item: 6621320c4cae23fbdf129e29
 *            quantity: 1
 *            selectOption: 차오츄르 가다랑어
 *    insertNewCartSuccessExample:
 *      value:
 *        code: 1
 *        message: 장바구니 등록 성공
 *        data: {}
 * 
 *    getCartListSuccessExample:
 *      value:
 *        code: 1
 *        message: 장바구니 리스트 조회 성공
 *        data:
 *          - item: 
 *              productName: 사조 벤티 그레인프리 요로염증 피부관절 전연령용 고양이 사료
 *              deliveryFee: 3000
 *              price: 12999
 *              mainImage: 
 *                - /cdn/item_main_image/image/ffad822342c549fcb123ea4ca9921756.png
 *            quantity: 1
 *            selectOption: 피부/관절
 *          - item: 
 *              productName: k9 캔 내추럴 캣 고양이 주식캔 6종 85g
 *              deliveryFee: 3000
 *              price: 3599
 *              mainImage: 
 *                - /cdn/item_main_image/image/a12387f053954c398d6274bc52846d95.png
 *            quantity: 2
 *            selectOption: 비프 피스트 85g
 *          - item: 
 *              productName: 고양이간식 이나바 제이타크 챠오츄르 스틱 튜브 퐁츄르
 *              deliveryFee: 3000
 *              price: 2200
 *              mainImage: 
 *                - /cdn/item_main_image/image/3cf6af65d33241a9a0676fd6860e058a.png
 *            quantity: 1
 *            selectOption: 차오츄르 가다랑어
 * 
 */
