import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteComment,
  deleteOne,
  getOne,
  postComment,
} from "../../api/communityApi";
import { API_SERVER_HOST } from "../../api/config";
import useCustomMove from "../../hooks/useCustomMove";
import Button from "../button/Button";
import Fetching from "../common/Fetching";
import ResultModal from "../common/ResultModal";
import Tag from "../tag/Tag";
import {
  ContentInfoStyle,
  ContentStyle,
  ImgStyle,
  LargeImgStyle,
  NameStyle,
  TagBoxStyle,
  ThumbnailStyle,
  UserStyle,
  WrapStyle,
} from "./styles/ListStyle";
import {
  BtnBoxStyle,
  MoreBoxStyle,
  MoreStyle,
  MoreTitleStyle,
  PrnvContentStyle,
  ReviewBox,
  TitleBoxStyle,
  WriterBoxStyle,
} from "./styles/ReadStyle";
import SelectedModal from "../common/SelectedModal";

const host = API_SERVER_HOST;
// 서버데이터 초기값
const initState = {
  iboard: 0,
  iuser: 0,
  name: "",
  writerPic: "",
  title: "",
  contents: "",
  createdAt: "",
  pics: [],
  beAf: [
    {
      iboard: 0,
      title: "",
    },
  ],
  comments: [
    {
      icomment: 0,
      writerPk: 0,
      writerName: "",
      comment: "",
      createdAt: "",
    },
  ],
};
// 댓글 등록을 위한 초기값
const initComment = {
  contents: "",
};

