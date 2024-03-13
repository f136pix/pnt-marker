export type IUser = {
    id: number;
    email: string;
    name: string;
    companyId: number;
    profileUrl: string;
    role: number;
};

export type ICompany = {
    id: number,
    email: string,
    name: string,
    phone: string,
    logo?: null | string,
    users?: IUser[]
}

export type ITimes = {
    id: string,
    userId: string,
    entryTime?: string,
    exitTime?: string,
    launchTime?: string;
}

