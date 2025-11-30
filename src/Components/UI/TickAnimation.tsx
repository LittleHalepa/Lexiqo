import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/tick.json";

export interface TickAnimatedIconRef {
  playAnimation: () => void;
}

interface TickAnimatedIconProps {
  size?: number;
}

const TickAnimatedIcon = forwardRef<TickAnimatedIconRef, TickAnimatedIconProps>(
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
        autoplay={true}
        style={{ width: size, height: size }}
        className=""
      />
    );
  }
);

export default TickAnimatedIcon;
