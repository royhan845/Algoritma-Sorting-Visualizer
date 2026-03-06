"use client";

import { useState, useEffect, useRef, Suspense } from "react"; 
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import SortBlock from "@/components/SortBlock";
import ControlPanel from "@/components/ControlPanel";
import TerminalLog from "@/components/TerminalLog";
import AlgorithmInfo from "@/components/AlgorithmInfo";
import CodeViewer from "@/components/CodeViewer";

export default function Home() {
  const [arrayData, setArrayData] = useState<{id: string, value: number}[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [status, setStatus] = useState("SISTEM SIAP. Silakan acak data atau mulai sorting.");
  
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [stepHistory, setStepHistory] = useState<string[]>([]);
  const [algorithm, setAlgorithm] = useState("BUBBLE"); 
  
  const [customInput, setCustomInput] = useState("");
  
  const [speedUI, setSpeedUI] = useState(400); 
  const speedRef = useRef(400); 

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value);
    setSpeedUI(newSpeed);
    speedRef.current = newSpeed;
  };

  const addStep = (text: string) => setStepHistory((prev) => [...prev, text]);

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: 10 }, () => ({
      id: Math.random().toString(36).substring(2, 9), 
      value: Math.floor(Math.random() * 10) + 1
    }));
    setArrayData(newArray);
    setActiveIndices([]);
    setStatus(`DATA DIACAK. Algoritma terpilih: ${algorithm} SORT.`);
    setComparisons(0);
    setSwaps(0);
    setStepHistory([`[ AWAL ] Array Acak: [${newArray.map(a => a.value).join(", ")}]`]);
    setCustomInput("");
  };

  const handleSetCustomData = () => {
    if (isSorting) return;

    // 1. Bersihkan input dan ubah ke array angka (Batas dilonggarkan sampai 999)
    let parsed = customInput
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && n > 0 && n <= 999);

    // 2. Validasi jumlah
    if (parsed.length < 2) {
      setStatus("> ERROR: Masukkan minimal 2 angka valid (1-999), pisahkan dengan koma.");
      return;
    }
    if (parsed.length > 15) {
      setStatus("> PERINGATAN: Maksimal 15 angka agar kanvas tidak sesak. Data dipotong.");
      parsed = parsed.slice(0, 15);
    }

    // 3. Jadikan Balok 3D
    const newArray = parsed.map((val) => ({
      id: Math.random().toString(36).substring(2, 9),
      value: val
    }));

    setArrayData(newArray);
    setActiveIndices([]);
    setStatus(`DATA MANUAL BERHASIL DISET. Array: [${parsed.join(", ")}]`);
    setComparisons(0);
    setSwaps(0);
    setStepHistory([`[ AWAL ] Array Manual: [${parsed.join(", ")}]`]);
  };

  useEffect(() => { generateRandomArray(); }, []);

  const sleep = () => new Promise((resolve) => setTimeout(resolve, speedRef.current));

  const bubbleSort = async () => {
    setStatus("MEMULAI BUBBLE SORT...");
    addStep("\n[ MEMULAI BUBBLE SORT ]");
    let arr = [...arrayData];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      addStep(`\n--- Putaran ke-${i + 1} ---`);
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        setStatus(`Membandingkan [${arr[j].value}] dengan [${arr[j+1].value}]...`);
        addStep(`Bandingkan [${j}] & [${j+1}] -> (${arr[j].value} vs ${arr[j+1].value})`);
        setComparisons((prev) => prev + 1); 
        await sleep();

        if (arr[j].value > arr[j + 1].value) {
          setStatus(`${arr[j].value} LEBIH BESAR! Lakukan pertukaran (SWAP).`);
          addStep(`  ↳ ${arr[j].value} > ${arr[j+1].value}, lakukan SWAP!`);
          let temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
          setArrayData([...arr]);
          addStep(`  ↳ Array sementara: [${arr.map(a => a.value).join(", ")}]`);
          setSwaps((prev) => prev + 1); 
          await sleep(); 
        } else {
          setStatus(`${arr[j].value} AMAN. Lanjut...`);
          await sleep();
        }
      }
    }
  };

  const selectionSort = async () => {
    setStatus("MEMULAI SELECTION SORT...");
    addStep("\n[ MEMULAI SELECTION SORT ]");
    let arr = [...arrayData];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      addStep(`\n--- Putaran ke-${i + 1} ---`);
      addStep(`Asumsi nilai terkecil di indeks [${i}] (${arr[minIdx].value})`);

      for (let j = i + 1; j < n; j++) {
        setActiveIndices([minIdx, j]);
        setStatus(`Membandingkan Asumsi [${arr[minIdx].value}] dengan [${arr[j].value}]`);
        addStep(`Bandingkan Asumsi [${minIdx}] dgn [${j}] -> (${arr[minIdx].value} vs ${arr[j].value})`);
        setComparisons((prev) => prev + 1);
        await sleep();

        if (arr[j].value < arr[minIdx].value) {
          addStep(`  ↳ Ditemukan nilai lebih kecil! Asumsi pindah ke indeks [${j}]`);
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setActiveIndices([i, minIdx]);
        setStatus(`Menukar posisi awal [${arr[i].value}] dengan nilai terkecil [${arr[minIdx].value}]`);
        addStep(`  ↳ TUKAR posisi awal [${i}] dengan nilai terkecil [${minIdx}]`);
        let temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
        setArrayData([...arr]);
        setSwaps((prev) => prev + 1);
        addStep(`  ↳ Array sementara: [${arr.map(a => a.value).join(", ")}]`);
        await sleep();
      } else {
        addStep(`  ↳ Posisi awal [${i}] sudah nilai terkecil. Lewati.`);
        await sleep();
      }
    }
  };

  const runAlgorithm = async () => {
    if (isSorting) return;
    setIsSorting(true);
    if (algorithm === "BUBBLE") await bubbleSort();
    else if (algorithm === "SELECTION") await selectionSort();
    setActiveIndices([]);
    setStatus("SORTING SELESAI!");
    addStep("\n[ SELESAI ] Semua data telah terurut secara Ascending!");
    setIsSorting(false);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center tracking-widest text-[#0f172a] uppercase border-2 sm:border-4 border-black px-3 py-1 sm:px-4 sm:py-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        Algo-Visualizer 3D
      </h1>
      
      <ControlPanel 
        onRandomize={generateRandomArray}
        onSort={runAlgorithm}
        isSorting={isSorting}
        speedUI={speedUI}
        onSpeedChange={handleSpeedChange}
        algorithm={algorithm}
        onAlgorithmChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setAlgorithm(e.target.value);
          generateRandomArray(); 
        }}
        customInput={customInput}
        onCustomInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomInput(e.target.value)}
        onSetCustomData={handleSetCustomData}
      />

      <AlgorithmInfo comparisons={comparisons} swaps={swaps} algorithm={algorithm} />

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl mb-4">
        <div className="h-[50vh] w-full lg:w-2/3 border-4 border-black bg-[#1e1e2f] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Canvas camera={{ position: [0, 12, 18], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} />
              
              {(() => {
                // 1. Cari nilai paling besar di array saat ini (minimal 1 agar tidak error dibagi 0)
                const maxVal = Math.max(...arrayData.map(d => d.value), 1);
                
                // 2. Render balok dan kirimkan maxVal ke masing-masing komponen SortBlock
                return arrayData.map((item, index) => (
                  <SortBlock 
                    key={item.id} 
                    value={item.value} 
                    index={index} 
                    totalBlocks={arrayData.length} 
                    isActive={activeIndices.includes(index)} 
                    maxValue={maxVal} 
                  />
                ));
              })()}

              <gridHelper args={[20, 20, "#444455", "#222233"]} position={[0, 0, 0]} />
              <OrbitControls target={[0, 6, 0]} enablePan={true} />
            </Suspense>
          </Canvas>
        </div>
        <CodeViewer stepHistory={stepHistory} algorithm={algorithm} />
      </div>

      <TerminalLog status={status} />

      <footer className="mt-8 mb-2 text-center text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest border-t-2 border-dashed border-gray-400 pt-4 w-full max-w-5xl">
        &copy; {new Date().getFullYear()} ALGO-VISUALIZER 3D • DIBANGUN DENGAN NEXT.JS & THREE.JS
      </footer>

    </main>
  );
}