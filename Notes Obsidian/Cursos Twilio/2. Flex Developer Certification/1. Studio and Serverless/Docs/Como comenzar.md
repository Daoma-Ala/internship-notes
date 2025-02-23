**Cómo comenzar con Twilio Studio**

Twilio Studio es una herramienta visual que puedes usar para construir aplicaciones de comunicación con poco o ningún código. Esta guía te llevará a través de la información que necesitas y la mecánica que usarás para comenzar a construir con Studio. Una vez que te sientas cómodo con estas mecánicas, estarás listo para comenzar a construir flujos más complejos que combinen múltiples Widgets y Transiciones.

**Glosario**

Aquí tienes algunos de los términos clave de Studio que te ayudarán a comenzar:

| Término       | Definición                                                                 | Ejemplo                                                                                     |
|---------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Flow**      | Los Flujos son flujos de trabajo individuales que creas. Pueden manejar uno o más casos de uso. | Puedes crear un Flujo para manejar llamadas de voz entrantes reproduciendo un mensaje pregrabado. |
| **Widget**    | Los Widgets son elementos individuales que se pueden arrastrar al lienzo del Flujo. Representan piezas de lógica y pueden conectarse entre sí mediante Transiciones. | Puedes usar el Widget **Send Message** para enviar un SMS saliente a un usuario en tu Flujo. |
| **Transition**| Las Transiciones definen cómo un Flujo avanza de un Widget al siguiente en función de condiciones específicas. | Después de realizar una llamada saliente con el Widget **Outgoing Call**, podrías crear una Transición al Widget **Say/Play** para reproducir un mensaje al llamante conectado. |
| **Step**      | Un Paso es el procesamiento en tiempo de ejecución de un Widget, comenzando cuando se ingresa a ese Widget. Las variables se establecen al final de un Paso. | Si estás solicitando una entrada de texto a un usuario, cuando reciben el mensaje SMS entrante, están activamente en un Paso hasta que salen del Widget (envían una respuesta o se agota el tiempo). Si la solicitud está destinada a establecer una variable, esto sucede al final del Paso. |
| **Execution** | Una Ejecución representa el progreso de una persona específica a través de un Flujo. Una Ejecución está activa mientras el usuario está en el Flujo y se considera terminada cuando se detiene o es expulsada del Flujo. | Cuando llamas al número de Twilio conectado a un Flujo, se crea una Ejecución para representar tu llamada a ese número y tu camino a través del Flujo. El propietario del Flujo puede ver esta Ejecución, así como las Ejecuciones de otros usuarios que pasan por el Flujo. |

**Construir con Twilio Studio**

**Crear un Flujo**

El primer paso para usar Studio es crear un Flujo, que representará el flujo de trabajo que deseas construir para tu proyecto.

Para crear un nuevo Flujo:

1. Inicia sesión en tu cuenta de Twilio en la **Consola de Twilio**.
2. Navega a la sección **Studio Flows** en la Consola.
3. Haz clic en **Create new Flow**. Ten en cuenta que si ya has creado un Flujo antes, verás una vista similar a la siguiente. Haz clic en el ícono **+** debajo del encabezado **Flows** para crear un nuevo Flujo.
![[Pasted image 20250204130835.png]]

4. **Nombra tu Flujo**. Puedes darle cualquier nombre que desees. Luego, haz clic en **Next** (Siguiente).

5. Después de haber nombrado tu Flujo, verás una lista de plantillas posibles que puedes usar. Si deseas comenzar con un Flujo vacío, puedes seleccionar la opción **Start from scratch** (Comenzar desde cero). También puedes comenzar con una plantilla preexistente para varios flujos de aplicaciones comunes, como chatbots o menús de [Respuesta de Voz Interactiva (IVR)](https://www.twilio.com/docs/glossary/what-is-ivr), y personalizarlos para tu caso de uso. Una vez que hayas seleccionado tu plantilla, haz clic en **Next** (Siguiente).

Cuando hayas creado el Flujo, verás el **Canvas** (Lienzo) del Flujo. El Canvas es donde construirás el resto de la lógica para el proyecto.

**Crear un Subflujo**

Puedes crear **Subflujos**, que te permiten dividir Flujos grandes y complejos en Flujos más pequeños y vincularlos entre sí. Los casos de uso comunes incluyen la reutilización de funcionalidades comunes, la organización de Flujos complejos en subconjuntos lógicos y la transferencia de Ejecuciones en vivo entre Flujos. Por ejemplo:

- Crear un Subflujo de registro reutilizable para enviar datos (POST) a tus propios sistemas.
- Transferir un Contacto a otro IVR o chatbot independiente.
- Encapsular la recopilación y verificación de la identidad de un Contacto.
- Pasar la preferencia de idioma de un Contacto a un Subflujo para cargar dinámicamente contenido localizado.

[Visita la documentación de **Subflujos**](https://www.twilio.com/docs/studio/subflows) para obtener más información sobre cómo usar Subflujos, trabajar con variables, limitaciones y más.

**Navegar por el Canvas**

El Canvas es donde construirás tu Flujo.

El Canvas a veces puede volverse abarrotado, especialmente en Flujos complejos, por lo que es importante poder controlar el área de enfoque. Puedes usar el mouse para hacer clic y arrastrar para reposicionar el Canvas, y puedes usar los enlaces **Zoom In** (Acercar) y **Zoom Out** (Alejar) en la barra de menú superior (+ y -) para cambiar el zoom. También puedes pellizcar y estirar para hacer zoom si estás usando un trackpad, o presionar + y - en tu teclado para acercar y alejar.


---

**Trabajar con Widgets**

Los Widgets son los bloques de construcción de un Flujo de Studio. Te permiten manejar acciones entrantes y responder en consecuencia realizando tareas como enviar un mensaje, hacer una llamada telefónica, dirigir al usuario a otra parte del Flujo, capturar información y más.

Cada nuevo Canvas tiene un **Widget de Trigger** (Activador), que usarás para indicar cómo debe comenzar el Flujo. Luego, puedes agregar otros Widgets al Canvas para construir el resto de la lógica de tu proyecto.

**Widget de Trigger**

Hay cuatro formas de activar el inicio de un Flujo:

1. **Mensaje entrante**  
2. **Llamada entrante**  
3. **API REST**  
4. **Subflujo**  

Estos cuatro aparecen en el Widget de **Trigger**. Puedes comenzar tu Flujo con cualquier número de estos Activadores. Por ejemplo, podrías diseñar tu Flujo para proporcionar información a los usuarios que envían mensajes de texto y llaman. En este escenario, tu Flujo podría activarse tanto por una **Llamada entrante** como por un **Mensaje entrante**. Tu Flujo podría responder a un **Mensaje entrante** con un Widget **Send Message** que envía información de vuelta al usuario por texto, y podría responder a una **Llamada entrante** con un Widget **Say/Play** que lee el mensaje al llamante. Puedes diseñar tu Flujo para responder a cualquier número de los Activadores posibles.

**Biblioteca de Widgets y Panel de Inspección**

El panel de la **Biblioteca de Widgets** se encuentra en el lado derecho del Canvas e incluye Widgets que puedes arrastrar y soltar en el Canvas.

---
https://www.twilio.com/docs/studio/user-guide/get-started