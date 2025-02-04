Aquí tienes la traducción del texto para que puedas pegarlo en una nota de Obsidian:

---

### TwiML™ Message: `<Message>`

#### Advertencia
Este verbo TwiML no está disponible actualmente al usar las regiones de Twilio en Irlanda (IE1) o Australia (AU1). Solo es compatible con la región predeterminada US1. Una lista completa de productos y funciones no compatibles con las regiones de Twilio se documenta en los [Global Infrastructure docs](https://www.twilio.com/docs/global-infrastructure).

El verbo `<Message>` envía un mensaje a un número de teléfono o a una SIM inalámbrica.

#### Atributos del Verbo

El verbo `<Message>` admite los siguientes atributos que modifican su comportamiento:

| Nombre del Atributo | Valores Permitidos | Valor Predeterminado |
|----------------------|---------------------|-----------------------|
| `to`                 | Número de teléfono, SID de SIM inalámbrica | Ver abajo |
| `from`               | Número de teléfono, cadena de 1-11 caracteres (A-Z, a-z, 0-9), SID de SIM inalámbrica | Ver abajo |
| `statusCallback`     | URL relativa o absoluta | Ninguno |
| `action`             | URL relativa o absoluta | Ninguno |
| `method`             | GET, POST | POST |

#### `to`

El atributo `to` toma un número de teléfono válido como argumento. Twilio enviará el mensaje al número proporcionado. Si no se proporciona el atributo `to`, Twilio enviará el mensaje como una respuesta al remitente actual.

Los números de teléfono deben formatearse con un '+' y el código de país, por ejemplo, `+16175551212` (formato E.164). Para números `to` sin un '+', Twilio usará el mismo código de país que el número `from`. Twilio también intentará manejar números formateados localmente para ese código de país (por ejemplo, `(415) 555-1212` para EE. UU., `07400123456` para GB). Si envías a un país diferente al del número `from`, debes incluir un '+' y el código de país para garantizar la entrega adecuada.

#### Advertencia
Si tienes una cuenta de prueba, el número de teléfono `to` debe estar verificado con Twilio. Sin embargo, no necesitas especificar el atributo `to` para enviar un mensaje de respuesta al remitente actual.

#### Envío a una SIM inalámbrica
Para detalles sobre el envío a una SIM inalámbrica, consulta "Messages to the Device" en la documentación de [Wireless Programmable SMS](https://www.twilio.com/docs/wireless/api/message-resource).

#### `from`

El atributo `from` toma un número de teléfono válido o un ID de remitente alfanumérico como argumento. Si se usa un número de teléfono, debe ser un número que hayas comprado o portado a Twilio.

Los IDs de remitente alfanuméricos solo pueden usarse al enviar mensajes a países donde esta función es compatible. Los IDs de remitente alfanuméricos están limitados a 11 caracteres. Los caracteres aceptados incluyen letras ASCII mayúsculas y minúsculas, dígitos del 0 al 9 y espacio: `[A-Za-z0-9]`. El ID de remitente debe representar o estar asociado con la marca de tu empresa.

Al enviar un mensaje en respuesta a un mensaje entrante, `from` toma por defecto el número de Twilio que recibió el mensaje. Si especificas un valor `from`, debe ser un número de teléfono local capaz de enviar mensajes asignado a tu cuenta. Si el número de teléfono no es capaz de enviar mensajes, entonces `<Message>` no enviará un mensaje.

#### `statusCallback`

El atributo `statusCallback` toma una URL como argumento. Al igual que el parámetro `StatusCallback` al enviar un mensaje saliente a través de la API REST, esta URL recibirá una solicitud HTTP con el estado de un mensaje enviado en respuesta a un mensaje entrante.

Los estados posibles de un mensaje son `queued`, `failed`, `sent`, `delivered` o `undelivered`. Twilio enviará el `MessageSid` junto con otros parámetros estándar de la solicitud, así como `MessageStatus` y `ErrorCode`. Las URL no relativas deben contener un nombre de host válido (no se permiten guiones bajos).

El método HTTP utilizado para realizar la solicitud se configura en la propiedad `method`.

#### Advertencia
Diferencias de comportamiento entre los atributos `statusCallback` y `action`

Históricamente, Twilio ha procesado el verbo `<Message>` en una respuesta TwiML de manera diferente dependiendo de si el mensaje entrante que activó el webhook era SMS o MMS. Para mensajes MMS entrantes, se usaba el atributo `statusCallback` para especificar la URL en la que recibirías actualizaciones de estado para esa respuesta. Para otros mensajes entrantes (SMS, WhatsApp, etc.), el atributo `action` se usa para especificar la URL de callback de estado. Algunas cuentas tienen configuraciones históricas donde el atributo `action` se ignora y `statusCallback` se usa para todos los mensajes.

En el futuro, Twilio eliminará esta complejidad y normalizará el comportamiento de estos atributos. Hasta entonces, si deseas especificar una URL de callback de estado personalizada, se recomienda establecer tanto el atributo `statusCallback` como el `action` con el mismo valor de URL. Evita establecer valores diferentes, ya que representaría un comportamiento indefinido sujeto a cambios sin previo aviso.

#### `action`

El atributo `action` toma una URL como argumento. Al igual que el parámetro `StatusCallback` al enviar un mensaje saliente a través de la API REST, esta URL recibirá una solicitud HTTP con el estado de un mensaje enviado en respuesta a un mensaje entrante.

Los estados posibles de un mensaje son `queued`, `failed`, `sent`, `delivered` o `undelivered`. Twilio enviará el `MessageSid` junto con otros parámetros estándar de la solicitud, así como `MessageStatus` y `ErrorCode`. Las URL no relativas deben contener un nombre de host válido (no se permiten guiones bajos).

El método HTTP utilizado para realizar la solicitud se configura en la propiedad `method`.

#### Parámetros de la Solicitud
Twilio pasará el parámetro `MessageStatus` junto con los parámetros estándar de la solicitud TwiML Message en su solicitud a la URL `action`.

#### `method`

El atributo `method` toma el valor `GET` o `POST`. Esto le indica a Twilio si debe solicitar la URL `action` mediante HTTP GET o POST. Este atributo está modelado según el atributo `method` de los formularios HTML. `POST` es el valor predeterminado.

#### Parámetros de la Solicitud
Twilio pasará el parámetro `MessageStatus` junto con los parámetros estándar de la solicitud TwiML Message en su solicitud a la URL `statusCallback`.

#### Parámetro `MessageStatus`

El parámetro `MessageStatus` se envía con las solicitudes a la URL `action` o a la URL `statusCallback`. El parámetro contiene más información sobre el estado del mensaje: si se envió correctamente o si la entrega falló (el número era inválido, no había cuerpo del mensaje, etc.).

| Parámetro | Descripción |
|-----------|-------------|
| `MessageStatus` | El estado actual del mensaje. Puede ser `queued`, `sending`, `sent` o `failed`. |

#### Sustantivos

El "sustantivo" de un verbo TwiML es el contenido anidado dentro del verbo que no es un verbo en sí mismo; es el contenido sobre el que actúa el verbo. Estos son los sustantivos para `<Message>`:

| Sustantivo | Descripción |
|------------|-------------|
| Texto plano | El texto del mensaje que deseas enviar. Debe tener menos de 1600 caracteres. |
| `<Body>` | El texto del mensaje que deseas enviar. Debe tener menos de 1600 caracteres. Si se usa más de un elemento `<Body>` en un solo `<Message>`, los contenidos de ambos se concatenarán en un solo valor `Body`. |
| `<Media>` | Un elemento XML anidado que indica la URL de una imagen para enviar en el mensaje. Si deseas enviar más de una imagen, incluye más de un elemento `<Media>`. El número máximo de elementos `<Media>` que se pueden incluir en un mensaje es 10. |

#### Ver También

#### Información
¿Quieres enviar un mensaje sin esperar un mensaje entrante? Consulta nuestra documentación sobre [mensajes salientes](https://www.twilio.com/docs/sms/send-messages).

#### Ejemplos

#### Ejemplo 1: Envío de un SMS

Aquí, Twilio envía un SMS con la ubicación de tu maravilloso establecimiento minorista.

**Envío de SMS**

```javascript
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const response = new MessagingResponse();
response.message('Store Location: 123 Easy St.');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        Store Location: 123 Easy St.
    </Message>
</Response>
```

#### Ejemplo 2: Envío de un Mensaje con Medios (MMS)

Para agregar una imagen al mensaje, puedes especificar una URL con el sustantivo `<Media>`. También puedes encerrar el cuerpo en el sustantivo `<Body>`. Si especificas uno o más sustantivos `<Media>`, el `<Body>` es opcional.

**Envío de un Mensaje con Medios (MMS)**

```javascript
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const response = new MessagingResponse();
const message = response.message();
message.body('Store Location: 123 Easy St.');
message.media('https://demo.twilio.com/owl.png');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Store Location: 123 Easy St.</Body>
        <Media>https://demo.twilio.com/owl.png</Media>
    </Message>
</Response>
```

#### Ejemplo 3: Informes de `MessageStatus`

En este caso de uso, se utilizan los atributos `action` y `method`. Ahora, cuando el mensaje se pone en cola para su entrega, Twilio solicitará la URL `action` pasando el parámetro `MessageStatus`. Si los mensajes están en cola y esperando ser enviados, `MessageStatus` tendrá el valor `sending`. Si se proporcionó un atributo inválido, entonces `MessageStatus` será `invalid`.

Tu aplicación web puede observar el parámetro `MessageStatus` y decidir qué TwiML devolver.

Si se proporciona una URL `action` para `<Message>`, el flujo de tu aplicación continuará con el TwiML recibido en respuesta a la solicitud `action`. Todos los verbos restantes en el documento serán inalcanzables y se ignorarán.

**Informes de `MessageStatus`**

```javascript
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const response = new MessagingResponse();
response.message({
    action: '/SmsHandler.php',
    method: 'POST'
}, 'Store Location: 123 Easy St.');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message action="/SmsHandler.php" method="POST">
        Store Location: 123 Easy St.
    </Message>
</Response>
```

#### Reglas de Anidación

No puedes anidar ningún verbo dentro de `<Message>` y no puedes anidar `<Message>` dentro de ningún otro verbo. Los únicos elementos que se pueden anidar dentro de un `<Message>` son los sustantivos `<Body>` y `<Media>`.

Anida sustantivos dentro de un verbo `<Message>` de la siguiente manera:

**Mensaje con sustantivos anidados**

```javascript
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const response = new MessagingResponse();
const message = response.message();
message.body('Hello friend');
message.media('https://demo.twilio.com/owl.png');

console.log(response.toString());
```

**Salida**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Hello friend</Body>
        <Media>https://demo.twilio.com/owl.png</Media>
    </Message>
</Response>
```

---

