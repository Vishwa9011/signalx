'use client';

import { cn } from '@/lib';

type CustomButtonProps = {
    children: React.ReactNode;
    href?: string; // if provided, becomes a <Link>
    onClick?: () => void;
    className?: string;
    leftIcon?: React.ReactNode; // optional left icon
    rightIcon?: React.ReactNode; // optional right icon
    disabled?: boolean;
    as?: 'button' | 'a'; // optional override
    type?: 'button' | 'submit' | 'reset';
};

const CustomButton = ({
    children,
    href,
    onClick,
    className,
    leftIcon,
    rightIcon,
    disabled = false,
    as,
    type = 'button',
}: CustomButtonProps) => {
    const baseClasses =
        'btn-sell click flex items-center justify-center gap-2 px-4 py-2.5 text-[0.9375rem] leading-[1.40625rem] font-medium text-white w-full';

    const Comp = href ? 'a' : as === 'a' ? 'a' : 'button';

    return (
        <Comp
            {...(href ? { href } : {})}
            {...(Comp === 'button' ? { type, onClick, disabled } : {})}
            className={cn(baseClasses, className, disabled && 'opacity-50')}
        >
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
        </Comp>
    );
};

export default CustomButton;
