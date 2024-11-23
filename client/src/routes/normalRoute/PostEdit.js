import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Progress,
} from "reactstrap";
import { POST_EDIT_UPLOADING_REQUEST } from "../../redux/types";

const PostEdit = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { postDetail } = useSelector((state) => state.post);
  const [form, setValues] = useState({ title: "", contents: "", fileUrl: "" });
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, contents, fileUrl } = form;
    const token = localStorage.getItem("token");
    const id = postDetail._id;
    const body = { title, contents, fileUrl, token, id };

    dispatch({
      type: POST_EDIT_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setValues({
      title: postDetail.title,
      contents: postDetail.contents,
      fileUrl: postDetail.fileUrl,
    });
  }, [postDetail.title, postDetail.contents, postDetail.fileUrl, form]);

  // CKEditor 관련 설정
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.ClassicEditor) {
        window.ClassicEditor.create(document.querySelector("#editor"), {
          simpleUpload: {
            uploadUrl: "/api/post/image",
          },
        })
          .then((editor) => {
            editor.setData(postDetail.contents || "");
            editor.model.document.on("change:data", () => {
              const data = editor.getData();
              setValues({ ...form, contents: data });
            });
          })
          .catch((error) => {
            console.error("Error initializing CKEditor:", error);
          });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [postDetail.contents]);

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              defaultValue={postDetail.title}
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
              placeholder="Enter the title"
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>
            <div id="editor" />
          </FormGroup>
          <Button color="success" block className="mt-3 col-md-2 offset-md-5 mb-3">
            Save Changes
          </Button>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
};

export default PostEdit;
