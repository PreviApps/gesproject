import { Project } from 'src/modules/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('project_comments')
export class ProjectComment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => Project, (project) => project.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @Column('text')
  content!: string;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Column({ name: 'user_name' })
  userName!: string;

  @Column({ default: 'COMENTARIO' })
  type!: string; // Ejemplo: 'COMENTARIO', 'BLOQUEO', 'AVANCE', etc.

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}