import React, { useEffect, useState } from "react";
import { ColorStyle } from "../../styles/common/CommonStyle";
import { PagingBoxStyle, PagingNumStyle } from "../community/styles/ListStyle";
import useCustomMove from "../../hooks/useCustomMove";

const Paging = ({ totalItems, itemPerPage }) => {
  const { moveToList, page } = useCustomMove();

  // 전체 페이지 수 계산
  const [totalPages, setTotalPages] = useState(0);
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 표시할 페이지 번호 배열
  const [pageNumbers, setPageNumbers] = useState([]);
  // 최대 보여지는 페이지 번호 범위
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinpageLimit] = useState(0);

  useEffect(() => {
    // boardNum을 10으로 나눈다음 Math.ceil 내장객체를 이용하여 정수로 만든다.
    const pages = Math.ceil(totalItems / itemPerPage);
    setTotalPages(pages);
    // 만든 정수를 1부터 시작하여 배열로 만든다. 배열의 개수는 무한대로 설정할 수 있다.
    const numbers = Array.from({ length: pages }, (_, i) => i + 1);
    setPageNumbers(numbers);
    // console.log(numbers);

    // url에서 page 쿼리 파라미터를 읽어서 10진수 숫자로 변환한 후
    // 유효한 값이 아니면 1로 설정
    const pageFromQuery = parseInt(
      new URLSearchParams(window.location.search).get("page"),
      10,
    );
    if (!pageFromQuery || isNaN(pageFromQuery)) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageFromQuery);
    }
  }, [totalItems, itemPerPage, currentPage, page]);

  // 현재 페이지네여션을 렌더링할 페이지 번호들
  const renderPageNumbers = pageNumbers.slice(minPageLimit, maxPageLimit);

  // 이전 버튼
  const moveToPrev = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage > 10 && (currentPage - 1) % 10 === 0) {
      setMaxPageLimit(maxPageLimit - 10);
      setMinpageLimit(minPageLimit - 10);
    }
    moveToList({ page: currentPage - 1 });
  };
  // 다음 버튼
  const moveToNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage >= 10 && currentPage % 10 === 0) {
      setMaxPageLimit(maxPageLimit + 10);
      setMinpageLimit(minPageLimit + 10);
    }
    moveToList({ page: currentPage + 1 });
  };

  return (
    <PagingBoxStyle>
      {currentPage > 1 && (
        <PagingNumStyle onClick={moveToPrev}>이전</PagingNumStyle>
      )}

      {renderPageNumbers.map(number => (
        <PagingNumStyle
          key={number}
          onClick={() => {
            setCurrentPage(number);
            moveToList({ page: number });
          }}
          style={
            currentPage === number
              ? { color: ColorStyle.g900, fontWeight: "bold" }
              : {}
          }
        >
          {number}
        </PagingNumStyle>
      ))}

      {currentPage < totalPages && (
        <PagingNumStyle onClick={moveToNext}>다음</PagingNumStyle>
      )}
    </PagingBoxStyle>
  );
};

export default Paging;
