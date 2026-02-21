import React,{ useState,useEffect } from "react";
import './sortingVisualizer.css';
import Sidebar from "../sidebar.jsx";
import { getBubbleSortAnimations,getMergeSortAnimations,getQuickSortAnimations,getHeapSortAnimations,getInsertionSortAnimations } from "./sortingAlgorithms.js";

function SortingVisualizer() {
    const [array, setarray] = useState([]);
    const [selectedAlgo, setSelectedAlgo] = useState('bubble');
    const [speed, setSpeed] = useState(10);
    const [isSorting, setIsSorting] = useState(false);
    const [isCompareMode,setIsCompareMode] = useState(false);
    const [arrayTwo,setArrayTwo] = useState([]);
    const [selectedAlgoTwo,setSelectedAlgoTwo] = useState('merge');

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    function resetArray() {
        if(isSorting) return;
        const Newarray = [];
        for (let i = 0; i < 50; i++) {
            Newarray.push(randomIntFromInterval(5, 500));
        }
        setarray(Newarray);
        setArrayTwo([...Newarray]);
    }
    useEffect(() => {resetArray();}, []);
    const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);

    // Logic for the first array
    let animations1 = [];
    if (selectedAlgo === 'bubble') animations1 = getBubbleSortAnimations(array);
    else if (selectedAlgo === 'merge') animations1 = getMergeSortAnimations(array);
    else if (selectedAlgo === 'quick') animations1 = getQuickSortAnimations(array);
    else if (selectedAlgo === 'heap') animations1 = getHeapSortAnimations(array);
    else if (selectedAlgo === 'insertion') animations1 = getInsertionSortAnimations(array);
    
    animate(animations1, 'container-1');

    // Logic for the second array (only if in compare mode)
    if (isCompareMode) {
        let animations2 = [];
        if (selectedAlgoTwo === 'bubble') animations2 = getBubbleSortAnimations(arrayTwo);
        else if (selectedAlgoTwo === 'merge') animations2 = getMergeSortAnimations(arrayTwo);
        else if (selectedAlgoTwo === 'quick') animations2 = getQuickSortAnimations(arrayTwo);
        else if (selectedAlgoTwo === 'heap') animations2 = getHeapSortAnimations(arrayTwo);
        else if (selectedAlgoTwo === 'insertion') animations2 = getInsertionSortAnimations(arrayTwo);
        animate(animations2, 'container-2');
    }
};
    const animate = (animations, containerId) => {
    // Get only the bars inside the specific container
    const container = document.getElementById(containerId);
    const arrayBars = container.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const action = animations[i];
        const delay = i * (250 / speed);
        
        setTimeout(() => {
            if (action.type === "color") {
                const [barOneIdx, barTwoIdx] = action.indices;
                arrayBars[barOneIdx].style.backgroundColor = action.color;
                // If the second index exists (for swaps)
                if(arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.backgroundColor = action.color;
            } else if (action.type === "height") {
                arrayBars[action.index].style.height = `${action.newHeight}px`;
            }
            
            if (i === animations.length - 1 && !isCompareMode) {
                setIsSorting(false);
            }
        }, delay);
    }
};
    return (
        <div className="app-container" style={{display:'flex'}}>
        <Sidebar 
                resetArray={resetArray}
                handleSort={handleSort}
                selectedAlgo={selectedAlgo}
                setSelectedAlgo={setSelectedAlgo}
                speed={speed}
                setSpeed={setSpeed}
                isCompareMode={isCompareMode}
                setIsCompareMode={setIsCompareMode}
                selectedAlgoTwo={selectedAlgoTwo}
                setSelectedAlgoTwo={setSelectedAlgoTwo}
            />
        <div className="visualizer-main" style={{ 
    flex: 1,           
    display: 'flex', 
    height: '100vh',   
    overflow: 'hidden' 
}}>
            <div id="container-1" className={isCompareMode ? "array-container-compare" : "array-container"}>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
                ))}
            </div>
            {isCompareMode && (
                <div id="container-2" className="array-container-compare">
                    {arrayTwo.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
}
export default SortingVisualizer;
