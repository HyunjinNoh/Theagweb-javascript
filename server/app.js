import express from 'express';//express 불러옴
import mongoose from 'mongoose';
import config from './config';

const app = express();//app 변수에다가 express를 담기
const {MONGO_URI} = config;

app.use(app())
app.use(helmet())//보안

app.use(cors({origin: true, credentials: true}))//모든 주소 허락
app.use(morgan("dev"))//로그 확인

app.use(express.json())//json형태로 브라우저에서 어떤 내용을 보내면, 서버에서는 이 json 형태를 해석해주세요. 

mongoose.connect({MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}})
.then(()=> console.log("MongoDB connecting Success!"))
.catch((e)=> console.log(e));

//Use routers
app.get('/');//api 쓰는 방법 중 처음에 신호 들어온 것을 일단 다 받아들이라는 의미

export default app; //모듈화 시켜서 다른 파일에서 부를 수 있게 함. 

