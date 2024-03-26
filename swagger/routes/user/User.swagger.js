/**
 * @swagger
 * components:
 *  schemas:
 *    registerUser:
 *      type: object
 *      properties: 
 *        email: 
 *          type: string
 *        password:
 *          type: string
 *        name:
 *          type: string
 *        phoneNumber: 
 *          type: string
 *        termsAgree: 
 *          type: boolean
 *        electronicAgree:
 *          type: boolean
 *        personalInfoAgree:
 *          type: boolean
 *        marketingAgree: 
 *          type: boolean
 *        emailAgree: 
 *          type: boolean
 *        snsAgree: 
 *          type: boolean
 * 
 *  parameters:
 *    emailCheckParam:
 *      name: email
 *      in: query
 *      description: 중복 체크를 할 email
 *      require: true
 *      schema:
 *        type: string
 *      example: test01@naver.com
 *  
 *  examples:
 *    registerUserExample:
 *      value:
 *        email: test02@naver.com
 *        password: test02
 *        name: test02
 *        phoneNumber: 010-1234-5678
 *        termsAgree: true
 *        electronicAgree: true 
 *        personalInfoAgree: true
 *        marketingAgree: true
 *        emailAgree: true
 *        snsAgree: true
 *    registerUserSuccessExample:
 *      value:
 *        code: 1
 *        message: 회원가입 성공
 *        data: {}
 * 
 *    emailCheckSuccessExample:
 *      value:
 *        code: 1
 *        message: 이메일 중복검사 성공
 *        data: {}
 */
