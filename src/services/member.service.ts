import { DeepPartial } from "typeorm";
import { Member } from "../entities/member.entity"
import { AppDataSource } from "../utils/data-source";
import { CreateMemberInput } from "../schemas/member.schema";

const memberRepository = AppDataSource.getRepository(Member);

export const createMember = async (input: CreateMemberInput) => {
  return (await AppDataSource.manager.save(AppDataSource.manager.create(Member, input))) as Member
}

export const findMemberByNationalId = async ({ nationalId }: { nationalId: string }) => {
  return await memberRepository.findOneBy({ nationalId });
};

export const findMemberById = async (memberId: string) => {
  return await memberRepository.findOneBy({ id: memberId });
};

export const findMember = async (query: Object) => {
  return await memberRepository.findOneBy(query);
};

