import { Routes } from '../../router/routes';
import { ReactComponent as ProfileIcon } from '../../assets/images/icons/profile.svg';
import { ReactComponent as DocumentIcon } from '../../assets/images/icons/document.svg';
import { ReactComponent as DashboardIcon } from '../../assets/images/icons/dashboard.svg';
import { ReactComponent as ParsingIcon } from '../../assets/images/icons/parsing.svg';
import { ReactComponent as MailingIcon } from '../../assets/images/icons/mailing.svg';
import { ReactComponent as InvitingIcon } from '../../assets/images/icons/inviting.svg';
import { ReactComponent as BaseIcon } from '../../assets/images/icons/base.svg';
import { ReactComponent as ReportIcon } from '../../assets/images/icons/report.svg';
import { ReactComponent as FinanceIcon } from '../../assets/images/icons/finance.svg';
import { ReactComponent as TariffIcon } from '../../assets/images/icons/tariffs.svg';

import { ReactComponent as UsersIcon } from '../../assets/images/icons/users-icon.svg';
import { ReactComponent as BotIcon } from '../../assets/images/icons/bot-icon.svg';
import { ReactComponent as CoinsIcon } from '../../assets/images/icons/coins-icon.svg';
import { ReactElement } from 'react';

export enum MenuCategory {
  Profile = 'profile',
  Navbar = 'navbar',
}

export interface MenuItem {
  position: number;
  text: string;
  link: Routes;
  icon?: ReactElement;
  menuCategory: MenuCategory;
  disabled?: boolean;
}

export const NAV_ITEMS: MenuItem[] = [
  {
    position: 0,
    text: 'Профиль',
    link: Routes.Profile,
    icon: <ProfileIcon />,
    menuCategory: MenuCategory.Profile,
  },
  {
    position: 1,
    text: 'Документы',
    link: Routes.Documents,
    icon: <DocumentIcon />,
    menuCategory: MenuCategory.Profile,
    disabled: true,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    position: 0,
    text: 'Дашборд',
    link: Routes.Dashboard,
    icon: <DashboardIcon />,
    menuCategory: MenuCategory.Navbar,
  },
  {
    position: 1,
    text: 'Парсинг',
    link: Routes.Parsers,
    icon: <ParsingIcon />,
    menuCategory: MenuCategory.Navbar,
  },
  {
    position: 2,
    text: 'Рассылка',
    link: Routes.Mailing,
    icon: <MailingIcon />,
    menuCategory: MenuCategory.Navbar,
    disabled: true,
  },
  {
    position: 3,
    text: 'Инвайтинг',
    link: Routes.Inviting,
    icon: <InvitingIcon />,
    menuCategory: MenuCategory.Navbar,
    disabled: true,
  },
  {
    position: 4,
    text: 'Базы',
    link: Routes.Base,
    icon: <BaseIcon />,
    menuCategory: MenuCategory.Navbar,
    disabled: true,
  },
  {
    position: 5,
    text: 'Отчеты',
    link: Routes.Reports,
    icon: <ReportIcon />,
    menuCategory: MenuCategory.Navbar,
    disabled: true,
  },
  {
    position: 6,
    text: 'Финансы',
    link: Routes.Finance,
    icon: <FinanceIcon />,
    menuCategory: MenuCategory.Navbar,
    disabled: true,
  },
  {
    position: 7,
    text: 'Тарифы',
    link: Routes.Tariffs,
    icon: <TariffIcon />,
    menuCategory: MenuCategory.Navbar,
  },
];

export const ADMIN_NAV_ITEMS: MenuItem[] = [
  {
    position: 0,
    text: 'Профиль',
    link: Routes.AdminProfile,
    icon: <ProfileIcon />,
    menuCategory: MenuCategory.Profile,
  },
  {
    position: 1,
    text: 'Документы',
    link: Routes.AdminDocuments,
    icon: <DocumentIcon />,
    menuCategory: MenuCategory.Profile,
    disabled: true,
  },
];

export const ADMIN_ITEMS: MenuItem[] = [
  {
    position: 0,
    text: 'Пользователи',
    link: Routes.AdminUsers,
    icon: <UsersIcon />,
    menuCategory: MenuCategory.Navbar,
  },
  {
    position: 1,
    text: 'Боты',
    link: Routes.AdminBots,
    icon: <BotIcon />,
    menuCategory: MenuCategory.Navbar,
  },
  {
    position: 2,
    text: 'Тарифы',
    link: Routes.AdminTariff,
    icon: <TariffIcon />,
    menuCategory: MenuCategory.Navbar,
  },
  {
    position: 3,
    text: 'Финансы',
    link: Routes.AdminFinance,
    icon: <CoinsIcon />,
    menuCategory: MenuCategory.Navbar,
  },
];
