import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task, Note } from '../types';
import { PlusIcon, TrashIcon } from '../components/icons/Icons';

export default function Planner() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      date: newTaskDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addNote = () => {
    if (newNoteTitle.trim() === '' || newNoteContent.trim() === '') return;
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
    };
    setNotes([...notes, newNote]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-[#ccd6f6]">planner</h1>

      {/* Tasks Section */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">tasks</h2>
        <div className="bg-[#112240] p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="add a new task..."
              className="flex-grow bg-[#0a192f] border border-[#233554] text-[#ccd6f6] rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <input
              type="date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
              className="bg-[#0a192f] border border-[#233554] text-[#ccd6f6] rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button onClick={addTask} className="bg-white text-[#0a192f] p-2 rounded-md hover:bg-slate-200 flex items-center justify-center">
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between bg-[#0a192f] p-3 rounded-md group">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="form-checkbox h-5 w-5 bg-[#233554] border-[#8892b0] text-white rounded focus:ring-white"/>
                  <span className={`${task.completed ? 'line-through text-[#8892b0]' : 'text-[#ccd6f6]'}`}>{task.text}</span>
                  <span className="text-xs text-[#4a5f7b]">{task.date}</span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-[#8892b0] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Notes Section */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#112240] p-4 rounded-lg flex flex-col gap-2">
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="note title"
              className="bg-[#0a192f] border border-[#233554] text-[#ccd6f6] rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="note content..."
              rows={4}
              className="flex-grow bg-[#0a192f] border border-[#233554] text-[#ccd6f6] rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button onClick={addNote} className="bg-white text-[#0a192f] p-2 rounded-md hover:bg-slate-200 flex items-center justify-center">
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          {notes.map(note => (
            <div key={note.id} className="bg-[#112240] p-4 rounded-lg flex flex-col group">
              <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[#ccd6f6] mb-2">{note.title}</h3>
                  <button onClick={() => deleteNote(note.id)} className="text-[#8892b0] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrashIcon className="w-4 h-4" />
                  </button>
              </div>
              <p className="text-sm text-[#8892b0] whitespace-pre-wrap flex-grow">{note.content}</p>
            </div>
          ))}
        </div>
      </section>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .form-checkbox {
            appearance: none;
            -webkit-appearance: none;
            cursor: pointer;
            border-radius: 4px;
        }
        .form-checkbox:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
            background-color: currentColor;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}