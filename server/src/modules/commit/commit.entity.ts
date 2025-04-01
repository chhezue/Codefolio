import {Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne} from "typeorm";
import {Github} from "@github/github.entity";

@Entity()
@Unique(['commit_hash'])
export class Commit {
    @PrimaryGeneratedColumn()
    id: number; // 내부 식별자

    @ManyToOne(() => Github, (github) => github.id, {onDelete: "CASCADE"})
    github_id: string; // github 리포지토리 ID

    @Column("text", { unique: true })
    commit_hash: string; // 커밋 해시 값

    @Column("text")
    message: string; // 커밋 메세지

    @Column("timestamp")
    timestamp: Date; // 커밋 시간

    @Column("text")
    author: string; // 커밋 작성자
}