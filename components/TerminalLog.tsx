"use client";

export default function TerminalLog({ status }: { status: string }) {
  return (
    <div className="w-full max-w-5xl border-2 sm:border-4 border-black bg-black p-2 sm:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center min-h-[40px] sm:min-h-[60px] mt-2">
      <p className="text-[10px] sm:text-xs md:text-sm text-[#4ade80] leading-relaxed">
        <span className="mr-2 font-bold">&gt; STATUS:</span>
        <span>{status}</span>
        <span className="inline-block w-2 h-3 sm:h-4 bg-[#4ade80] ml-1 animate-pulse align-middle"></span>
      </p>
    </div>
  );
}