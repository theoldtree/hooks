import React, { useState } from "react";

export default function UseStateHook() {
  /**
   * 1. 언제나 같은 순서로 호출됨(반복문이나 조건문 안에 있으면 안됨)
   * 2. useState안에 함수 형태로 인자를 받으면 처음 렌더링 할때만 작동이 됨
   */
  const [count, setCount] = useState(() => countInitial());
  const [num, setNum] = useState(countEveryTime());

  function countInitial() {
    console.log("call only once");
    return 4;
  }

  function countEveryTime() {
    console.log("call every time");
    return 4;
  }
  /**
   * 2. 새로운 상태를 만들때 함수버전을 사용하는것이 적합함 => 변수를 그대로 사용하면 이전 렌더링 값을 받아오기 때문
   * 잘못된 예시
   * const decrementTwo = () => {
   *  setCount(count-1);
   *  setCount(count-1);
   * }
   */
  const decrementCountTwo = () => {
    setCount((prevCount) => prevCount - 1);
    setCount((prevCount) => prevCount - 1);
  };
  const incremenCountTwo = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };
  const decrementNumTwo = () => {
    setNum((prevCount) => prevCount - 1);
    setNum((prevCount) => prevCount - 1);
  };
  const incrementNumTwo = () => {
    setNum((prevCount) => prevCount + 1);
    setNum((prevCount) => prevCount + 1);
  };
  /**
   * 3. 구조 분해 할당이 가능함
   */
  const [state, setState] = useState({ stateNum: 0, stateTheme: "blue" });
  const { stateNum, stateTheme } = state;

  const decrementStateNum = () => {
    setState((prevState) => {
      return { ...prevState, stateNum: stateNum - 1 };
    });
  };
  const incrementStateNum = () => {
    setState((prevState) => {
      return { ...prevState, stateNum: stateNum + 1 };
    });
  };

  return (
    <>
      <div>
        <button onClick={decrementCountTwo}>-</button>
        <span>{count}</span>
        <button onClick={incremenCountTwo}>+</button>
      </div>
      <div>
        <button onClick={decrementNumTwo}>-</button>
        <span>{num}</span>
        <button onClick={incrementNumTwo}>+</button>
      </div>
      <div>
        <button onClick={decrementStateNum}>-</button>
        <span>
          {stateNum}
          {stateTheme}
        </span>
        <button onClick={incrementStateNum}>+</button>
      </div>
    </>
  );
}
