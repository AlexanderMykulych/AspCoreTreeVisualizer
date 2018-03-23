export var PointType;
(function (PointType) {
    PointType[PointType["start"] = 0] = "start";
    PointType[PointType["characteristic"] = 1] = "characteristic";
    PointType[PointType["aggregator"] = 2] = "aggregator";
})(PointType || (PointType = {}));
export var AggregationType;
(function (AggregationType) {
    AggregationType[AggregationType["And"] = 0] = "And";
    AggregationType[AggregationType["Or"] = 1] = "Or";
})(AggregationType || (AggregationType = {}));
export var CharacteristicType;
(function (CharacteristicType) {
    CharacteristicType["Lookup"] = "TsiGuidValue";
    CharacteristicType["String"] = "TsiStringValue";
    CharacteristicType["Int"] = "TsiIntValue";
    CharacteristicType["DateTime"] = "TsiDateTimeValue";
})(CharacteristicType || (CharacteristicType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9pbnRUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUG9pbnRUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE1BQU0sQ0FBTixJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDcEIsMkNBQVMsQ0FBQTtJQUNULDZEQUFjLENBQUE7SUFDZCxxREFBVSxDQUFBO0FBQ1gsQ0FBQyxFQUpXLFNBQVMsS0FBVCxTQUFTLFFBSXBCO0FBRUQsTUFBTSxDQUFOLElBQVksZUFHWDtBQUhELFdBQVksZUFBZTtJQUMxQixtREFBTyxDQUFBO0lBQ1AsaURBQUUsQ0FBQTtBQUNILENBQUMsRUFIVyxlQUFlLEtBQWYsZUFBZSxRQUcxQjtBQUVELE1BQU0sQ0FBTixJQUFZLGtCQUtYO0FBTEQsV0FBWSxrQkFBa0I7SUFDN0IsNkNBQXVCLENBQUE7SUFDdkIsK0NBQXlCLENBQUE7SUFDekIseUNBQW1CLENBQUE7SUFDbkIsbURBQTZCLENBQUE7QUFDOUIsQ0FBQyxFQUxXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFLN0IiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGVudW0gUG9pbnRUeXBlIHtcclxuXHRzdGFydCA9IDAsXHJcblx0Y2hhcmFjdGVyaXN0aWMsXHJcblx0YWdncmVnYXRvclxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBZ2dyZWdhdGlvblR5cGUge1xyXG5cdEFuZCA9IDAsXHJcblx0T3JcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ2hhcmFjdGVyaXN0aWNUeXBlIHtcclxuXHRMb29rdXAgPSBcIlRzaUd1aWRWYWx1ZVwiLFxyXG5cdFN0cmluZyA9IFwiVHNpU3RyaW5nVmFsdWVcIixcclxuXHRJbnQgPSBcIlRzaUludFZhbHVlXCIsXHJcblx0RGF0ZVRpbWUgPSBcIlRzaURhdGVUaW1lVmFsdWVcIlxyXG59Il19