import { API_URL, axiosInstance } from "./config";

export const getMembers = async () => {
  try {
    const res = await axiosInstance.get(API_URL);
    const responseStatus = res.status.toString().charAt(0);
    if (responseStatus === "2") {
      return res.data;
    } else {
      console.log("데이터가 없어요.");
      return [];
    }
  } catch (error) {
    // 만약 404 또는 400번대의 값이라면 `우리`를 의심하자.
    const errorStatus = error.response.status.toString().charAt(0);
    if (errorStatus === "5") {
      alert("서버가 꺼졌어요.");
    }
    if (errorStatus === "4") {
      alert("호출에 실패하였습니다");
    }
    console.log(error);
    return [];
  }
};

// 삭제 기능
export const deleteMember = async _id => {
  try {
    await axiosInstance.delete(`${API_URL}/${_id}`);
    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
