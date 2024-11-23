import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchBy, setSearchBy] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearchBy(e.target.value); // 입력 값을 상태로 저장
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchBy.trim() !== "") {
      navigate(`/search/${searchBy}`); // 검색어를 기반으로 URL 업데이트
    }
  };

  return (
    <Form onSubmit={onSubmit} className="col mt-2">
      <Input
        name="searchBy"
        value={searchBy}
        onChange={onChange}
        placeholder='Write the search term and press the "Enter" key'
      />
    </Form>
  );
};

export default SearchInput;