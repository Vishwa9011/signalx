type IconProps = React.ComponentProps<'svg'>;

const OutlineExclamationCircle = ({ ...rest }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none" {...rest}>
            <path
                d="M25.9999 42.7142C35.231 42.7142 42.7142 35.231 42.7142 25.9999C42.7142 16.7689 35.231 9.28564 25.9999 9.28564C16.7689 9.28564 9.28564 16.7689 9.28564 25.9999C9.28564 35.231 16.7689 42.7142 25.9999 42.7142Z"
                stroke="#1E4CF0"
                strokeWidth="2.5"
            />
            <path
                d="M25.9998 36.6788C26.769 36.6788 27.3926 36.0552 27.3926 35.2859C27.3926 34.5167 26.769 33.8931 25.9998 33.8931C25.2305 33.8931 24.6069 34.5167 24.6069 35.2859C24.6069 36.0552 25.2305 36.6788 25.9998 36.6788Z"
                fill="#1E4CF0"
            />
            <path d="M26 16.7144V29.7144" stroke="#1E4CF0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
};

export default OutlineExclamationCircle;
