const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user/userModels');
const crypto = require('../utils/crypto');
module.exports = () => {
	// auth 라우터에서 login 요청이 오면 local 설정대로 이쪽이 실행되게 된다.
	passport.use(
		new LocalStrategy({
			// req.body 객체 인자하고 키 값이 일치해야 한다.
			usernameField: 'email', // req.body.email
			passwordField: 'password' // req.body.password
		},
		/**
		 * session: true, 세션에 저장 여부
		 * passReqToCallback: false,
		 * express의 객체에 접근 가능 여부, true일 때, 뒤의 callback함수에서 req인자가 더 붙음
		 * async(req, email, password, done) => {} 형태가 됨
		 */
		// 콜백함수의 email, password는 위에 설정한 필드이다. 위에서 객체가 전송되면 콜백이 실행된다.
		async (email, password, done) => {
			try {
				// 가입된 사용자인지 조회
				const exUser = await userModel.findOne({ where: { email: email }}); // DB에서 email로 사용자 조회
				if(exUser) {
					const result = await crypto.verifyPassword(password, exUser.salt);
					if(result === exUser.password) {
						done(null, exUser); // done()의 두번째 인자가 req.user에 저장됨
					} else {
						// 실패면 done()의 2번째 인자는 false로 두고, 3번째 인수에 선언
						done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
					}
					// done()을 호출하면, /login 요청은 auth 라우터로 다시 돌아가서 미들웨어 콜백을 실행
				} else {
					// DB에 해당 이메일이 없어서, 회원가입 한적이 없는 상태
					done(null, false, { message: '가입되지 않은 사용자입니다.'})
				}
			} catch (error) {
				console.error(error);
				done(error); // done()의 첫번째 함수는 err용, 특별한 것 없는 평소에는 null
			}
		})
	)
}