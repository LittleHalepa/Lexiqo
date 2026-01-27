import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/Confetti.json";

export interface ConfettiAnimatedIconRef {
  playAnimation: () => void;
}

interface ConfettiAnimatedIconProps {
  size?: number;
}

const ConfettiAnimatedIcon = forwardRef<ConfettiAnimatedIconRef, ConfettiAnimatedIconProps>(
  ({ size = 20 }, ref) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useImperativeHandle(ref, () => ({
      playAnimation: () => {
        if (lottieRef.current) {
          lottieRef.current.goToAndPlay(0, true);
        }
      },
    }));

    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        className="w-full h-full"
        style={{ width: '100vw', height: '100vh' }}
      />
    );
  }
);

ConfettiAnimatedIcon.displayName = "ConfettiAnimatedIcon";

export default ConfettiAnimatedIcon;
