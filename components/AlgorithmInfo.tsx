"use client";

const ALGO_DATA: any = {
  BUBBLE: {
    title: "BUBBLE SORT",
    desc: "Algoritma sederhana yang berulang kali membandingkan dua elemen berdekatan dan menukarnya (swap) jika urutannya salah. Mengapungkan nilai terbesar ke ujung kanan seperti gelembung.",
    time: "O(n²)",
    space: "O(1)"
  },
  SELECTION: {
    title: "SELECTION SORT",
    desc: "Algoritma yang membagi data jadi dua bagian (terurut & belum terurut). Ia mencari elemen TERKECIL dari bagian yang belum terurut, lalu memindahkannya ke depan.",
    time: "O(n²)",
    space: "O(1)"
  }
};

export default function AlgorithmInfo({ comparisons, swaps, algorithm }: { comparisons: number, swaps: number, algorithm: string }) {
  const data = ALGO_DATA[algorithm];

  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full max-w-5xl mb-4">
      <div className="flex-1 border-2 sm:border-4 border-black bg-white p-3 sm:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="font-bold text-base sm:text-xl border-b-2 sm:border-b-4 border-black pb-1 sm:pb-2 mb-2 uppercase text-blue-600">[ TEORI: {data.title} ]</h2>
        <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-gray-700 leading-relaxed">{data.desc}</p>
        <div className="mt-2 sm:mt-3">
          <p className="font-bold text-[10px] sm:text-xs mb-1 bg-black text-white inline-block px-2 py-1">&gt; RUMUS KOMPLEKSITAS:</p>
          <div className="text-[10px] sm:text-xs font-bold flex gap-2 sm:gap-4 mt-1">
            <p className="bg-gray-200 p-1 border-2 border-black">Waktu: {data.time}</p>
            <p className="bg-gray-200 p-1 border-2 border-black">Ruang: {data.space}</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 border-2 sm:border-4 border-black bg-[#fef08a] p-3 sm:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
        <h2 className="font-bold text-base sm:text-xl border-b-2 sm:border-b-4 border-black pb-1 sm:pb-2 mb-2 sm:mb-4 uppercase text-red-600">[ LIVE STATS ]</h2>
        <div className="text-sm sm:text-lg flex flex-col gap-1 sm:gap-2">
          <p className="flex justify-between border-b-2 border-dashed border-black pb-1"><span>Perbandingan:</span><span className="font-bold">{comparisons}</span></p>
          <p className="flex justify-between border-b-2 border-dashed border-black pb-1"><span>Pertukaran:</span><span className="font-bold text-red-600">{swaps}</span></p>
        </div>
      </div>
    </div>
  );
}