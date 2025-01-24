// Object(객체)를 생성하는 법: (key - value) 
const dog = {
  name: "Rusty",
  breed: "unknown",
  isAlive: false,
  age: 7
}
// 객체의 key는 모두 문자열로 변환됨

// 객체 접근
dog.age; // 7
dog["age"]; // 7 

// 객체 수정
dog.breed = "mutt";
dog["age"] = 8;