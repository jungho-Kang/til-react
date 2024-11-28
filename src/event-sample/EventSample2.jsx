import { useState } from "react";

const EventSample2 = () => {
  const [typingData, setTypingData] = useState("");
  const testSentence = "안녕하세요. 반갑습니다. 잘부탁드립니다.";
  const [feedback, setFeedback] = useState("");

  return (
    <div>
      <form>
        <fieldset>
          <legend>키보드 타이핑 연습</legend>
          <div>테스트 문장</div>
          <span>{testSentence}</span>
          <div>
            <label htmlFor="typing">텍스트 입력</label>
            <textarea
              name="typing"
              id="typing"
              value={typingData}
              rows={5}
              cols={50}
              style={{ resize: "vertical" }}
              onChange={event => {
                setTypingData(event.target.value);
                for (let i = 0; i < typingData.length; i++) {
                  if (typingData[i] === testSentence[i]) {
                    setFeedback("잘~~ 작성하고 계시네요(●'◡'●). ");
                  } else {
                    setFeedback("오타에요(┬┬﹏┬┬).");
                  }
                }
              }}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  if (typingData === testSentence) {
                    alert(`축하합니다 알맞게 입력하셨습니다.`);
                  } else {
                    alert("아쉽게도 조금 틀리셨습니다.");
                  }
                }
              }}
            ></textarea>
          </div>
          <div>피드백 문장</div>
          <span>{feedback}</span>
        </fieldset>
      </form>
    </div>
  );
};

export default EventSample2;
