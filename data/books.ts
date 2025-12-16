export interface Chapter {
  title: string;
  filename: string;
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  category: string;
  coverImage?: string; // Optional cover image path
  pdfUrl: string;
  audioPath?: string; // Base path for audio files
  chapters?: Chapter[];
}

export const books: Book[] = [
  {
    id: "navajo-code-talkers",
    title: "Code Talker",
    author: "Joseph Bruchac",
    category: "History",
    pdfUrl: "/books/navajo/pdfs/Code Talker Text.pdf",
    audioPath: "/books/navajo/audio/",
    chapters: [
      { title: "Introduction", filename: "Code Talker Introduction.mp3" },
      { title: "Chapter 1", filename: "Code Talker Chapter 1.mp3" },
      { title: "Chapter 2", filename: "Code Talker Chapter 2.mp3" },
      { title: "Chapter 3", filename: "Code Talker Chapter 3.mp3" },
      { title: "Chapter 4", filename: "Code Talker Chapter 4.mp3" },
      { title: "Chapter 5", filename: "Code Talker Chapter 5.mp3" },
      { title: "Chapter 6", filename: "Code Talker Chapter 6.mp3" },
      { title: "Chapter 7", filename: "Code Talker Chapter 7.mp3" },
      { title: "Chapter 8", filename: "Code Talker Chapter 8.mp3" },
      { title: "Chapter 9", filename: "Code Talker Chapter 9.mp3" },
      { title: "Chapter 10", filename: "Code Talker Chapter 10.mp3" },
      { title: "Chapter 11", filename: "Code Talker Chapter 11.mp3" },
      { title: "Chapter 12", filename: "Code Talker Chapter 12.mp3" },
      { title: "Chapter 13", filename: "Code Talker Chapter 13.mp3" },
      { title: "Chapter 14", filename: "Code Talker Chapter 14.mp3" },
      { title: "Chapter 15", filename: "Code Talker Chapter 15.mp3" },
      { title: "Chapter 16", filename: "Code Talker Chapter 16.mp3" },
      { title: "Chapter 17", filename: "Code Talker Chapter 17.mp3" },
      { title: "Chapter 18", filename: "Code Talker Chapter 18.mp3" },
      { title: "Chapter 19", filename: "Code Talker Chapter 19.mp3" },
      { title: "Chapter 20", filename: "Code Talker Chapter 20.mp3" },
      { title: "Chapter 21", filename: "Code Talker Chapter 21.mp3" },
      { title: "Chapter 22", filename: "Code Talker Chapter 22.mp3" },
      { title: "Chapter 23", filename: "Code Talker Chapter 23.mp3" },
      { title: "Chapter 24", filename: "Code Talker Chapter 24.mp3" },
      { title: "Chapter 25", filename: "Code Talker Chapter 25.mp3" },
      { title: "Chapter 26", filename: "Code Talker Chapter 26.mp3" },
      { title: "Chapter 27", filename: "Code Talker Chapter 27.mp3" },
      { title: "Chapter 28", filename: "Code Talker Chapter 28.mp3" },
      { title: "Chapter 29", filename: "Code Talker Chapter 29.mp3" },
    ],
  },
  {
    id: "canterbury-tales",
    title: "The Canterbury Tales",
    author: "Geoffrey Chaucer",
    category: "Classics",
    pdfUrl:
      "https://www.dropbox.com/scl/fi/8uo6amcb9ymqt1qv1xh5x/1.pdf?rlkey=7aoulfds0x0qk6a6mi0qmulb8&st=53tjtfrt&raw=1",
  },
];
