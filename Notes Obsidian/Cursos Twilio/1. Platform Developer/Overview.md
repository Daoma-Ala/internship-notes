Aquí tienes la traducción del texto para que puedas pegarlo en una nota de Obsidian:

---

### TwiML™ para Programmable Voice

#### ¿Qué es TwiML?

TwiML (el Lenguaje de Marcado de Twilio) es un conjunto de instrucciones que puedes usar para decirle a Twilio qué hacer cuando recibes una llamada entrante o un SMS.

#### Cómo funciona TwiML

Cuando alguien llama a uno de tus números de Twilio, Twilio busca la URL asociada con ese número de teléfono y le envía una solicitud. Luego, Twilio lee las instrucciones TwiML alojadas en esa URL para determinar qué hacer, ya sea grabar la llamada, reproducir un mensaje para el llamante o pedirle al llamante que presione dígitos en su teclado.

En esencia, TwiML es un documento XML con etiquetas especiales definidas por Twilio para ayudarte a construir tu aplicación de Programmable Voice.

#### Información
¿No estás haciendo llamadas telefónicas? TwiML impulsa más que solo Twilio Programmable Voice. Por ejemplo, consulta la documentación sobre cómo usar TwiML con [Programmable SMS](https://www.twilio.com/docs/sms/twiml).

El siguiente código dirá "¡Hola, mundo!" cuando alguien llame a un número de Twilio configurado con este TwiML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>¡Hola, mundo!</Say>
</Response>
```

Siempre puedes devolver TwiML directamente desde tu lenguaje de preferencia o aprovechar las bibliotecas de ayuda de Twilio para crear automáticamente TwiML válido. En el siguiente ejemplo de código, cambia a tu lenguaje de programación web preferido para ver cómo se ve el TwiML anterior usando la biblioteca de ayuda.

#### Decir "Hola" a un llamante entrante

**Node.js**

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('¡Hola!');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>¡Hola!</Say>
</Response>
```

#### Información
Consulta nuestro breve tutorial sobre cómo responder a llamadas telefónicas entrantes, disponible en los seis lenguajes de bibliotecas de ayuda que admitimos. También puedes aprovechar los [TwiML Bins](https://www.twilio.com/docs/runtime/twiml-bins) de Twilio, nuestra solución sin servidor que te permite escribir TwiML que Twilio alojará para que puedas prototipar rápidamente una solución sin necesidad de configurar un servidor web.

Las llamadas salientes (llamadas desde un número de Twilio a un número externo) se controlan usando TwiML de la misma manera. Cuando inicias una llamada saliente con la API de Twilio, Twilio solicita tu TwiML para saber cómo manejar la llamada.

Twilio ejecuta un solo documento TwiML para el llamante a la vez, pero muchos documentos TwiML pueden vincularse para construir aplicaciones de voz interactivas complejas.

#### Elementos de TwiML

En el lenguaje de TwiML, los elementos XML se dividen en tres grupos: el elemento raíz `<Response>`, los verbos y los sustantivos.

#### Advertencia
Los nombres de los elementos TwiML (verbos y sustantivos) distinguen entre mayúsculas y minúsculas. Por ejemplo, usar `<say>` en lugar de `<Say>` resultará en un error. Los nombres de los atributos también distinguen entre mayúsculas y minúsculas y usan camelCase.

Puedes usar comentarios XML libremente en tu TwiML; el intérprete los ignorará.

#### El elemento `<Response>`
En cualquier respuesta TwiML a una solicitud de Twilio, debes anidar todos los elementos de verbo dentro de `<Response>`, el elemento raíz del marcado XML de Twilio:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>
      Este mensaje debe estar anidado en un elemento Response
      para que Twilio se lo diga a tu llamante.
    </Say>
</Response>
```

Cualquier otra estructura se considera inválida.

#### Verbos TwiML para Programmable Voice
Los verbos TwiML le dicen a Twilio qué acciones tomar en una llamada. Debido a esto, la mayoría de los elementos en un documento TwiML son verbos TwiML. Los nombres de los verbos distinguen entre mayúsculas y minúsculas, al igual que los nombres de sus atributos.

Puedes usar diferentes combinaciones de verbos TwiML para crear todo tipo de aplicaciones de voz interactivas. Los verbos TwiML principales para Programmable Voice son:

- `<Say>` — Lee texto al llamante.
- `<Play>` — Reproduce un archivo de audio para el llamante.
- `<Dial>` — Añade otra parte a la llamada.
- `<Record>` — Graba la voz del llamante.
- `<Gather>` — Recopila los dígitos que el llamante presiona en su teclado.

Los siguientes verbos pueden usarse para controlar el flujo de tu llamada:

- `<Hangup>` — Cuelga la llamada.
- `<Enqueue>` — Añade al llamante a una cola de llamadas.
- `<Leave>` — Elimina a un llamante de una cola de llamadas.
- `<Pause>` — Espera antes de ejecutar más instrucciones.
- `<Redirect>` — Redirige el flujo de la llamada a un documento TwiML diferente.
- `<Refer>` — Twilio inicia SIP REFER hacia la infraestructura de comunicación IP.
- `<Reject>` — Rechaza una llamada entrante sin que se te cobre.

Los siguientes sustantivos proporcionan capacidades avanzadas:

- `<VirtualAgent>` — Crea IVR conversacional impulsado por IA.

#### Advertencia
Hay ciertas situaciones en las que el intérprete de TwiML puede no alcanzar verbos en un documento TwiML porque el flujo de control ha pasado a un documento diferente. Esto suele suceder cuando se establece el atributo `action` de un verbo.

Por ejemplo, si un verbo `<Say>` va seguido de un `<Redirect>` y luego otro `<Say>`, el segundo `<Say>` es inalcanzable porque `<Redirect>` transfiere el control total de una llamada al TwiML en una URL diferente.

#### Sustantivos TwiML
Un sustantivo TwiML describe los números de teléfono y los recursos de API sobre los que deseas actuar. Efectivamente, un sustantivo TwiML es cualquier cosa anidada dentro de un verbo que no es un verbo en sí mismo: es aquello sobre lo que el verbo está actuando.

Los sustantivos TwiML suelen ser solo texto. Sin embargo, como en el caso de `<Dial>` con sus sustantivos `<Number>` y `<Conference>`, a veces hay elementos XML anidados que son sustantivos.

#### La solicitud de Twilio a tu aplicación

Cuando alguien realiza una llamada entrante a uno de tus números de teléfono de Twilio, Twilio necesita solicitar TwiML desde tu aplicación para obtener instrucciones sobre cómo manejar la llamada.

Puedes configurar tu número de teléfono de Twilio para que apunte a la URL de tu aplicación visitando la sección de números de teléfono en la [Consola](https://www.twilio.com/console/phone-numbers/incoming). Selecciona tu número de teléfono, luego desplázate a la sección de Voz y Fax para configurar un webhook, un TwiML Bin o una Función de Twilio para que Twilio envíe esa solicitud HTTP cuando llegue una llamada.

Twilio realiza su solicitud a través de HTTP, ya sea como GET o POST, al igual que solicitar una página web en tu navegador o enviar un formulario.

#### Advertencia
Twilio no puede almacenar en caché las solicitudes POST. Si deseas que Twilio almacene en caché páginas TwiML estáticas, haz que Twilio realice solicitudes a tu aplicación usando GET.

Al incluir parámetros y valores en su solicitud, Twilio envía datos a tu aplicación sobre los que puedes actuar antes de responder.

#### Parámetros de la solicitud

Twilio siempre envía los siguientes parámetros cuando envía una solicitud a tu aplicación para recuperar instrucciones sobre cómo manejar una llamada.

Estos se enviarán como parámetros POST o parámetros de consulta URL, dependiendo del método HTTP que hayas configurado.

| Parámetro | Descripción |
|-----------|-------------|
| `CallSid` | Un identificador único para esta llamada, generado por Twilio. |
| `AccountSid` | Tu ID de cuenta de Twilio. Tiene 34 caracteres de largo y siempre comienza con las letras `AC`. |
| `From` | El número de teléfono o identificador del cliente de la parte que inició la llamada. Los números de teléfono están formateados con un '+' y el código de país, por ejemplo, `+16175551212` (formato E.164). Los identificadores de cliente comienzan con el esquema URI `client:`; por ejemplo, en una llamada de un cliente llamado 'charlie', el parámetro `From` será `client:charlie`. Si el identificador de llamada está oculto o no está disponible, puedes recibir una cadena que contenga descripciones como `anonymous`, `unknown` u otras. |
| `To` | El número de teléfono o identificador del cliente de la parte llamada. Los números de teléfono están formateados con un '+' y el código de país, por ejemplo, `+16175551212` (formato E.164). Los identificadores de cliente comienzan con el esquema URI `client:`; por ejemplo, para una llamada a un cliente llamado 'joey', el parámetro `To` será `client:joey`. |
| `CallStatus` | Un estado descriptivo para la llamada. El valor es uno de los siguientes: `queued`, `ringing`, `in-progress`, `completed`, `busy`, `failed` o `no-answer`. Consulta la sección de `CallStatus` a continuación para más detalles. |
| `ApiVersion` | La versión de la API de Twilio utilizada para manejar esta llamada. Para llamadas entrantes, esto se determina por la versión de la API establecida en el número llamado. Para llamadas salientes, esta es la versión utilizada por la solicitud de la API REST de la llamada saliente. |
| `Direction` | Una cadena que describe la dirección de la llamada: `inbound` para llamadas entrantes, `outbound-api` para llamadas iniciadas a través de la API REST, `outbound-dial` para llamadas iniciadas por un verbo `<Dial>`. |
| `ForwardedFrom` | Este parámetro se establece solo cuando Twilio recibe una llamada reenviada, pero su valor depende de la información que el operador del llamante incluya al reenviar. No todos los operadores admiten pasar esta información. |
| `CallerName` | Este parámetro se establece cuando el `IncomingPhoneNumber` que recibió la llamada tiene su valor `VoiceCallerIdLookup` establecido en `true` ($0.01 por consulta). |
| `ParentCallSid` | Un identificador único para la llamada que creó esta rama. Este parámetro no se pasa si esta es la primera rama de una llamada. |
| `CallToken` | Una cadena de token necesaria para invocar una llamada reenviada. |

Twilio también intenta buscar datos geográficos basados en los números de teléfono `To` y `From`. Si están disponibles, Twilio enviará los siguientes parámetros con su solicitud:

| Parámetro | Descripción |
|-----------|-------------|
| `FromCity` | La ciudad del llamante. |
| `FromState` | El estado o provincia del llamante. |
| `FromZip` | El código postal del llamante. |
| `FromCountry` | El país del llamante. |
| `ToCity` | La ciudad de la parte llamada. |
| `ToState` | El estado o provincia de la parte llamada. |
| `ToZip` | El código postal de la parte llamada. |
| `ToCountry` | El país de la parte llamada. |

Twilio proporcionará los parámetros enumerados anteriormente cuando realice una solicitud a tu aplicación para recuperar instrucciones sobre cómo manejar una llamada. Esto puede ocurrir cuando llega una llamada entrante a tu número de Twilio, o después de que un verbo TwiML haya completado y hayas proporcionado una URL de acción donde Twilio puede recuperar el siguiente conjunto de instrucciones. Dependiendo de lo que esté sucediendo en una llamada, también se pueden enviar otras variables.

Por ejemplo, cuando Twilio recibe SIP, enviará parámetros adicionales a tu aplicación web: puedes encontrar la lista de parámetros enviados con SIP en nuestra guía [SIP y Interacción TwiML](https://www.twilio.com/docs/voice/twiml/sip).

#### Información
Hay algunas instancias en las que Twilio enviará una solicitud que no contiene todos los parámetros anteriores. Por ejemplo, si has proporcionado una URL `statusCallback` en un sustantivo TwiML como `<VirtualAgent>` o `<Pay>`, la solicitud de Twilio a tu aplicación no contendrá todos los parámetros enumerados anteriormente, ya que podrían no ser relevantes para el callback de estado particular. En esos casos, puedes encontrar los parámetros esperados en la documentación del verbo TwiML específico.

#### Valores de `CallStatus`
Los siguientes son los valores posibles para el parámetro `CallStatus`. Estos valores también se aplican al parámetro `DialCallStatus`, que se envía con solicitudes HTTP a una URL de acción `<Dial>`.

| Estado | Descripción |
|--------|-------------|
| `queued` | La llamada está lista y esperando en la cola antes de salir. |
| `ringing` | La llamada está sonando actualmente. |
| `in-progress` | La llamada fue contestada y está activamente en progreso. |
| `completed` | La llamada fue contestada y ha terminado normalmente. |
| `busy` | El llamante recibió una señal de ocupado. |
| `failed` | La llamada no pudo completarse como se marcó, probablemente porque el número de teléfono no existía. |
| `no-answer` | La llamada terminó sin ser contestada. |
| `canceled` | La llamada fue cancelada a través de la API REST mientras estaba en cola o sonando. |

#### Finalizando la llamada: solicitudes de callback

Después de recibir una llamada, solicitar TwiML desde tu aplicación, procesarla y finalmente finalizar la llamada, Twilio realizará una solicitud HTTP asincrónica a la URL `StatusCallback` configurada para el número de Twilio que fue llamado.

Debes proporcionar explícitamente esta URL a tu aplicación en el parámetro `StatusCallback` de cada mensaje para el que desees recibir los callbacks de estado. El TwiML sin procesar para esto se ve así:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number
         statusCallbackEvent="initiated ringing answered completed"
         statusCallback="https://myapp.com/calls/events"
         statusCallbackMethod="POST">
            +12316851234
        </Number>
    </Dial>
</Response>
```

El siguiente ejemplo de código muestra cómo configurar tu URL de callback de estado con TwiML sin procesar o usando la biblioteca de ayuda de tu elección:

#### Configurar un `StatusCallback`

**Node.js**

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number({
    statusCallbackEvent: 'initiated ringing answered completed',
    statusCallback: 'https://myapp.com/calls/events',
    statusCallbackMethod: 'POST'
}, '+12349013030');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number
         statusCallbackEvent="initiated ringing answered completed"
         statusCallback="https://myapp.com/calls/events"
         statusCallbackMethod="POST">
            +12349013030
        </Number>
    </Dial>
</Response>
```

Al proporcionar una URL `StatusCallback` para tu número de Twilio y capturar esta solicitud, puedes determinar cuándo termina una llamada y recibir información sobre la llamada. Las URL no relativas deben contener un nombre de host válido, y no se permiten guiones bajos.

#### Parámetros de la solicitud `StatusCallback`
Cuando Twilio envía parámetros a tu aplicación en una solicitud asincrónica a la URL `StatusCallback`, incluyen los mismos parámetros pasados en una solicitud TwiML sincrónica.

Aquí tienes la traducción al español del texto proporcionado, listo para pegar en Obsidian:

---

El request de callback de estado también pasa estos parámetros adicionales:

| Parámetro           | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| CallDuration        | La duración en segundos de la llamada recién completada.                    |
| RecordingUrl        | La URL del audio grabado de la llamada. Este parámetro se incluye solo si se establece `Record=true` en la solicitud de la API REST, y no incluye grabaciones de `<Dial>` o `<Record>`. |
| RecordingSid        | El ID único de la grabación de esta llamada.                                |
| RecordingDuration   | La duración del audio grabado (en segundos).                                |

### Formatos de datos

#### Números de teléfono
Todos los números de teléfono en las solicitudes de Twilio están en formato E.164 si es posible. Por ejemplo, `(231) 685-1234` se mostraría como `+12316851234`. Sin embargo, en ocasiones Twilio no puede normalizar un identificador de llamada entrante a E.164. En estos casos, Twilio reportará el identificador de llamada en su formato original.

#### Fechas y horas
Todas las fechas y horas en las solicitudes de Twilio están en GMT y en formato RFC 2822. Por ejemplo, `6:13 PM PDT` del 19 de agosto de 2010 se mostraría como `Fri, 20 Aug 2010 01:13:42 +0000`.

### Twilio es un cliente HTTP bien comportado
Twilio se comporta como un navegador web cuando realiza solicitudes HTTP a URLs:

- **Cookies**: Twilio acepta cookies HTTP y las incluirá en cada solicitud, al igual que un navegador web normal.
- **Redirecciones**: Twilio sigue las redirecciones HTTP (códigos de estado 301, 307, etc.), al igual que un navegador web normal. Twilio soporta un máximo de 10 redirecciones antes de fallar la solicitud con el código de error 11215.
- **Caché**: Twilio almacenará en caché los archivos cuando los encabezados HTTP lo permitan (a través de `ETag` y `Last-Modified`) y cuando el método HTTP sea `GET`, al igual que un navegador web normal.

### Twilio entiende los tipos MIME
Twilio hace lo correcto cuando tu aplicación responde con diferentes tipos MIME:

| Tipo MIME                     | Comportamiento                                                                 |
|-------------------------------|--------------------------------------------------------------------------------|
| `text/xml`, `application/xml`, `text/html` | Twilio interpreta el documento devuelto como un conjunto de instrucciones XML (que llamamos TwiML). Esta es la respuesta más comúnmente utilizada. |
| Varios tipos de audio          | Twilio reproduce el archivo de audio para la persona que llama y luego cuelga. Consulta la documentación de `<Play>` para ver los tipos MIME admitidos. |
| `text/plain`                   | Si la respuesta es TwiML válido, ejecutaremos las instrucciones proporcionadas; de lo contrario, Twilio leerá el contenido del texto en voz alta para la persona que llama y luego colgará. |

### Respondiendo a Twilio

En tu respuesta a la solicitud de Twilio a la URL configurada, puedes indicarle a Twilio qué hacer en una llamada.

#### Cómo funciona el intérprete de TwiML

Cuando tu aplicación responde a una solicitud de Twilio con XML, Twilio ejecuta tu documento a través del intérprete de TwiML. El intérprete de TwiML solo entiende los pocos elementos XML especialmente nombrados que componen TwiML: verbos `<Response>` y sustantivos.

El intérprete comienza en la parte superior de tu documento TwiML y ejecuta las instrucciones (verbos) en orden de arriba hacia abajo.

El siguiente fragmento de código lee "Hola Mundo" a la persona que llama antes de reproducir `Cowbell.mp3` y luego colgar:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hola, Mundo!</Say>
    <Play>https://api.twilio.com/Cowbell.mp3</Play>
</Response>
```

Al igual que con todo TwiML, puedes usar las bibliotecas de ayuda para reproducir música para la persona que llama. Incluye el atributo `loop` para indicarle a Twilio que reproduzca esta grabación 10 veces (o hasta que la persona que llama cuelgue):

#### Reproducir y repetir música para tus llamadas

**Node.js**

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.play({
    loop: 10
}, 'https://api.twilio.com/cowbell.mp3');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play loop="10">https://api.twilio.com/cowbell.mp3</Play>
</Response>
```

### Callbacks de estado en tu respuesta

Los callbacks de estado no controlan el flujo de la llamada, por lo que no es necesario devolver TwiML. Si respondes, usa el código de estado `204 No Content` o `200 OK` con `Content-Type: text/xml` y un `<Response/>` vacío en el cuerpo. No responder correctamente resultará en advertencias en Debugger.

---
