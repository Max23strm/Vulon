export interface RootState {
    user: UserSlice
    entity: EntitySlice
    setUser: (user: UserSlice) => void
    setEntity: (entity: EntitySlice) => void
    logout: () => void
}

export interface UserSlice {
    user_uid: string
    email: string
    username: string
    first_name: string
    last_name: string
}

export interface EntitySlice {
    entity_uid:    string;
    name:          string;
    logo:          string;
    short_name:    string;
    country_code:  string;
    currency_code: string;
    colors:        string[];
}
