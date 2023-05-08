import BaseEntity from 'src/core/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { IsType } from './enums';

@Entity()
export class IotNatureRecord extends BaseEntity {
  @Column({
    nullable: false,
    //length: 11,
  })
  boardIdx: number;

  @Column()
  currentTemp: string;

  @Column()
  currentHumid: string;

  @Column()
  currentTemp2: string;

  @Column()
  currentHumid2: string;

  @Column({ type: 'enum', name: 'type', enum: IsType })
  type: number; //1. auto, 2. passive
}