'use client';

import useTimer from '@/features/trades/hooks/useTimer';
// import { Bars } from 'react-loader-spinner';
import { useRoundStore } from '@/features/market/store/roundStore';
// import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

type CountdownTimerProps = {
    // version: 'mobile' | 'desktop';
};

const CountdownTimer = ({}: CountdownTimerProps) => {
    const { countdownTime } = useRoundStore();
    const timer = useTimer(countdownTime);
    return <MobileCountdown formattedTime={timer.long} />;
};

export default CountdownTimer;

const MobileCountdown = ({ formattedTime }: { formattedTime: string }) => {
    return (
        <div className="">
            <h2 className="font_dmSans text-[1.125rem] font-bold -tracking-[0.025rem] text-[#0D0F1C]">
                {formattedTime}
            </h2>
            <p className="font_dmSans text-right text-[0.75rem] font-medium text-[#00000099]">CLOSES IN</p>
        </div>
    );
};

// type DesktopCountdownProps = {
//     progress: number;
//     formattedTime: string;
//     isExpired: boolean;
// };

// const DesktopCountdown = ({ progress, formattedTime, isExpired }: DesktopCountdownProps) => {
//     return (
//         <CircularProgressbarWithChildren
//             value={progress}
//             strokeWidth={5}
//             counterClockwise={false}
//             styles={buildStyles({
//                 strokeLinecap: 'butt',
//                 pathColor: '#1E4CF0',
//                 rotation: 1,
//             })}
//         >
//             {isExpired ? <LoaderState /> : <CountdownState time={formattedTime} />}
//         </CircularProgressbarWithChildren>
//     );
// };

// const LoaderState = () => (
//     <div className="flex flex-col items-center justify-center">
//         <Bars height="50" width="50" color="#1E4CF0" ariaLabel="bars-loading" visible />
//     </div>
// );

// const CountdownState = ({ time }: { time: string }) => (
//     <div className="flex flex-col items-center justify-center">
//         <h2 className="font-tertiary text-[1.625rem] font-semibold text-[#000000]">{time}</h2>
//         <p className="font-tertiary text-[0.6875rem] font-medium tracking-[0.03125rem] text-[#7C8593]">CLOSES IN</p>
//     </div>
// );
