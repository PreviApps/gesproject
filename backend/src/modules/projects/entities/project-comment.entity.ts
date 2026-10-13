import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('project_comments')
export class ProjectComment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id' })
  projectId!: string;

  @ManyToOne(() => Project, (project) => project.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Column({ name: 'user_name' })
  userName!: string;

  @Column('text', { name: 'content' })
  content!: string;

  @Column({ name: 'type', default: 'COMENTARIO' })
  type!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}