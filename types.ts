
export interface Task {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
}
