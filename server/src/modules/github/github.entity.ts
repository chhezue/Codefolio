import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique(['github_id'])
export class Github {
    @PrimaryGeneratedColumn()
    id: number; // 내부 식별자

    @Column("bigint", { unique: true })
    github_id: string; // github 리포지토리 ID

    @Column("text")
    name: string; // 리포지토리 이름

    @Column("text")
    url: string; // 리포지토리 URL

    @Column("text", { nullable: true })
    description: string; // 리포지토리 설명

    @Column("int", { default: 0 })
    stars: number; // 스타 개수

    @Column("int", { default: 0 })
    forks: number; // 포크 개수

    @Column("timestamp")
    last_updated: Date; // 마지막 업데이트 날짜
}