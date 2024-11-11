import mongoose from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true, //검색할 때 편하게 하기 위해 
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2, //작성자 조회수 빼기 위해
  },
  fileUrl: {
    type: String,
    default: "https://source.unsplash.com/random/301x201", //썸네일 랜덤으로 불러오는 사이트(다른 그림 파일로 대체 가능)
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  comments: [//한 포스트에 comment는 여러 개 있을 수 있어서 배열로 정의
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", PostSchema);

export default Post;