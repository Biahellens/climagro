import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Command } from "./Command";

@Entity({ name: 'device' })
export class Device {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Command, command => command.device)
    listCommands: Command[];
}
