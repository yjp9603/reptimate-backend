import { Schedule } from './../entities/schedule.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleListDto {
  @ApiProperty({
    description: '스케줄 인덱스',
    default: 1,
  })
  idx: number;

  @ApiProperty({
    description: '스케줄 제목',
    default: '스케줄 제목',
  })
  title: string;

  @ApiProperty({
    description: '스케줄 내용',
    default: '스케줄 내용',
  })
  memo: string;

  @ApiProperty({
    description: '알림 시간',
    default: '18:00',
  })
  alarmTime: Date;

  @ApiProperty({
    description: '알림 반복 요일',
    default: [0, 0, 0, 0, 0, 0, 0],
  })
  repeat: string[];

  constructor(schedule: Schedule) {
    let repeat = [];
    if (schedule.repeat) {
      repeat = JSON.parse(schedule.repeat);
    }

    this.idx = schedule.idx;
    this.title = schedule.title;
    this.memo = schedule.memo;
    this.alarmTime = schedule.alarmTime;
    this.repeat = repeat;
  }
}