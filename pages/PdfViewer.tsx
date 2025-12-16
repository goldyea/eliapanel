import React, { useState, useRef, useEffect } from "react";
import { books, Book, Chapter } from "../data/books";

// Simple Icons for the interface
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);
const SkipForwardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </svg>
);
const SkipBackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="19" x2="5" y2="5" />
  </svg>
);
const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export default function PdfViewer() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Reset state when book changes
  useEffect(() => {
    setCurrentChapterIndex(0);
    setIsPlaying(false);
  }, [selectedBook]);

  // Handle Audio Playback changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.error("Playback error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentChapterIndex]);

  const handleChapterSelect = (index: number) => {
    setCurrentChapterIndex(index);
    // If it was already playing, it will continue playing the new track due to calculated src
    // If not, we can choose to auto-play or stay paused. Let's auto-play on explicit selection.
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextChapter = () => {
    if (
      selectedBook?.chapters &&
      currentChapterIndex < selectedBook.chapters.length - 1
    ) {
      setCurrentChapterIndex((prev) => prev + 1);
      setIsPlaying(true);
    }
  };

  const prevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    // Auto-advance
    if (
      selectedBook?.chapters &&
      currentChapterIndex < selectedBook.chapters.length - 1
    ) {
      setCurrentChapterIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  if (selectedBook) {
    const currentChapter = selectedBook.chapters
      ? selectedBook.chapters[currentChapterIndex]
      : null;
    const audioSrc =
      currentChapter && selectedBook.audioPath
        ? `${selectedBook.audioPath}${currentChapter.filename}`
        : undefined;

    return (
      <div className="h-full flex flex-col animate-fade-in relative">
        {/* Header */}
        <div className="flex-shrink-0 mb-4 flex items-center space-x-4">
          <button
            onClick={() => setSelectedBook(null)}
            className="p-2 hover:bg-[#112240] rounded-full text-[#64ffda] transition-colors"
          >
            <ChevronLeftIcon />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#ccd6f6]">
              {selectedBook.title}
            </h1>
            <p className="text-[#8892b0] text-sm">{selectedBook.author}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col lg:flex-row gap-4 lg:overflow-hidden overflow-y-auto">
          {/* PDF Viewer */}
          <div className="flex-grow bg-[#112240] rounded-lg shadow-lg overflow-hidden border border-[#233554] relative min-h-[60vh] lg:min-h-0">
            <iframe
              src={selectedBook.pdfUrl}
              title={selectedBook.title}
              className="w-full h-full border-0"
            />
          </div>

          {/* Audio Player Sidebar (if chapters exist) */}
          {selectedBook.chapters && (
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col bg-[#112240] rounded-lg border border-[#233554] overflow-hidden">
              <div className="p-4 border-b border-[#233554] bg-[#0a192f]">
                <h2 className="text-[#ccd6f6] font-semibold mb-2 flex items-center">
                  <span>Audiobook</span>
                  {isPlaying && (
                    <span className="ml-2 flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64ffda] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#64ffda]"></span>
                    </span>
                  )}
                </h2>

                {/* Player Controls */}
                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-[#8892b0] text-center w-full truncate">
                    {currentChapter?.title || "No Chapter Selected"}
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={prevChapter}
                      disabled={currentChapterIndex === 0}
                      className="text-[#8892b0] hover:text-[#64ffda] disabled:opacity-30"
                    >
                      <SkipBackIcon />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#64ffda] text-[#0a192f] hover:bg-[#64ffda]/90 transition-transform active:scale-95"
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button
                      onClick={nextChapter}
                      disabled={
                        !selectedBook.chapters ||
                        currentChapterIndex === selectedBook.chapters.length - 1
                      }
                      className="text-[#8892b0] hover:text-[#64ffda] disabled:opacity-30"
                    >
                      <SkipForwardIcon />
                    </button>
                  </div>

                  <audio
                    ref={audioRef}
                    src={audioSrc}
                    onEnded={handleAudioEnded}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Chapter List */}
              <div className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {selectedBook.chapters.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => handleChapterSelect(index)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                      currentChapterIndex === index
                        ? "bg-[#233554] text-[#64ffda]"
                        : "text-[#8892b0] hover:bg-[#112240] hover:text-[#ccd6f6]"
                    }`}
                  >
                    <span className="truncate">{chapter.title}</span>
                    {currentChapterIndex === index && isPlaying && (
                      <svg
                        className="h-3 w-3 fill-current animate-pulse"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Library View
  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#ccd6f6]">library</h1>
        <p className="text-[#8892b0] mt-1">
          your collection of documents and audiobooks
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className="group bg-[#112240] rounded-xl p-4 border border-[#233554] hover:border-[#64ffda] transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Cover / Placeholder */}
            <div className="aspect-[3/4] rounded-lg bg-[#233554] mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-[#0a192f] transition-colors">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="inline-block p-3 rounded-full bg-[#112240] text-[#64ffda] mb-2 group-hover:scale-110 transition-transform">
                    <BookOpenIcon />
                  </div>
                  <h3 className="text-[#ccd6f6] font-bold text-lg leading-tight line-clamp-3">
                    {book.title}
                  </h3>
                </div>
              )}
              {/* Overlay Hint */}
              <div className="absolute inset-0 bg-[#0a192f]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="bg-[#64ffda] text-[#0a192f] px-3 py-1 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Read & Listen
                </span>
              </div>
            </div>

            {/* Meta */}
            <div>
              <p className="text-[#64ffda] text-xs font-mono mb-1 uppercase tracking-wider">
                {book.category}
              </p>
              <h3 className="text-[#e6f1ff] font-bold truncate group-hover:text-[#64ffda] transition-colors">
                {book.title}
              </h3>
              {book.author && (
                <p className="text-[#8892b0] text-sm">{book.author}</p>
              )}
              <div className="mt-3 flex items-center gap-2 text-xs text-[#8892b0]">
                {book.chapters ? (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#64ffda] mr-1"></span>
                    Audio Available
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#8892b0] mr-1"></span>
                    PDF Only
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a192f; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #233554; 
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64ffda; 
        }
      `}</style>
    </div>
  );
}
