# React JSX 문법

## 1. 컴포넌트 Props

- 컴포넌트에 `property={값}`으로 작성하면

```jsx
<Box hi="hello" age={10} isLogin={false}></Box>
```

- 컴포넌트 내부에 `{}객체 리터럴`로 전달된다

```jsx
function Box(props) {
  console.log("객체", props);
  return <div>Box</div>;
}

export default Box;
```

- 만약 컴포넌트 내부에 작성된 내용이 있다
- 아래는 `자식`을 React에서 이름을 지정되어 있다
- `children`이라는 프로퍼티명으로 고정

```jsx
<Box hi="hello" age={10} isLogin={false}>
  자식
</Box>
```

- 이렇게 안하셨으면 좋겠어요 남들(TS)이 봐요

```jsx
function Box(props) {
  console.log("객체", props);
  console.log("객체", props.hi);
  console.log("객체", props.age);
  console.log("객체", props.islogin);
  console.log("객체", props.children);
  console.log("객체", props["hi"]);
  console.log("객체", props["age"]);
  console.log("객체", props["islogin"]);
  console.log("객체", props["children"]);

  return <div>{props.hi}</div>;
}

export default Box;
```

- `props`는 꼭 `객체 구조 분해 할당`해서 사용하자

```jsx
function Box({ hi, age, islogin, children }) {
  console.log(hi);
  console.log(age);
  console.log(islogin);
  console.log(children);
  return (
    <div>
      <h1>내용입니다</h1>
      {children}
    </div>
  );
}

export default Box;
```

## 2. 컴포넌트 조건문

### 2.1. falshy한 값은 jsx에 출력되지 않는다.

- `null, undefined, false, 0, ""`
- if문을 jsx 내부에서 사용할 수 없습니다

### 2.2. `jsx에 직접 조건 코딩` 가능한 문법

#### 2.2.1. 3항연산자를 가장 많이 사용해요

- `조건 ? 참 값 리턴 : 거짓 값 리턴`
- `로그인 : {islogin ? "로그인중" : "로그아웃중"} <br />`

#### 2.2.2. 논리 연산자

- `조건 && 결과`

  - 조건이 `참`이면 `결과` 출력
  - 조건이 `거짓`이면 `조건` 출력
  - `나이 : {age < 18 && "미성년자"} <br />`

- `조건 || 결과`

  - 조건이 `참`이면 `조건` 출력
  - 조건이 `거짓`이면 `결과` 출력
  - `인사 : {hi !== "hello" || "인사좀해요 --"} <br />`

#### 2.2.3. 옵셔널 체이닝

- 정말 중요해요(React 에러를 처리하므로)
- `객체?.속성명`

````
게임레벨 : {info?.level} <br />
아바타 : {info?.avatar} <br />
게임포인트 : {info?.point} <br />
```

### 2.3. `js로 결과 만든 후` jsx에 출력하기

- 참조코드

```jsx
<Box
  hi="hello"
  age={10}
  islogin={false}
  say={say}
  info={info}
  status={"208"}
  fetching={""}
></Box>
````

#### 2.3.1. if

```jsx
let message;
let nowStatus = status.charAt(0);
if (nowStatus === "2") {
  message = "자료성공";
} else if (nowStatus === "4") {
  message = "Not Found Page";
} else if (nowStatus === "5") {
  message = "Server Shut Down";
} else {
  message = "No No No";
}
```

```jsx
if (fetching === "pending") {
  return (
    <p>
      네트워크가 <b>연결중</b> 입니다.
    </p>
  );
}

if (fetching === "fresh") {
  return (
    <p>
      네트워크가 <b>새로운 데이터</b> 입니다.
    </p>
  );
}

if (fetching === "stale") {
  return (
    <p>
      네트워크가 <b>오래된 데이터</b> 입니다.
    </p>
  );
}
```

#### 2.3.2. switch

