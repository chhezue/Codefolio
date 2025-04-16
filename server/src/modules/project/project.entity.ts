import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({type: "text"})
    description: string;

    @Column()
    role: string;

    @Column({type: "date"})
    periodStart: Date;

    @Column({type: "date"})
    periodEnd: Date;

    @Column("text", {array: true})
    stack: string[]; // 예: ["React", "Node.js", "MongoDB", "AWS"]

    @Column({default: false})
    pin: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // 주요 기능들
    @Column({type: "jsonb"})
    features: {
        title: string;
        description: string;
        imageUrl?: string;
    }[];

    // 기술적 도전과 해결 과정
    @Column({type: "jsonb"})
    techChallenges: {
        title: string;
        description: string;
    }[];

    // 실제 구현 화면
    @Column({type: "jsonb"})
    screenshots: {
        imageUrl: string;
        description?: string;
    }[];

    // 프로젝트 문서 (GitHub, 기술 문서, 통계 등)
    @Column({ type: 'jsonb' })
    documents: {
        type: 'GITHUB' | 'DOC' | 'STATS';
        title: string;
        icon?: string;
        link: string;
    }[];
}
