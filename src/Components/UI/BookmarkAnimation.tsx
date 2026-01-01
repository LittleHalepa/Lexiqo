import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import animationData from "./Animations/bookmark.json";

interface BookmarkProps {
  bookmarked: boolean;
  onToggle?: (newState: boolean) => void;
}

export default function Bookmark({ bookmarked, onToggle }: BookmarkProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const anim = lottieRef.current;
    if (!anim) return;

    anim.stop();
    
    if (bookmarked) {
      anim.setDirection(1);
      anim.play();
    } else {
      anim.setDirection(-1);
      anim.play();
    }
    
  }, [bookmarked]);

  return (
    <div onClick={() => onToggle?.(!bookmarked)}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: 30, height: 30, cursor: "pointer" }}
        className="z-10"
      />
    </div>
  );
}
