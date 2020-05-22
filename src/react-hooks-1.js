function useState(initVal) {
	let _val = initVal;
	const state = _val;
	const setState = (newVal) => {
		_val = newVal;
	};
	return [state, setState];
}

//count is assigned to 1 and not to the value inside the hook
const [count, setCount] = useState(1);
console.log(count);
setCount(2);
console.log(count);
