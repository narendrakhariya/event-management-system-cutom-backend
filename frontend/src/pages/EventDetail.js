import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetail = () => {
  const data = useRouteLoaderData("event-detail");
  return <EventItem event={data.event} />;
};

export default EventDetail;

export async function loader({ request, params }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
}

// Delete action
export async function action({ params, request }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId,
    { method: request.method }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not delete selected event." },
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
}
