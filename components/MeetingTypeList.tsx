// Import the useState hook from the React library
import { useState } from 'react'

// Import the useRouter hook from the next/navigation library
import { useRouter } from 'next/navigation'
import HomeCard from './HomeCard'

// Define the MeetingTypeList component, which will render a list of HomeCard components that allow the user to choose the type of meeting they want to start or join
const MeetingTypeList = () => {
  // Use the useRouter hook to get access to the router object, which will allow us to navigate to different pages in the application
  const router = useRouter()

  // Use the useState hook to create a state variable called meetingState, which will keep track of the type of meeting that the user has selected
  // The initial value of meetingState is undefined, which means that no meeting type has been selected yet
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(undefined)

  // Return the JSX elements that make up the MeetingTypeList component
  return (
    // Render a section element that contains a grid of HomeCard components, and applies the specified CSS classes to it
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* // Render a HomeCard component that allows the user to start an instant meeting */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')} // Set the meetingState state variable to 'isInstantMeeting' when the HomeCard component is clicked
      />

      // Render a HomeCard component that allows the user to join a meeting via an invitation link
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')} // Set the meetingState state variable to 'isJoiningMeeting' when the HomeCard component is clicked
      />

      {/* // Render a HomeCard component that allows the user to schedule a meeting */}
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')} 
        // Set the meetingState state variable to 'isScheduleMeeting' when the HomeCard component is clicked
      />

      {/* // Render a HomeCard component that allows the user to view their meeting recordings */}
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')} // Navigate to the '/recordings' page when the HomeCard component is clicked
      />
    </section>
  )
}

// Export the MeetingTypeList component so that it can be used in other parts of the application
export default MeetingTypeList