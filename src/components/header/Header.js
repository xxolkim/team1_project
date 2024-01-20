import { Link } from "react-router-dom";
import {
  BarStyle,
  HeaderStyle,
  JoinStyle,
  LogoStyle,
  NavStyle,
} from "./styles/HeaderStyle";

const Header = () => {
  return (
    <HeaderStyle>
      <LogoStyle>
        <Link to="/main">
          <img src="/assets/images/logo_1.svg" alt="logo" />
        </Link>
      </LogoStyle>
      <BarStyle>
        <JoinStyle>
          <Link to="/login">로그인</Link>
          <Link to="/join">회원가입</Link>
        </JoinStyle>
        <NavStyle>
          <Link to="/meat">고깃집찾기</Link>
          <Link to="/mart">정육점찾기</Link>
          <Link to="/sale">마감세일</Link>
          <Link to="/community">고기잡담</Link>
          <Link to="/my">마이페이지</Link>
        </NavStyle>
      </BarStyle>
    </HeaderStyle>
  );
};

export default Header;
