import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../../pages/appointment/appointment.entity';

@Entity({ name: 'Specie' })
export class Specie {
  @PrimaryGeneratedColumn()
  ID_specie!: number;

  @Column({ type: 'varchar', length: 150 })
  specie!: string;

  @OneToMany(() => Appointment, (appointment) => appointment.specie)
  appointments!: Appointment[];

  @Column({type: "boolean", default: true})
  inUse!: boolean;
}