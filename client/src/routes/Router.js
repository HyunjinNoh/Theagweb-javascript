import React, { Fragment } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import { Routes, Route, Navigate } from "react-router-dom"; // Navigate 사용
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import PostEdit from "./normalRoute/PostEdit";
import CategoryResult from "./normalRoute/CategoryResult";
import Profile from "./normalRoute/Profile";
import {
  EditProtectedRoute,
  ProfileProtectedRoute,
} from "./protectedRoute/ProtectedRoute";

const MyRouter = () => (
  <Fragment>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Routes>
        <Route path="/" element={<PostCardList />} />
        <Route path="/post" element={<PostWrite />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/:id/edit" element={<EditProtectedRoute component={PostEdit} />} />
        <Route path="/post/category/:categoryName" element={<CategoryResult />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/user/:userName/profile" element={<ProfileProtectedRoute component={Profile} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
    <Footer />
  </Fragment>
);

export default MyRouter;
