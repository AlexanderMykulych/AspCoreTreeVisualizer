import _ from "lodash";
export default function memoizeDebounce(func, wait, resolver, options) {
    if (wait === void 0) { wait = 0; }
    if (options === void 0) { options = {}; }
    var mem = _.memoize(function () { return _.debounce(func, wait, options); }, resolver);
    return function () {
        mem.apply(this, arguments).apply(this, arguments);
    };
}
export var difference = function (object, base) {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibV9sb2Rhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtX2xvZGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsTUFBTSxDQUFDLE9BQU8sMEJBQTBCLElBQUksRUFBRSxJQUFRLEVBQUUsUUFBUSxFQUFFLE9BQVk7SUFBaEMscUJBQUEsRUFBQSxRQUFRO0lBQVksd0JBQUEsRUFBQSxZQUFZO0lBQzdFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBTSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBL0IsQ0FBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRSxNQUFNLENBQUM7UUFDTixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQTtBQUNGLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSTtJQUM5QyxpQkFBaUIsTUFBTSxFQUFFLElBQUk7UUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ25CLENBQUM7WUFDRixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDNUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZW1vaXplRGVib3VuY2UoZnVuYywgd2FpdCA9IDAsIHJlc29sdmVyLCBvcHRpb25zID0ge30pIHtcclxuXHR2YXIgbWVtID0gXy5tZW1vaXplKCgpID0+IF8uZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucyksIHJlc29sdmVyKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0bWVtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkaWZmZXJlbmNlID0gZnVuY3Rpb24ob2JqZWN0LCBiYXNlKSB7XG5cdGZ1bmN0aW9uIGNoYW5nZXMob2JqZWN0LCBiYXNlKSB7XG5cdFx0cmV0dXJuIF8udHJhbnNmb3JtKG9iamVjdCwgZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuXHRcdFx0aWYgKCFfLmlzRXF1YWwodmFsdWUsIGJhc2Vba2V5XSkpIHtcblx0XHRcdFx0dmFyIHJlcyA9IChfLmlzT2JqZWN0KHZhbHVlKSAmJiBfLmlzT2JqZWN0KGJhc2Vba2V5XSkpID8gY2hhbmdlcyh2YWx1ZSwgYmFzZVtrZXldKSA6IHZhbHVlO1xuXHRcdFx0XHRpZiAoIV8uaXNFbXB0eShyZXMpKSB7XG5cdFx0XHRcdFx0cmVzdWx0W2tleV0gPSByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHR2YXIgY2hhbmdlZCA9IGNoYW5nZXMob2JqZWN0LCBiYXNlKTtcblx0cmV0dXJuIF8uaXNFbXB0eShjaGFuZ2VkKSA/IG51bGwgOiBjaGFuZ2VkO1xufSJdfQ==