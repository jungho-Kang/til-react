import { useState } from "react";

const Sample3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        보기
      </button>
      {isOpen ? (
        <div>
          팝업창입니다.
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            닫기
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Sample3;
