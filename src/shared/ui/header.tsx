import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

type Props = {
	className?: string;
};

export const Header = ({ className }: Props) => {
	const router = useRouter();

	return (
		<header className={clsx('navbar bg-blue-900', className)}>
			<div className="container mx-auto px-4">
				<div className="navbar-start flex items-center">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 bg-blue-900 rounded-box w-52"
						>
							{headerItems.map((item, index) => (
								<li key={index}>
									<Link href={item.link}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<Link
						href={'/'}
						className="btn btn-ghost normal-case text-lg md:text-xl"
					>
						pom-pom.pro
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						{headerItems.map((item, index) => (
							<li key={index}>
								<Link
									className={clsx(
										item.link === router.pathname && 'bg-blue-950/60'
									)}
									href={item.link}
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	);
};

const headerItems = [
	{
		title: 'Персонажи',
		link: '/characters',
	},
	// {
	// 	title: 'Тир-лист',
	// 	link: '/tier-list',
	// },
	{
		title: 'История прыжков',
		link: '/warp',
	},
	{
		title: 'Лента событий',
		link: '/timeline',
	},
];
