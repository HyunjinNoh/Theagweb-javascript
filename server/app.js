import express from 'express';//express 불러옴
import mongoose from 'mongoose';
import config from './config/index.js';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

//Routes
import postRoutes from './routes/api/post.js';
import userRoutes from './routes/api/user.js';
import authRoutes from './routes/api/auth.js';
import searchRoutes from "./routes/api/search.js";

const app = express();//app 변수에다가 express를 담기
const {MONGO_URI} = config;
//const prod = process.env.NODE_ENV === "production";

app.use(hpp());
app.use(helmet());//보안

app.use(cors({origin: true, credentials: true}));//모든 주소 허락
app.use(morgan("dev"));//로그 확인

app.use(express.json());//json형태로 브라우저에서 어떤 내용을 보내면, 서버에서는 이 json 형태를 해석해주세요. 

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    //useCreateIndex: true,
})
.then(()=> console.log("MongoDB connecting Success!"))
.catch((e)=> console.log(e));

// Use routes
/*
app.all("*", (req, res, next) => {
    let protocol = req.headers["x-forward-proto"] || req.protocol;
    if (protocol === "https") {
      next();
    } else {
      let to = `https://${req.hostname}${req.url}`;
      res.redirect(to);
    }
  });
*/

app.use('/api/post', postRoutes); //꼭 처음에 / 쓰기
app.use('/api/user', userRoutes); //꼭 처음에 / 쓰기
app.use('/api/auth', authRoutes); //꼭 처음에 / 쓰기
app.use("/api/search", searchRoutes);

/*
if (prod) {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
  }
*/

export default app; //모듈화 시켜서 다른 파일에서 부를 수 있게 함. 

//alt 방향키 누르면 코드 줄 자유자재로 옮길 수 있음.