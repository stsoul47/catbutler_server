/**
 * @swagger
 * components:
 *  schemas:
 *    insertItem:
 *      type: object
 *      properties: 
 *        category: 
 *          type: string
 *        productName:
 *          type: string
 *        price:
 *          type: string
 *        deliveryFee: 
 *          type: string
 *        option: 
 *          type: array
 *          items:
 *            type: string
 *        mainImage:
 *          type: array
 *          items:
 *            type: string
 *        requiredInfo:
 *          type: object
 *          properties:    
 *            modelName:
 *              type: string
 *            power:
 *              type: string
 *            manufacturer:
 *              type: string
 *            size:
 *              type: string
 *            specification:
 *              type: string
 *            asInfo:
 *              type: string
 *            kcInfo:
 *              type: string
 *            releaseDate:
 *              type: string
 *            country:
 *              type: string
 *            weight:
 *              type: string
 *            quality:
 *              type: string
 *        detailImage: 
 *          type: array
 *          items:
 *            type: string
 * 
 *    saveItemMainImageTemp: 
 *      type: object
 *      properties: 
 *        filename: 
 *          type: string
 *          format: binary
 * 
 *    saveItemDetailImageTemp: 
 *      type: object
 *      properties: 
 *        filename: 
 *          type: array
 *          items:
 *            type: string
 *            format: binary
 * 
 *  parameters:
 *    getItemDetailId:
 *      name: id
 *      in: path
 *      description: 아이템 아이디
 *      require: true
 *      schema:
 *        type: string
 *      example: 66057c179320994fabaa9de5
 *    getItemCategory:
 *      name: category
 *      in: query
 *      description: |  
 *        아이템의 카테고리  
 *        전체 조회시 '0000'  
 *        상위 카테고리 조회시 '00'로 끝나는 카테고리 코드  
 *        하위 카테고리 조회시 해당 카테고리 코드  
 *      require: false
 *      schema:
 *        type: string
 *      example: '0000'
 * 
 *  examples:
 *    insertItemExample:
 *      value:
 *        category: 테스트 카테고리
 *        productName: 테스트 아이템1
 *        price: 1000000
 *        deliveryFee: 3000
 *        option: 
 *          - 테스트 옵션1
 *          - 테스트 옵션2
 *        mainImage: 
 *          - 1230deacbffc4fba85c462c996d9740d.jpg
 *        requiredInfo: 
 *          modelName: ""
 *          power: "" 
 *          manufacturer: ""
 *          size: ""  
 *          specification: ""
 *          asInfo: "" 
 *          kcInfo: ""
 *          releaseDate: ""  
 *          country: "" 
 *          weight: ""
 *          quality: ""  
 *        detailImage: 
 *          - 2f68fdc1ba054bbd87cc44ba4d03ad59.png
 *          - 4a6eaa81726f4d7597ae729519d1e80b.jpg
 *          - ae7504c2a3f7455d90c82e417c75a6ee.jpg
 *    insertItemSuccessExample:
 *      value:
 *        code: 1
 *        message: 상품 등록 성공
 *        data: {}
 * 
 *    saveItemMainImageSuccessExample:
 *      value:
 *        code: 1
 *        message: 메인 이미지 임시 등록 성공
 *        data:
 *          filename:
 *            - 1230deacbffc4fba85c462c996d9740d.jpg
 *          path:
 *            - cdn\\itemMain\\temp\\1230deacbffc4fba85c462c996d9740d.jpg
 * 
 *    saveItemDetailImageSuccessExample:
 *      value:
 *        code: 1
 *        message: 상세 이미지 임시 등록 성공
 *        data:
 *          filename:
 *            - 2f68fdc1ba054bbd87cc44ba4d03ad59.png
 *            - 4a6eaa81726f4d7597ae729519d1e80b.jpg
 *            - ae7504c2a3f7455d90c82e417c75a6ee.jpg
 *          path:
 *            - cdn\\item_detail_image\\temp\\2f68fdc1ba054bbd87cc44ba4d03ad59.png
 *            - cdn\\item_detail_image\\temp\\4a6eaa81726f4d7597ae729519d1e80b.jpg
 *            - cdn\\item_detail_image\\temp\\ae7504c2a3f7455d90c82e417c75a6ee.jpg
 * 
 *    getItemListAllSuccessExample:
 *      value: 
 *        result: 
 *           code: 1
 *           message: 상품 리스트 조회 성공
 *           data:
 *             list: 
 *              - _id: 66057c179320994fabaa9de5
 *                category: 테스트 카테고리
 *                productName: 테스트 아이템1
 *                price: 1000000
 *                mainImage: 
 *                  - 1230deacbffc4fba85c462c996d9740d.jpg
 *                isVisible: 1
 *                createdAt: 2024-03-28T14:17:59.101Z
 *             count: 1
 *             page: 1
 * 
 *    getItemDetailInfoSuccessExample:
 *      value: 
 *        result: 
 *           code: 1
 *           message: 상품 상세 조회 성공
 *           data:
 *             requiredInfo: 
 *               modelName: null
 *               power: null 
 *               manufacturer: null
 *               size: null  
 *               specification: null
 *               asInfo: null 
 *               kcInfo: null
 *               releaseDate: null  
 *               country: null 
 *               weight: null
 *               quality: null  
 *             _id: 66057c179320994fabaa9de5
 *             category: 테스트 카테고리
 *             productName: 테스트 아이템1
 *             price: "1000000"
 *             deliveryFee: "3000"
 *             option: 
 *                - 테스트 옵션1
 *                - 테스트 옵션2
 *             mainImage: 
 *                - 1230deacbffc4fba85c462c996d9740d.jpg
 *             detailImage: 
 *               - 2f68fdc1ba054bbd87cc44ba4d03ad59.png
 *               - 4a6eaa81726f4d7597ae729519d1e80b.jpg
 *               - ae7504c2a3f7455d90c82e417c75a6ee.jpg
 *             isVisible: 1
 *             createdAt: 2024-03-28T14:17:59.101Z
 *             updatedAt: 2024-03-28T14:17:59.101Z
 * 
 */
