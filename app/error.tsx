"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <p>Something went wrong on the server</p>
      <p>
        <button className="underline" onClick={() => reset()}>
          Try again
        </button>{" "}
        or comeback later
      </p>
    </div>
  );
}
