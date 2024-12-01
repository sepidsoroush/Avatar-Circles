import { useState } from "react";
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

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <div
        className={cn(
          "flex -space-x-3 rtl:space-x-reverse absolute",
          className
        )}
      >
        {avatarUrls.map((avatar, index) => (
          <motion.div
            key={index}
            className="h-16 w-16 rounded-full border-4 border-background dark:border-foreground overflow-hidden z-10"
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              y: -7,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <img
              src={avatar.imageUrl}
              width={64}
              height={64}
              alt={`Avatar ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            className="flex flex-row rounded-full p-4 bg-accent-foreground dark:bg-accent gap-2 mt-36"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1 }}
          >
            <div className="font-semibold text-accent dark:text-accent-foreground">
              <FadeText
                key={avatarUrls[hoveredIndex].name}
                direction={hoveredDirection}
                framerProps={{
                  show: { transition: { delay: 0.05 } },
                }}
                text={avatarUrls[hoveredIndex].name}
              />
            </div>
            <div className="text-muted-foreground px-2">
              <FadeText
                key={avatarUrls[hoveredIndex].position}
                direction={hoveredDirection}
                framerProps={{
                  show: { transition: { delay: 0.05 } },
                }}
                text={avatarUrls[hoveredIndex].position}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarCircles;
