import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeText } from "./fade-text";

interface Avatar {
  imageUrl: string;
  name: string;
  position: string;
}

interface AvatarCirclesProps {
  className?: string;
  avatarUrls: Avatar[];
}

const AvatarCircle = ({
  avatar,
  index,
  handleMouseEnter,
  handleMouseLeave,
}: {
  avatar: Avatar;
  index: number;
  handleMouseEnter: (index: number, e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}) => (
  <motion.div
    key={index}
    className="h-16 w-16 rounded-full border-4 border-background dark:border-foreground overflow-hidden z-10"
    onMouseEnter={(e) => handleMouseEnter(index, e)}
    onMouseLeave={handleMouseLeave}
    whileHover={{ y: -7 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <img
      src={avatar.imageUrl}
      width={64}
      height={64}
      alt={`Avatar ${index + 1}`}
      className="h-full w-full object-cover"
    />
  </motion.div>
);

const HoverDetails = ({
  avatar,
  direction,
}: {
  avatar: Avatar;
  direction: "left" | "right";
}) => (
  <motion.div
    className="flex flex-row items-center rounded-full p-4 bg-accent-foreground dark:bg-accent mt-36 gap-2 divide-x divide-muted-foreground"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.1 }}
  >
    <FadeText
      key={`${avatar.name}`}
      direction={direction}
      framerProps={{ show: { transition: { delay: 0.05 } } }}
      text={avatar.name}
      className="font-semibold text-accent dark:text-accent-foreground"
    />
    <FadeText
      key={`${avatar.position}`}
      direction={direction}
      framerProps={{ show: { transition: { delay: 0.05 } } }}
      text={avatar.position}
      className="text-muted-foreground px-2"
    />
  </motion.div>
);

const AvatarCircles = ({ className, avatarUrls }: AvatarCirclesProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredDirection, setHoveredDirection] = useState<"left" | "right">(
    "left"
  );

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    const containerCenter =
      element.getBoundingClientRect().left + element.offsetWidth / 2;
    const direction = e.clientX < containerCenter ? "left" : "right";
    setHoveredDirection(direction);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => setHoveredIndex(null);

  const currentAvatar = useMemo(() => {
    return hoveredIndex !== null ? avatarUrls[hoveredIndex] : null;
  }, [hoveredIndex, avatarUrls]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <div
        className={cn(
          "flex -space-x-3 rtl:space-x-reverse absolute",
          className
        )}
      >
        {avatarUrls.map((avatar, index) => (
          <AvatarCircle
            key={index}
            avatar={avatar}
            index={index}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <AnimatePresence>
        {currentAvatar && (
          <HoverDetails avatar={currentAvatar} direction={hoveredDirection} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarCircles;
