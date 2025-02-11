
# Certificación Twilio: Platform Developer (Node.js)

## **1. Conceptos básicos de Twilio**
Twilio es una plataforma que permite integrar comunicaciones (llamadas, SMS, video, etc.) en aplicaciones mediante APIs.

### **Ejemplo: Enviar un SMS**
```javascript
const twilio = require('twilio');

// Credenciales de Twilio
const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Tu Account SID
const authToken = 'tu_auth_token'; // Tu Auth Token
const client = twilio(accountSid, authToken);

// Enviar un SMS
client.messages.create({
    body: "¡Hola! Este es un mensaje de prueba.",
    from: "+1234567890",  // Tu número de Twilio
    to: "+0987654321"     // Número de destino
})
.then(message => console.log(`Mensaje enviado con SID: ${message.sid}`))
.catch(error => console.error(error));
```
---

## **2. TwiML (Twilio Markup Language)**

TwiML es un lenguaje basado en XML para controlar llamadas y mensajes.

### **Ejemplo: Responder a una llamada**

javascript

Copy

const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

// Crear una respuesta TwiML
const response = new VoiceResponse();
response.say({ voice: 'alice', language: 'es-ES' }, 'Hola, gracias por llamar. ¿En qué puedo ayudarte?');

console.log(response.toString());

---

## **3. Twilio Functions**

Twilio Functions permite ejecutar código en la nube sin necesidad de un servidor propio.

### **Ejemplo: Crear una función para enviar un SMS**

javascript

Copy

exports.handler = function(context, event, callback) {
    const twilio = require('twilio');
    const client = twilio(context.ACCOUNT_SID, context.AUTH_TOKEN);

    client.messages.create({
        body: "Este es un SMS enviado desde Twilio Functions.",
        to: "+0987654321",  // Número de destino
        from: "+1234567890" // Tu número de Twilio
    })
    .then(message => {
        callback(null, `Mensaje enviado con SID: ${message.sid}`);
    })
    .catch(error => {
        callback(error);
    });
};

---

## **4. IVR (Respuesta de Voz Interactiva)**

Un IVR es un sistema que interactúa con los usuarios mediante menús de voz.

### **Ejemplo: Crear un IVR básico**

javascript

Copy

const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

// Crear una respuesta TwiML para un IVR
const response = new VoiceResponse();
const gather = response.gather({
    numDigits: 1,
    action: '/processar-respuesta',
    method: 'POST'
});
gather.say({ voice: 'alice', language: 'es-ES' }, 'Presiona 1 para soporte técnico. Presiona 2 para ventas.');
response.say('No recibimos tu respuesta. Adiós.');

console.log(response.toString());

---

## **5. Webhooks**

Los webhooks permiten a Twilio enviar datos a tu servidor en tiempo real.

### **Ejemplo: Recibir un SMS y responder automáticamente**

javascript

Copy

const express = require('express');
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/sms', (req, res) => {
    const mensaje = req.body.Body;
    const respuesta = new MessagingResponse();

    if (mensaje.toLowerCase().includes('hola')) {
        respuesta.message('¡Hola! ¿En qué puedo ayudarte?');
    } else {
        respuesta.message('No entendí tu mensaje.');
    }

    res.type('text/xml');
    res.send(respuesta.toString());
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

---

## **6. Pruebas y depuración**

- Usa el **Twilio Debugger** en el panel de control para ver errores en tiempo real.
    
- Revisa los logs de llamadas y mensajes para identificar problemas.
    

---

## **7. Casos de uso comunes**

### **Notificaciones por SMS**

Envía alertas a tus usuarios cuando ocurra un evento importante.

### **Chat en tiempo real**

Usa Twilio Programmable Chat para crear una aplicación de mensajería.

### **Llamadas con grabación**

Graba llamadas y almacena las grabaciones en la nube.

javascript

Copy

const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('Esta llamada será grabada.');
response.record({
    maxLength: 30,
    action: '/procesar-grabacion'
});

console.log(response.toString());

---

## **Consejos para el examen**

1. **Practica con la API**: Realiza ejercicios como enviar SMS, hacer llamadas y crear IVRs.
    
2. **Revisa la documentación**: Familiarízate con los ejemplos oficiales.
    
3. **Usa Twilio Quest**: Es una forma divertida de aprender Twilio.
    
4. **Haz exámenes de práctica**: Busca preguntas similares a las del examen.