'use client';

// Import the Image component from the next/image library
import Image from 'next/image';

// Import the cn utility function from the '@/lib/utils' module
import { cn } from '@/lib/utils';

// Define the HomeCardProps interface, which specifies the types and names of the properties that the HomeCard component expects
interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

// Define the HomeCard component, which takes in the properties defined in the HomeCardProps interface
const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  // Return the JSX elements that make up the HomeCard component
  return (
    <section
      // Use the cn utility function to apply the specified CSS classes to the section element, as well as any additional classes passed in through the className property
      className={cn(
        'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
        className
      )}
      // Attach a click event listener to the section element, which will call the handleClick function when the element is clicked
      onClick={handleClick}
    >
      {/* // Render a div element that contains an Image component and applies the specified CSS classes to it */}
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>
      
      {/* // Render a div element that contains the title and description of the HomeCard component, and applies the specified CSS classes to it */}
      <div className="flex flex-col gap-2">
        {/* // Render an h1 element that contains the title of the HomeCard component and applies the specified CSS classes to it */}
        <h1 className="text-2xl font-bold">{title}</h1>
        {/* // Render a p element that contains the description of the HomeCard component and applies the specified CSS classes to it */}
        <p className="text-lg font-normal">{description}</p>
      </div>
    </section>
  );
};

// Export the HomeCard component so that it can be used in other parts of the application
export default HomeCard;