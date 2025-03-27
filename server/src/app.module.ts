import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { GithubModule } from './modules/github/github.module';
import { AlgorithmModule } from './modules/algorithm/algorithm.module';
import { GuestbookModule } from './modules/guestbook/guestbook.module';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const logger = new Logger('MongoDB');
                
                try {
                    const uri = configService.mongoUri;
                    logger.log('MongoDB URI를 성공적으로 불러왔습니다.');
                    
                    return {
                        uri,
                        connectionFactory: (connection) => {
                            logger.log('MongoDB에 연결 시도 중...');
                            
                            connection.on('connected', () => {
                                logger.log('✅ MongoDB가 성공적으로 연결되었습니다!');
                                logger.log(`📊 데이터베이스 URI: ${uri}`);
                            });
                            
                            connection.on('error', (error) => {
                                logger.error(`❌ MongoDB 연결 중 오류가 발생했습니다: ${error.message}`);
                            });

                            connection.on('disconnected', () => {
                                logger.warn('⚠️ MongoDB 연결이 끊어졌습니다.');
                            });
                            
                            return connection;
                        }
                    };
                } catch (error) {
                    logger.error(`MongoDB URI 가져오기 실패: ${error.message}`);
                    throw error;
                }
            },
        }),
        GithubModule,
        AlgorithmModule,
        GuestbookModule,
    ],
})
export class AppModule {}
