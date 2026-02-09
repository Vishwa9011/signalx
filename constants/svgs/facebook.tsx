type IconProps = React.ComponentProps<'svg'>;

const Facebook = ({ ...rest }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" {...rest}>
            <g clipPath="url(#clip0_23_2507)">
                <circle cx="14" cy="14" r="14" fill="#1549B3" />
                <path
                    d="M19.1669 7.54932C15.7823 7.54932 14.5923 9.25931 14.5923 12.1326V14.2467H12.4805V17.7686H14.5923V27.9879C16.0699 27.9263 17.4891 27.6374 18.8138 27.1524V17.7686H21.6318L22.0046 14.2467H18.8138L18.8182 12.4835C18.8182 11.5648 18.9061 11.0734 20.2239 11.0734H21.9849V7.54932H19.1669Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_23_2507">
                    <rect width="28" height="28" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Facebook;
