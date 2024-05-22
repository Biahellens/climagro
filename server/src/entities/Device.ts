import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

class Command {
    id: number;
    userId: number;
    name: string;
    url: string;
}

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("simple-json")
    listCommands: Command[];
}
