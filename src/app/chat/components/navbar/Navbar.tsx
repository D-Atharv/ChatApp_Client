import { Logo } from './Logo';
import { UserMenu } from './UserMenu';

export const Navbar = () => (
    <nav className="border border-gray-200 bg-blue-gradient mx-2 my-2 rounded-xl">
        <div className="relative max-w-screen flex items-center justify-between p-4 px-10">
            <Logo />
            <UserMenu />
        </div>
    </nav>
);
