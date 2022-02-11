import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity,
} from "typeorm";
import { UserShow } from "./UserShow";

@Entity()
export class Show extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    num_eps!: number;

    @Column({ default: 0 })
    times_added: number;

    @Column({ default: 0 })
    times_rated: number;

    @Column({ default: 0 })
    total_score: number;

    @Column({ default: 0 })
    avg_score: number;

    @Column()
    url_title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => UserShow, (userShow) => userShow.show)
    public userShows!: UserShow[];
}
