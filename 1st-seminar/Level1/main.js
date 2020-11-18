/* 
// 실습1

var vv = '123';
console.log(vv);

var vv = '321';
console.log(vv);

*/

/*
// 변수 재할당

let variableLet = '123';
variableLet = '321';

console.log(`variableLet: ${variableLet} `);


const variableLet = '123';
const variableLet = '321';

console.log(`variableConst : ${variableConst}`);

*/
 

// BLCOK - SCOPE
/*
if(true){
    var x = 'var';
}
console.log(`var: ${x}`); // var: var

if(true){
    let y = 'let';

}
console.log(`let: ${y}`); // ReferenceError: y is not defined
*/

 
// FUNCTION - SCOPE
 /*
function colorFunction(){
    if(true){
        var color = 'blue';
        console.log(color); // blue
    }
    console.log(color); //blue 
}
colorFunction();
console.log(color); //ReferenceError: color is not define
*/


const symbol1 = Symbol('id');
const symbol2 = Symbol('id');

console.log(symbol1.description)
console.log(symbol1 === symbol2);

console.log('--------------');

const includes = Symbol('커스텀 includes 함수');

Array.prototype[includes] = function() {
  return 'its Symbol';
}

var arr = [1, 2, 3];
console.log(arr.includes(1)); // true, JS 기본 includes 함수
console.log(arr['includes'](1)); // true, JS 기본 includes 함수
console.log(arr[includes]()); // its Symbol, 커스텀 includes 함수

// null, undefined
let nothing = null;
console.log(`nothing : ${nothing}, type: ${typeof nothing}`); //object (EcmaScript의 설계상 오류로 원래는 null 이어야함.)
let x;
console.log(`x: ${x}, type ${typeof x}`); //undefined


// null vs undefined
console.log('null vs undefined');
console.log('null === undefined: ', null === undefined);
console.log('null == undefined: ', null == undefined);

