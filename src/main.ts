import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { queues } from './submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ["amqps://uulucdbz:n6vg2Oub_EdrHrYY9rtP2bwfh5CkDAj2@shark.rmq.cloudamqp.com/uulucdbz"],
      queue: queues.CONTENT_SERVICE_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  
  await app.startAllMicroservices();
  
  await app.listen(5000);
}
bootstrap();
