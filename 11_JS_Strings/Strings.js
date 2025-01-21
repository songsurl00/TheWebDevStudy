// String
let username = 'sukeun';

// String Methods
let stringExample = '    hello world';

stringExample.toUpperCase(); // '    HELLO WORLD' -> 대문자로 변환
stringExample.trim(); // 'hello world' -> 좌우 공백 지워줌(중간 여백은 지우지 않음)
stringExample.trim().toUpperCase(); // 'HELLO WORLD' -> method는 중첩해서 사용 가능
stringExample.indexOf('h'); // 4 -> 해당 문자의 위치를 알려줌
stringExample.slice(5, 9); // 'ello' -> 시작 index와 끝 index까지 문자열을 잘라서 새로운 문자열 생성
stringExample.replace('world', 'HI'); // '    hello HI' -> 지정한 곳의 문자를 교체
//  .... 등등 여러개의 다양한 문자열 method가 존재

// Template literals
// back-tick ( ` ) 사용
// 문자열 안에 표현식을 넣을 수 있음
`hello ${1 + 2 + 9}`; // 'hello 12'

null; // 변수에 값이 없다고 명시할 때 사용
undefined; // 정의된 값이 없어서 JS가 모른다는 것

// Math Object
Math.PI; // 3.141592653589793s
Math.floor(23.9); // 23 -> 내림
Math.ceil(34.99); // 35 -> 올림
Math.round(34.51); // 35 -> 반올림

Math.random(); // 0 ~ 1 사이의 난수 생성
// Math.random() * n -> 0 ~ n 사이의 난수 생성
// (Math.random() * n) + m -> m ~ n 사이의 난수 생성