import React from 'react';
import './Sidebar.css';

const Sidebar = ({ 
    resetArray, 
    handleSort, 
    selectedAlgo, 
    setSelectedAlgo,
    speed,
    setSpeed,
    isCompareMode,
    setIsCompareMode,
    selectedAlgoTwo,
    setSelectedAlgoTwo
}) => {
    const algorithms = [
        { name: 'Bubble Sort', value: 'bubble' },
        { name: 'Merge Sort', value: 'merge' },
        { name: 'Quick Sort', value: 'quick'} ,
        { name: 'Insertion Sort', value: 'insertion' },
        { name: 'Heap Sort', value: 'heap' },
    ];

    return (
    <div className="sidebar">
        <h2 className="app-title">AlgoVisualizer</h2>
        
        {/* Restore this so you can refresh the array! */}
        <div className="control-group">
            <button className="btn-generate" onClick={resetArray}>
                Generate New Array
            </button>
        </div>

        <div className="control-group">
            <button className="btn-generate" onClick={() => setIsCompareMode(!isCompareMode)}>
                {isCompareMode ? "Exit Compare" : "Compare Algorithms"}
            </button>
        </div>

        {/* Algo 1 Selection */}
        <div className="control-group">
            <label>Algorithm 1</label>
            {algorithms.map((algo) => (
                <button 
                    key={algo.value}
                    className={`algo-btn ${selectedAlgo === algo.value ? 'active' : ''}`}
                    onClick={() => setSelectedAlgo(algo.value)}
                >
                    {algo.name}
                </button>
            ))}
        </div>

        {/* Algo 2 Selection (Compare Mode Only) */}
        {isCompareMode && (
            <div className="control-group">
                <label>Algorithm 2</label>
                {algorithms.map((algo) => (
                    <button 
                        key={algo.value}
                        className={`algo-btn ${selectedAlgoTwo === algo.value ? 'active' : ''}`}
                        onClick={() => setSelectedAlgoTwo(algo.value)}
                    >
                        {algo.name}
                    </button>
                ))}
            </div>
        )}

        <div className="control-group">
            <label>Speed: {speed}ms</label>
            <input type="range" min="5" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        </div>

        <button className="btn-sort" onClick={handleSort}>Start Sorting</button>
    </div>
);
};

export default Sidebar;