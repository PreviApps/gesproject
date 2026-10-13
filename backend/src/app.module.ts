import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/project.module';
import { AreasModule } from './modules/areas/areas.module';
import { SessionFeedbacksModule } from './modules/session-feedbacks/session-feedbacks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // ¡Ojo! En producción pon esto en false para evitar pérdida de datos
        ssl: {
          rejectUnauthorized: false, // Necesario si tu base de datos viene de Supabase o cloud externa con SSL
        },
      }),
    }),
    ProjectsModule,
    AreasModule,
    SessionFeedbacksModule
  ],
})
export class AppModule {}