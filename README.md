# Object

<br></br>

### in 으로 object 안의 property 존재 여부를 알 수 있음.

```js
let user = { name: "John", age: 30 };

alert("age" in user); // true, user.age exists
alert("blabla" in user); // false, user.blabla doesn't exist
```

### for(key in object)

```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  // keys
  alert(key); // name, age, isAdmin
  // values for the keys
  alert(user[key]); // John, 30, true
}
```

### Method Shorthand

```js
// these objects do the same

user = {
  sayHi: function () {
    alert("Hello");
  },
};

// method shorthand looks better, right?
user = {
  sayHi() {
    // same as "sayHi: function(){...}"
    alert("Hello");
  },
};
```

### Reference => 같은 메모리를 참조함.

```js
let user = { name: "John" };

let admin = user;

admin.name = "Pete"; // changed by the "admin" reference

alert(user.name); // 'Pete', changes are seen from the "user" reference
```

### const obj 안의 porperty의 수정은 가능 (but!, obj = ... 로 수정은 불가)

```js
const user = {
  name: "John",
};

user.name = "Pete"; // (*)

alert(user.name); // Pete
```

### object property copy

```js
Object.assign(dest, ...sources);
```

sources object안의 property값을 dest로 옮길 수 있다.
property가 중복이라면 값이 overwritten됨.

### optional Changing

value?.prop:
만약 value 가 존재한다면, value.prop과 같이 작동함
존재하지 않는다면 (undefined/null) undefined를 반환.

```js
let user = {}; // user has no address

alert(user?.address?.street); // undefined (no error)

let userAdmin = {
  admin() {
    alert("I am admin");
  },
};

//?.()
let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)

//?.[]
let key = "firstName";

let user1 = {
  firstName: "John",
};

let user2 = null;

alert(user1?.[key]); // John
alert(user2?.[key]); // undefined
```

- obj?.prop – returns obj.prop if obj exists, otherwise undefined.
- obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
- obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined.

## Array Method

- array는 object타입임
  <br></br>

### arr.splice

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

start인덱스에서 deleteCount만큼 차례대로 삭제하고 elem1, ... elemN을 삽입

```js
let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert(arr); // now ["Let's", "dance", "right", "now"]
```

```js
let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert(removed); // "I", "study" <-- array of removed elements
```

삭제된 배열들이 반환됨

```js
let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert(arr); // "I", "study", "complex", "language", "JavaScript"
```

deleteCount를 0으로 조절하여 삭제를 하지 않을수도 있음

### Search In array

- arr.indexOf(item)

### Filter

```js
let results = arr.filter(function (item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});
```

매칭이 되는 element들을 가지고 있는 array를 반환함

```js
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

// returns array of the first two users
let someUsers = users.filter((item) => item.id < 3);

alert(someUsers.length); // 2
```

### Sort, Reverse, Split

arr.sort() -> 오름차순 정렬
arr.reverse() -> 배열의 순서 거꾸로 뒤집어서 저장
str.split('item') -> String 내부의 item을 기준으로 나누어 배열에 저장

### Object.keys, values, entries

Object.keys(obj) – returns an array of keys.
Object.values(obj) – returns an array of values.
Object.entries(obj) – returns an array of [key, value] pairs.

## Destructing Assignment

### Array Destructing

```js
// we have an array with the name and surname
let arr = ["John", "Smith"];

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

alert(firstName); // John
alert(surname); // Smith
```

```js
let user = {};
[user.name, user.surname] = "John Smith".split(" ");

alert(user.name); // John
alert(user.surname); // Smith
```

### 나머지 처리 : rest(...)

```js
let [name1, name2, ...rest] = [
  "Julius",
  "Caesar",
  "Consul",
  "of the Roman Republic",
];

// rest is array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```

### Object Destructing

```js
let options = {
  title: "Menu",
  width: 100,
  height: 200,
};

let { title, width, height } = options;

alert(title); // Menu
alert(width); // 100
alert(height); // 200
```

## String

<br></br>

### backtics ``

- 개행이 가능
- 함수나 변수 사용이 가능해짐

```js
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // a list of guests, multiple lines
```

```js
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

### Getting a Substring

- str.slice(start [, end])
- str.substring(start [, end])

```js
let str = "stringify";
alert(str.slice(0, 5)); // 'strin', the substring from 0 to 5 (not including 5)
alert(str.slice(0, 1)); // 's', from 0 to 1, but not including 1, so only character at 0
```

```js
let str = "stringify";
alert(str.slice(2)); // 'ringify', from the 2nd position till the end
```
