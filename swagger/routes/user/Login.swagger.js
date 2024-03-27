/**
 * @swagger
 * components:
 *  schemas:
 *    login:
 *      type: object
 *      properties: 
 *        email:
 *          type: string
 *        password: 
 *          type: string
 *  examples:
 *    LoginExample:
 *      value:
 *        email: test01@naver.com
 *        password: test01
 *    LoginSuccessExample:
 *      value: 
 *        result: 
 *           code: 1
 *           message: Feed를 불러오는데 성공했습니다.
 *           data:
 *             consent: 
 *               advertisementAgree:
 *                 emailAgree: true
 *                 snsAgree: true
 *               termsAgree: true
 *               electronicAgree: true
 *               personalInfoAgree: true
 *               marketingAgree: true
 *             _id: 6602c08d8abf3a2723109e36
 *             email: test01@naver.com
 *             name: test01
 *             phoneNumber: 010-1234-5678
 *             __v: 0
 *             accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjYwMmMwOGQ4YWJmM2EyNzIzMTA5ZTM2Iiwiand0SWQiOnt9LCJpYXQiOjE3MTE1NTA1NjQsImV4cCI6MTcxMTU1MTQ2NH0.PmJWwVjrsO8N1AnL7my9EI4V5XHQL5GvTpl776inyKo
 */