```jsx
let response;
switch (fetching) {
  case "pending":
    response = (
      <p>
        네트워크가 <b>연결중</b> 입니다.
      </p>
    );
    break;
  case "fresh":
    response = (
      <p>
        네트워크가 <b>새로운 데이터</b> 입니다.
      </p>
    );
    break;
  case "stale":
    response = (
      <p>
        네트워크가 <b>오래된 데이터</b> 입니다.
      </p>
    );
    break;
  default:
    response = (
      <p>
        네트워크가 <b>에러</b> 입니다.
      </p>
    );
    break;
}
```

## 3. 컴포넌트 반복

- 샘플 데이터

```js
const goods = [
  {
    id: 100,
    cate: "과일",
    goodName: "사과",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 99,
    cate: "과일",
    goodName: "사과",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 103,
    cate: "전자제품",
    goodName: "노트북",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 1004,
    cate: "패션",
    goodName: "바지",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
];
```

```jsx
<Box fruits={과일} goods={goods} />
```

### 3.1. 반복해서 JSX에 출력한다면 `map`을 사용하자

- 최소 조건입니다. 모르면 곤란합니다.

```jsx
import { GoodDetailDiv } from "./styles/components/common/styled-common";

const Box = ({ goods }) => {
  console.log(goods);
  return (
    <div>
      <h1>여기는 레이아웃</h1>
      <div>
        {goods.map(item => {
          return (
            <GoodDetailDiv key={item?.id}>
              <h3>{item?.cate}</h3>
              <h2>{item?.goodName}</h2>
              <div>
                <img src={item?.imgUrl} alt={item?.goodName} />
              </div>
            </GoodDetailDiv>
          );
        })}
      </div>
    </div>
  );
};

export default Box;
```

- 추천
  - 기능과 화면은 분리를 하려고 노력하자

```jsx
import { GoodDetailDiv } from "./styles/components/common/styled-common";

const Box = ({ goods, tour, tickets }) => {
  // 제품을 랜더링 하는 함수
  const renderGoods = datas => {
    const result = datas.map(item => {
      return (
        <GoodDetailDiv key={item?.id}>
          <h3>{item?.cate}</h3>
          <h2>{item?.goodName}</h2>
          <div>
            <img src={item?.imgUrl} alt={item?.goodName} />
          </div>
        </GoodDetailDiv>
      );
    });
    return result;
  };
  return (
    <div>
      <h1>여기는 레이아웃</h1>
      {/* 상품정보 1 */}
      <div>{renderGoods(goods)}</div>
      {/* 상품정보 2 */}
      <div>{renderGoods(tour)}</div>
      {/* 상품정보 3 */}
      <div>{renderGoods(tickets)}</div>
    </div>
  );
};

export default Box;
```

### 3.2. 반복문 `foreach` 고려해보기

```jsx
// 제품을 랜더링하는 forEach 함수
const renderGoodsEach = datas => {
  const tempArr = [];
  datas.forEach(item => {
    const tag = (
      <GoodDetailDiv key={item?.id}>
        <h3>{item?.cate}</h3>
        <h2>{item?.goodName}</h2>
        <div>
          <img src={item?.imgUrl} alt={item?.goodName} />
        </div>
      </GoodDetailDiv>
    );
    tempArr.push(tag);
  });
  return tempArr;
};
```

## 4. 컴포넌트 state

- 모든 `컴포넌트는 state 속성`을 가지고 있습니다
- 모든 컴포넌트는 가지고 있는 `state가 바뀌면 화면을 리랜더링`합니다
- 모든 컴포넌트는 웹브라우저 새로고침 하기전까지 `state를 유지`합니다

### 4.1. 기준을 세워 드릴게요

- 리액트 컴포넌트에서 사용하시는 변수는 그냥 `useState()`로 만드세요
- 컴포넌트를 변수를 변경해서 리랜더링이 필요한 경우에도 `useState()`를 만드세요

