import { useRef } from "react";
import StarAnimatedIcon from "./StarAnimatedIcon";
import type { StarAnimatedIconRef } from "./StarAnimatedIcon";

const PremiumButton = () => {
  const starRef = useRef<StarAnimatedIconRef>(null);

  const handleClick = () => {
    starRef.current?.playAnimation();
  };

  return (
    <button
      className="text-white bg-brand px-4 pl-3 py-1 rounded-sm text-sm font-semibold flex items-center gap-1 active:opacity-90 transition-opacity cursor-pointer"
      onClick={handleClick}
    >
      <StarAnimatedIcon ref={starRef} size={20} />
      Premium
    </button>
  );
};

export default PremiumButton;