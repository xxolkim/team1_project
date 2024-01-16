import React from "react";
import AboutCard from "../../components/About/AboutCard";
import Layout from "../../layouts/Layout";
import {
  AboutCardButton,
  AboutCardWrap,
  AboutEventCards,
  AboutPageCommunity,
  AboutPageEvent,
  AboutPageMain,
  AboutPageShops,
  AboutPageTop,
  AboutPageWrap,
  ButcherCard,
  ButcherCards,
  CommunityImages,
  GogishopCard,
  MainBand,
  MainButcher,
  MainGogiShop,
  TodayEvent,
} from "./styles/AboutPageStyle";
import { DefaultBt } from "../../components/button/styles/ButtonStyle";

const AboutPage = () => {
  return (
    <Layout>
      <AboutPageWrap>
        {/* Top사진 */}
        <AboutPageTop>
          <ul>
            <li className="text-one">인생은 고기서 고기다.</li>
            <li className="text-two">기분이 저기앞일 땐 고기 앞으로 가자!</li>
            <li className="text-three">고기에 진심인 자들을 위한</li>
            <li className="text-four">고기-로</li>
          </ul>
          <img src="/assets/images/aboutimages/main.png" alt="" />
        </AboutPageTop>
        {/* 중앙(메인) */}
        <AboutPageMain>
          <MainGogiShop>
            <div className="GogiShopTitle">오직 고기-로에서만</div>
            <GogishopCard>
              {/* 고깃집 첫번째 카드 */}
              <AboutCardWrap>
                <img
                  className="AboutCardImg"
                  src="/assets/images/aboutimages/gogishop_1.svg"
                />
                <div className="AboutCardTitle">끝돈 대구종로점</div>
                <div className="AboutCardPrice">삼겹살(130g) 13,000원~</div>
                <AboutCardButton>
                  <DefaultBt className="InfoButton">상세보기</DefaultBt>
                  <DefaultBt className="BookButton">예약하기</DefaultBt>
                </AboutCardButton>
              </AboutCardWrap>
              {/* 고깃집 두번쨰 카드 */}
              <AboutCardWrap>
                <img
                  className="AboutCardImg"
                  src="/assets/images/aboutimages/gogishop_1.svg"
                />
                <div className="AboutCardTitle">끝돈 대구종로점</div>
                <div className="AboutCardPrice">삼겹살(130g) 13,000원~</div>
                <AboutCardButton>
                  <DefaultBt className="InfoButton">상세보기</DefaultBt>
                  <DefaultBt className="BookButton">예약하기</DefaultBt>
                </AboutCardButton>
              </AboutCardWrap>
            </GogishopCard>
          </MainGogiShop>

          {/* 정육점  */}
          <MainButcher>
            <div className="ButcherTitle">캠핑도 고기-로와 함께</div>
            <ButcherCards>
              {/* 정육점 첫번째 카드 */}
              <AboutCardWrap>
                <img
                  className="AboutCardImg"
                  src="/assets/images/aboutimages/butcher_1.svg"
                />
                <div className="AboutCardTitle">남문한우백화점 부림축산</div>
                <div className="AboutCardPrice">돼지양념갈비 10,000원~</div>
                <AboutCardButton>
                  <DefaultBt className="InfoButton">상세보기</DefaultBt>
                  <DefaultBt className="BookButton">픽업하기</DefaultBt>
                </AboutCardButton>
              </AboutCardWrap>
              {/* 정육점 두번째 카드 */}
              <AboutCardWrap>
                <img
                  className="AboutCardImg"
                  src="/assets/images/aboutimages/butcher_2.svg"
                />
                <div className="AboutCardTitle">남문한우백화점 부림축산</div>
                <div className="AboutCardPrice">돼지양념갈비 10,000원~</div>
                <AboutCardButton>
                  <DefaultBt className="InfoButton">상세보기</DefaultBt>
                  <DefaultBt className="BookButton">픽업하기</DefaultBt>
                </AboutCardButton>
              </AboutCardWrap>
            </ButcherCards>
          </MainButcher>

          <MainBand>
            <img src="/assets/images/aboutimages/gogiro_band.svg" alt="image" />
            <span className="MainBandText">고기-로</span>
          </MainBand>

          {/* 고깃집 홍보 */}
          <AboutPageShops>
            <div className="ShopTexts">
              <span className="">미친 가성비 고깃집</span>
              <br />
              <span className="">:쎈밤</span>
              <br />
              <span className="">삼겹살/목살/막창 1인분(150g)</span>
              <br />
              <span className="">7,900원</span>
            </div>
            <img src="" />
          </AboutPageShops>
          {/* 오늘의 행사 */}
          <AboutPageEvent>
            <div className="EventTitle">오늘의 행사</div>
            {/* 이벤트 첫번째 카드 */}
            <AboutEventCards>
              <AboutCardWrap>
                <img
                  className="EventImage"
                  src="/assets/images/aboutimages/butcher_3.svg"
                />
                <div className="AboutCardTitle">신미식육점</div>
                <div className="AboutCardPrice">최대 30% 할인 행사</div>
                <DefaultBt className="EvenntButton">방문하기</DefaultBt>
              </AboutCardWrap>
              {/* 이벤트 두번째 카드 */}
              <AboutCardWrap>
                <img
                  className="EventImage"
                  src="/assets/images/aboutimages/butcher_3.svg"
                />
                <div className="AboutCardTitle">신미식육점</div>
                <div className="AboutCardPrice">최대 30% 할인 행사</div>
                <DefaultBt className="EvenntButton">방문하기</DefaultBt>
              </AboutCardWrap>
            </AboutEventCards>
          </AboutPageEvent>

          <AboutPageCommunity>
            <span className="CommunityTitle">고기 잡담</span>
            <CommunityImages>
            <img
              className="BigImage"
              src="/assets/images/aboutimages/community_1.svg"
            />
            <img className="SmallImage" src="/assets/images/aboutimages/community_2.svg" />
            <img className="SmallImage" src="/assets/images/aboutimages/community_3.svg" />
            <img className="SmallImage" src="/assets/images/aboutimages/community_4.svg" />
            <img className="SmallImage" src="/assets/images/aboutimages/community_5.svg" />
            </CommunityImages>
          </AboutPageCommunity>
        </AboutPageMain>
      </AboutPageWrap>
    </Layout>
  );
};

export default AboutPage;
