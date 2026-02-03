import { ECourseStatus } from "@packages/definitions";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "./course";
import { Chapter } from "./chapter";
import { Lesson } from "./lesson";

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @ManyToOne(() => Course, (course) => course.modules)
  @JoinColumn({ name: "courseId" })
  course: Course;

  @Column({ type: "int" })
  position: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  iconName: string;

  @Column({
    type: "enum",
    enum: ECourseStatus,
    default: ECourseStatus.DRAFT,
  })
  status: ECourseStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters: Chapter[];

  @OneToMany(() => Lesson, (lesson) => lesson.chapter)
  lessons: Chapter[];
}
