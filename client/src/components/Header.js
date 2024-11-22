import React from "react";
import { Row, Col } from "reactstrap";

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Articles Page</h1>
          <p>The Ajou Globe, The Youth Globe (청소년 기자단)의 기사를 보실 수 있습니다.</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;