function useState(initVal) {
	let _val = initVal;
	const state = () => _val;
	const setState = (newVal) => {
		_val = newVal;
	};
	return [state, setState];
}

const [count, setCount] = useState(1);
//not as in react (variable, not function), just a hack
console.log(count());
setCount(2);
console.log(count());
