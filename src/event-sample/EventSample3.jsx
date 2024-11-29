import { useState } from "react";

const EventSample3 = () => {
  const [secondTime, setSecondTime] = useState(0);
  const [minuteTime, setMinuteTime] = useState(0);
  const [hourTime, setHourTime] = useState(0);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(null);
  const timeStart = () => {
    if (start === false) {
      setStart(true);
      const time = setInterval(() => {
        setSecondTime(prev => prev + 1);
      }, 1000);
      setTimer(time);
    }
  };

  const minuteTimeSet = () => {
    if (secondTime >= 60) {
      setMinuteTime(prev => prev + 1);
      setSecondTime(0);
    }
  };
  minuteTimeSet();

  const hourTimeSet = () => {
    if (minuteTime >= 60) {
      setHourTime(prev => prev + 1);
      setMinuteTime(0);
    }
  };
  hourTimeSet();

  return (
    <div>
      <div style={{ fontSize: "24px" }}>타이머 서비스</div>
      <div>
        <span>{`타이머 >>>>>`} </span>
        <span>{hourTime < 10 ? "0" + hourTime.toString() : hourTime}</span>
        <span> : </span>
        <span>
          {minuteTime < 10 ? "0" + minuteTime.toString() : minuteTime}
        </span>
        <span> : </span>
        <span>
          {secondTime < 10 ? "0" + secondTime.toString() : secondTime}
        </span>
        <span></span>
      </div>
      <button
        type="button"
        onClick={() => {
          timeStart();
        }}
      >
        시작
      </button>
      <button
        type="button"
        onClick={() => {
          clearInterval(timer);
          setStart(false);
        }}
      >
        중지
      </button>
      <button
        type="button"
        onClick={() => {
          setHourTime(0);
          setMinuteTime(0);
          setSecondTime(0);
          clearInterval(timer);
          setStart(false);
        }}
      >
        리셋
      </button>
    </div>
  );
};

export default EventSample3;
