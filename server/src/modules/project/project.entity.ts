import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * 프로젝트 정보를 저장하는 엔티티
 * 프로젝트의 상세 정보와 관련 데이터를 데이터베이스에 저장합니다.
 */
@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string; // 프로젝트의 고유 식별자 (UUID)

  @Column()
  title: string; // 프로젝트 제목

  @Column({ type: "text" })
  summary: string; // 프로젝트 요약 설명

  @Column()
  githubUrl: string; // GitHub URL

  @Column({ type: "text", nullable: true })
  endDate: string; // 프로젝트 종료 날짜

  @Column({ type: "text", nullable: true })
  period: string; // 형식화된 기간 표시

  @Column()
  role: string; // 프로젝트에서 맡은 역할

  @Column("text", { array: true })
  technologies: string[]; // 사용된 기술 스택 배열

  @Column({ type: "boolean", default: false })
  pin: boolean; // 프로젝트 고정 여부

  @CreateDateColumn()
  createdAt: Date; // 프로젝트 데이터 생성 시간

  @UpdateDateColumn()
  updatedAt: Date; // 프로젝트 데이터 마지막 업데이트 시간

  /**
   * 프로젝트의 주요 기능들
   * 각 기능은 제목, 설명, 선택적 이미지 URL을 포함합니다.
   */
  @Column({ type: "jsonb" })
  features: {
    title: string; // 기능 제목
    description: string; // 기능 설명
    imageAlt?: string; // 이미지 대체 텍스트
    imageUrl?: string; // 기능 관련 이미지 URL
  }[];

  /**
   * 프로젝트 개발 중 마주친 도전 과제
   * 각 항목은 제목과 상세 설명을 포함합니다.
   */
  @Column({ type: "jsonb" })
  challenges: {
    number: number; // 도전 과제 번호
    title: string; // 도전 과제 제목
    description: string; // 도전 과제 내용
  }[];

  /**
   * 프로젝트 스크린샷 정보
   * 구현된 화면의 이미지와 설명을 포함합니다.
   */
  @Column({ type: "jsonb" })
  screenshots: {
    imageAlt?: string; // 이미지 대체 텍스트
    description?: string; // 스크린샷 설명
    imageUrl?: string; // 스크린샷 이미지 URL
  }[];
}
