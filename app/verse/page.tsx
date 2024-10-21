import React from "react";

const VerseVideoPage = () => {
  const videoId = "dQw4w9WgXcQ"; // Replace with your desired YouTube video ID

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Tufts Idea Competition Pitch 🎉
      </h1>
      <div
        className="relative w-full rounded-xl shadow-xl overflow-hidden"
        style={{ paddingTop: "56.25%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VerseVideoPage;
