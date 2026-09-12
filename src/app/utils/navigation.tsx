import { UsersGroup, FolderKanban, FolderTwo, Home } from "@mynaui/icons-react";
import { JSX } from "react/jsx-runtime";
export type NavElement = {
    name: string,
    href: string,
    icon?: JSX.Element,
    children?:NavElement[]
}

export const navElements: NavElement[] = [
    {
        name: "home",
        href: "/dashboard/home",
        children: [],
    },
    {
        name: "teams",
        href: "/dashboard/teams",
        children: [{ name: "all", href: "/dashboard/teams", icon: <UsersGroup size={16} stroke={1.5} />, }],
    },
    {
        name: "players",
        href: "/dashboard/players",
        children: [{ name: "all", href: "/dashboard/players", icon: <UsersGroup size={16} stroke={1.5} />, }],
    },
    {
        name: "admin",
        href: "/dashboard/administration",
        children: [
        { name: "income", href: "/dashboard/administration/payments", icon: <FolderTwo size={16} stroke={1.5} />, },
        { name: "expenses", href: "/dashboard/administration/expenses", icon: <FolderTwo size={16} stroke={1.5} />, },
        // { name: 'credentials', href: '/dashboard/administration/credentials' }
        ],
    },
    {
        name: "organization",
        href: "/dashboard/organization",
        children: [
        { name: "events", href: "/dashboard/organization/events", icon: <FolderKanban size={16} stroke={1.5} />, },
        // { name: "Partidos", href: '/dashboard/organization/matches' },
        // { name: "Entrenamientos", href: '/dashboard/organization/trainings' }
        ],
    },
];

export const defineActive = (linkString: string, pathname: string) => {
    if (linkString === "/" && pathname === linkString) return true;
    if (linkString !== "/" && pathname.includes(linkString)) return true;

    return false;
};