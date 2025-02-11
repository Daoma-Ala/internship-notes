exports.handler = function (context, event, callback) {
    const twiml = new Twilio.twiml.MessagingResponse();

    const incomingMessage = event.Body.trim().toLowerCase();

    if (incomingMessage === 'hola' || incomingMessage.includes('buenos días') || incomingMessage.includes('buenas tardes')) {
        const message = twiml.message();
        message.body('¡Hola! Bienvenido a Botas Jusano 👢 ¿En qué podemos ayudarte?\n\nResponde con:\n1️⃣ Para comunicarse con un vendedor\n2️⃣ Para conocer nuestros servicios\n3️⃣ Para saber el horario de atención\n4️⃣ ¿Quiénes somos?');
        message.media('https://auto-wsp-7638-dev.twil.io/botas.jpg');
    }
    else if (incomingMessage === '1') {
        twiml.message('🏷️ En estos momentos estamos vinculando un vendedor\nEspere por favor. ');
    }
    else if (incomingMessage === '2') {
        twiml.message('Ofrecemos los siguientes servicios:\n- 👞 Venta de botas\n- 🛠️ Reparación de calzado\n- 🏷️ Personalización de botas\n\nResponde "1" para hablar con un vendedor');
    }
    else if (incomingMessage === '3') {
        twiml.message('👋 Nuestro horario es de lunes a viernes de 9:00 AM a 6:00 PM, y sábados de 9:00 AM a 2:00 PM.\nCd.Obregón sonora 🌵🇲🇽\n🗺️ https://maps.app.goo.gl/h2x6a6utqxPiWoti8');
    }
    else if (incomingMessage === '4'){
        const message = twiml.message();
        message.body('"Botas Jusaino donde la artesanía y el estilo se unen en botas de excelencia ✅"\n\nRedes Sociales 👇\n\nhttps://www.facebook.com/botasjusaino.19\nhttps://www.instagram.com/botas.jusaino/');
        message.media('https://auto-wsp-7638-dev.twil.io/pers.jpg');
    }
    else {
        twiml.message('👀 No entendí tu mensaje. Responde con "hola" para comenzar nuevamente o elige una opción válida.');
    }

    return callback(null, twiml);
};
