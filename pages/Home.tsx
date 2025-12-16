import React from 'react';

const Card: React.FC<{title: string; children: React.ReactNode;}> = ({ title, children }) => (
  <div className="bg-[#112240] p-6 rounded-lg shadow-lg border border-transparent hover:border-white transition-all duration-300">
    <h3 className="text-md font-bold text-white mb-3">{title}</h3>
    <div className="text-sm space-y-2">{children}</div>
  </div>
);

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#ccd6f6]">elia's dashboard</h1>
        <p className="mt-2 text-lg text-[#8892b0]">my corner of the internet for stuff.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Card title="about me">
                <p>just a person navigating the worlds of code and academia. this space is my digital hub for staying organized and inspired.</p>
            </Card>
        </div>
        <Card title="name">
            <p>elia</p>
        </Card>
        <Card title="interests">
            <ul className="list-disc list-inside">
                <li>developing</li>
                <li>entrepreneurship</li>
                <li>gaming</li>
                <li>learning</li>
            </ul>
        </Card>
        <div className="md:col-span-2">
            <Card title="vibe check">
                <p>aura = 100,000, phone yeeted 🗿🤣💀✌️, bleach needed 😀🤣, amongus deleted 🗿🍷 therapy also needed ... EDIT MOM IM FAMOUS 🔥</p>
            </Card>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}