const Read = () => {
  // 커스텀 훅
  const { moveToRead, moveToList, moveToModify, page } = useCustomMove();
  // 해당 글 pk값 추출 및 할당(get)
  const { iboard } = useParams();
  // 해당 글 상태 초기화 및 업데이트(get)
  const [content, setContent] = useState(initState);
  // 해당 글에 댓글 작성을 위한 상태 초기화 및 업데이트(post)
  const [contents, setcontents] = useState(initComment);
  // 해당 글의 댓글 상태 초기화 및 업데이트(get)
  const [comments, setComments] = useState([]);
  // 로딩창
  const [fetching, setFetching] = useState(false);
  // 커뮤니티 해당 글 정보 가져오기(get)
  const getOneData = () => {
    getOne({ iboard, successFn, failFn, errorFn });
  };

  const successFn = result => {
    setFetching(false);
    setContent(result);
    setComments(result.comments);
    console.log(result);
  };
  const failFn = result => {
    setFetching(false);
    console.log(result);
  };
  const errorFn = result => {
    setFetching(false);
    console.log(result);
  };

  useEffect(() => {
    setFetching(true);
    getOneData();
  }, [iboard, page]);

  // 커뮤니티 해당 글 이미지 미리보기 관련
  const [selectedImg, setSlectedImg] = useState(content.pics[0]?.pic);

  // 해당글의 이미지 큰이미지로 보여주기
  // content.pics가 변경될 때마다 실행됩니다.
  useEffect(() => {
    if (content.pics && content.pics.length > 0 && content.pics[0].pic) {
      setSlectedImg(content.pics[0].pic);
    }
  }, [content.pics]);
  // 썸네일 이미지 클릭 시 이미지 상태 업데이트
  const handleThumbnailClick = pic => {
    setSlectedImg(pic);
  };

  // 댓글 등록 관련
  const handleChange = e => {
    // 댓글 입력 텍스트 필드의 새로고침을 위해 변수에 할당
    const newContents = { ...contents, [e.target.name]: e.target.value };
    setcontents(newContents);
    // 기존 방식
    // contents[e.target.name] = e.target.value;
    // setcontents({ ...contents });
  };

  // 댓글 등록 함수
  const addComment = () => {
    postComment({
      iboard,
      contents,
      successFn: successFnAdd,
      failFn: failFnAdd,
      errorFn: errorFnAdd,
    });
    console.log(contents);
    console.log(iboard);
  };
  const successFnAdd = result => {
    console.log(result);
    setPopRedirect(1);
    setResult(true);
    setPopTitle("댓글 등록");
    setPopContent("댓글을 등록하였습니다.");
    setcontents({ ...initComment });
    getOneData();
  };
  const failFnAdd = result => {
    console.log(result);
    setPopRedirect(1);
    setResult(true);
    setPopTitle("댓글 등록 실패");
    setPopContent("댓글을 등록에 실패하였습니다. 다시 등록 해주세요.");
  };
  const errorFnAdd = result => {
    console.log(result);
    setPopRedirect(1);
    setResult(true);
    setPopTitle("댓글 등록 실패");
    setPopContent("서버가 불안정합니다. 잠시 후 다시 등록 해주세요.");
  };

  // 댓글 삭제 관련
  // 댓글 pk값 상태 업데이트
  const [currentCommentId, setCurrentCommentId] = useState(null);

  // selectedModal 띄우기 위한 상태 업데이트
  const [showModal, setShowModal] = useState(false);

  // 댓글 삭제 시 해당 pk값으로 상태 업데이트 후
  // 확인 모달창 띄우기
  const handleDelComment = icomment => {
    setCurrentCommentId(icomment);
    setShowModal(true);
  };

  const successFnDel = result => {
    console.log("댓글 삭제 성공", result);
    setResult(true);
    setPopTitle("댓글 삭제");
    setPopContent("댓글을 삭제하였습니다.");
    setPopRedirect(1);
    getOneData();
  };
  const failFnDel = result => {
    console.log("댓글 삭제 실패", result);
    setResult(false);
    setPopTitle("댓글 삭제 실패");
    setPopContent("댓글 삭제에 실패하였습니다. 다시 시도 해주세요.");
  };
  const errorFnDel = result => {
    console.log("댓글 삭제 실패", result);
    setPopRedirect(1);
    setResult(true);
    setPopTitle("댓글 삭제 실패");
    setPopContent("서버가 불안정합니다. 잠시 후 다시 시도 해주세요.");
  };

  // 해당 글 pk값 상태 업데이트
  const [currentReadId, setCurrentReadId] = useState(null);
  // selectedModal 을 띄우기 위한 상태 업데이트
  const [showReadModal, setShowReadModal] = useState(false);
  // 해당 글 삭제 시 해당 pk값으로 상태 업데이트 후
  // 확인 모달창 띄우기
  const handleDelRead = iboard => {
    setCurrentReadId(iboard);
    setShowReadModal(true);
  };

  // 모달창 관련
  const closeModal = () => {
    // 모달창 숨기기
    setResult(false);
  };
  const cancelModal = () => {
    // selectedModal 취소 버튼
    setShowModal(false);
  };
  const cancelReadModal = () => {
    setShowReadModal(false);
  };

  // selectedModal 확인버튼
  const confirmModal = () => {
    if (currentCommentId) {
      deleteComment({
        icomment: currentCommentId,
        successFn: successFnDel,
        failFn: failFnDel,
        errorFn: errorFnDel,
      });
    }
    setShowModal(false);
  };

  const confirmReadModal = () => {
    if (currentReadId) {
      deleteOne({
        iboard: currentReadId,
        successFn: successFnReadDel,
        failFn: failFnReadDel,
        errorFn: errorFnReadDel,
      });
    }
    setShowReadModal(false);
  };

  const successFnReadDel = result => {
    console.log("해당 글 삭제 성공", result);
    setResult(true);
    setPopTitle("해당 글 삭제");
    setPopContent("해당 글을 삭제하였습니다.");
    setPopRedirect(1);
    getOneData();
  };
  const failFnReadDel = result => {
    console.log("해당 글 삭제 실패", result);
    setResult(false);
    setPopTitle("해당 글 삭제 실패");
    setPopContent("해당 글 삭제에 실패하였습니다. 다시 시도 해주세요.");
  };
  const errorFnReadDel = result => {
    console.log("해당 글 삭제 실패", result);
    setPopRedirect(1);
    setResult(true);
    setPopTitle("해당 글 삭제 실패");
    setPopContent("서버가 불안정합니다. 잠시 후 다시 시도 해주세요.");
  };

  // API 통신 결과 상태 업데이트
  const [result, setResult] = useState(false);
  // resultModal props 값 업데이트
  const [popTitle, setPopTitle] = useState("");
  const [popContent, setPopContent] = useState("");
  // Modal 닫기 이후 화면 전환 상태 업데이트
  const [popRedirect, setPopRedirect] = useState(false);

  return (
    <WrapStyle>
      {fetching ? <Fetching /> : null}
      <TitleBoxStyle>
        <MoreTitleStyle>{content.title}</MoreTitleStyle>
        <WriterBoxStyle>
          <div className="userName">{content.name}</div>
          <div className="date">{content.createdAt}</div>
          <div className="viewBox">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/view_eye.svg`}
              alt="img"
            />
            <div className="viewCount">3574</div>
          </div>
        </WriterBoxStyle>
      </TitleBoxStyle>
      <MoreBoxStyle>
        <ImgStyle>
          <LargeImgStyle>
            <img
              src={`${host}/pic/community/${content.iboard}/${selectedImg}`}
              alt="Large image"
            />
          </LargeImgStyle>
          <ThumbnailStyle>
            {content.pics.map(
              (pic, index) =>
                pic && (
                  <div
                    className="thumbnail"
                    key={index}
                    onClick={() => {
                      handleThumbnailClick(pic.pic);
                    }}
                  >
                    <img
                      src={`${host}/pic/community/${content.iboard}/${pic.pic}`}
                      alt={`img_${index + 1}`}
                    />
                  </div>
                ),
            )}
          </ThumbnailStyle>
        </ImgStyle>
        <ContentInfoStyle>
          <ContentStyle>
            <UserStyle>
              <img
                src={`${host}/pic/community/${content.iboard}/${content.writerPic}`}
                alt="프로필사진"
              />
              <NameStyle>
                <div>{content.name}</div>
                <TagBoxStyle>
                  <Tag tagtext="#동성로" />
                  <Tag tagtext="#모듬한판" />
                  <Tag tagtext="#퇴근길" />
                </TagBoxStyle>
              </NameStyle>
            </UserStyle>
            <MoreStyle>{content.contents}</MoreStyle>
          </ContentStyle>
        </ContentInfoStyle>
      </MoreBoxStyle>
      <PrnvContentStyle>
        <div className="prnv">
          <div className="prnvIcon">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/mingcute_up-line.svg`}
              alt="img"
            />
          </div>
          <div className="prnvText">이전글</div>
        </div>
        <div
          className="prnvTitle"
          onClick={() => {
            moveToRead(content.beAf[0].iboard);
          }}
        >
          {content.beAf[0].title}
        </div>
      </PrnvContentStyle>
      <PrnvContentStyle>
        {content.beAf[1] && (
          <>
            <div className="prnv">
              <div className="prnvIcon">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/mingcute_down-line.svg`}
                  alt="img"
                />
              </div>
              <div className="prnvText">다음글</div>
            </div>
            <div
              className="prnvTitle"
              onClick={() => {
                moveToRead(content.beAf[1].iboard);
              }}
            >
              {content.beAf[1].title}
            </div>
          </>
        )}
      </PrnvContentStyle>
      <BtnBoxStyle>
        <div className="editBtn">
          <div
            onClick={() => {
              moveToModify(content.iboard);
            }}
          >
            <Button bttext="수정하기" />
          </div>
          <div
            onClick={() => {
              handleDelRead(content.iboard);
            }}
          >
            <Button bttext="삭제하기" />
          </div>
        </div>
        <div
          onClick={() => {
            moveToList({ page });
          }}
        >
          <Button bttext="목록보기" />
        </div>
      </BtnBoxStyle>
      <ReviewBox>
        <div className="readReviewBox">
          <div className="readReview">
            <div className="reviewInfo">
              <div className="reviewCount">
                댓글 {content.comments.length}개
              </div>
              {content.comments.length > 0 &&
                content.comments.map(comment => (
                  <>
                    <div className="userInfo" key={comment.icomment}>
                      <div className="user">
                        <div className="icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/speech.svg`}
                          />
                        </div>
                        <div className="nickName">{comment.writerName}</div>
                      </div>
                      <div className="date">{comment.createdAt}</div>
                    </div>
                    <div className="reviewContentBox">
                      <div className="reviewContent">{comment.comment}</div>
                      <div
                        className="deleteBtn"
                        onClick={() => {
                          handleDelComment(comment.icomment);
                        }}
                      >
                        삭제
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <div className="inputReviewBox">
          <div className="inputReview">
            <input
              type="text"
              name="contents"
              value={contents.contents}
              onChange={e => handleChange(e)}
              placeholder="댓글을 입력해보세요"
            />
          </div>
          <div onClick={addComment}>
            <Button bttext="댓글입력" />
          </div>
        </div>
      </ReviewBox>
      {/* 모달창 */}
      {showModal ? (
        <SelectedModal
          title="댓글 삭제"
          content="정말 댓글을 삭제하시겠습니까?"
          confirmFn={confirmModal}
          cancelFn={cancelModal}
        />
      ) : null}
      {showReadModal ? (
        <SelectedModal
          title="글 삭제"
          content="정말 해당 글을 삭제하시겠습니까?"
          confirmFn={confirmReadModal}
          cancelFn={cancelReadModal}
        />
      ) : null}
      {result ? (
        <ResultModal
          title={popTitle}
          content={popContent}
          callFn={closeModal}
        />
      ) : null}
    </WrapStyle>
  );
};

export default Read;
