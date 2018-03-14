import _ from "lodash";
export default function memoizeDebounce(func, wait = 0, resolver, options = {}) {
	var mem = _.memoize(() => _.debounce(func, wait, options), resolver);
	return function () {
		mem.apply(this, arguments).apply(this, arguments);
	}
}