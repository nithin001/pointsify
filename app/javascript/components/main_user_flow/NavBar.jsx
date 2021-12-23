import React from 'react';

function NavBar({screen, number, reset}) {
    if(screen === 'getNumber') {
        return null;
    }


    return (
        <div className="mt-4 w-full flex justify-between items-center p-1">
            <input
                className="w-3/4 text-2xl border rounded mr-2 p-2 bg-white"
                type="number"
                value={number}
                autoFocus
                disabled
            />
            <button onClick={reset} className="border rounded p-2 ml-2 bg-transparent text-white text-center shadow text-2xl">RESET</button>
        </div>
    );
}

export default NavBar;