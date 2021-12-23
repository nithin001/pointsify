import React from 'react';

function CustomerDetails({screen, setScreen}) {
    if(screen!== 'customerDetails') {
        return null;
    }

    return (
        <div className="font-sans">
        <div className="flex">
            <div className="w-1/2">
                <div
                    className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex-1">
                            <h3 className="font-bold text-3xl">3249</h3>
                            <h5 className="font-bold text-gray-500">Total Points</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <div
                    className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex-1">
                            <h3 className="font-bold text-3xl">5</h3>
                            <h5 className="font-bold text-gray-500">visits</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    <div className="w-full">
        <button onClick={()=>{setScreen('addBillAmount')}} className="w-full text-3xl border rounded mt-2 p-3 bg-gray-200 text-center shadow">
            Add Bill Amount</button>
        <button onClick={()=>{setScreen('redeemPoints')}} className="w-full text-3xl border rounded mt-2 p-3 bg-gray-200 text-center shadow">
            Redeem Points</button>
    </div></div>
    );
}

export default CustomerDetails;