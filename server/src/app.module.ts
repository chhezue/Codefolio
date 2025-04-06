import { Module, Logger } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '@project/project.module';
import { AlgorithmModule } from '@algorithm/algorithm.module';
import { Project } from '@project/project.entity';
import { Algorithm } from '@algorithm/algorithm.entity';
import { MailModule } from '@mail/mail.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const logger = new Logger('PostgreSQL');

                try {
                    const host = configService.get<string>('POSTGRES_HOST') || 'localhost'; // 기본값 'localhost'
                    const port = parseInt(configService.get<string>('POSTGRES_PORT') || '5432'); // 기본값 '5432'
                    const username = configService.get<string>('POSTGRES_USER') || 'codefolio'; // docker-compose 설정
                    const password = configService.get<string>('POSTGRES_PASSWORD') || 'codefolio'; // docker-compose 설정
                    const database = configService.get<string>('POSTGRES_DB') || 'codefolio'; // docker-compose 설정

                    const uri = `postgres://${username}:${password}@${host}:${port}/${database}`;
                    logger.log('PostgreSQL URI를 성공적으로 불러왔습니다.');

                    return {
                        type: 'postgres',
                        host: host,
                        port: port,
                        username: username,
                        password: password,
                        database: database,
                        synchronize: true, // 개발 환경에서는 true, 운영 환경에서는 false로 설정 권장
                        logging: true,
                        entities: [Project, Algorithm], // 엔티티 클래스 배열을 여기에 추가
                        migrations: [], // 마이그레이션 추가 가능
                        subscribers: [],
                        logger: 'advanced-console',
                        extra: {
                            ssl: process.env.DATABASE_SSL === 'true',
                            connectTimeout: 30000, // 30초
                        },
                        connectionFactory: (connection) => {
                            logger.log('PostgreSQL에 연결 시도 중...');

                            connection.on('connect', () => {
                                logger.log('✅ PostgreSQL이 성공적으로 연결되었습니다!');
                            });

                            connection.on('error', (error) => {
                                logger.error(`❌ PostgreSQL 연결 중 오류가 발생했습니다: ${error.message}`);
                            });

                            connection.on('disconnect', () => {
                                logger.warn('⚠️ PostgreSQL 연결이 끊어졌습니다.');
                            });

                            return connection;
                        },
                    };
                } catch (error) {
                    logger.error(`PostgreSQL URI 가져오기 실패: ${error.message}`);
                    throw error;
                }
            },
        }),
        AlgorithmModule,
        ProjectModule,
        MailModule,
    ],
})
export class AppModule {}