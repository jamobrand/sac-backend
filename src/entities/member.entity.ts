import { Column, Entity, OneToMany } from "typeorm"
import Model from "./model.entity";
import { Account } from "./account.entity";

@Entity()
export class Member extends Model {
  @Column()
  firstName: string;
  
  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  nationalId: string;
}