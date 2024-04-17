'use client';
import { Button } from '@/components/ui/button'; // Importing Button component from the ui library
import { useToast } from '@/components/ui/use-toast'; // Importing useToast hook to display toast messages
import { useGetCallById } from '@/hooks/useGetCallById'; // Importing useGetCallById hook to fetch call data by ID
import { useUser } from '@clerk/nextjs'; // Importing useUser hook to access user data
import { useStreamVideoClient } from '@stream-io/video-react-sdk'; // Importing useStreamVideoClient hook to access Stream video client
import { useRouter } from 'next/navigation'; // Importing useRouter hook to navigate between pages
import React from 'react'; // Importing React library

// Defining a functional component called Table that takes in title and description as props
const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};


// Defining a functional component called PresonalRoom
const PresonalRoom = () => {
  // Using useRouter hook to access router object
  const router = useRouter();
  // Using useUser hook to access user object
  const { user } = useUser();
  // Using useStreamVideoClient hook to access Stream video client
  const client = useStreamVideoClient();
  // Using useToast hook to access toast object
  const { toast } = useToast();

  // Defining meetingId as the user's ID
  const meetingId = user?.id;

  // Using useGetCallById hook to fetch call data by ID
  const { call } = useGetCallById(meetingId!);

  // Defining an asynchronous function called startRoom
  const startRoom = async () => {
    // Checking if client and user objects are not null
    if (!client ||!user) return;

    // Creating a new call object with the meetingId
    const newCall = client.call("default", meetingId!);

    // Checking if call object is null
    if (!call) {
      // Creating a new call with the meetingId and starts_at property set to the current date and time
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    // Navigating to the meeting page with the meetingId and personal query parameter set to true
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  // Defining meetingLink as the URL for the personal meeting room
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  // Returning a section element with the title, table data, and buttons for starting and copying the meeting link
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            // Copying the meetingLink to the clipboard
            navigator.clipboard.writeText(meetingLink);
            // Displaying a toast message indicating that the link has been copied
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
}

// Exporting the PresonalRoom component
export default PresonalRoom