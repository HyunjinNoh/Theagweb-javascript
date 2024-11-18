import express from 'express';
import Post from '../../../models/post.js';

const router = express.Router();

//api/post 
//백엔드랑 프론트랑 주소가 약간 달라야 해서 백엔드 측에서는 좀 복잡한 주소로 쓴다. 
router.get('/', async(req, res) => { //request, response. 마지막에는 서버에서 반응을 보내줘야 한다. 
    const postFindResult = await Post.find(); //Post라는 모델에서 다 찾을 때까진 아래로 내려가지마. find는 mongoose 라이브러리에서 제공해주는 함수
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
})

router.post('/', async(req, res, next)=>{
    try{
        console.log(req, "req");//어떤 것이 들어왔을까
        const {title, contents, fileUrl, creator} = req.body;//models 폴더에 post에 뭐가 있는지. req.body 안에 요청을 보냄. 구조분해 문법
        const newPost = await Post.create({
            title, 
            contents, 
            fileUrl, 
            creator,
        });//mongoDB쓸 때는 async await 을 써야 실행이 된다. 아니면 exec() 써줘야 함. 
        res.json(newPost);
        }catch(e) {
            console.log(e);
        }
    });

    export default router;//기본 내보내기. 한 개만 내보냄. 다른 곳에서 import할 때 이름을 따로 지정할 수 있다. 
    
