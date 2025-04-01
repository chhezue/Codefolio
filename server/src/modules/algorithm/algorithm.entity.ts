import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Algorithm {
    @PrimaryGeneratedColumn()
    id: number; // 내부 식별자

    @Column("text")
    title: string;

    @Column("text")
    description: string;

    @Column("text")
    template_code: string;

    @Column("text")
    language: string;

    @CreateDateColumn()
    created_at: Date;
}