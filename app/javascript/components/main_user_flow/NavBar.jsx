import React from 'react';

function NavBar({screen, number, reset}) {
    if(screen === 'getNumber') {
        return null;
    }


    return (
        <div className="mt-2 w-full flex justify-between items-center p-1">
            <input
                className="w-3/4 text-2xl border rounded mr-2 p-2 bg-white"
                type="number"
                value={number}
                autoFocus
                disabled
            />
            <button onClick={reset} className="bg-transparent border border-gray-100 text-white p-2 text-2xl rounded">RESET</button>
        </div>
    );
}

export default NavBar;