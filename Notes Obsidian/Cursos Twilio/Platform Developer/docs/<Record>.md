### TwiML™ Voice: `<Record>`

El verbo `<Record>` graba la voz de la persona que llama y te devuelve la URL de un archivo que contiene la grabación de audio. Opcionalmente, puedes generar transcripciones de texto de las llamadas grabadas configurando el atributo `transcribe` del verbo `<Record>` en `true`.

#### Advertencia: Implicaciones legales de la grabación de llamadas
Si decides grabar llamadas de voz o video, debes cumplir con ciertas leyes y regulaciones, incluidas las relacionadas con la obtención del consentimiento para grabar (como la Ley de Invasión de Privacidad de California y leyes similares en otras jurisdicciones). Puedes encontrar más información sobre las implicaciones legales de la grabación de llamadas en el artículo del Centro de Ayuda: **"Consideraciones Legales con la Grabación de Comunicaciones de Voz y Video"**.

**Nota:** Twilio recomienda que consultes con tu asesor legal para asegurarte de cumplir con todas las leyes aplicables en relación con las comunicaciones que grabes o almacenes utilizando Twilio.

#### Información: Cumplimiento de la Industria de Tarjetas de Pago (PCI)
Las grabaciones de llamadas no son compatibles con PCI por defecto. Para hacerlas compatibles, debes habilitar el **Modo PCI** en la configuración de voz de Twilio.

**Nota:** Las transcripciones no están disponibles cuando el modo PCI está habilitado.

---

### Atributos del Verbo `<Record>`

El verbo `<Record>` admite los siguientes atributos que modifican su comportamiento:

| Nombre del Atributo               | Valores Permitidos                                                                 | Valor Predeterminado |
|-----------------------------------|-----------------------------------------------------------------------------------|----------------------|
| `action`                          | URL relativa o absoluta                                                           | URL actual del documento |
| `method`                          | `GET`, `POST`                                                                     | `POST`               |
| `timeout`                         | Entero positivo                                                                   | `5`                  |
| `finishOnKey`                     | Cualquier dígito, `#`, `*`                                                        | `1234567890*#`       |
| `maxLength`                       | Entero mayor que 1 y menor o igual a 14400 (4 horas) o 86400 (24 horas). Depende de la configuración de duración máxima de llamada de tu cuenta. | `3600` (1 hora)      |
| `playBeep`                        | `true`, `false`                                                                   | `true`               |
| `trim`                            | `trim-silence`, `do-not-trim`                                                     | `trim-silence`       |
| `recordingStatusCallback`         | URL relativa o absoluta                                                           | `None`               |
| `recordingStatusCallbackMethod`   | `GET`, `POST`                                                                     | `POST`               |
| `recordingStatusCallbackEvent`    | `in-progress`, `completed`, `absent`                                              | `completed`          |
| `transcribe`                      | `true`, `false`                                                                   | `false`              |
| `transcribeCallback`              | URL relativa o absoluta                                                           | `None`               |

Puedes usar uno o más de estos atributos en un verbo `<Record>` de la siguiente manera:

#### Ejemplo en Node.js

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.record({
    timeout: 10,
    transcribe: true
});

console.log(response.toString());
```

#### Salida

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Record timeout="10" transcribe="true" />
</Response>
```

---

### Explicación de los Atributos

#### `action`
El atributo `action` toma una URL relativa o absoluta como valor. Cuando la grabación finaliza, Twilio hará una solicitud `GET` o `POST` a esta URL, incluyendo los parámetros a continuación. Si no se proporciona una acción, `<Record>` solicitará la URL del documento actual.

**Advertencia:** Si modificas una llamada en vivo para redirigir a un verbo `<Record>`, debes proporcionar una URL de acción. De lo contrario, se producirá un error `11100`.

#### `method`
El atributo `method` toma los valores `GET` o `POST`. Indica si Twilio debe solicitar la URL de acción mediante HTTP `GET` o `POST`. El valor predeterminado es `POST`.

#### `timeout`
El atributo `timeout` indica a Twilio que finalice la grabación después de un número de segundos de silencio. Para desactivar esta función, establece `timeout` en `0`. El valor predeterminado es `5` segundos.

#### `finishOnKey`
El atributo `finishOnKey` te permite elegir un conjunto de dígitos que, al ser presionados, finalizan la grabación. Por ejemplo, si configuras `finishOnKey` como `#`, y la persona que llama presiona `#`, Twilio detendrá la grabación inmediatamente.

