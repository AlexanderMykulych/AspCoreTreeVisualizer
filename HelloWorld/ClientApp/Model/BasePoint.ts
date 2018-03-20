import { Dependency } from "./Dependency";
import { PointType } from "./PointType";

export interface BasePoint {
	name: string;
	offsetX: any;
	offsetY: any;
	Options: {
		type: PointType;
	},
	Label: string;
}