### 4.2. State 업데이트 시점문제 해결책

```jsx
import { useState } from "react";

const Sample0 = () => {
  // count를 State에 보관하고, count 리랜더링하기
  const [count, setCount] = useState(0);
  // 클릭하면 set으로 리랜더링하겠다
  // 연속으로 업데이트는 안됨(비동기라서 함수완료 후 반영)
  const click = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <h1>현재점수 : {count}</h1>
      <div>
        <button onClick={click}>점수올리기</button>
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  // count를 State에 보관하고, count 리랜더링하기
  const [count, setCount] = useState(0);
  // 클릭하면 set으로 리랜더링하겠다
  // 연속으로 업데이트는 안됨(비동기라서 함수완료 후 반영)
  const clickAdd = () => {
    setCount(count + 1);
  };
  const clickMinus = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
  };
  const clickReset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>현재점수 : {count}</h1>
      <div>
        <button onClick={clickAdd}>점수올리기</button>
        <button onClick={clickMinus}>점수내리기</button>
        <button onClick={clickReset}>점수초기화</button>
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  // 사용자가 입력한 정보를 기억하기
  const [memo, setMemo] = useState("");
  return (
    <div>
      <h1>입력내용 : {memo}</h1>
      <div>
        <input
          type="text"
          value={memo}
          onChange={e => setMemo(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  // 할일 목록
  const [todoList, setTodoList] = useState([]);
  // 지금 입력중인 할일
  const [todo, setTodo] = useState("");

  const clickAdd = () => {
    // 목록을 만들어서 업데이트
    setTodoList([...todoList, todo]);
    setTodo("");
  };
  return (
    <div>
      <h1>입력내용 : {todo}</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
      </div>
      <div>
        <button onClick={clickAdd}>할일추가</button>
        {todoList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample1 = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const handleClick = () => {
    if (userName === "") {
      seterrorMessage("이름을 입력하세요.");
      return;
    }
    if (userEmail === "") {
      seterrorMessage("이메일을 입력하세요.");
      return;
    }
    if (userPass === "") {
      seterrorMessage("비밀번호를 입력하세요.");
      return;
    }
    console.log("로그인 시도 중입니다.");
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="이름을 입력해요"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="이메일을 입력해요"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호 입력해요"
          value={userPass}
          onChange={e => setUserPass(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleClick}>
          로그인
        </button>
      </form>
      <div>
        <div style={{ color: "red" }}>Error : {errorMessage}</div>
      </div>
      <div>
        <div>이름: {userName}</div>
        <div>이메일: {userEmail}</div>
        <div>비밀번호: {userPass}</div>
      </div>
    </div>
  );
};

export default Sample1;
```

```jsx
import { useState } from "react";

const Sample1 = () => {
  // 서버 전송용 데이터 객체 리터럴 관리
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_pass: "",
  });
  const [errorMessage, seterrorMessage] = useState("");

  // form의 태그의 props를 이용해서 처리한다.
  const handleChange = e => {
    // 여기서 처리한다
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    if (formData.user_name === "") {
      seterrorMessage("이름을 입력하세요.");
      return;
    }
    if (formData.user_email === "") {
      seterrorMessage("이메일을 입력하세요.");
      return;
    }
    if (formData.user_pass === "") {
      seterrorMessage("비밀번호를 입력하세요.");
      return;
    }
    console.log("로그인 시도 중입니다.");
  };
  return (
    <div>
      <form>
        <input
          type="text"
          name="user_name"
          placeholder="이름을 입력해요"
          value={formData.user_name}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="email"
          name="user_email"
          placeholder="이메일을 입력해요"
          value={formData.user_email}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="password"
          name="user_pass"
          placeholder="비밀번호 입력해요"
          value={formData.user_pass}
          onChange={e => handleChange(e)}
        />
        <br />
        <button type="button" onClick={handleClick}>
          로그인
        </button>
      </form>
      <div>
        <div style={{ color: "red" }}>Error : {errorMessage}</div>
      </div>
      <div>
        <div>이름: {formData.user_name}</div>
        <div>이메일: {formData.user_email}</div>
        <div>비밀번호: {formData.user_pass}</div>
      </div>
    </div>
  );
};

export default Sample1;
```

