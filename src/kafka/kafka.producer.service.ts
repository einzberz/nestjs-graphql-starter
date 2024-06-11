import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, logLevel, Message, Producer, ProducerRecord } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

interface IKafkaProduceApp<T> {
  topic: string;
  dataArray: Array<T>;
  headerAppKey?: string;
  headerServiceKey?: string;
}

interface IKafkaProduceService<T> {
  topic: string;
  dataArray: Array<IKafkaProduceServiceData<T>>;
}

interface IKafkaProduceServiceData<T> {
  data: T;
  headerServiceKey: string;
}

@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  private kafka: Kafka;
  private producer: Producer;
  private envLogLevel: number = logLevel.WARN;

  constructor(private configService: ConfigService) {
    const kafkaBroker = this.configService.get<string>('KAFKA_BROKERS');
    if (!kafkaBroker) throw Error('Gumon Profile: KAFKA_BROKERS is required');
    const kafkaBrokers = kafkaBroker.split(',');
    this.envLogLevel =
      configService.get<number>('KAFKA_LOG_LEVEL') || logLevel.WARN;

    this.kafka = new Kafka({
      logLevel: this.envLogLevel,
      brokers: kafkaBrokers,
    });

    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    return await this.producer.send(record);
  }

  async sendToTopic(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async produceApp<T>({
    dataArray,
    topic,
    headerAppKey = '',
    headerServiceKey = '',
  }: IKafkaProduceApp<T>) {
    const messages: Message[] = [];
    if (!topic) throw Error('topic is required');

    for (const data of dataArray) {
      const value = JSON.stringify(data);
      messages.push({
        value: value,
        headers: {
          appKey: headerAppKey,
          serviceKey: headerServiceKey,
        },
      });
    }

    if (messages.length > 0 && topic) {
      return await this.producer.send({
        topic: topic,
        messages: messages,
      });
    }
    return false;
  }

  async produceService<T>({ dataArray, topic }: IKafkaProduceService<T>) {
    const messages: Message[] = [];
    if (!topic) throw Error('topic is required');

    for (const data of dataArray) {
      const value = JSON.stringify(data.data);
      messages.push({
        value: value,
        headers: {
          serviceKey: data.headerServiceKey,
        },
      });
    }

    if (messages.length > 0 && topic) {
      return await this.producer.send({
        topic: topic,
        messages: messages,
      });
    }
    return false;
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async OnBeforeUnloadEventHandlerNonNull() {
    await this.producer.disconnect();
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
