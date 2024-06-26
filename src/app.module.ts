import { AuthModule } from './domains/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domains/user/user.module';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { DiaryModule } from './domains/diary/diary.module';
import { SchedulerModule } from './domains/schedule/schedule.module';
import { IotPersonalModule } from './domains/iot_board_personal/iot_board_personal.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
    }),
    //todo: 설정파일 분리
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      timezone: '+09:00',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    AuthModule,
    DiaryModule,
    SchedulerModule, // 스케줄 모듈과 혼동 주의
    IotPersonalModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
