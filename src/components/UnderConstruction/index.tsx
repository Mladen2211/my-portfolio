import { getImagePrefix } from "@/utils/util";
import Image from "next/image";

export default function UnderConstruction() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <Image
        src={`${getImagePrefix()}images/under-construction.svg`}
        alt="Not Found"
        width={1500}
        height={1500}
        priority
      />
    </div>
  );
}