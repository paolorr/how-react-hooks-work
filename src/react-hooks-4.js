//multiple states
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

	return {
		useState,
		render,
	};
})();

function Component() {
	const [count, setCount] = React.useState(1);
	const [text, setText] = React.useState('apple');

	return {
		render: () => console.log({ count, text }),
		click: () => setCount(count + 1),
		type: (word) => setText(word),
	};
}

var App = React.render(Component);
App.click();
App = React.render(Component);
App.type('pear');
App = React.render(Component);
