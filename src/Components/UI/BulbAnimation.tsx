import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/bulb.json";

export interface BulbAnimatedIconRef {
  playAnimation: () => void;
}

interface BulbAnimatedIconProps {
  size?: number;
}

const BulbAnimatedIcon = forwardRef<BulbAnimatedIconRef, BulbAnimatedIconProps>(
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
        className="-translate-y-[0.09rem]"
      />
    );
  }
);

export default BulbAnimatedIcon;
