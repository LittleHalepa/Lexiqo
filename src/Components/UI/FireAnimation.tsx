import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/Fire Streak Orange.json";

export interface FireAnimatedIconRef {
  playAnimation: () => void;
}

interface FireAnimatedIconProps {
  size?: number;
}

const FireAnimatedIcon = forwardRef<FireAnimatedIconRef, FireAnimatedIconProps>(
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
        loop={true}
        autoplay={true}
        style={{ width: size, height: size }}
        className=""
      />
    );
  }
);

export default FireAnimatedIcon;
