/* global CKEDITOR */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import { Form, FormGroup, Label, Input, Button, Col, Progress } from "reactstrap";
import { POST_UPLOADING_REQUEST } from "../../redux/types";

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { postUploaded } = useSelector((state) => state.post); // post 상태 추가
  const [form, setValues] = useState({ title: "", contents: "", category: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.ckeditor.com/4.20.0/full-all/ckeditor.js"; // full-all 버전 사용
    script.onload = () => {
      CKEDITOR.replace("editor", {
        extraPlugins: "image2",
        filebrowserUploadUrl: "/api/post/image",
        filebrowserUploadMethod: "form",
      });
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (postUploaded) {
      navigate("/"); // 포스팅 성공 시 홈으로 이동
    }
  }, [postUploaded, navigate]); // postUploaded 상태 변경 감지

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, category } = form;
    const contents = CKEDITOR.instances.editor.getData(); // CKEditor 데이터 가져오기

    if (!title || !contents || !category) {
      alert("All fields are required!");
      return;
    }

    const token = localStorage.getItem("token");
    const body = { title, contents, category, token };
    dispatch({
      type: POST_UPLOADING_REQUEST,
      payload: body,
    });
  };

  // Redux 상태 확인 후 리다이렉트 처리
  useEffect(() => {
    if (postUploaded) {
      navigate("/"); // 홈 페이지로 이동
      dispatch({ type: "RESET_POST_UPLOADING_STATE" }); // 상태 초기화
    }
  }, [postUploaded, dispatch, navigate]);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" onChange={onChange} placeholder="Enter title" />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input type="text" name="category" onChange={onChange} placeholder="Enter category" />
          </FormGroup>
          <FormGroup>
            <Label for="content">Content</Label>
            <textarea id="editor"></textarea>
          </FormGroup>
          <Button color="primary">Post</Button>
        </Form>
      ) : (
        <Col>
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
};

export default PostWrite;
