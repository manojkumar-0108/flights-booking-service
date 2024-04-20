
const amqplib = require('amqplib');
const { QUEUE_NAME, RABBITMQ_URL } = require('./server-config');

/**
 * 
 */
let channel, connection;

async function connectQueue() {
    try {

        connection = await amqplib.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME);

    } catch (error) {
        console.log('Queue Error', error);
    }
}

async function sendData(data) {

    try {

        await channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify(data))
        );

    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    connectQueue,
    sendData
}
