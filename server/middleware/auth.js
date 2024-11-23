import jwt from 'jsonwebtoken';
import config from '../config/index.js';
const {JWT_SECRET} = config;

//회원 인증 관련 미들웨어
const auth = (req, res, next) => {
    const token = req.header('x-auth-token')//토큰 값은 브라우저 헤더 안에 저장되어 있다. 

    if(!token){
        return res.status(401).json({msg: "토큰 없음. 인증이 거부됨!"})
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET)//토큰 해석
        req.user = decoded
        next()
    }catch(e){
        console.log(e)
        res.status(400).json({msg: "토큰이 유효하지 않습니다"})
    }
}

//관리자 권한 확인 미들웨어
export const adminMiddleware = (req, res, next) => {
    console.log("Decoded User Info:", req.user);
    if (!req.user || req.user.role !== "Developer") {
      // 사용자 정보가 없거나 역할이 Developer가 아니면 거부
      return res.status(403).json({ msg: "접근이 거부되었습니다. 관리자 권한이 필요합니다." });
    }
    next();
  };

export default auth;
