import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffebcd;
`;

const TitleH1 = styled.h1`
  color: #4682b4;
  display: flex;
  justify-content: center;
`;
const LayoutDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 50px;
  justify-content: space-between;
`;

const Diary = () => {
  const initData = {
    title: "",
    date: "2024-12-03",
    content: "",
    mood: "",
    weather: "",
  };

  const initPutData = {
    id: "",
    title: "",
    date: "",
    content: "",
    mood: "",
    weather: "",
  };

  const ref = "http://192.168.0.195:5000/diaries";

  const [diary, setDiary] = useState([]);
  const [formData, setFormData] = useState(initData);
  const [putData, setPutData] = useState(initPutData);

  const getDiarys = async () => {
    try {
      const res = await fetch(ref);
      const data = await res.json();
      setDiary(data);
    } catch (error) {
      console.log(`get중에 에러가 발생했습니다. : ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  // 등록
  const postDiary = () => {
    try {
      fetch(ref, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("할일이 등록되었습니다.");
      getDiarys();
      setFormData(initData);
    } catch (error) {
      console.log(`post중에 에러가 발생했습니다. : ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  // 삭제
  const deleteDiary = _id => {
    try {
      fetch(`${ref}/${_id}`, {
        method: "DELETE",
      });
      alert("데이터가 성공적으로 삭제되었습니다.");
      getDiarys();
    } catch (error) {
      console.log(`delete중에 에러가 발생했습니다. : ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  // 내용 1개 수정
  const putDiary = () => {
    const { id, title, date, content, mood, weather } = putData;
    try {
      fetch(`${ref}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          content,
          mood,
          weather,
        }),
      });
      alert("수정 되었습니다.");

      // diary데이터 다시 가져오기
      getDiarys();
    } catch (error) {
      console.log(`put중에 에러가 발생했습니다. : ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (formData.date === "") {
      alert("날짜를 선택해 주세요.");
      return;
    }
    if (formData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    if (formData.mood === "") {
      alert("기분을 선택해 주세요.");
      return;
    }
    if (formData.weather === "") {
      alert("날씨를 선택해 주세요.");
      return;
    }
    postDiary();
  };

  const handleChangePut = e => {
    const { name, value } = e.target;
    setPutData({ ...putData, [name]: value });
  };

  const handleSubmitPut = e => {
    e.preventDefault();
    if (putData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (putData.date === "") {
      alert("날짜를 선택해 주세요.");
      return;
    }
    if (putData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    if (putData.mood === "") {
      alert("기분을 선택해 주세요.");
      return;
    }
    if (putData.weather === "") {
      alert("날씨를 선택해 주세요.");
      return;
    }
    putDiary();
  };

  // 컴포넌트 보이면 최초 딱 한번 실행
  useEffect(() => {
    getDiarys();
    return () => {};
  }, []);

  return (
    <BackgroundDiv>
      <TitleH1>나만의 Diary 생성하기</TitleH1>
      <LayoutDiv>
        <div>
          <h2>다이어리 추가하기</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              <label>제목</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={e => handleChange(e)}
              />
            </div>

            <div>
              <label>날짜</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={e => handleChange(e)}
              />
            </div>

            <div>
              <label>내용</label>
              <textarea
                name="content"
                value={formData.content}
                style={{ resize: "vertical" }}
                rows={20}
                cols={50}
                onChange={e => handleChange(e)}
              ></textarea>
            </div>

            <div>
              <label>기분 </label>

              <input
                type="radio"
                name="mood"
                value="enjoy"
                checked={formData.mood === "enjoy"}
                onChange={e => handleChange(e)}
              />
              <label>즐거움</label>

              <input
                type="radio"
                name="mood"
                value="happy"
                checked={formData.mood === "happy"}
                onChange={e => handleChange(e)}
              />
              <label>기쁨</label>

              <input
                type="radio"
                name="mood"
                value="notbad"
                checked={formData.mood === "notbad"}
                onChange={e => handleChange(e)}
              />
              <label>평범</label>

              <input
                type="radio"
                name="mood"
                value="angry"
                checked={formData.mood === "angry"}
                onChange={e => handleChange(e)}
              />
              <label>화남</label>

              <input
                type="radio"
                name="mood"
                value="sad"
                checked={formData.mood === "sad"}
                onChange={e => handleChange(e)}
              />
              <label>슬픔</label>
            </div>

            <div>
              <label>날씨 </label>

              <input
                type="radio"
                name="weather"
                value="sunny"
                checked={formData.weather === "sunny"}
                onChange={e => handleChange(e)}
              />
              <label>맑음</label>

              <input
                type="radio"
                name="weather"
                value="cloudy"
                checked={formData.weather === "cloudy"}
                onChange={e => handleChange(e)}
              />
              <label>흐림</label>

              <input
                type="radio"
                name="weather"
                value="rainy"
                checked={formData.weather === "rainy"}
                onChange={e => handleChange(e)}
              />
              <label>비</label>

              <input
                type="radio"
                name="weather"
                value="snowy"
                checked={formData.weather === "snowy"}
                onChange={e => handleChange(e)}
              />
              <label>눈</label>
            </div>
            <div>
              <button type="submit">등록</button>
            </div>
          </form>
        </div>

        <div>
          <h2>Diary List</h2>
          {diary.map(item => {
            return (
              <div key={item.id}>
                <div>{item.id}</div>
                <div>제목 : {item.title}</div>
                <div>날짜 : {item.date}</div>
                <div>내용 : {item.content}</div>
                <div>기분 : {item.mood}</div>
                <div>날씨 : {item.weather}</div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      deleteDiary(item.id);
                    }}
                  >
                    삭제
                  </button>
                  <button type="button" onClick={() => setPutData({ ...item })}>
                    수정
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h2>Diary 상세보기</h2>
          <form onSubmit={e => handleSubmitPut(e)}>
            <div>
              <label>제목</label>
              <input
                type="text"
                name="title"
                value={putData.title}
                onChange={e => handleChangePut(e)}
              />
            </div>

            <div>
              <label>날짜</label>
              <input
                type="date"
                name="date"
                value={putData.date}
                onChange={e => handleChangePut(e)}
              />
            </div>

            <div>
              <label>내용</label>
              <textarea
                name="content"
                value={putData.content}
                rows={20}
                cols={50}
                onChange={e => handleChangePut(e)}
              ></textarea>
            </div>

            <div>
              <label>기분 </label>

              <input
                type="radio"
                name="mood"
                value="enjoy"
                checked={putData.mood === "enjoy"}
                onChange={e => handleChangePut(e)}
              />
              <label>즐거움</label>

              <input
                type="radio"
                name="mood"
                value="happy"
                checked={putData.mood === "happy"}
                onChange={e => handleChangePut(e)}
              />
              <label>기쁨</label>

              <input
                type="radio"
                name="mood"
                value="notbad"
                checked={putData.mood === "notbad"}
                onChange={e => handleChangePut(e)}
              />
              <label>평범</label>

              <input
                type="radio"
                name="mood"
                value="angry"
                checked={putData.mood === "angry"}
                onChange={e => handleChangePut(e)}
              />
              <label>화남</label>

              <input
                type="radio"
                name="mood"
                value="sad"
                checked={putData.mood === "sad"}
                onChange={e => handleChangePut(e)}
              />
              <label>슬픔</label>
            </div>

            <div>
              <label>날씨 </label>

              <input
                type="radio"
                name="weather"
                value="sunny"
                checked={putData.weather === "sunny"}
                onChange={e => handleChangePut(e)}
              />
              <label>맑음</label>

              <input
                type="radio"
                name="weather"
                value="cloudy"
                checked={putData.weather === "cloudy"}
                onChange={e => handleChangePut(e)}
              />
              <label>흐림</label>

              <input
                type="radio"
                name="weather"
                value="rainy"
                checked={putData.weather === "rainy"}
                onChange={e => handleChangePut(e)}
              />
              <label>비</label>

              <input
                type="radio"
                name="weather"
                value="snowy"
                checked={putData.weather === "snowy"}
                onChange={e => handleChangePut(e)}
              />
              <label>눈</label>
            </div>
            <div>
              <button type="submit">수정</button>
            </div>
          </form>
        </div>
      </LayoutDiv>
    </BackgroundDiv>
  );
};

export default Diary;
