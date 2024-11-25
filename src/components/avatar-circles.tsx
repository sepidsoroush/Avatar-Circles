import { useState } from "react";
import { cn } from "../lib/utils";

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
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn("z-10 flex -space-x-3 rtl:space-x-reverse", className)}
      >
        {avatarUrls.map((url, index) => (
          <img
            key={index}
            className="h-16 w-16 rounded-full border-4 border-white dark:border-[#242424] hover:-translate-y-1 overflow-hidden"
            src={url.imageUrl}
            width={64}
            height={64}
            alt={`Avatar ${index + 1}`}
            onMouseOver={() => setSelectedAvatar(url)}
            onMouseOut={() => setSelectedAvatar(null)}
          />
        ))}
      </div>
      {selectedAvatar && (
        <div className="flex flex-row rounded-full w-full p-4 border gap-2">
          <p className="font-bold">{selectedAvatar.name}</p>
          {"|"}
          <p className="font-medium text-neutral-500">
            {selectedAvatar.position}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvatarCircles;
