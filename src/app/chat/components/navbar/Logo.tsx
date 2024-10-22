import Image from 'next/image';
import eye from '../../../../../styles/svg/eye-solid.svg';

export const Logo = () => (
    <a href="#" className="flex items-center space-x-3">
        <Image src={eye} width={70} height={70} alt="Eye logo" className="h-8" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Iris</span>
    </a>
);