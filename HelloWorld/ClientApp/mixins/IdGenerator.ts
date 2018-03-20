import _ from "lodash";

export const uniqId = function () {
	return _.uniqueId() + "_" + Math.round(Math.random() * 100);
};