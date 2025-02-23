
## Seguimiento del Estado de una Llamada Saliente de Twilio

### Objetivo

Twilio proporciona seguimiento del estado de llamadas salientes en Programmable Voice mediante _Status Callbacks_. Estas devoluciones de llamada pueden ser útiles para ver si una llamada ha fallado, se ha conectado con éxito o ha estado sonando demasiado tiempo, permitiéndote redirigirla. También permiten construir análisis avanzados para visualizar fácilmente el estado de todas tus llamadas en curso.

### Información

> **Nota:** _Status Callbacks_ solo están disponibles para llamadas de _Programmable Voice_ y no pueden usarse en llamadas de _Elastic SIP Trunking_ (ESIPT), ya que estas no utilizan webhooks dentro de Twilio. Las _Status Callbacks_ de llamadas ESIPT deben ser manejadas por tu infraestructura SIP y no dentro de Twilio. Sin embargo, las llamadas ESIPT aparecerán en tus registros de llamadas o en las respuestas del recurso `/Call` de la API una vez que tengan estado de completado.

### Producto

**Programmable Voice**

---

## Procedimiento

### ¿Cómo funcionan los _Status Callbacks_?

Cuando se crea una llamada, pasa por múltiples estados hasta que finalmente se completa. Las llamadas salientes iniciadas a través de la API REST siguen estos estados en orden:

- **Queued (En cola):** Twilio ha aceptado tu solicitud API y está determinando el socio de _Super Network_ correcto para conectar tu llamada.
    
    > **Nota:** Las llamadas secundarias salientes (_bridged_ o reenviadas) creadas con la etiqueta `<Dial>` en TwiML omiten el estado _queued_ y pasan directamente a _initiated_, luego a _ringing_ y _in-progress_.
    
- **Initiated (Iniciada):** Twilio ha enviado tu solicitud de llamada a uno de sus socios de _Super Network_.
- **Ringing (Sonando):** Twilio ha recibido una señal de su socio de _Super Network_ indicando que el teléfono de destino está sonando.
- **In-progress (En progreso):** Twilio ha recibido una señal de su socio de _Super Network_ indicando que la llamada ha sido respondida.
- **Completed (Completada):** La llamada ha finalizado.

---

### ¿Cómo solicitar _Status Callbacks_?

Puedes utilizar el parámetro `StatusCallbackEvent` para recibir notificaciones cuando una llamada alcance los estados _initiated_, _ringing_, _answered_ y _completed_.

El parámetro `StatusCallbackEvent` está disponible tanto para llamadas creadas a través de la API REST como para llamadas salientes de TwiML que utilicen `<Dial><Number>`, `<Dial><Sip>` y `<Dial><Client>`.

Para cada evento de progreso de llamada especificado en `StatusCallbackEvent`, Twilio realizará un webhook asíncrono a la URL definida en `StatusCallback`, proporcionando información sobre el estado de la llamada y varios parámetros útiles.

|Evento|Descripción|
|---|---|
|**initiated**|Se activa cuando Twilio saca tu llamada de la cola y comienza a marcar.|
|**ringing**|Se activa cuando la llamada comienza a sonar.|
|**answered**|Se activa cuando alguien responde la llamada.|
|**completed**|Se activa cuando la llamada finaliza, independientemente del motivo (ocupado, cancelado, completado, fallido o sin respuesta). Si no se especifica `StatusCallbackEvent`, este evento se activará por defecto.|

---

