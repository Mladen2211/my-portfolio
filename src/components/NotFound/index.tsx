import { getImagePrefix } from "@/utils/util";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <Image
        src={`${getImagePrefix()}images/not-found.svg`}
        alt="Not Found"
        width={500}
        height={500}
        priority
      />
    </div>
  );
}