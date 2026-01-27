import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/Loading Files.json";

export interface LoadingAnimatedIconRef {
  playAnimation: () => void;
}

interface LoadingAnimatedIconProps {
  size?: number;
}

const LoadingAnimatedIcon = forwardRef<LoadingAnimatedIconRef, LoadingAnimatedIconProps>(
  ({ size = 300 }, ref) => {
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
        style={{ width: `${size}px`, height: `${size}px` }}
        className=""
      />
    );
  }
);

export default LoadingAnimatedIcon;
