import { Column, Entity, ManyToOne } from "typeorm";
import { Show } from "./Show";
import { User } from "./User";

@Entity()
export class UserShow {
    @ManyToOne(() => User, (user) => user.userShows, { primary: true })
    public user!: User;

    @ManyToOne(() => Show, (show) => show.userShows, { primary: true })
    public show!: Show;

    @Column()
    public rating: number;

    @Column()
    public watched: number;
}
