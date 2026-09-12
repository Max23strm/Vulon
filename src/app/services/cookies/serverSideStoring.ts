'use server'
import { getIronSession, IronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

/** Formato: YYYY-MM-DD — usar dayjs().format('YYYY-MM-DD') */
export type DateString = `${number}${number}${number}${number}-${number}${number}-${number}${number}`

export interface SessionData {
    colors?: string[],
    user_id?: string,
    entity_name?: string,
    entity_uid?: string,
}

const isProd = process.env.NODE_ENV === 'production'

const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!, // el ! le dice a TS que no será undefined
    cookieName: 'bo-session',
    cookieOptions: {
        secure: isProd,
        httpOnly: isProd,
        sameSite: 'lax',
    },
}

export async function getSession(): Promise<IronSession<SessionData>> {
    const cookieStore = await cookies()
    return getIronSession<SessionData>(cookieStore, sessionOptions)
}