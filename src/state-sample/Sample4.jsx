import { useState } from "react";

const Sample4 = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [hateCount, setHateCount] = useState(0);
  const clickLike = () => {
    setLikeCount(likeCount + 1);
  };
  const clickHate = () => {
    setHateCount(hateCount + 1);
  };
  return (
    <>
      <div>
        <span>좋아요 : {likeCount}</span> <br />
        <span>싫어요 : {hateCount}</span>
      </div>
      <button onClick={clickLike}>좋아요</button>
      <button onClick={clickHate}>싫어요</button>
    </>
  );
};

export default Sample4;
