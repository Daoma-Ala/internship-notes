# TwiML™ Voice:

El verbo `<Say>` permite que su aplicación hable programáticamente texto dinámico en una llamada o conferencia utilizando capacidades de conversión de texto a voz (TTS). `<Say>` ofrece diferentes opciones de voces, cada una con su propio conjunto de idiomas, acentos y géneros compatibles, lo que le permite configurar su TwiML según sus necesidades y preferencias.

Cuando Twilio ejecuta `<Say>`, sintetiza el habla para el texto contenido entre las etiquetas de apertura y cierre de `<Say>`.

El siguiente ejemplo de TwiML hace que Twilio reproduzca audio de una voz sintetizada diciendo "Hello!" en una llamada o conferencia.

### `<Say>` usando valores predeterminados

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('Hello!');

console.log(response.toString());
```

**Salida:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello!</Say>
</Response>
```

## Atributos de `<Say>`

El verbo `<Say>` admite los siguientes atributos que modifican su comportamiento:

|Atributo|Valores Aceptados|Valor Predeterminado|
|---|---|---|
|language|Cualquier combinación de idioma/región compatible, por ejemplo, `en-UK`|`en-US` (Inglés con acento de EE.UU.)|
|loop|Cualquier entero positivo o cero, por ejemplo, `4`|`1`|
|voice|`man`, `woman`, o cualquier voz compatible con Twilio (Amazon Polly, Google)|`man`|

**Advertencia:** Usar una combinación inválida de `voice` y `language` puede generar un error y hacer que la instrucción `<Say>` falle. Revise la página de Texto a Voz para asegurarse de la configuración correcta.

### Atributo `language`

El atributo `language` de `<Say>` permite especificar el idioma y la región para la voz sintetizada, por ejemplo, `en-US` para inglés con acento estadounidense.

Ejemplo:

```javascript
const response = new VoiceResponse();
response.say({
    language: 'fr-FR'
}, 'Bonjour!');
```

**Salida:**

```xml
<Response>
  <Say language="fr-FR">Bonjour!</Say>
</Response>
```

### Atributo `loop`

El atributo `loop` especifica cuántas veces se repetirá el texto. El valor predeterminado es `1`. Especificar `0` hará que `<Say>` se repita hasta que la llamada se cuelgue o se alcancen 1,000 iteraciones.

Ejemplo:

```javascript
const response = new VoiceResponse();
response.say({
    loop: 2
}, 'Hello!');
```

**Salida:**

```xml
<Response>
  <Say loop="2">Hello!</Say>
</Response>
```

### Atributo `voice`

Twilio ofrece tres niveles de voces sintetizadas: Básica, Estándar y Premium.

- **Básicas**: Gratuitas, con valores `man` o `woman`.
- **Estándar y Premium**: Proporcionadas por Amazon Polly y Google.

Ejemplo:

```javascript
const response = new VoiceResponse();
response.say({
    voice: 'Polly.Mathieu',
    language: 'fr-FR'
}, 'Bonjour! Je m\'appelle Mathieu.');
```

**Salida:**

```xml
<Response>
  <Say voice="Polly.Mathieu" language="fr-FR">Bonjour! Je m'appelle Mathieu.</Say>
</Response>
```

## Consejos y usos avanzados

- La voz sintetizada puede pronunciar números, fechas y cantidades de manera incorrecta. Verifique siempre el resultado.
- Números sin espacios se pronuncian como un solo valor (`12345` = "doce mil trescientos cuarenta y cinco").
- Números con espacios se pronuncian individualmente (`1 2 3 4 5` = "uno dos tres cuatro cinco").
- Comas y puntos crean pausas naturales en la conversión de texto a voz.
- Para insertar pausas largas, use el verbo `<Pause>` fuera de `<Say>`.

## Límites

Existe un límite de caracteres en el texto procesado por `<Say>`, dependiendo de la opción de conversión de texto a voz utilizada. Consulte la página de Texto a Voz para obtener más información.