```jsx
import { useState } from "react";

const Sample2 = () => {
  // 장바구니 관리
  const [cart, setCart] = useState([]);
  // 장바구니 담기 기능
  const addCart = str => {
    setCart([...cart, str]);
  };
  const removeCart = _index => {
    // 배열.filter(item => 조건이 참이면 리턴)
    const arr = cart.filter((item, index) => _index !== index);
    setCart(arr);
  };
  return (
    <div>
      <h1>상품목록</h1>
      <div>
        <button onClick={() => addCart("사과")}>사과</button>
        <button onClick={() => addCart("바나나")}>바나나</button>
        <button onClick={() => addCart("딸기")}>딸기</button>
        <button onClick={() => addCart("배")}>배</button>
      </div>
      <h2>장바구니</h2>
      <div>
        {cart.length === 0 ? (
          <p>장바구니가 비었어요.</p>
        ) : (
          <ul>
            {cart.map((item, index) => {
              return (
                <li key={index}>
                  {item} <button onClick={() => removeCart(index)}>제거</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sample2;
```

```jsx
import { useState } from "react";

const Sample2 = () => {
  // 다크모드, 라이트모드 관리
  const [isDark, setIsDark] = useState(false);
  // 화면의 CSS Object
  const ThemeCSS = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    backgroundColor: isDark ? "#000" : "#fff",
    transition: "all 0.5s",
  };
  return (
    <div style={ThemeCSS}>
      <button onClick={() => setIsDark(!isDark)}>테마변경</button>
    </div>
  );
};

export default Sample2;
```

```jsx
import styled from "@emotion/styled";
import { useState } from "react";

const ModalWinDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Sample3 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const 보이기 = () => {
    setIsOpen(true);
  };

  const 숨기기 = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={보이기}>보기</button>

      {isOpen ? (
        <ModalWinDiv>
          <button onClick={숨기기}>보이지마</button>
        </ModalWinDiv>
      ) : null}

      {isOpen && (
        <ModalWinDiv>
          <button onClick={숨기기}>보이지마</button>
        </ModalWinDiv>
      )}
    </div>
  );
};

export default Sample3;
```

```jsx
import { useState } from "react";

const Sample4 = () => {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);

  return (
    <>
      <div>
        <span>좋아요{like}</span>
        <span>싫어요{disLike}</span>
      </div>
      <button onClick={() => setLike(like + 1)}>좋아요</button>
      <button onClick={() => setDisLike(disLike + 1)}>싫어요</button>
    </>
  );
};

export default Sample4;
```

```jsx
import styled from "@emotion/styled";
import { useState } from "react";

const ColorDiv = styled.div`
  background-color: ${({ bg }) => bg || "red"};
`;

const Sample5 = () => {
  const [bgColor, setBgColor] = useState("green");
  return (
    <div>
      <ColorDiv bg={bgColor}>색상이 바뀌어요.</ColorDiv>
      <button onClick={() => setBgColor("red")}>빨강</button>
      <button onClick={() => setBgColor("yellow")}>노랑</button>
      <button onClick={() => setBgColor("blue")}>파랑</button>
    </div>
  );
};

export default Sample5;
```

## 5. 이벤트 처리

- 가장 흔하게 이벤트를 사용하는 곳이 Form태그 입니다

### 5.1. 회원가입 폼 만들어 보기

