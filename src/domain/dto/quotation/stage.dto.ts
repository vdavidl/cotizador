export class StageDto {
  private constructor(
    public readonly stage_name: string,
    public readonly delivery_time: Date,
    public readonly percentage: number,
    public readonly advance_payment: number,
    public readonly activities: string
  ) {}

  static create(object: { [key: string]: any }): [string?, StageDto?] {
    const {
      stage_name,
      delivery_time,
      percentage,
      advance_payment,
      activities,
    } = object;

    if (!stage_name) return ["Missing stage_name"];
    if (!delivery_time) return ["Missing delivery_time"];
    if (!percentage) return ["Missing percentage"];
    if (!advance_payment) return ["Missing advance_payment"];
    if (!activities) return ["Missing activities"];

    // Validación y conversión a decimal para percentage
    const percentageDecimal = parseFloat(percentage);
    if (isNaN(percentageDecimal)) {
      return ["Percentage must be a valid decimal number (e.g., 0.25, 1.00)"];
    }
    if (percentageDecimal < 0 || percentageDecimal > 1.0) {
      return ["Percentage must be between 0.0 and 1.0"];
    }
    if (percentageDecimal.toFixed(2) !== percentage) {
      return ["Percentage can have up to 2 decimal places"];
    }

    return [
      undefined,
      new StageDto(
        stage_name,
        delivery_time,
        percentage,
        advance_payment,
        activities
      ),
    ];
  }

  static createList(stageArray: object[]): [string?, StageDto[]?] {
    if (stageArray.length < 1 || stageArray.length >= 4)
      return ["Stages quantity invalid"];

    const stageDto_list: StageDto[] = [];
    //stageArray.forEach((stage : object)=>
    for (const stage of stageArray) {
      const [error, stageDto] = StageDto.create(stage);
      if (error) return [`${error}`];
      stageDto_list.push(stageDto!);
    }

    return [undefined, stageDto_list];
  }
}
