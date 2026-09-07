import "server-only";
import { getUser } from "@/helpers/dataFetcher";
import { entityInitialState } from "@/app/store/slices/entity";
import type { UserSlice, EntitySlice } from "@/interfaces/globalState";

export interface InitialSessionState {
    user?: UserSlice;
    entity?: EntitySlice;
}

// TODO: implementar lectura de entity desde sesión
export const getServerSession = async (): Promise<InitialSessionState | undefined> => {
    try {
        const response = await getUser();
        if (response.isSuccess && response.data) {
            return {
                user: {
                    user_uid: response.data.user_uid,
                    email: response.data.email,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                },
                entity: entityInitialState,
            };
        }
    } catch {
        // Sin sesión válida → defaults
    }
    return undefined;
};
