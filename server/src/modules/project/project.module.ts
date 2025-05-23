import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectController } from "@project/project.controller";
import { ProjectService } from "@project/project.service";
import { Project } from "@project/project.entity";
import { MulterModule } from "@nestjs/platform-express";
import { projectMulterOptions } from "@config/multer.config";
import { AuthModule } from "@auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    MulterModule.register(projectMulterOptions),
    AuthModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
