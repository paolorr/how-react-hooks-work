//multiple states
const React = (function () {
	const states = [];
	let calls = -1;
	function useState(defaultValue) {
		const callId = ++calls;
		if (states[callId]) {
			return states[callId];
		}
		const setValue = (newValue) => {
			states[callId][0] = newValue;
		};
		const tuple = [defaultValue, setValue];
		states[callId] = tuple;
		return tuple;
	}

	function render(Component) {
		calls = 0;
		const C = Component();
		C.render();
		return C;
	}

	return {
		useState,
		render,
		getStates: () => states,
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
console.log(React.getStates());
