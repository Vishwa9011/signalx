type IconProps = React.ComponentProps<'svg'>;

const Twitter = ({ ...rest }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" {...rest}>
            <g clipPath="url(#clip0_23_2515)">
                <circle cx="14" cy="14" r="14" fill="#1549B3" />
                <path
                    d="M18.0258 8H20.1726L15.4825 13.0831L21 20H16.6799L13.2962 15.8049L9.42451 20H7.27646L12.2929 14.5631L7 8H11.4298L14.4883 11.8345L18.0258 8ZM17.2724 18.7815H18.4619L10.7834 9.15446H9.50693L17.2724 18.7815Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_23_2515">
                    <rect width="28" height="28" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Twitter;
