import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { Content } from './submodules/backend-refresher-1.0-entities/src/entities/content.entity';
import { User } from './submodules/backend-refresher-1.0-entities/src/entities/user.entity';
import { queues } from './submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';
import { MsgBrokerOpsService } from './submodules/backend-refresher-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'new-assessment-staging.csdmg3kugxsm.ap-south-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'Refactor123456',
      database: 'backend-socialmedia',
      entities: [ User, Content ],
      synchronize: true,
      logging: true
    }),
    ClientsModule.register([
      {
        name:'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ["amqps://uulucdbz:n6vg2Oub_EdrHrYY9rtP2bwfh5CkDAj2@shark.rmq.cloudamqp.com/uulucdbz"],
          queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          }
        
        },
      },
    ]),
    ContentModule
  ],
  controllers: [AppController],
  providers: [AppService,MsgBrokerOpsService],
})
export class AppModule {}
