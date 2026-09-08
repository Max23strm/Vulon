"use client";

import { Avatar, Menu, MenuDropdown, MenuTarget, Skeleton } from '@mantine/core'
import Link from 'next/link'
import { UserCircle, Logout } from "@mynaui/icons-react";
import { usePathname, useRouter } from 'next/navigation'
import { useAppState } from '@/app/providers/StateProvider'

const UserAvatar = () => {
    const user = useAppState((state) => state.user)
    const logout = useAppState((state) => state.logout)
    const router = useRouter()
    const path = usePathname()

    console.log(path)

    const logoutFn = () => {
        logout()
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push('/login')
    }

    if (!user?.user_uid) {
        return <Skeleton height={37} circle />
    }

    return (
        <Menu>
            <MenuTarget>
                <Avatar
                    color='grape'
                    name={user.email}
                    alt={user.email}
                    variant='light'
                />
            </MenuTarget>
            <MenuDropdown>
                <Menu.Label>{user.email}</Menu.Label>
                <Menu.Item
                    component={Link}
                    disabled={path === '/entity-selector'}
                    href={'/dashboard/my-account'}
                    leftSection={<UserCircle />}
                >
                    Mi cuenta
                </Menu.Item>
                <Menu.Item onClick={logoutFn} leftSection={<Logout />}>
                    Cerrar sesión
                </Menu.Item>
            </MenuDropdown>
        </Menu>
    );
}

export default UserAvatar
