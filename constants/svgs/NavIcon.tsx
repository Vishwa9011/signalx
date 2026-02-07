type IconProps = React.ComponentProps<'svg'>;

const NavIcon = ({ ...rest }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...rest} viewBox="0 0 24 24" fill="none">
            <path
                d="M12 17H19M5 12H19M5 7H19"
                stroke="#212022"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default NavIcon;
