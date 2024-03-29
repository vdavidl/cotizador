export const regularExps = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:])[A-Za-z\d@$!%*?&:]{8,}$/,
    phoneNumber: /^(\+\d{1,3}\s?)?(\d{1,4}[-\s]?){1,5}\d$/,// Valida números de teléfono con un prefijo internacional opcional,y formatos de separadores como guiones o espacios en blanco. - Longitud entre 5 y 20 dígitos.
}