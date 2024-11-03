import mongoose from 'mongoose';
import moment from 'moment';

//create Schema
const UserSchema = new mongoose.Schema({//mongoose에서 스키마를 불러와서
    name: {
        type: String, 
        required: true, //필수값
    },
    email: {
        type: String, 
        required: true, //필수값
        unique: true, //고유값
    },
    password: {
        type: String, 
        required: true, //필수값
    },
    role: {
        type: String, 
        enum: ["MainJuin", "SubJuin", "User"], 
        default: "User",//가입하는 모든 사람들은 그냥 User
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss"), //가입날짜 저장형식
    },
    comments: [//한 사람당 여러 개 댓글을 달 수 있어서 배열 구조
        {   
            posts_id: {//포스트가 지워지면 포스트와 관련된 코멘트도 지워져야 하기 때문. 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "posts",//참조
            },
            comment_id: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "comments",
            }, 
        }, 
    ], 
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "posts", 
        },
    ],
});

const User = mongoose.model("user", UserSchema);//UserSchema를 "user"라고 부르겠다. 이걸 model로 내보내겠다. 

export default User;

