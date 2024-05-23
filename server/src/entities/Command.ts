import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Device } from "./Device";
import { User } from "./User";

@Entity({ name: 'command' })
export class Command {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(() => Device, device => device.listCommands)
    device: Device;

    @ManyToOne(() => User, user => user.commands)
    user: User;
}
