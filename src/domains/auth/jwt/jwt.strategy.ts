import { UserRepository } from '../../user/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더로부터 토큰 추출하는 함수. Bearer 타입 사용
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jsonWebTokenOptions: {
        subject: 'userInfo',
        issuer: 'reptimate.store',
      },
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      where: {
        idx: payload.userIdx,
      },
    });
    return user;
  }

  // private printRequestLogs(userIdx: number, req: Request, user: User) {
  //   let logMessageContent: any = {
  //     userInfo: user,
  //     userToken: req.headers['authorization'],
  //   };

  //   if (Object.keys(req.query).length) {
  //     logMessageContent = {
  //       ...logMessageContent,
  //       type: 'requestQuery',
  //       query: JSON.stringify(req.query),
  //     };
  //   }

  //   if (Object.keys(req.body).length) {
  //     logMessageContent = {
  //       ...logMessageContent,
  //       type: 'requestBody',
  //       body: JSON.stringify(req.body),
  //     };
  //   }
  //   httpContext.set('userIdx', user.idx);

  //   logger.info(logMessageContent);
  // }
}
