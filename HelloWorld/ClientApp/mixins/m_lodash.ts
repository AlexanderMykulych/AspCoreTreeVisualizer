import _ from "lodash";
export default function memoizeDebounce(func, wait = 0, resolver, options = {}) {
	var mem = _.memoize(() => _.debounce(func, wait, options), resolver);
	return function () {
		mem.apply(this, arguments).apply(this, arguments);
	}
}

export const difference = function(object, base) {
	function changes(object, base) {
		return _.transform(object, function (result, value, key) {
			if (!_.isEqual(value, base[key])) {
				var res = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
				if (!_.isEmpty(res)) {
					result[key] = res;
				}
			}
		});
	}
	var changed = changes(object, base);
	return _.isEmpty(changed) ? null : changed;
}