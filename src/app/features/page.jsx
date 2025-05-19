import React from 'react';

const page = () => {
    return (
        <div className="h-[119vh] w-full bg-[#f5f7fa] px-8 py-8">
            {/* Header */}
            <div className="text-center">
                <h1 className=" text-[40px] md:text-[60px] lg:text-[78px] tracking-tight font-extrabold leading-none">Features of Goal Tracker</h1>
                <p className="text-[20px] mt-3 text-black">
                    The app blends power with simplicity, offering needed depth.
                </p>
            </div>

            {/* Education Section */}
            <div className="mt-20 w-screen h-full bg-white py-5 px-12 flex flex-col items-start gap-6 ml-[-32px]">

                <div className="flex items-start gap-3">
                    <span className="text-[60px]">🗃️</span> {/* Brain emoji */}

                    <div className="w-full">
                        <h2 className="text-[38px] font-extrabold tracking-tight text-black">Intractive Task Cards</h2>
                        <ul className="mt-4 text-[19px] font-semibold text-black leading-snug list-inside pl-0">
                            <li className="pl-0">Hover effects</li>
                            <li className="pl-0"> Progress indicators</li>
                            <li className="pl-0">Priority color coding</li>
                            <li className="pl-0">Compact information display</li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-[60px]">😎</span> {/* Brain emoji */}

                    <div className="w-full">
                        <h2 className="text-[38px] font-extrabold tracking-tight text-black">Smart Defaults</h2>
                        <ul className="mt-4 text-[19px] font-semibold text-black leading-snug list-inside pl-0">
                            <li className="pl-0">Medium priority default</li>
                            <li className="pl-0"> Today's date update</li>
                            <li className="pl-0"> Empty state guidance
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="flex items-start gap-3">
                    <span className="text-[60px]">💀</span> {/* Brain emoji */}

                    <div className="w-full">
                        <h2 className="text-[38px] font-extrabold tracking-tight text-black">Error Prevention</h2>
                        <ul className="mt-4 text-[19px] font-semibold text-black leading-snug list-inside pl-0">
                            <li className="pl-0">Delete confirmations</li>
                            <li className="pl-0">Form validation</li>
                            <li className="pl-0">Helpful empty states</li>
                        </ul>
                    </div>
                </div>


                <div className="flex items-start gap-3">
                    <span className="text-[66px]">👀</span> {/* Brain emoji */}

                    <div className="w-full">
                        <h2 className="text-[38px] font-extrabold tracking-tight text-black">Visual Feedback</h2>
                        <ul className="mt-4 text-[19px] font-semibold text-black leading-snug list-inside pl-0">
                            <li className="pl-0">Animated transitions</li>
                            <li className="pl-0">Success/error states</li>
                            <li className="pl-0">Loading indicators</li>
                            <li className="pl-0">Interactive elements
</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default page;