#### `maxLength`
El atributo `maxLength` establece la duración máxima de la grabación en segundos. Si configuras `maxLength` en `30`, la grabación finalizará automáticamente después de 30 segundos.

#### `playBeep`
El atributo `playBeep` permite activar o desactivar un sonido de tono antes de comenzar la grabación. Si se establece en `false`, no se reproducirá ningún tono.

#### `trim`
El atributo `trim` especifica si se debe recortar el silencio inicial y final de los archivos de audio. El valor predeterminado es `trim-silence`.

#### `recordingStatusCallback`
El atributo `recordingStatusCallback` toma una URL relativa o absoluta. Si se proporciona, Twilio hará una solicitud `GET` o `POST` a la URL especificada cuando la grabación esté disponible.

#### `transcribe`
El atributo `transcribe` indica a Twilio que deseas una transcripción de texto del audio de la grabación. No está habilitado por defecto.

#### `transcribeCallback`
El atributo `transcribeCallback` se usa junto con `transcribe`. Permite especificar una URL a la que Twilio hará una solicitud `POST` asíncrona cuando la transcripción esté completa.

---

### Reglas de Anidación

No puedes anidar ningún verbo dentro de `<Record>`, ni puedes anidar `<Record>` dentro de otros verbos.

---

Aquí tienes la traducción al español del texto proporcionado, listo para pegar en Obsidian:

---

### Ver También

- **Recurso de Grabación de la API REST de Twilio**
- **Recurso de Transcripción de la API REST de Twilio**

---

### Ejemplos

#### Ejemplo 1: Grabar

Twilio ejecutará el verbo `<Record>`, lo que hará que la persona que llama escuche un tono y comience la grabación. Si la persona que llama permanece en silencio durante más de cinco segundos, presiona la tecla `#` o se alcanza el tiempo máximo de grabación (`maxLength`), Twilio hará una solicitud HTTP `POST` a la URL de acción predeterminada (es decir, la URL del documento actual) con los parámetros `RecordingUrl` y `RecordingDuration`.

**Ejemplo de grabación en Node.js**

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.record();

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Página ubicada en http://example.com/simple_record.xml -->
<Response>  
    <Record/>  
</Response>
```

---

#### Ejemplo 2: Grabar un buzón de voz

Este ejemplo muestra un mensaje de buzón de voz. Se le pide a la persona que llama que deje un mensaje después del tono. El verbo `<Record>` reproduce un tono y comienza a grabar hasta 20 segundos de audio.

**Grabar un buzón de voz en Node.js**

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('Por favor, deje un mensaje después del tono.\nPresione la tecla de estrella cuando termine.');
response.record({
    action: 'http://foo.edu/handleRecording.php',
    method: 'GET',
    maxLength: 20,
    finishOnKey: '*'
});
response.say('No recibí una grabación');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Página ubicada en http://example.com/voicemail_record.xml -->
<Response>
    <Say>
        Por favor, deje un mensaje después del tono. 
        Presione la tecla de estrella cuando termine. 
    </Say>
    <Record 
        action="http://foo.edu/handleRecording.php"
        method="GET" 
        maxLength="20"
        finishOnKey="*"
        />
    <Say>No recibí una grabación</Say>
</Response>
```

**Comportamiento:**
1. Si la persona que llama habla durante menos de 20 segundos y luego permanece en silencio durante cinco segundos, Twilio hace una solicitud `GET` a la URL de acción. El verbo `<Say>` nunca se alcanza.
2. Si la persona que llama habla durante los 20 segundos completos, Twilio hace una solicitud `GET` a la URL de acción. El verbo `<Say>` nunca se alcanza.

---

#### Ejemplo 3: Transcribir una grabación

Twilio grabará a la persona que llama. Cuando la grabación esté completa, Twilio transcribirá la grabación y hará una solicitud HTTP `POST` a la URL de `transcribeCallback` con un parámetro que contiene la transcripción de la grabación.

**Transcribir una grabación en Node.js**

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.record({
    transcribe: true,
    transcribeCallback: '/handle_transcribe.php'
});

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Página ubicada en http://example.com/record_and_transcribe.xml -->
<Response>
    <Record transcribe="true" transcribeCallback="/handle_transcribe.php"/>
</Response>
```

---

### Consejos y Usos Avanzados

- La duración de la grabación puede ser menor que el tiempo que la persona que llama pasa grabando. Esta diferencia en la duración puede deberse a:
  1. Twilio recorta el silencio inicial y final de los archivos de audio.
  2. No se reciben datos de audio RTP (Protocolo de Transporte en Tiempo Real) durante la grabación.

---

