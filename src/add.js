// step 1
// let foo = 1;
// function add() {
// 	foo = foo + 1;
// 	return foo;
// }

// step 2
// function add() {
// 	let foo = 1;
// 	foo = foo + 1;
// 	return foo;
// }

//step 3
// function getAdd() {
// 	let foo = 1;
// 	return function () {
// 		foo = foo + 1;
// 		return foo;
// 	};
// }
// const add = getAdd();

//step 4
const add = (function () {
	let foo = 1;
	return function () {
		foo = foo + 1;
		return foo;
	};
})();

console.log(add());
console.log(add());
console.log(add());
console.log(add());
console.log(add());
