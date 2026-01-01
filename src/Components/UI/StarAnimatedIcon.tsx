import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/star.json";

export interface StarAnimatedIconRef {
  playAnimation: () => void;
}

interface StarAnimatedIconProps {
  size?: number;
}

const StarAnimatedIcon = forwardRef<StarAnimatedIconRef, StarAnimatedIconProps>(
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
        style={{ width: size, height: size }}
        className="-translate-y-[0.04rem]"
      />
    );
  }
);

export default StarAnimatedIcon;
