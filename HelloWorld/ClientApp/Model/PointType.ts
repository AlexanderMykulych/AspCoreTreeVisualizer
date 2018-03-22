
export enum PointType {
	start = 0,
	characteristic,
	aggregator
}

export enum AggregationType {
	And = 0,
	Or
}

export enum CharacteristicType {
	Lookup = "TsiGuidValue",
	String = "TsiStringValue",
	Int = "TsiIntValue",
	DateTime = "TsiDateTimeValue"
}