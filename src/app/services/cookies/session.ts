'use server'

import { getSession, SessionData } from "./serverSideStoring"

export async function saveSession(data: any) {
    const session = await getSession()
    Object.assign(session, data)
    await session.save()
}

export const logoutSession = async () => {
    const session = await getSession()
    session.destroy()
}

export const deleteValueFromSession = async (  keyArray: (keyof SessionData)[] = [] ) => {
  if (keyArray.length === 0) return;
  const session = await getSession();

  keyArray.forEach((key) => delete session[key] );

  await session.save();
};