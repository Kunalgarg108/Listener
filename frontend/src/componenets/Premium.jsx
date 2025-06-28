import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuBellDot } from "react-icons/lu";
function Premium() {
   const benefits = [
    "Ad-free music listening",
    "Download to listen offline",
    "Play songs in any order",
    "High audio quality",
    "Listen with friends in real time",
    "Organize listening queue",
    "Listening insights (not in Mini)",
  ];
    const paymentMethods = [
    { name: "Paytm" },
    { name: "BHIM" },
    { name: "Visa" },
    { name: "Amex" },
  ];
  const freePlan = [false, false, false, false, false, false, false];
  const premiumPlan = [true, true, true, true, true, true, true];

  return (
    <>
        <section className="text-white p-8 rounded-lg max-w-4xl mx-auto my-8 text-center space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Try 1 months of Premium for ₹19.00</h1>
        <h2 className="text-lg text-gray-300">Only ₹29/month after. Cancel anytime.</h2>
      </header>

      <div className="flex items-center justify-center gap-2 text-blue-400">
        <LuBellDot className='text-3xl'/>
        <p className="text-sm">Offer ends in 3 days</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a
          href=""
          className="bg-blue-500 text-black font-semibold px-6 py-3 rounded hover:bg-blue-400 transition"
        >
          Try 1 month for ₹19
        </a>
        <a
          href="#plans"
          className="bg-black border border-white text-white font-semibold px-6 py-3 rounded hover:bg-gray-900 transition"
        >
          View all plans
        </a>
      </div>

      {/* Legal Disclaimer */}
      <p className="text-xs text-gray-400 max-w-2xl mx-auto">
        Premium Individual only. ₹19 for 1 month, then ₹29 per month after. Offer only available if you haven't tried Premium before.{' '}
        <a href="" className="underline">
          Terms apply.
        </a>
        <br />
        Offer ends July 29, 2025.
      </p>
    </section>
    <hr />
        <section className=" text-white p-8 rounded-lg max-w-5xl mx-auto my-12">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Experience the difference</h2>
        <h3 className="text-lg text-gray-300">
          Go Premium and enjoy full control of your listening. Cancel anytime.
        </h3>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-4">What you'll get</th>
              <th className="p-4 text-center">Free plan</th>
              <th className="p-4 text-center">Premium plans</th>
            </tr>
          </thead>
          <tbody>
            {benefits.map((benefit, index) => (
              <tr key={index} className="border-b border-gray-800">
                <th className="p-4 font-medium">{benefit}</th>
                <td className="p-4 text-center">
                  {freePlan[index] ? (
                    <span role="img" aria-label="Yes">
                      ✅
                    </span>
                  ) : (
                    <span role="img" aria-label="No">
                      ❌
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {premiumPlan[index] ? (
                    <span role="img" aria-label="Yes">
                      ✅
                    </span>
                  ) : (
                    <span role="img" aria-label="No">
                      ❌
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    <hr />
     <section className=" text-white p-8 rounded-lg max-w-6xl mx-auto my-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Affordable plans for any situation</h2>
        <h3 className="text-lg text-gray-300">
          Choose a Premium plan and listen to ad-free music without limits on your phone, speaker, and other devices. Pay in various ways. Cancel anytime.
        </h3>
      </header>

      {/* Payment Methods */}
      <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
        {paymentMethods.slice(0, 4).map((method, idx) => (
          <div
            key={idx}
            className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-sm font-semibold"
          >
            {method.name}
          </div>
        ))}

        <div className="relative group">
          <div className="absolute hidden group-hover:flex flex-wrap gap-3 bg-gray-900 p-4 rounded-lg mt-2 shadow-lg">
          </div>
        </div>
      </div>

      {/* All Premium Benefits Aside */}
      <aside className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">All Premium plans include</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="before:content-['✔️'] before:mr-2">
              {benefit}
            </li>
          ))}
        </ul>
      </aside>
    </section>
    </>
  );
}

export default Premium
