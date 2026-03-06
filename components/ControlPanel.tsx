"use client";

export default function ControlPanel({ 
  onRandomize, onSort, isSorting, speedUI, onSpeedChange, 
  algorithm, onAlgorithmChange,
  customInput, onCustomInputChange, onSetCustomData 
}: any) {
  return (
    <div className="flex flex-col gap-4 mb-4 bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-5xl">
      
      {/* BARIS ATAS: Kontrol Utama */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <div className="flex flex-col md:flex-row gap-2 items-center border-r-4 border-black pr-6">
          <label className="font-bold">ALGORITMA:</label>
          <select 
            value={algorithm} 
            onChange={onAlgorithmChange}
            disabled={isSorting}
            className="font-bold border-4 border-black px-2 py-1 bg-[#fef08a] cursor-pointer outline-none"
          >
            <option value="BUBBLE">BUBBLE SORT</option>
            <option value="SELECTION">SELECTION SORT</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button onClick={onRandomize} disabled={isSorting} className={`font-bold border-4 border-black px-4 py-2 transition-all ${isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-[#4ade80] hover:bg-[#22c55e] hover:-translate-y-1"}`}>
            [ ACAK DATA ]
          </button>
          <button onClick={onSort} disabled={isSorting} className={`font-bold border-4 border-black px-4 py-2 transition-all text-white ${isSorting ? "bg-gray-400 cursor-not-allowed text-black" : "bg-[#ef4444] hover:bg-[#dc2626] hover:-translate-y-1"}`}>
            {isSorting ? "[ PROSES... ]" : "[ MULAI SORTING ]"}
          </button>
        </div>

        <div className="flex flex-col items-center border-l-4 border-black pl-6">
          <label className="font-bold mb-1 text-sm">KECEPATAN ({speedUI}ms)</label>
          <input type="range" min="100" max="1500" step="100" value={speedUI} onChange={onSpeedChange} className="w-32 accent-black cursor-pointer" />
        </div>
      </div>

      {/* BARIS BAWAH: Input Data Manual */}
      <div className="flex flex-col items-center border-t-4 border-dashed border-gray-400 pt-4 mt-2">
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <label className="font-bold text-sm">INPUT MANUAL:</label>
          <input 
            type="text" 
            value={customInput}
            onChange={onCustomInputChange}
            disabled={isSorting}
            placeholder="Cth: 5,12,8,20"
            className="border-4 border-black px-2 py-1 w-72 outline-none font-mono text-sm placeholder-gray-400 focus:bg-blue-50"
          />
          <button 
            onClick={onSetCustomData} 
            disabled={isSorting} 
            className={`font-bold border-4 border-black px-4 py-1 transition-all text-sm ${isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-[#60a5fa] hover:bg-[#3b82f6] hover:-translate-y-1"}`}
          >
            [ SET DATA ]
          </button>
        </div>
        
        <p className="text-[10px] sm:text-xs font-bold text-red-600 mt-3 bg-red-100 px-3 py-1 border-2 border-red-600 uppercase text-center">
          * INFO: Maksimal 15 Angka | Batas Nilai: 1 s.d 999 (Tinggi visual otomatis diskala)
        </p>

      </div>

    </div>
  );
}