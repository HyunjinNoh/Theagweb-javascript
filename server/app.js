import express from 'express';//express 불러옴
const app = express();//app 변수에다가 express를 담기
app.get('/');//api 쓰는 방법 중 처음에 신호 들어온 것을 일단 다 받아들이라는 의미

export default app; //모듈화 시켜서 다른 파일에서 부를 수 있게 함. 

