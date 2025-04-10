import React from 'react';
import HomeImg from '../assets/Home2.jpg';
const Team = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Why Choose Jeevika?
                        </h2>
                        <ul className="mb-4 list-disc pl-5">
                            <li>✅ Verified & Skilled Workers – Handpicked from trusted sources.</li>
                            <li>✅ Hassle-Free Hiring – No fake resumes, no placement fees until you're satisfied.</li>
                            <li>✅ Worker Welfare – Monthly benefits for worker retention and satisfaction.</li>
                        </ul>
                        <ul className="list-disc pl-5">
                            <li>✅ Looking for workers? Find the right talent now.</li>
                            <li>✅ Want a job? Apply with Jeevika today. Your workforce partner for a stronger business.</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-8">
                        <img className="w-full rounded-lg" src={HomeImg} alt="office content 1"/>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Team;