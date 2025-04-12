import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column("text")
    title: string; // 포스트 제목

    @Column("text")
    summary: string; // 포스트 상단 설명

    @Column("text")
    githubUrl: string; // 깃허브 링크

    @Column("text")
    period: string; // 개발 기간

    @Column("text")
    role: string; // 역할

    @Column("text", { array: true })
    technologies: string[]; // 기술 스택

    @Column("boolean", { default: false })
    pin: boolean; // 메인 페이지에 고정할지 여부

    // 주요 기능 & 구현 화면
    @Column("jsonb")
    features: {
        title?: string | null;
        description?: string | null;
        imageUrl: string;
        imageAlt: string;
    }[];

    // 도전 과제
    @Column("jsonb")
    challenges: {
        number: number;
        title: string;
        description: string;
    }[];
}
