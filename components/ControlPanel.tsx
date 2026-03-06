"use client";

export default function ControlPanel({ 
  onRandomize, onSort, isSorting, speedUI, onSpeedChange, 
  algorithm, onAlgorithmChange, customInput, onCustomInputChange, onSetCustomData 
}: any) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-4 bg-white border-2 sm:border-4 border-black p-3 sm:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center justify-center">
        <div className="flex gap-2 items-center lg:border-r-4 border-black lg:pr-6 w-full lg:w-auto justify-center">
          <label className="font-bold text-xs sm:text-sm">ALGORITMA:</label>
          <select value={algorithm} onChange={onAlgorithmChange} disabled={isSorting} className="font-bold border-2 sm:border-4 border-black px-2 py-1 bg-[#fef08a] cursor-pointer outline-none text-xs sm:text-sm">
            <option value="BUBBLE">BUBBLE SORT</option>
            <option value="SELECTION">SELECTION SORT</option>
          </select>
        </div>
        <div className="flex gap-2 sm:gap-4 w-full lg:w-auto justify-center">
          <button onClick={onRandomize} disabled={isSorting} className={`font-bold border-2 sm:border-4 border-black px-3 py-2 sm:px-4 transition-all text-xs sm:text-sm w-full sm:w-auto ${isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-[#4ade80] hover:bg-[#22c55e] hover:-translate-y-1"}`}>[ ACAK ]</button>
          <button onClick={onSort} disabled={isSorting} className={`font-bold border-2 sm:border-4 border-black px-3 py-2 sm:px-4 transition-all text-white text-xs sm:text-sm w-full sm:w-auto ${isSorting ? "bg-gray-400 cursor-not-allowed text-black" : "bg-[#ef4444] hover:bg-[#dc2626] hover:-translate-y-1"}`}>{isSorting ? "[ PROSES... ]" : "[ MULAI SORTING ]"}</button>
        </div>
        <div className="flex flex-col items-center lg:border-l-4 border-black lg:pl-6 w-full lg:w-auto">
          <label className="font-bold mb-1 text-[10px] sm:text-xs">KECEPATAN ({speedUI}ms)</label>
          <input type="range" min="100" max="1500" step="100" value={speedUI} onChange={onSpeedChange} className="w-full sm:w-32 accent-black cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center border-t-2 sm:border-t-4 border-dashed border-gray-400 pt-3 sm:pt-4 mt-1 sm:mt-2">
        <label className="font-bold text-xs sm:text-sm whitespace-nowrap">INPUT MANUAL:</label>
        <input type="text" value={customInput} onChange={onCustomInputChange} disabled={isSorting} placeholder="Cth: 5,12,8" className="border-2 sm:border-4 border-black px-2 py-1 w-full sm:w-64 outline-none text-xs sm:text-sm placeholder-gray-400 focus:bg-blue-50" />
        <button onClick={onSetCustomData} disabled={isSorting} className={`font-bold border-2 sm:border-4 border-black px-3 py-1 transition-all text-xs sm:text-sm w-full sm:w-auto ${isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-[#60a5fa] hover:bg-[#3b82f6] hover:-translate-y-1"}`}>[ SET ]</button>
      </div>
      <p className="text-[10px] sm:text-xs font-bold text-red-600 mt-2 bg-red-100 px-2 py-1 border-2 border-red-600 uppercase text-center w-full">* INFO: Max 15 Angka | Batas: 1-999</p>
    </div>
  );
}