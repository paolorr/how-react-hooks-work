//multiple states
//useEffects hook
const React = (function () {
	let hooks = [];
	let idx = 0;
	function useState(initVal) {
		const state = hooks[idx] || initVal;
		//setState is called asynchronously, so it we have freeze the index
		const _idx = idx;
		const setState = (newVal) => {
			hooks[_idx] = newVal;
		};
		idx++;
		return [state, setState];
	}

	function render(Component) {
		idx = 0;
		const C = Component();
		C.render();
		return C;
	}

	function useEffect(cb, depArray) {
		const oldDeps = hooks[idx];
		let hasChanged = true;
		//detect change
		if (oldDeps) {
			hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
		}
		if (hasChanged) {
			cb();
		}
		hooks[idx] = depArray;
		idx++;
	}

	return {
		useState,
		render,
		useEffect,
	};
})();

function Component() {
	const [count, setCount] = React.useState(1);
	const [text, setText] = React.useState('apple');

	// React.useEffect(() => {
	// 	console.log('called useEffect for each rendering');
	// });

	// React.useEffect(() => {
	// 	console.log('called useEffect once');
	// }, []);

	React.useEffect(() => {
		console.log('called useEffect for each count change');
	}, [count]);

	return {
		render: () => console.log({ count, text }),
		click: () => {
			console.log('click()');
			setCount(count + 1);
		},
		type: (word) => {
			console.log(`type('${word}')`);
			setText(word);
		},
	};
}

var App = React.render(Component);
App.click();
App = React.render(Component);
App.type('pear');
App = React.render(Component);
