import React, { useEffect, useRef, useState } from "react";

export default function UseRefHook() {
  const [name, setName] = useState("");

  /**
   * 1. useState 사용시 text를 입력할 때 계속 렌더링이 발생함 => 상태가 계속 변하기 때문에
   *   const [renderCount, setRenderCount] = useState(0);
   *   useEffect(() => {
   *     setRenderCount((prevCount) => prevCount + 1); => 입력한 글자수 만큼 렌더링
   *   }, []);
   * 2. useRef로 대체하는 것이 프로그램 성능에 좋음
   */
  const InputRef = useRef(0);
  // 3. useRef는 ()안의 값을 디폴트로 한는 object를 반환함 => return { current : 0}

  function focus() {
    InputRef.current.focus();
    InputRef.current.value = "some value";
  }

  /**
   * 4. 이전 상태의 값을 받을때도 useRef를 이용함
   */

  const prevName = useRef("");

  useEffect(() => {
    prevName.current = name;
  }, []);

  return (
    <>
      <input
        ref={InputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        My name is {name} and it used to be {prevName.current}
      </div>
      <button onClick={focus}>focus</button>
      {/* <div> rendered {renderCount.current} Times</div> */}
    </>
  );
}
