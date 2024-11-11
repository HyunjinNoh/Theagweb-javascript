import mongoose from "mongoose";

// Create Schema
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: "미분류", //카테고리 미지정했을 때
  },
  posts: [ //카테고리는 여러 post를 가질 수 있어서 배열로 정의
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const Category = mongoose.model("category", CategorySchema);

export default Category;