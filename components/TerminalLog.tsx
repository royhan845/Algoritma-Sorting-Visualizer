"use client";

export default function TerminalLog({ status }: { status: string }) {
  return (
    <div className="w-full max-w-5xl border-4 border-black bg-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <p className="text-[#4ade80] text-lg">
        <span className="text-white">&gt; STATUS: </span>
        {status}
        <span className="animate-pulse">_</span>
      </p>
    </div>
  );
}