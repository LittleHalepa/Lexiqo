import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/mail file.json";

export interface MailAnimatedIconRef {
  playAnimation: (delay?: number) => void;
}

interface MailAnimatedIconProps {
  size?: number;
}

const MailAnimationIcon = forwardRef<MailAnimatedIconRef, MailAnimatedIconProps>(
  ({ size = 20 }, ref) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useImperativeHandle(ref, () => ({
      playAnimation: (delay = 0) => {
        if (!lottieRef.current) return;

        if (delay > 0) {
          setTimeout(() => {
            lottieRef.current?.goToAndPlay(0, true);
          }, delay);
        } else {
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
      />
    );
  }
);

export default MailAnimationIcon;
