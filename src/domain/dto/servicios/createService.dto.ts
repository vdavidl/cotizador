export class CreateServiceDto {
  private constructor(
    public readonly service_name: string,
    public readonly description: string,
    public readonly userId: number
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateServiceDto?] {
    const { service_name, description, userID } = obj;

    if (!service_name) return ["Missing service name"];
    if (!description) return ["Missing description"];
    if (!userID) return ["Missing user id"];

    return [undefined, new CreateServiceDto(service_name, description, userID)];
  }
}
