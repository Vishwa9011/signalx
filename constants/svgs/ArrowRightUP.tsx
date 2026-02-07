type IconProps = React.ComponentProps<'svg'>;

const ArrowRightUP = ({ ...rest }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" {...rest}>
            <path
                d="M5.25 5.25H12.75V12.75"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.25 12.75L12.75 5.25"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowRightUP;
