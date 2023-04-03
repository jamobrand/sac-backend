import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import Model from "./model.entity";
import { Member } from "./member.entity";

@Entity("members")
export class Account extends Model {
  @Column()
  balance: number;

  @ManyToOne(() => Member, (member) => member.accounts)
  member: Member;
}