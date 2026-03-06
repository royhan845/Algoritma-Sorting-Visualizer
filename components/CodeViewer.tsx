"use client";
import { useState, useRef, useEffect } from "react";

const CODE_DATA: any = {
  BUBBLE: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
  SELECTION: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}`
};

export default function CodeViewer({ stepHistory, algorithm }: { stepHistory: string[], algorithm: string }) {
  const [activeTab, setActiveTab] = useState("KODE");
  const logEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (activeTab === "LANGKAH" && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stepHistory, activeTab]);

  return (
    <div className="w-full lg:w-1/3 h-[50vh] border-4 border-black bg-[#1e1e2f] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
      <div className="flex border-b-4 border-black bg-white">
        <button onClick={() => setActiveTab("KODE")} className={`flex-1 font-bold py-2 border-r-4 border-black uppercase ${activeTab === "KODE" ? "bg-[#4ade80]" : "hover:bg-gray-200"}`}>[ KODE ]</button>
        <button onClick={() => setActiveTab("LANGKAH")} className={`flex-1 font-bold py-2 uppercase ${activeTab === "LANGKAH" ? "bg-[#fef08a]" : "hover:bg-gray-200"}`}>[ LANGKAH ]</button>
      </div>

      <div className="overflow-y-auto flex-1 custom-scrollbar p-4">
        {activeTab === "KODE" ? (
          <pre className="text-[10px] sm:text-xs text-white font-mono leading-loose">{CODE_DATA[algorithm]}</pre>
        ) : (
          <div className="text-[10px] sm:text-xs font-mono flex flex-col gap-2">
            {stepHistory.length === 0 && <p className="text-gray-400 italic">Belum ada langkah...</p>}
            {stepHistory.map((step, idx) => (
              <p key={idx} className={`${step.includes('SWAP') || step.includes('TUKAR') ? 'text-[#ef4444]' : step.includes('AWAL') || step.includes('SELESAI') ? 'text-[#4ade80] font-bold' : step.includes('Array sementara') ? 'text-[#fef08a] mt-1 mb-2 border-b border-gray-600 pb-1' : 'text-gray-300'}`}>
                {step}
              </p>
            ))}
            <div ref={logEndRef} /> 
          </div>
        )}
      </div>
    </div>
  );
}