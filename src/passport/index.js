const passport = require('passport');
// const local = 
// const kakao =
const userModel = require('../models/user/userModels');

module.exports = () => {
	/**
	 * ○ 직렬화(Serialization)란?
	 *  - 사용자 정보 객체를 세션에 아이디로 저장하는 것
	 * 	- 객체를 직렬화하여 전송 가능한 형태로 만드는 것
	 * ○ 역직렬화(Deserialization)란?
	 *  - 세션에 저장된 아이디를 통해 사용자 정보 객체를 불러오는 것
	 *  - 직렬화된 파일 등을 역으로 직렬화하여 다시 객체의 형태로 만드는 것
	 */

	// req.login(user, ...)가 실행되면, serializeUser가 호출되어 user.id를 세션에 저장
	// 즉 로그인 과정을 할 때만 실행되는 함수
	passport.serializeUser((user, done) => {
		// req.login()의 user가 여기로 전달되서 값을 이용할 수 있게 된다.
		done(null, user.id);
		/** req.session객체에 어떤 데이터를 저장할 지 선택
		 * user.id만을 세션객체에 넣음, 사용자의 모든 정보를 들고 있으면 서버 자원낭비
		 * 사용자 정보를 모두 들고 있으면 세션의 용량이 커지고 데이터가 많이 전송되어 성능에 영향을 미칠 수 있음
		 * user.id만 들고 있으면 필요할 때마다 DB에서 사용자 정보를 조회하여 사용할 수 있음
		 * 세션에는 {id: 3, 'connect.sid': s%3A...}와 같이 저장됨
		 */ 
	});

	// deserializeUser는 매 요청 시 실행됨
	// serializeUser()가 done하거나 passport.deserializeUser()가 호출되면 실행됨
	// 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것
	passport.deserializeUser((email, done) => {
		// req.session에 저장된 사용자 아이디(우리 프로젝트에선 email)를 바탕으로 DB조회로 사용자 정보를 얻어낸 후 req.user에 저장
		// 즉, id를 sql로 조회해서 전체 정보를 가져오는 복구 로직
		userModel.findOne({ where: { email: email}})
		.then(user => done(null, user)) // done() 이 되면 이제 다시 req.login()쪽으로 넘어감
		.catch(err => done(err));
	});

	/**
	 * 위의 일련의 과정은, 그냥 처음부터 user객체를 통째로 주면 될것 같은데 직렬화/역직렬화를 하는 이유는?
	 *  - 세션 메모리가 한정되어 있기 때문에 효율적으로 사용하기 위함
	 *  - user.id값 하나만 받아서, 이를 deserialize 복구해서 사용하는 식으로 하기위해서 
	 */

	// local();
	// kakao();
}
