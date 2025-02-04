### TwiML™ Voice: `<Dial>`

Durante una llamada activa, puedes usar el verbo `<Dial>` de TwiML para conectar a la persona que llama con otra parte.

El siguiente ejemplo muestra el uso más básico de `<Dial>`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>415-123-4567</Dial>
</Response>
```

Si la persona en el número `415-123-4567` responde la llamada, las dos partes pueden comunicarse hasta que una de ellas cuelgue.

El verbo `<Dial>` finalizará la nueva llamada si:

- La persona llamada no contesta.
- Twilio recibe una señal de ocupado.
- El número no existe.

#### Advertencia
`<Dial>` no puede iniciar una llamada directamente desde Twilio; solo puede marcar a una nueva parte desde una llamada activa y en curso. Para iniciar una nueva llamada saliente desde Twilio, debes hacer una solicitud a la API al endpoint de **Call**.

Para una guía paso a paso sobre cómo hacer tu primera llamada saliente con Twilio, prueba uno de nuestros **quickstarts** que muestran cómo hacer una llamada usando las bibliotecas de ayuda de Twilio.

Twilio hará una solicitud `GET` o `POST` a la URL de acción (si se proporciona) cuando la llamada de `<Dial>` termine. El flujo de la llamada continuará usando el TwiML que envíes en respuesta a esa solicitud.

Si no proporcionas una URL de acción en tu `<Dial>` y la persona que llama original sigue en la línea, Twilio continuará renderizando el documento TwiML original.

---

### Ejemplo de `<Dial>`

**Node.js**

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.dial('415-123-4567');
response.say('Goodbye');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>415-123-4567</Dial>
    <Say>Goodbye</Say>
</Response>
```

Con este código, Twilio conectará la llamada original con una nueva parte marcando al número `415-123-4567`. Varias cosas pueden suceder a continuación:

1. Si alguien contesta, Twilio conecta a la persona que llama con la parte llamada.
2. Si la persona que llama original cuelga, la sesión de Twilio termina y el verbo `<Say>` no se ejecuta.
3. Si la línea está ocupada, si no hay respuesta o si la parte llamada cuelga, `<Dial>` finaliza y la persona que llama original escucha el texto de `<Say>` ("Goodbye") antes de que termine el flujo de la llamada.

---

### Atributos de `<Dial>`

`<Dial>` admite los siguientes atributos que modifican su comportamiento:

| Atributo                        | Valores Permitidos                                                                 | Valor Predeterminado |
|---------------------------------|-----------------------------------------------------------------------------------|----------------------|
| `action`                        | URL relativa o absoluta                                                           | `None`               |
| `answerOnBridge`                | `true`, `false`                                                                   | `false`              |
| `callerId`                      | Un número de teléfono válido o un identificador de cliente si estás marcando a un `<Client>`. | CallerId de la persona que llama |
| `callReason`                    | Cadena (Máximo 50 caracteres)                                                     | `None`               |
| `hangupOnStar`                  | `true`, `false`                                                                   | `false`              |
| `method`                        | `GET`, `POST`                                                                     | `POST`               |
| `record`                        | `do-not-record`, `record-from-answer`, `record-from-ringing`, `record-from-answer-dual`, `record-from-ringing-dual`. Para compatibilidad, `true` es un alias de `record-from-answer` y `false` es un alias de `do-not-record`. | `do-not-record`      |
| `recordingStatusCallback`       | URL relativa o absoluta                                                           | `None`               |
| `recordingStatusCallbackMethod` | `GET`, `POST`                                                                     | `POST`               |
| `recordingStatusCallbackEvent`  | `in-progress`, `completed`, `absent`                                              | `completed`          |
| `recordingTrack`                | `inbound`, `outbound`, `both`                                                     | `both`               |
| `referUrl`                      | URL relativa o absoluta                                                           | `None`               |
| `referMethod`                   | `GET`, `POST`                                                                     | `POST`               |
| `ringTone`                      | Código de país ISO 3166-1 alpha-2. Por defecto, el tono de llamada de la operadora. | `None`               |
| `timeLimit`                     | Entero positivo (segundos)                                                        | `14400` segundos (4 horas) |
| `timeout`                       | Entero positivo (segundos)                                                        | `30` segundos        |
| `trim`                          | `trim-silence`, `do-not-trim`                                                     | `do-not-trim`        |

Puedes usar uno o más de estos atributos en un verbo `<Dial>` de la siguiente manera:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial timeout="10" record="true">415-123-4567</Dial>
</Response>
```

---

### Atributo `action`

El atributo `action` acepta una URL como argumento. Esta URL le indica a Twilio dónde hacer una solicitud `POST` o `GET` después de que termine la llamada marcada.

La solicitud de Twilio a esta URL incluirá los siguientes parámetros:

| Parámetro             | Descripción                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `DialCallStatus`      | El resultado del intento de `<Dial>`. Consulta la sección `DialCallStatus` para más detalles. |
| `DialCallSid`         | El SID de la llamada de la nueva pierna de la llamada. Este parámetro no se envía después de marcar a una conferencia. |
| `DialCallDuration`    | La duración en segundos de la llamada marcada. Este parámetro no se envía después de marcar a una conferencia o si una llamada secundaria es redirigida a una nueva URL de TwiML antes de ser desconectada. |
| `DialBridged`         | Indicador booleano de si la llamada de marcado ha sido conectada al destino marcado. |
| `RecordingUrl`        | La URL del audio grabado. Este parámetro se incluye solo si `record` está configurado en `<Dial>` y no incluye grabaciones iniciadas de otras maneras. |

**Advertencia:** Si especificas una URL de acción para `<Dial>`, Twilio continuará la llamada inicial después de que la parte marcada cuelgue. Cualquier verbo TwiML incluido después de este `<Dial>` será inalcanzable, ya que tu respuesta a Twilio toma el control total de la llamada inicial.

---

### `DialCallStatus`

Si especificas una URL de acción, Twilio siempre pasará el estado del intento de `<Dial>`.

Los valores posibles de `DialCallStatus` son:

| Valor        | Descripción                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `completed`  | La parte llamada contestó la llamada y fue conectada con la persona que llama. |
| `answered`   | Al llamar a una conferencia, la parte llamada contestó la llamada y fue conectada con la persona que llama. |
| `busy`       | Twilio recibió una señal de ocupado al intentar conectar con la parte llamada. |
| `no-answer`  | La parte llamada no contestó antes de que pasara el período de tiempo de espera (`timeout`). |
| `failed`     | Twilio no pudo enrutar al número de teléfono proporcionado. Esto suele ocurrir al marcar un número con formato correcto pero inexistente. |
| `canceled`   | La llamada fue cancelada a través de la API REST antes de ser contestada. |

---
https://www.twilio.com/docs/voice/twiml/dial