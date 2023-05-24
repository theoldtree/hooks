# HOOK 꿀팁 대방출

## UseState 와 비동기 함수를 같이 사용할 때 주의점

1. 상태 업데이트의 비동기성: useState 함수를 사용하여 상태를 업데이트할 때, 해당 업데이트가 비동기적으로 처리될 수 있다. 이는 상태 업데이트가 즉시 반영되지 않을 수 있다는 것을 의미합니다. 따라서, 비동기 함수에서 상태를 업데이트하고 해당 상태 값을 의존하는 작업을 수행하는 경우, 예상과 다른 동작이 발생할 수 있다.

2. 클로저 문제: 비동기 함수에서 상태를 업데이트하거나 상태 값을 읽을 때 클로저(closure) 문제가 발생할 수 있다. 비동기 함수는 상태 값의 최신 버전을 캡처하지 못하고 이전 값을 참조할 수 있다.

### 예방책으로는 다음과 같은 방법들을 고려할 수 있다

1. useEffect 사용: 비동기 함수와 useState를 함께 사용해야 하는 경우, useEffect 훅을 활용하여 상태 업데이트와 비동기 작업을 분리할 수 있다. useEffect 안에서 비동기 함수를 호출하고, 필요한 상태 값을 의존성 배열로 전달하여 상태 값이 변경될 때마다 비동기 함수가 실행되도록 한다.

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchDataAsync();
      setData(data);
    } catch (error) {
      setError(error);
    }
  };
  fetchData();
}, [dependency]);
```

- example

```jsx
const ExampleComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    await setCount(count + 1);
    console.log(count);
  };

  useEffect(() => {
    console.log(count);
  }, [count]);

    return (
    <div>
      <button onClick={handleClick}>Increase Count</button>
    </div>
  );
```

useState를 사용하여 상태를 업데이트할 때, 해당 업데이트는 즉시 반영되며 비동기적으로 처리되지 않다.
비동기성과 관련하여 주의해야 할 부분은 useState를 사용하여 상태를 업데이트한 후에 해당 상태 값을 읽을 때 발생할 수 있는 문제이다. useState의 상태 업데이트는 비동기적으로 처리되지 않지만, 업데이트된 상태가 바로 반영되지 않을 수 있다. 이는 React의 상태 업데이트가 일괄적으로 처리되는 방식과 관련이 있다.
따라서, useState로 상태를 업데이트한 후에 업데이트된 상태 값을 사용해야 하는 경우에는 주의가 필요하다.

2. 함수형 업데이트 사용: useState의 함수형 업데이트 형식을 활용하여 상태를 업데이트하는 경우, 이전 상태 값을 읽어와서 업데이트하는 방식이다. 이렇게 함으로써 상태 값의 최신 버전을 보장할 수 있다.

```jsx
const handleClick = () => {
  // prevState는 이전 상태 값을 나타냄
  setState((prevState) => prevState + 1);
};
```

3. async/await 사용 시 주의: async/await 구문을 사용할 때에는 try-catch 문을 활용하여 예외 처리를 해야 한다. 예외 처리를 하지 않으면 비동기 함수 내에서 발생한 예외가 적절하게 처리되지 않을 수 있다.

```jsx
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  } catch (error) {
    setError(error);
  }
};
```

## useEffect의 관점에서 컴포넌트 생명주기

### 렌더링

렌더링은 React 컴포넌트의 가상 돔(Virtual DOM)을 기반으로 화면에 UI를 그리는 과정이다. 이 과정은 다음과 같은 단계로 이루어진다:

1. 컴포넌트 함수 실행: React 컴포넌트 함수가 호출되면 해당 컴포넌트의 상태(State)와 속성(Props)을 기반으로 JSX(JavaScript XML)를 반환한다.
2. 가상 돔 생성: JSX를 해석하여 컴포넌트의 가상 돔 구조를 생성한다. 가상 돔은 메모리에 존재하는 가벼운 복사본으로, 실제 화면에는 아직 반영되지 않은 상태이다.
3. 이전 가상 돔과 비교: 이전에 렌더링된 가상 돔과 현재 생성된 가상 돔을 비교하여 변경된 부분을 식별한다. 이를 통해 실제로 업데이트해야 할 UI 요소를 최소화하고 효율적으로 업데이트할 수 있다.
4. 변경된 부분 업데이트: 변경된 부분을 실제 화면에 반영한다. 이 과정은 DOM 조작을 수행하고 UI를 업데이트하는 작업을 포함한다.
5. 렌더링 완료: 업데이트된 UI가 화면에 표시되고 렌더링 과정이 완료된다.

### 컴포넌트의 렌더링 순서

1. 컴포넌트 함수 호출: 컴포넌트 함수가 호출되면 컴포넌트의 렌더링이 시작된다.
2. JSX 반환: 컴포넌트 함수 내에서 JSX(React 요소)가 반환된다.
3. JSX 렌더링: 반환된 JSX가 렌더링되어 가상 DOM(React의 가상화된 버전의 DOM)에 반영된다.
4. useEffect 실행: 가상 DOM이 실제 DOM에 반영된 후, useEffect의 첫 번째 매개변수로 전달한 함수가 실행된다.
5. 화면 업데이트: useEffect 이후에 화면이 업데이트되며, 사용자는 업데이트된 화면을 볼 수 있다.

## 비동기 함수에서 .then 사용시 주의 점

- ex

1.

```jsx
useEffect(() => {
  fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then((response) => response.json())
    .then((json) => setItems(json))
    .then(console.log("fetch finished"));
  console.log("resource type changed");
}, [resourceType, windowWidth]);
```

[console]
fetch finished
resource type changed

vs 2.

```jsx
useEffect(() => {
  fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then((response) => response.json())
    .then((json) => {
      setItems(json);
      console.log("fetch finished");
    });
  console.log("resouce type changed");
}, [resourceType, windowWidth]);
```

[console]
resource type changed
fecth finished

then 메소드는 비동기적으로 실행되지 않고, 해당 fetch 프로미스가 해결되었을 때 실행되어야 하는 함수를 등록하는 역할을 한다. 그러나 위의 코드에서는 console.log("fetch finished") 함수가 then 메소드에 직접 전달되고 실행된다. 따라서 fetch 요청이 완료되기 전에 console.log("fetch finished")가 동기적으로 실행되며, 그 후에 fetch 요청의 결과를 받아와서 json을 업데이트하고 있다.
결과적으로 첫 번째 콘솔은 동기적으로 실행되고, 그 다음에 fetch 요청이 완료되어 json이 업데이트되고, 마지막으로 두 번째 콘솔이 실행된다.
만약 fetch 요청이 비동기적으로 처리되어야 하고, console.log("fetch finished")를 요청 완료 후 실행하고 싶다면, 아래와 같이 수정할 수 있다.
