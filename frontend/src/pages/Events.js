import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, useLoaderData } from "react-router-dom";

function Events() {
  const { events } = useLoaderData();

  return (
    // Suspense for fall back
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(allLoadedEvents) => <EventsList events={allLoadedEvents} />}
      </Await>
    </Suspense>
  );
}
export default Events;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Fetching events failed." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({ events: loadEvents() });
}
