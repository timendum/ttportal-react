import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <p className="mx-auto h-3 w-3">
      <FontAwesomeIcon class="animate-spin" icon={faSpinner} />
      Loading...
    </p>
  );
}
