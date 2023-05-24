import React, { useEffect, useState } from "react";

export default function UseEffectHook() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);
  const [fetchedData, setFetchedData] = useState([{ state: "before render" }]);
  /**
   * 1. useEffect는 처음 렌더링 후 호출되고 배열안의 변수가 변화가 일어날때만 호출되는 함수
   */
  console.log("render");
  useEffect(() => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then((response) => response.json())
        .then((json) => {
          setItems(json);
          console.log("fetch finished");
        });
      console.log("resouce type changed");
    } catch (error) {
      console.log(error);
    }
  }, [resourceType]);

  const dataFetch = async (resourceType) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then((response) => response.json())
        .then((json) => {
          setFetchedData(json);
          console.log("fetch finished by button");
        });
      console.log("resouce type changed by button");
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * 2. 화면 크기에 맞게 실시간으로 동적으로 화면 크기를 구하는 방법
   * 3. useEffect에서 return 과 함께 사용하면 clean up 기능(부수효과를 정리하거나 리소스 해제작업)이 이루어 진다.
   * 4. clean up 함수가 먼저 실행되기 때문에 return 안의 구문이 먼저 실행됨
   */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log("resize finish");
    return () => {
      window.addEventListener("resize", handleResize);
      console.log("resize event clean up");
    };
  }, [windowWidth]);

  return (
    <>
      <div>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>
        <button onClick={() => setResourceType("comments")}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map((item) => {
        return <pre>{JSON.stringify(item)}</pre>;
      })}
      <h2>FetchByButton</h2>
      <button onClick={() => dataFetch(resourceType)}>Fetch</button>
      {fetchedData.map((item) => {
        return <pre>{JSON.stringify(item)}</pre>;
      })}
      <div>{windowWidth}</div>
    </>
  );
}
