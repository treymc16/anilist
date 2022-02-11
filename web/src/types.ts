export type User = {
    username: string;
};

export type Error = {
    field: string;
    message: string;
};

export type UserResponse = {
    user?: User;
    errors?: Error[];
};

export type Show = {
    id: number;
    title: string;
    num_eps: string;
    times_added: number;
    times_rated: number;
    avg_score: number;
    url_title: string;
    description: string;
};

export type UserShowInfo = {
    watched: number;
    rating: number;
};

export type ShowPageInfo = {
    inList: boolean;
    show: Show;
    userShowInfo?: UserShowInfo;
};

export type ListInfo = {
    id: number;
    title: string;
    rating: number;
    watched: number;
    num_eps: number;
    url_title: string;
};
