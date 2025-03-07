import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { Project } from '../project/entity/project.entity';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(user: User, project: Project): Promise<Member> {
    const member = this.memberRepository.create({ user, project });
    return this.memberRepository.save(member);
  }

  async get(userId: number, projectId: number): Promise<Member> {
    const member = await this.memberRepository.findOne({
      relations: { user: true, project: true },
      where: { user: { id: userId }, project: { id: projectId } },
    });
    if (!member) {
      throw new NotFoundException(
        `Could not find member with user.id=${userId} and project.id=${projectId}`,
      );
    }
    return member;
  }
}
