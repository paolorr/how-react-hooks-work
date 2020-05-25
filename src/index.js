import './react-hooks-4a';

//if importing example 6, comment all lines below
import { createElement, render } from './utils';
const React = (function () {
	return {
		createElement,
		render: render(),
	};
})();

const rootElement = document.getElementById('root');
React.render(<h1>Check console!</h1>, rootElement);
