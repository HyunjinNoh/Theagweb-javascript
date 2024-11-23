/* global CKEDITOR */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, FormGroup, Label, Input, Button, Col, Progress } from "reactstrap";
import { POST_UPLOADING_REQUEST } from "../../redux/types";

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({ title: "", contents: "", category: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.ckeditor.com/4.20.0/full-all/ckeditor.js";
    script.onload = () => {
      if (document.getElementById("editor")) {
        CKEDITOR.replace("editor", {
          extraPlugins: "image2",
          filebrowserUploadUrl: "/api/post/image",
          filebrowserUploadMethod: "form",
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, category } = form;
    const contents = CKEDITOR.instances.editor?.getData();

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
