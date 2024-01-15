import React from "react";
import MyBookCard from "../../components/my/MyBookCard";
import { MyBookPageTitle, MyBookPageWrapper } from "./styles/MyBookPageStyle";
import MyPageButton from "../../components/my/MyPageButton";

// 내 예약 내역 보기 페이지
const MyBookPage = () => (
  <MyBookPageWrapper>
    <MyBookPageTitle>
      <span>내 예약/픽업 내역 보기</span>
    </MyBookPageTitle>
    <MyBookCard storeimg="https://picsum.photos/331/228/?category=meat"></MyBookCard>
    <MyPageButton></MyPageButton>
  </MyBookPageWrapper>
);

export default MyBookPage;
