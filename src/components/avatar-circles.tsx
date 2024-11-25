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
  return (
    <div className={cn("z-10 flex -space-x-3 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          className="h-16 w-16 rounded-full border-4 border-white dark:border-[#242424]"
          src={url.imageUrl}
          width={64}
          height={64}
          alt={`Avatar ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default AvatarCircles;
