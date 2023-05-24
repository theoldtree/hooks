import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";

export default function UseEffectHook() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  /**
   * 1. useEffect는 처음 렌더링 후 호출되고 배열안의 변수가 변화가 일어날때만 호출되는 함수
   */
  console.log("render");
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
        console.log("fetch finished");
      });
    console.log("resouce type changed");
  }, [resourceType, windowWidth]);

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
      <div>{windowWidth}</div>
    </>
  );
}
