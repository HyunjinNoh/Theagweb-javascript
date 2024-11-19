//JWT와 서버의 부담 줄이기 

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jwonwebtoken';

//models
import User from '../../../models/user.js';

const router = express.Router();

//@routes   GET api/user
//@desc     Get all user
//@access   public

router.get('/', async(req, res) => {
    try {
        const users = await User.find() //유저가 존재하면 유저 모델에서 찾아주세요 
        if(!users) throw Error("No users") //그게 아니라면 에러
        res.status(200).json(users)//성공시
    }catch(e){
        console.log(e)
        res.status(400).json({msg: e.message})
    }
});

//@routes   POST api/user
//@desc     Register user
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
    User.findOne({email}).then((user =>{
        if(user) 
            return res.status(400).json({msg: "이미 가입된 유저가 존재합니다."});
        const newUser = new User({//없다면 newUser로 가입됨
            name, email, password
        })
    
        bcrypt.genSalt(10, (err,salt) => {//10승 값을 돌려서 솔트 만들어줌
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user)=>{
                    jwt.sign(
                        {id: user.id},
                        
                    )
                }
            })
        })
    })
})