import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Area } from '../../areas/entities/area.entity';
import { ProjectComment } from './project-comment.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nombre!: string;

  @Column('text')
  descripcion!: string;

  @Column('text', { nullable: true })
  observacion?: string; // Opcional porque puede ser null en la BD

  @Column()
  estado!: string;

  @Column()
  prioridad!: string;

  @Column({ name: 'area_id', nullable: true })
  areaId?: string;

  @ManyToOne(() => Area, (area) => area.projects, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'area_id' })
  area?: Area; // Opcional por si no tiene área asignada

  @Column()
  lider!: string;

  @Column('text', { array: true, default: [] })
  integrantes!: string[];

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  servidor?: string;

  @Column()
  tipo!: string;

  @Column({ name: 'semanas_estimadas', nullable: true })
  semanasEstimadas?: number;

  @Column({ name: 'fecha_entrega', type: 'date', nullable: true })
  fechaEntrega?: string;

  @Column({ name: 'pct_levantamiento', default: 0 })
  pctLevantamiento!: number;

  @Column({ name: 'pct_progreso', default: 0 })
  pctProgreso!: number;

  @Column({ name: 'pct_implementacion', default: 0 })
  pctImplementacion!: number;

  @OneToMany(() => ProjectComment, (comment) => comment.project, { cascade: true })
  comments?: ProjectComment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}