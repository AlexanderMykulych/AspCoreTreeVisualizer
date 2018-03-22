import { Dependency } from "./Dependency";
import { PointType, AggregationType } from "./PointType";

export interface BasePoint {
	name: string;
	offsetX: any;
	offsetY: any;
	Options: {
		type: PointType;
		aggregation?: AggregationType;
	},
	Label: string;
	Category: {
		Id: string,
		Name: string
	};
}