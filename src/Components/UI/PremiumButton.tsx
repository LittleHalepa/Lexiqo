import { useRef } from "react";
import StarAnimatedIcon from "./StarAnimatedIcon";
import type { StarAnimatedIconRef } from "./StarAnimatedIcon";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const PremiumButton = () => {
  const starRef = useRef<StarAnimatedIconRef>(null);

  const { user } = useUser();
  const nav = useNavigate();

  const handleClick = () => {
    starRef.current?.playAnimation();
    
    if (user) {
      nav(`/user/${user.public_id}/premium`);
    }
  };

  return (
    <button
      className="text-white bg-brand px-4 pl-3 py-1 rounded-sm text-sm font-semibold flex items-center gap-1 active:opacity-90 transition-opacity cursor-pointer"
      onClick={handleClick}
    >
      <StarAnimatedIcon ref={starRef} size={20} />
      Lexiqo Plus
    </button>
  );
};

export default PremiumButton;