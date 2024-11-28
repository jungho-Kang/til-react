import { useState } from "react";

const EventSample1 = () => {
  const initData = {
    now: 1,
    userid: "",
    useremail: "",
    userpass: "",
    userpassconfirm: "",
    age: 0,
    gender: "male",
    area: "daegu",
    birthday: "2024-11-28",
    soge: "",
    pic: null,
    doc: null,
    hobby: ["골프"],
  };

  const [formData, setFormData] = useState(initData);
  const [idCheck, setIdCheck] = useState(false);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = event => {};
  const handleIdCheck = () => {
    alert(`${formData.userid}를 들고 백앤드 갔다왔더니 중복 아니랍니다.`);
    setIdCheck(true);
  };
  const handleSubmit = event => {
    event.preventDefault();
  };
  const handleKeyDown = event => {
    // 기본 동작 즉, 웹브라우저로 action하려는 것을 막고 유효성 검사
  };

  return (
    <div>
      <h1>회원가입</h1>

      <form onSubmit={event => handleSubmit(event)}>
        {/* 숨긴 쿼리스트링 */}
        <input type="hidden" name="now" value={formData.now} />
        {/* 회원가입 기본정보 입력영역 */}
        <fieldset>
          <legend>기본정보</legend>
          <div>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              id="userId"
              className="userId"
              placeholder="아이디를 입력하세요."
              maxLength={8}
              minLength={4}
              onChange={event => handleChange(event)}
            />
            <button type="button" onClick={() => handleIdCheck()}>
              아이디 중복검사
            </button>
          </div>
          <div>
            <label htmlFor="userEmail">이메일</label>
            <input
              type="email"
              name="useremail"
              value={formData.useremail}
              id="userEmail"
              placeholder="이메일을 입력하세요."
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label htmlFor="userPass">비밀번호</label>
            <input
              type="password"
              name="userpass"
              value={formData.userpass}
              id="userPass"
              placeholder="비밀번호를 입력하세요."
              maxLength={16}
              minLength={8}
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label htmlFor="userPassConfirm">비밀번호확인</label>
            <input
              type="password"
              name="userpassconfirm"
              value={formData.userpassconfirm}
              id="userPassConfirm"
              placeholder="비밀번호 확인을 입력하세요."
              maxLength={16}
              minLength={8}
              onChange={event => handleChange(event)}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  if (formData.userpass !== formData.userpassconfirm) {
                    alert("비밀번호가 서로 다릅니다.");
                    setFormData({ ...formData, [event.target.name]: "" });
                  }
                }
              }}
            />
          </div>
        </fieldset>
        {/* 회원가입 부가정보 입력영역 */}
        <fieldset>
          <legend>부가정보</legend>
          <div>
            <label htmlFor="age">나이</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label>성별</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              // defaultChecked
              checked={formData.gender === "male"}
              onClick={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <label htmlFor="male">남성</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={formData.gender === "female"}
              onClick={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <label htmlFor="female">여성</label>
            <input
              type="radio"
              name="gender"
              id="etc"
              value="etc"
              checked={formData.gender === "etc"}
              onClick={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <label htmlFor="etc">기타</label>
          </div>

          <div>
            <label htmlFor="area">지역</label>
            <select
              name="area"
              id="area"
              value={formData.area}
              // defaultValue={formData.area}
              onChange={event => handleChange(event)}
            >
              <option value="">전체</option>
              <option value="daegu">대구</option>
              <option value="busan">부산</option>
              <option value="gwangju">광주</option>
              <option value="jeju">제주</option>
            </select>
          </div>

          <div>
            <label htmlFor="birthday">생일</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              id="birthday"
              // defaultValue={formData.birthday}
              onChange={event => handleChange(event)}
            />
          </div>

          <div>
            <label htmlFor="soge">자기소개</label>
            <textarea
              name="soge"
              value={formData.soge}
              id="soge"
              rows={5}
              cols={50}
              style={{ resize: "vertical" }}
              onChange={event => handleChange(event)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="pic">이미지</label>
            <input
              type="file"
              name="pic"
              value={formData.pic}
              id="pic"
              accept="image/png, image/jpeg"
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label htmlFor="doc">문서</label>
            <input
              type="file"
              name="doc"
              value={formData.doc}
              id="doc"
              multiple
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label>취미</label>
            <input
              name="hobby"
              id="ho1"
              type="checkbox"
              value="골프"
              defaultChecked
            />
            <label htmlFor="ho1">골프</label>
            <input name="hobby" id="ho2" type="checkbox" value="운동" />
            <label htmlFor="ho2">운동</label>
            <input name="hobby" id="ho3" type="checkbox" value="공부" />
            <label htmlFor="ho3">공부</label>
            <input name="hobby" id="ho4" type="checkbox" value="요리" />
            <label htmlFor="ho4">요리</label>
          </div>
        </fieldset>
        <div>
          <button
            type="button"
            onClick={() => {
              setFormData(initData);
            }}
          >
            다시작성
          </button>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default EventSample1;
