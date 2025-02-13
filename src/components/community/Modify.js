import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../api/MyApi";
import { getOne, putOne } from "../../api/communityApi";
import { API_SERVER_HOST } from "../../api/config";
import useCustomMove from "../../hooks/useCustomMove";
import Button from "../button/Button";
import Fetching from "../common/Fetching";
import ResultModal from "../common/ResultModal";
import SelectedModal from "../common/SelectedModal";
import {
  AddBoxStyle,
  ContentBoxStyle,
  FootStyle,
  ImageBoxStyle,
  UserBoxStyle,
} from "./styles/AddStyle";
import { WrapStyle } from "./styles/ListStyle";

const host = API_SERVER_HOST;

// 해당 글 수정을 위한 기존 글 정보 초기값
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

// 유저 정보 초기값
const initProfile = {
  nickname: "",
};

const Modify = () => {
  // 커스텀 훅
  const { moveToList, page } = useCustomMove();

  // 로딩창
  const [fetching, setFetching] = useState(false);

  // 해당 글 pk값 추출 및 할당(get)
  const { iboard } = useParams();

  // 해당 글 기존 내용 상태 가져오기 및 업데이트(get)
  const [product, setProduct] = useState(initState);

  // 해당 글 작성자 닉네임 정보 상태 업데이트
  const [profileData, setProfileData] = useState(initProfile);

  // 업로드 할 이미지 미리보기 상태 업데이트
  const [images, setImages] = useState([]);

  // 업로드 할 이미지 5장 초과 시 모달 띄우기 상태 업데이트
  const [imagesLength, setImagesLength] = useState(false);

  // 이미지 삭제 정보를 담을 상태
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  // useRef(DOM 요소를 참조한다.)
  // useRef를 만든 후 반드 시 태그랑 연결
  const uploadRef = useRef(null);

  // selectedModal 띄우기 위한 상태 업데이트
  const [showModal, setShowModal] = useState(false);

  // getUserInfo API 통신 결과 상태 업데이트
  const [result, setResult] = useState(false);

  // 글 수정 결과 상태 업데이트
  const [modifyResult, setModifyResult] = useState(false);

  // resultModal props 값 업데이트
  const [popTitle, setPopTitle] = useState("");
  const [popContent, setPopContent] = useState("");

  // Modal 닫기 이후 화면 전환 상태 업데이트
  const [popRedirect, setPopRedirect] = useState(false);

  // ----------------------------------------------------------------------

  // 해당 글 작성자 닉네임 정보 가져오기
  useEffect(() => {
    const param = {};
    getUserInfo({
      param,
      successFn: successFnProfile,
      failFn: failFnProfile,
      errorFn: errorFnProfile,
    });
  }, []);

  const successFnProfile = result => {
    setProfileData(result);
    console.log(result);
  };
  const failFnProfile = result => {
    console.log(result);
  };
  const errorFnProfile = result => {
    console.log(result);
  };

  // 커뮤니티 해당 글 정보 가져오기(get)
  const getOneData = () => {
    getOne({ iboard, successFn, failFn, errorFn });
  };
  const successFn = result => {
    setFetching(false);
    setProduct(result);
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

  useEffect(() => {
    // 기존 이미지 URL 초기화
    const initialImages = product.pics.map(pic => ({
      url: `${host}/pic/community/${product.iboard}/${pic.pic}`,
      icommuPics: pic.icommuPics,
    }));
    setImages(initialImages);
  }, [product.pics, product.iboard]);

  // 이미지 미리보기 삭제 함수
  const deleteImage = indexToDelete => {
    // images 배열에서 이미지 삭제
    const imageToDelete = images[indexToDelete];
    if (imageToDelete.icommuPics) {
      setDeletedImageIds(prevIds => [...prevIds, imageToDelete.icommuPics]);
    }
    setImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToDelete),
    );
  };

  // 업로드 할 이미지 미리보기 및 교체
  const handleFileChange = e => {
    const files = e.target.files;
    if (files) {
      const totalImages = images.length + files.length;
      if (totalImages > 5) {
        setImagesLength(true);
        // alert("최대 5장까지만 업로드 가능합니다.");
        return;
      }

      // 선택한 사진을 Array.from으로 줄을 세움
      // .map으로 각 사진에게 할일 알려줌
      // 모든 사진 각각 동일한 작업 할수 있음
      // 각 사진을 브라우저에서 볼 수 있는 주소로 만들고
      // 그 사진이 새로운 사진인지 표시하는 작업
      const newFiles = Array.from(files).map(file => ({
        // 각 사진에게 특별한 주소 생성
        url: URL.createObjectURL(file),
        file, // 새로운 파일 정보를 추가합니다.
        isNew: true, // 새 이미지임을 표시합니다.
      }));

      setImages(prevImages => [...prevImages, ...newFiles]);
    }
  };

  // 글 작성 시 내용 업데이트, 텍스트 필드의 변경사항 처리
  const handleChange = e => {
    // ...product 기존 product 상태의 모든 속성을 복사(불변성 유지)
    // e.target.name은 변경된 텍스트 필드의 이름
    // e.target.value는 입력된 새로운 값을 나타냄
    // setProduct() 동적 속성 이름을 사용하여 해당 텍스트 필드의 값을 업데이트
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 사진추가 버튼 클릭시 이미지 파일 선택
  const handleClickImg = () => {
    if (images.length > 5) {
      alert("더 이상 이미지를 추가할 수 없습니다.");
      return;
    }
    uploadRef.current.click();
  };

  // 해당 글 수정 실행
  const handleClickModify = async product => {
    const formData = new FormData();

    // dto 객체 생성 및 Blob으로 변환
    const dto = new Blob(
      [
        JSON.stringify({
          iboard: product.iboard,
          icommuPics: deletedImageIds, // 삭제할 이미지 ID 목록을 추가합니다.
          title: product.title,
          contents: product.contents,
        }),
      ],
      { type: "application/json" },
    );

    // dto 객체를 FormData에 추가
    formData.append("dto", dto);

    // 새로 추가된 이미지만 FormData에 추가
    images.forEach(image => {
      if (image.isNew) {
        formData.append("pics", image.file);
      }
    });

    // 글 정보 전송하기
    setFetching(true);
    try {
      await putOne({
        product: formData,
        successFn: successFnModify,
        failFn: failFnModify,
        errorFn: errorFnModify,
      });
    } catch (error) {
      console.log("글 수정 중 에러 발생", error);
    } finally {
      setFetching(false);
    }
  };

  const successFnModify = result => {
    console.log("글 수정 성공", result);
    setFetching(false);
    setResult(true);
    setPopTitle("글 수정");
    setPopContent("글 수정 성공하였습니다.");
    setPopRedirect(true);
  };
  const failFnModify = result => {
    console.log("글 수정 실패", result);
    setFetching(false);
    setResult(false);
    setPopTitle("글 수정 실패");
    setPopContent("오류가 발생하였습니다. 잠시 후 다시 시도해주세요");
    setPopRedirect(false);
  };
  const errorFnModify = result => {
    console.log("글 수정 실패", result);
    setFetching(false);
    setResult(true);
    setPopTitle("서버 오류");
    setPopContent("서버가 불안정합니다. 관리자에게 문의해주세요.");
    setPopRedirect(false);
  };

  // 확인 버튼 클릭 시
  const handleConfirm = product => {
    // 글 수정 로직 실행
    if (
      product.title.length !== 0 &&
      product.contents.length > 0 &&
      product.contents.length <= 300
    ) {
      handleClickModify(product);
    }
    if (
      product.title.length === 0 ||
      product.contents.length === 0 ||
      product.contents.length > 300
    ) {
      setModifyResult(true);
    }
    // 모달 닫기
    setShowModal(false);
  };

  const closeModal = () => {
    // 모달창 닫기
    setResult(false);
    if (popRedirect === true) {
      moveToList({ page: 1 });
    }
  };
  // 취소 버튼 클릭 시
  const handleCancel = () => {
    // 모달 닫기
    setShowModal(false);
  };

  // 글 등록 버튼 클릭 핸들러
  const handleAddClick = () => {
    // 모달 띄우기
    setShowModal(true);
  };

  // 글 등록 시 예외처리용 resultModal 닫기 callFn
  const closeException = () => {
    setModifyResult(false);
  };

  // 사진 업로드 5장 초과 resultModal 닫기 callFn
  const closeImagesLength = () => {
    setImagesLength(false);
  };

  return (
    <WrapStyle>
      {fetching ? <Fetching /> : null}
      <AddBoxStyle>
        <div className="titleBox">제목</div>
        <div className="inputBox">
          <input
            type="text"
            name="title"
            onChange={e => handleChange(e)}
            value={product.title}
          />
        </div>
      </AddBoxStyle>
      <UserBoxStyle>
        <div className="titleBox">작성자</div>
        <div className="writerBox">{profileData.nickname}</div>
      </UserBoxStyle>
      <ContentBoxStyle>
        <div className="titleBox">내용</div>
        <div className="inputBox">
          <textarea
            type="text"
            name="contents"
            onChange={e => handleChange(e)}
            value={product.contents}
          />
        </div>
      </ContentBoxStyle>
      <ImageBoxStyle>
        <div className="titleBox">사진</div>

        <div onClick={handleClickImg}>
          <Button bttext="사진추가" />
        </div>
        <div className="inputBox">
          <input
            type="file"
            ref={uploadRef}
            multiple={true}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="previewBox">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`미리보기${index}`}
                style={{
                  maxWidth: "60px",
                  margin: "5px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => deleteImage(index)}
              />
            ))}
          </div>
        </div>
      </ImageBoxStyle>
      <FootStyle>
        <div className="btnBox">
          <div onClick={handleAddClick}>
            <Button bttext="확인" />
          </div>
          <div onClick={moveToList}>
            <Button bttext="취소" />
          </div>
        </div>
      </FootStyle>

      {showModal ? (
        <SelectedModal
          title="글 수정 확인"
          content="글을 수정하시겠습니까?"
          confirmFn={() => handleConfirm(product)}
          cancelFn={handleCancel}
        />
      ) : null}

      {result ? (
        <ResultModal
          title={popTitle}
          content={popContent}
          callFn={closeModal}
        />
      ) : null}

      {modifyResult ? (
        <ResultModal
          title="제목 필수 입력"
          content="내용은 300자 이내로 작성해주세요"
          callFn={closeException}
        />
      ) : null}

      {imagesLength ? (
        <ResultModal
          title="사진 등록"
          content="최대 5장까지만 업로드 가능합니다"
          callFn={closeImagesLength}
        />
      ) : null}
    </WrapStyle>
  );
};

export default Modify;
