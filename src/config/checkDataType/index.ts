/**
 * Verifica si todos los elementos en una lista son del tipo esperado.
 * 
 * @param elements  Array de elementos que se van a verificar
 * @param expectedType  Tipo esperado para los elementos (por ejemplo, 'string', 'number', 'object', etc.).
 * @returns Un mensaje de error si algún elemento no es del tipo esperado.
 *          Undefined si todos los elementos son del tipo esperado.
 */
export function checkType(elements: any[], expectedType: string): string | undefined {
    for (const element of elements) {
        if (typeof element !== expectedType) {
            return `Invalid ${expectedType} value`;
        }
    }
    return undefined; // Todos los elementos son del tipo esperado
}






/**
 * Convierte una lista de elementos a un tipo indicado por parámetro.
 * 
 * @param elements Lista de elementos que se van a convertir.
 * @param targetType Tipo al que se desea convertir los elementos (por ejemplo, 'string', 'number', 'boolean', etc.).
 * @returns Una nueva lista con los elementos convertidos al tipo indicado.
 *          Si la conversión no es posible para algún elemento, retorna un mensaje de error.
 */
export function convertListToType(elements: any[], targetType: string): any[] | string {
    const convertedList: any[] = [];

    for (const element of elements) {
        let convertedElement: any;

        // Intenta convertir el elemento al tipo indicado
        switch (targetType) {
            case 'string':
                convertedElement = String(element);
                break;
            case 'number':
                convertedElement = Number(element);
                break;
            case 'boolean':
                convertedElement = Boolean(element);
                break;
            // Añade casos adicionales según sea necesario para otros tipos
            default:
                return `Tipo de destino "${targetType}" no válido.`;
        }

        // Verifica si la conversión fue exitosa
        if (typeof convertedElement === 'undefined' || isNaN(convertedElement)) {
            return `Valor o tipo inválido para "${element}"`;
        }

        // Agrega el elemento convertido a la lista resultante
        convertedList.push(convertedElement);
    }

    // Retorna la lista de elementos convertidos
    return convertedList;
}