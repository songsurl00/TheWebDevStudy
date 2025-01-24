const testScores = {
    keenan: 80,
    damon: 67,
    kim: 89,
    shawn: 91,
    marlon: 72,
    dwayne: 77,
    nadia: 83,
    elvira: 97,
    diedre: 81,
    vonnie: 60
}

// for in 은 객체를 반복시켜줌 (요새는 잘 안씀)

// for (let person in testScores) {
//     console.log(`${person} scored ${testScores[person]}`);
// }

let total = 0;
let scores = Object.values(testScores); // 객체의 value로 구성된 배열을 생성
for (let score of scores) {
    total += score;
}
console.log(total / scores.length)

