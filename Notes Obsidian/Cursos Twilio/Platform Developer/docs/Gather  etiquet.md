https://www.twilio.com/docs/voice/twiml/gather

# TwiML™ Voice: `<Gather>`

## Descripción General

Puedes usar el verbo `<Gather>` de TwiML para recolectar dígitos o transcribir voz durante una llamada.

---

### Mejoras

> **A partir del 1 de octubre de 2024**, podrás configurar _Google Speech-to-Text (STT) v2_ como tu proveedor predeterminado de conversión de voz a texto para `<Gather>`. Además, podrás especificar _Google V2_ o _Deepgram_ como proveedor en el atributo `speechModel` de `<Gather>`.
> 
> Esta función se encuentra en **Beta Pública**.

Para más información, consulta la guía para [Habilitar Google STT V2](https://www.twilio.com/docs/voice/twiml/gather#enable-google-stt-v2).

---

## Ejemplo básico de `<Gather>` en TwiML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather/>
</Response>
```

Puedes enviar a Twilio TwiML plano o usar bibliotecas auxiliares para integrarlo en tus aplicaciones web.

Ejemplo en **Node.js**:

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.gather();

console.log(response.toString());
```

**Salida esperada:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather/>
</Response>
```

Cuando Twilio ejecuta este TwiML, esperará hasta **5 segundos** para que el usuario ingrese dígitos en su teclado.

**Posibles resultados:**

1. El usuario ingresa dígitos y presiona `#` o permanece en silencio por 5 segundos → Twilio envía los datos recolectados en una solicitud `POST` a la URL que aloja el `<Gather>`.
2. El usuario no ingresa ningún dígito → Twilio continúa con el siguiente verbo TwiML en el documento (si no hay más verbos, la llamada finaliza).

---

## Habilitar Google STT V2 como proveedor predeterminado

Para configurar _Google STT V2_ como el proveedor predeterminado en tu cuenta de Twilio:

1. Navega a **Voice Settings > General** en la consola de Twilio.
2. Selecciona **Enabled**.
3. Guarda los cambios.

Una vez habilitado, Twilio asignará automáticamente los atributos existentes de `<Gather>` a Google STT V2.

---

## Atributos de `<Gather>`

El verbo `<Gather>` admite varios atributos para personalizar su comportamiento.

|**Atributo**|**Valores Permitidos**|**Valor por Defecto**|
|---|---|---|
|`action`|URL absoluta o relativa|URL del documento actual|
|`finishOnKey`|0-9, `#`, `*`, `""` (vacío)|`#`|
|`hints`|Lista de palabras clave|Ninguno|
|`input`|`dtmf`, `speech`, `dtmf speech`|`dtmf`|
|`language`|Etiquetas BCP-47 (Google STT V1)|`en-US`|
|`method`|`GET`, `POST`|`POST`|
|`numDigits`|Número entero positivo|Ilimitado|
|`partialResultCallback`|URL absoluta o relativa|Ninguno|
|`partialResultCallbackMethod`|`GET`, `POST`|`POST`|
|`profanityFilter`|`true`, `false`|`true`|
|`speechTimeout`|Número entero positivo o `auto`|`timeout`|
|`timeout`|Número entero positivo|`5`|
|`speechModel`|Modelos de Google STT V1, V2 o Deepgram|`default`|
|`enhanced`|`true`, `false`|`false`|
|`actionOnEmptyResult`|`true`, `false`|`false`|

Ejemplo de `<Gather>` con atributos personalizados:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech dtmf" timeout="3" numDigits="1">
        <Say>Presiona 1 o di "ventas" para hablar con ventas.</Say>
    </Gather>
</Response>
```

---

## Uso del atributo `action`

El atributo `action` define la URL a la que Twilio enviará los datos después de que el usuario termine de ingresar su respuesta.

Twilio también enviará parámetros adicionales:

- **`Digits`** → Contiene los números ingresados por el usuario.
- **`SpeechResult`** → Contiene la transcripción del audio si `input="speech"`.
- **`Confidence`** → Puntaje de confianza de la transcripción (0.0 a 1.0).

⚠ **Precaución**: Si no defines un `action`, Twilio reintentará ejecutar el mismo TwiML, lo que puede generar **bucles no deseados**.

Ejemplo de `<Gather>` con un `action` definido:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather action="/procesar_gather.php" method="GET">
        <Say>
            Ingresa tu número de cuenta seguido de la tecla numeral.
        </Say>
    </Gather>
    <Say>No recibimos ninguna entrada. Adiós.</Say>
</Response>
```

### Escenarios de Ejecución

#### **Escenario 1**:

- El usuario no presiona ningún botón ni habla por 5 segundos.
- El sistema ejecuta `<Say>No recibimos ninguna entrada. Adiós.</Say>`.

#### **Escenario 2**:

- El usuario presiona una tecla mientras se está reproduciendo `<Say>`.
- La reproducción se detiene y `<Gather>` espera la entrada.

#### **Escenario 3**:

- El usuario ingresa `12345#` o deja pasar 5 segundos.
- Twilio envía la entrada a `/procesar_gather.php` para su procesamiento.

Código en **Node.js** para manejar el `action`:

```javascript
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const gather = response.gather({
    action: '/procesar_gather.php',
    method: 'GET'
});
gather.say('Ingresa tu número de cuenta seguido de la tecla numeral.');
response.say('No recibimos ninguna entrada. Adiós.');

console.log(response.toString());
```

**Salida esperada:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather action="/procesar_gather.php" method="GET">
        <Say>Ingresa tu número de cuenta seguido de la tecla numeral.</Say>
    </Gather>
    <Say>No recibimos ninguna entrada. Adiós.</Say>
</Response>
```

Ejemplo en **PHP** para procesar los dígitos ingresados:

```php
<?php
// Archivo en http://tu-servidor/procesar_gather.php
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<Response><Say>Ingresaste " . $_REQUEST['Digits'] . "</Say></Response>";
?>
```

---

