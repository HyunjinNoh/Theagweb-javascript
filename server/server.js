import app from './app.js';
import config from './config/index.js';

const {PORT} = config;

app.listen(PORT, () => { //서버는 포트 7000에서 듣고 있음. 들으면 어떻게 작동? hi라고 작동을 하게 됨. 
    console.log(`Server started on Port ${PORT}`);//``는 백틱. 텍스트랑 변수랑 섞어서 문장을 만들 수가 있다. 
});

