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
  description: string; // 프로젝트에 대한 상세 설명 (긴 텍스트)

  @Column()
  role: string; // 프로젝트에서 맡은 역할

  @Column({ type: "date" })
  periodStart: Date; // 프로젝트 시작 날짜

  @Column({ type: "date" })
  periodEnd: Date; // 프로젝트 종료 날짜

  @Column("text", { array: true })
  stack: string[]; // 프로젝트에 사용된 기술 스택 배열 (예: ["React", "Node.js", "MongoDB", "AWS"])

  @Column({ default: false })
  pin: boolean; // 프로젝트 고정 여부 (중요 프로젝트 표시)

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
    imageUrl?: string; // 기능 관련 이미지 URL (선택사항)
  }[];

  /**
   * 프로젝트 개발 중 마주친 기술적 도전과 해결 과정
   * 각 항목은 제목과 상세 설명을 포함합니다.
   */
  @Column({ type: "jsonb" })
  techChallenges: {
    title: string; // 기술적 도전 제목
    description: string; // 도전 내용과 해결 방법
  }[];

  /**
   * 프로젝트 스크린샷 정보
   * 구현된 화면의 이미지와 설명을 포함합니다.
   */
  @Column({ type: "jsonb" })
  screenshots: {
    imageUrl: string; // 스크린샷 이미지 URL
    description?: string; // 스크린샷 설명 (선택사항)
  }[];

  /**
   * 프로젝트 관련 문서 정보
   * GitHub 저장소, 기술 문서, 통계 정보 등의 링크를 포함합니다.
   */
  @Column({ type: "jsonb" })
  documents: {
    type: "GITHUB" | "DOC" | "STATS"; // 문서 유형
    title: string; // 문서 제목
    icon?: string; // 문서 아이콘 (선택사항)
    link: string; // 문서 링크 URL
  }[];
}
