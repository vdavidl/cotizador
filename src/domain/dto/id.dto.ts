export class IdDto {

    private constructor(
        public readonly id: number,
    ) { }
    static create(id: any): [string?,IdDto?] {
        // Verificar si el ID es un número válido
        if (isNaN(id)) {
            return ['Invalid id format', undefined];
        }
        // Convertir la cadena a un número
        id = parseInt(id, 10);
        // Crear instancia de IdDto
        return [undefined, new IdDto(id)];
    }
}