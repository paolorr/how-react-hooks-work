//render to DOM

import './styles.css';
import { createElement, render } from './utils';

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

	function workLoop() {
		idx = 0;
		render(hooks)();
		setTimeout(workLoop, 300);
	}
	setTimeout(workLoop, 300);

	return {
		useState,
		render: render(hooks),
		useEffect,
		createElement,
	};
})();

function Component() {
	const [count, setCount] = React.useState(1);
	const list = useDogs(count);

	// React.useEffect(() => {
	// 	console.log('called useEffect for each rendering');
	// });

	// React.useEffect(() => {
	// 	console.log('called useEffect once');
	// }, []);

	React.useEffect(() => {
		console.log('called useEffect for each count change');
	}, [count]);

	return (
		<main>
			<h1>
				This is <i>Not</i> React
			</h1>
			<button onClick={() => setCount(count + 1)}>
				Click Me: {count}
			</button>
			{list.map((item) => (
				<img src={item.url} alt={item.idx} />
			))}
		</main>
	);
}

function useDogs(count) {
	const [list, setList] = React.useState([]);
	React.useEffect(() => {
		// fetch('https://picsum.photos/v2/list?page=1&limit=' + count)
		// 	.then((x) => x.json())
		// 	.then((x) => x.map((item) => item.download_url))
		// 	.then((x) => setList(x));
		const url = 'https://via.placeholder.com/500x500.png?text=';
		const list = [...Array(count)].map((_, i) => ({
			idx: i + 1,
			url: url + (i + 1),
		}));
		setList(list);
	}, [count]);
	return list;
}

const rootElement = document.getElementById('root');
React.render(<Component />, rootElement);

// var App = React.render(Component);
// App.click();
// App = React.render(Component);
// App.type('pear');
// App = React.render(Component);
