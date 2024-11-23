import React, { Fragment } from "react";
import { Row, Spinner } from "reactstrap";

export const GrowingSpinner = (
  <Fragment>
    <Row className="d-flex justify-content-center m-5">
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#fffedd"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#1f2a4b"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#fffedd"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#1f2a4b"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#fffedd"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#1f2a4b"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#fffedd"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="#1f2a4b"
      />
    </Row>
  </Fragment>
);
