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
