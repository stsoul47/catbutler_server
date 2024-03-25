/**
 * @swagger
 * components:
 *  schemas: 
 *    Error:
 *      type: object
 *      properties:
 *        code:
 *          type: number
 *        message: 
 *          type: string
 *    Response:
 *      type: object
 *      properties: 
 *        result: 
 *          type: object
 *          properties:
 *            code: 
 *              type: boolean
 *            message: 
 *              type: string
 *            data: 
 *              type: object
 *              properties:
 *                count: 
 *                  type: number
 *                list:
 *                  type: array
 *    ResponseOne:
 *      type: object
 *      properties: 
 *        result: 
 *          type: object
 *          properties:
 *            code: 
 *              type: boolean
 *            message: 
 *              type: string
 *            data: 
 *              type: object
 *  parameters:
 *    viewCount:
 *      name: viewCount
 *      in: query
 *      description: 컨텐츠 표시 개수
 *      require: true
 *      schema:
 *        type: number
 *      example: 12
 *    pageNumber:
 *      name: pageNumber
 *      in: query
 *      description: 페이지 번호
 *      require: true
 *      schema:
 *        type: number
 *      example: 1
 *  securitySchemes: 
 *    bearerAuth:
 *      type: http
 *      bearerFormat: JWT
 *      scheme: bearer
 *  responses:
 *    BadRequest:
 *      description: Bad Request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *            example:
 *              code: 400
 *              message: '잘못된 요청입니다.'
 *    Unauthorized:
 *      description:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *            example:
 *              code: 401
 *              message: '권한이 없습니다.'
 *    Forbidden:
 *      description:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *            example:
 *              code: 403
 *              message: '잘못된 사용자입니다.'
 *    NotFound:
 *      description: Entity Not Found.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *          example:
 *            code: 404
 *            message: '찾을 수 없는 값입니다.'
 *    InternalServer:
 *      description: Internal Server Error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *          example: 
 *            code: 500
 *            message: Internal Server Error
 */