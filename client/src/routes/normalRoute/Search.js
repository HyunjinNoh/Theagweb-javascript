import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SEARCH_REQUEST } from "../../redux/types";
import { Row, Col } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";

const Search = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const { searchResult, loading } = useSelector((state) => state.post);

  useEffect(() => {
    if (searchTerm) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchTerm,
      });
    }
  }, [dispatch, searchTerm]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <Row>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((post) => (
            <Col key={post._id} md={4} sm={6} xs={12}>
              <PostCardOne post={post} /> {/* 개별 포스트 데이터 전달 */}
            </Col>
          ))
        ) : (
          <p>No results found for "{searchTerm}".</p>
        )}
      </Row>
    </div>
  );
};

export default Search;