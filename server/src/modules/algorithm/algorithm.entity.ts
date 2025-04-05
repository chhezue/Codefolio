import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { DifficultyLevel } from "./common/difficulty-level.enum";

@Entity()
export class Algorithm {
    @PrimaryGeneratedColumn()
    id: number; // 내부 식별자

    @Column("text")
    title: string; // 글 제목

    @Column("text")
    content: string; // 글 내용

    @Column({ type: "enum", enum: DifficultyLevel })
    difficulty: DifficultyLevel; // 난이도

    @Column("text")
    language: string; // 사용 언어

    @Column("text", { array: true })
    tags: string[]; // 문제 태그

    @CreateDateColumn()
    created_at: Date; // 생성 시각

    @UpdateDateColumn()
    updated_at: Date; // 수정 시각
}
