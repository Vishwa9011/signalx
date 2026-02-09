type IconProps = React.ComponentProps<'svg'>;

const GoesUp = ({ ...rest }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" {...rest}>
            <g clipPath="url(#clip0_23_2477)">
                <path
                    d="M17.25 4.5L10.125 11.625L6.375 7.875L0.75 13.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.75 4.5H17.25V9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_23_2477">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default GoesUp;
