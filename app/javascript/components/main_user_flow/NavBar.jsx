import React from 'react';

function NavBar({screen, number, reset}) {
    if(screen === 'getNumber') {
        return null;
    }


    return (
        <div className="mt-2 p-3 border border-gray-100 rounded w-full flex justify-between items-center">
            <span>Customer: {number}</span>
            <button onClick={reset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reset</button>
        </div>
    );
}

export default NavBar;