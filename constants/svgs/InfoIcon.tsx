type IconProps = React.ComponentProps<'svg'>;

const InfoIcon = ({ ...rest }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" {...rest}>
            <path
                d="M7.00008 12.8333C10.2217 12.8333 12.8334 10.2217 12.8334 7C12.8334 3.77834 10.2217 1.16667 7.00008 1.16667C3.77842 1.16667 1.16675 3.77834 1.16675 7C1.16675 10.2217 3.77842 12.8333 7.00008 12.8333Z"
                stroke="#1E4CF0"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 9.33333V7"
                stroke="#1E4CF0"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 4.66667H7.00583"
                stroke="#1E4CF0"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default InfoIcon;
