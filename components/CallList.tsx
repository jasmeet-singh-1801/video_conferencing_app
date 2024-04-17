// Import necessary modules and components
'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import Loader from './Loader';
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the CallList component, which displays a list of calls based on the provided type
const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  // Initialize the router object using the useRouter hook
  const router = useRouter();

  // Use the useGetCalls hook to fetch the list of calls
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();

  // Initialize the state for recordings using the useState hook
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  // Define a helper function to get the list of calls based on the provided type
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  // Define a helper function to get the message to display when there are no calls
  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  // Use the useEffect hook to fetch the list of recordings when the type is 'recordings'
  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings())?? [],
      );

      const recordings = callData
       .filter((call) => call.recordings.length > 0)
       .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  // Render the Loader component while the calls are being fetched
  if (isLoading) return <Loader />;

  // Get the list of calls and the message to display when there are no calls
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  // Render the list of calls or the message indicating that there are no calls
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
               ? '/icons/previous.svg'
                : type === 'upcoming'
                 ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
               ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recordings'? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings'? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
               ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

// Export the CallList component
export default CallList;