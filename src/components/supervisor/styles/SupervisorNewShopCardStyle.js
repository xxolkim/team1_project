import styled from "@emotion/styled";

export const SupervisorNewShopWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 56px;
  width: 690px;
  height: 400px;
  border-radius: 8px;
  padding-left: 30px;
  background: #fff;
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1),
    0px 2px 3px 0px rgba(0, 0, 0, 0.1);
`;

export const SupervisorNewShopVisual = styled.div`
  position: relative;
  display: block;
  margin: auto 0;
  width: 348px;
  height: 330px;
  background-color: blue;
  border-radius: 5px;
`;

export const SupervisorNewShopInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 330px;
  gap: 100px;
`;

export const SupervisorNewShopInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
`;

export const NewShopTitle = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  li {
    margin-bottom: 24px;
  }
`;

export const NewShopContent = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  li {
    margin-bottom: 24px;
  }
`;

export const SupervisorNewShopButton = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-left: 45px;
`;