```jsx
const EventSample1 = () => {
  const handleClickId = () => {
    alert("아이디중복체크");
  };
  return (
    <div>
      <h1>회원가입</h1>

      <form>
        {/* 숨긴 쿼리스트링 */}
        <input type="hidden" name="now" value="1" />
        {/* 회원가입 기본정보 입력영역 */}
        <fieldset>
          <legend>기본정보</legend>
          <div>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              name="userid"
              id="userId"
              className="userId"
              placeholder="아이디를 입력하세요."
              maxLength={8}
              minLength={4}
            />
            <button type="button" onClick={() => handleClickId()}>
              아이디 중복검사
            </button>
          </div>
          <div>
            <label htmlFor="userEmail">이메일</label>
            <input
              type="email"
              name="useremail"
              id="userEmail"
              placeholder="이메일을 입력하세요."
            />
          </div>
          <div>
            <label htmlFor="userPass">비밀번호</label>
            <input
              type="password"
              name="userpass"
              id="userPass"
              placeholder="비밀번호를 입력하세요."
              maxLength={16}
              minLength={8}
            />
          </div>
          <div>
            <label htmlFor="userPassConfirm">비밀번호확인</label>
            <input
              type="password"
              name="userpassconfirm"
              id="userPassConfirm"
              placeholder="비밀번호 확인을 입력하세요."
              maxLength={16}
              minLength={8}
            />
          </div>
        </fieldset>
        {/* 회원가입 부가정보 입력영역 */}
        <fieldset>
          <legend>부가정보</legend>
          <div>
            <label htmlFor="age">나이</label>
            <input type="number" name="age" id="age" defaultValue={0} />
          </div>
          <div>
            <label>성별</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              defaultChecked
            />
            <label htmlFor="male">남성</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">여성</label>
            <input type="radio" name="gender" id="etc" value="etc" />
            <label htmlFor="etc">기타</label>
          </div>

          <div>
            <label htmlFor="area">지역</label>
            <select name="area" id="area" defaultValue="daegu">
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
              id="birthday"
              defaultValue="2024-11-28"
            />
          </div>

          <div>
            <label htmlFor="soge">자기소개</label>
            <textarea
              name="soge"
              id="soge"
              rows={5}
              cols={50}
              style={{ resize: "vertical" }}
            ></textarea>
          </div>
          <div>
            <label htmlFor="pic">이미지</label>
            <input
              type="file"
              name="pic"
              id="pic"
              accept="image/png, image/jpeg"
            />
          </div>
          <div>
            <label htmlFor="doc">문서</label>
            <input type="file" name="doc" id="doc" multiple />
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
          <button type="reset">다시작성</button>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default EventSample1;
```

### 5.2. 이벤트 만들고 처리하기

- 리액트에서 제공되는 규칙은 `카멜케이스` 입니다
- 리액트에서 제공되는 규칙은 `on이벤트={하고싶은일}` 입니다
- `onClick`
- `onChange`
- `onSubmit`
- `onKeyDown`
- `onKeyUp`
- `onMouseEnter`
- `onMouseLeave`

```jsx
import { useState } from "react";

const EventSample1 = () => {
  const [formData, setFormData] = useState({
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
  });
  const [idCheck, setIdCheck] = useState(false);

  return (
    <div>
      <h1>회원가입</h1>

      <form
        onSubmit={event => {
          // 기본 동작 즉, 웹브라우저로 action하려는 것을 막고 유효성 검사
          event.preventDefault();
        }}
      >
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
              onChange={event => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => {
                alert(
                  `${formData.userid}를 들고 백앤드 갔다왔더니 중복 아니랍니다.`,
                );
                setIdCheck(true);
              }}
            >
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
              onChange={event => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              onChange={event => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              onChange={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              defaultValue={formData.age}
              onChange={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              onChange={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              onChange={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              onChange={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              onChange={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
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
              onChange={event => {
                setFormData({
                  ...FormData,
                  [event.target.name]: event.target.value,
                });
              }}
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
          <button type="reset">다시작성</button>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default EventSample1;
```
