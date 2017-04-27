import { Cuestionario } from "./cuestionario";

export const CUESTIONARIOS : Cuestionario[] = [
    {
        idPregunta : 0,
        pregunta : "¿Cuál es la capital de Noruega?",
        opciones : ["Estocolmo", "Oslo", "Helsinki"],
        opcionCorrecta : 1
    },
    {
        idPregunta : 1,
        pregunta : "¿Cuántos huevos hay en 7 docenas?",
        opciones : ["74", "94", "84"],
        opcionCorrecta : 2
    },
    {
        idPregunta : 2,
        pregunta : "¿Quién fue el 3° presidente de Argentina?",
        opciones : ["Justo José de Urquiza", "Bernardino Rivadavia", "Vicente López y Planes"],
        opcionCorrecta : 0
    },
    {
        idPregunta : 3,
        pregunta : "¿En qué año se instaló el 1° semáforo?",
        opciones : ["1868", "1968", "1986"],
        opcionCorrecta : 0
    },
    {
        idPregunta : 4,
        pregunta : "¿Por qué en buceo se tiran hacia atrás?",
        opciones : ["Por costumbre", "Por seguridad", "Si se tiran hacia adelante caen en el bote"],
        opcionCorrecta : 1
    },
    {
        idPregunta : 5,
        pregunta : "Si un abogado enloquece, ¿Pierde el juicio?",
        opciones : ["No", "Si", "Quizás"],
        opcionCorrecta : 1
    },
    {
        idPregunta : 6,
        pregunta : "¿Cómo descargar más RAM?",
        opciones : ["Usando Google.es", "mmm...", "Usando Feisbuc"],
        opcionCorrecta : -1
    }
    ];