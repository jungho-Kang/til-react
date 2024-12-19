import { createContext, useState } from "react";

// 외부에서 context state를 사용하므로
export const UserInfoContext = createContext();
// context에 지정한 범위로 접근해서
// context에 만들어둔 값 읽기 기능
// context에 만들어둔 기능 사용기능을 위한 공급자(Provider) 생성
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });
  // return {값, 기능 목록등...};
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
