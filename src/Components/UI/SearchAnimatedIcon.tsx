import { forwardRef, useImperativeHandle, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/search.json";

export interface SearchAnimatedIconRef {
  playAnimation: () => void;
}

interface SearchAnimatedIconProps {
  size?: number;
}

const SearchAnimatedIcon = forwardRef<SearchAnimatedIconRef, SearchAnimatedIconProps>(
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
        className="-translate-y-[0.09rem] absolute left-3 top-1"
      />
    );
  }
);

export default SearchAnimatedIcon;
