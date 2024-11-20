//JWT와 서버의 부담 줄이기 
//웹에서 토큰을 보내주면 서버에서 이를 인증을 해서 성공하면 글 쓰게 하거나 로그인할 수 있게 하는 것
//서버가 유저가 로그인했는지 보관할 필요가 없고 그 때 그 때 토큰값이 유효한지만 판단을 하면 되어 서버 부담이 줄어듦
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
//models
import User from '../../../models/user.js';

const{ JWT_SECRET } = config;
const router = express.Router();

//@routes   GET api/user
//@desc     Get all user //모든 유저 조회
//@access   public

router.get('/', async(req, res) => {
    try {
        const users = await User.find() //유저가 존재하면 유저 모델에서 찾아주세요 
        if(!users) throw Error("No users") //존재하지 않는다면 에러
        res.status(200).json(users)//성공시 찾은 결과 보내줌
    }catch(e){
        console.log(e)
        res.status(400).json({msg: e.message})
    }
});

//@routes   POST api/user
//@desc     Register user //회원가입
//@access   public //일단 모든 사람들이 회원가입 가능

router.post('/', (req, res)=> {
    console.log(req) //req.body 말고 req만 적는 이유
    const {name, email, password} = req.body

    //Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({msg: "모든 필드를 채워 주세요"})//나중에 Bootstrap에서 이 메세지로 알림 가게 할 것임.
    }

    //Check for existing user
    //User모델에서 email은 unique
    User.findOne({email}).then((user =>{//찾은 사람이 user라고 하면
        if(user) 
            return res.status(400).json({msg: "이미 가입된 유저가 존재합니다."});
        const newUser = new User({//없다면 newUser로 가입됨
            name, email, password
        })
    
        bcrypt.genSalt(10, (err,salt) => {//2의 10승 값을 돌려서 솔트 만들어줌
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user)=>{
                    jwt.sign(
                        {id: user.id},
                        JWT_SECRET,//비밀값 등록
                        {expiresIn: 3600},//단위는 초
                        (err, token) => {//user post할 때 token 볼 수 있음
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id , 
                                    name: user.name, 
                                    email: user.email,
                                },
                            });
                        }
                    );              
                });
            });
        });
    }));
});

export default router;