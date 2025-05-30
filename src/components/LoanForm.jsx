
import React from "react";
import { useState } from 'react';


export default function LoanForm() {

// Form input fields
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [age, setAge] = useState('');
const [salaryRange, setSalaryRange] = useState('');
const [loanAmount, setLoanAmount] = useState('');
const [loanPurpose, setLoanPurpose] = useState('');
const [repaymentYears, setRepaymentYears] = useState('');
const [comments, setComments] = useState('');

// Employment checkboxes
const [isYesChecked, setIsYesChecked] = useState(false);
const [isNoChecked, setIsNoChecked] = useState(false);

// Error messages
const [errors, setErrors] = useState({});

const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);



// Validates the form and handles submission
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent page reload

  const newErrors = {};

  // Validate required fields
  if (!name.trim()) newErrors.name = "Name is required.";
  if (!phone.trim()) newErrors.phone = "Phone number is required.";
  if (!age.trim()) newErrors.age = "Age is required.";
  if (!salaryRange) newErrors.salaryRange = "Please select a salary range.";
  if (!loanAmount) newErrors.loanAmount = "Loan amount is required.";


  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    setLoading(true);
    
setTimeout(() => {
  const application = {
  name,
  phone,
  age,
  isEmployed: isYesChecked ? "Yes" : isNoChecked ? "No" : "",
  salaryRange,
  loanAmount,
  loanPurpose,
  repaymentYears,
  comments,
    
    };

  localStorage.setItem("loanApplication", JSON.stringify(application));
  console.log("Loan Application:", application);


  setSubmitted(true);

  setName('');
  setPhone('');
  setAge('');
  setIsYesChecked(false);
  setIsNoChecked(false);
  setSalaryRange('');
  setLoanAmount('');
  setLoanPurpose('');
  setRepaymentYears('');
  setComments('');
  setErrors({});
  setLoading(false);

    }, 1500);
}
};


    return (

<div className="bg-slate-100/70 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg max-w-sm sm:max-w-md md:max-w-lg w-full my-10 mx-auto">
    <h2 className="text-2xl font-bold text-center mb-1">Loan Application Form</h2>
    <p className="text-center text-gray-700 mb-3">
    Please fill in your personal and financial details below to apply for a loan.
    </p>

{submitted && (
  <div className="text-green-600 font-semibold text-center mb-4">
    Thank you for your application!
  </div>
)}


{/*NAME*/}
<form className="space-y-3" onSubmit={handleSubmit}>
  <div className="flex flex-col">
    <label htmlFor="name" className="mb-1 font-medium text-sm text-gray-900">Full Name: *</label>
    <input 
        type="text"
        id = "name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-1 rounded-xl border border-gray-300 bg-white text-gray-900
         focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    {errors.name && (
    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
  )}
  </div>
    
{/*PHONENUMBER*/}
  <div className="flex flex-col">
    <label htmlFor="phonenumber" className="mb-1 font-medium text-sm text-gray-900">Phone Number: *</label>
    <input 
    type="text" 
    id="phonenumber"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="p-1 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    {errors.phone && (
    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
  )}
  </div>

{/*AGE*/}
  <div className="flex flex-col">
    <label htmlFor="age" className="mb-1 font-medium text-sm text-gray-900">Age: *</label>
    <input 
    type="number" 
    id="age"
    min="18"
    max="100"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    className="p-1 rounded-xl border border-gray-300 bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    {errors.age && (
    <p className="text-red-600 text-sm mt-1">{errors.age}</p>
  )}
  </div>

{/*CURRENTLY EMPLOYED*/}
  <div className="flex flex-col">
  <label htmlFor="isEmployed" className="mb-1 font-medium text-sm text-gray-900">
    Currently Employed?
  </label>
  <div className="flex gap-4">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isYesChecked}
        onChange={(e) => setIsYesChecked(e.target.checked)}
        className="w-4 h-4 accent-gray-600 rounded"
      />
      <span className="text-sm text-gray-900">Yes</span>
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isNoChecked}
        onChange={(e) => setIsNoChecked(e.target.checked)}
        className="w-4 h-4 accent-gray-600 rounded"
      />
      <span className="text-sm text-gray-900">No</span>
    </label>
  </div>
</div>

{/*SALARY RANGE*/}
  <div className="flex flex-col">
    <label htmlFor="salaryRange" className="mb-1 font-medium text-sm text-gray-900">Monthly Salary Range:</label>
    <select
    id="salaryRange"
    value={salaryRange}
    onChange={(e) => setSalaryRange(e.target.value)}
    className="p-2 rounded-xl border border-gray-300 font-medium text-sm bg-white text-gray-600
    focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
        <option value="">-- Select Salary Range --</option>
        <option value="less500">Less than $500</option>
        <option value="500to1000">$500 - $1000</option>
        <option value="1000to2000">$1000 - $2000</option>
        <option value="more2000">More than $2000</option>
    </select>

    
    {salaryRange === "less500" && (
  <p className="text-yellow-600 text-sm mt-1">
    Note: Lower income may affect your application.
  </p>
    )}

  </div>

{/*LOAN AMOUNT*/}
  <div className="flex flex-col">
    <label htmlFor="loanAmount" className="mb-1 font-medium text-sm text-gray-900">Requested Loan Amount:</label>
    <input 
    type="number"
    min="1000"
    max="10000000"
    id="loanAmount"
    value={loanAmount}
    onChange={(e) => setLoanAmount(e.target.value)}
    className="p-1 rounded-xl border border-gray-300 bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-gray-400 no-spinner"
    />
  </div>

{/*LOAN PURPOSE*/}
  <div className="flex flex-col">
    <label htmlFor="loanPurpose" className="mb-1 font-medium text-sm text-gray-900">Purpose of Loan:</label>
    <input type="text" 
    id="purpose"
    value={loanPurpose}
    onChange={(e) => setLoanPurpose(e.target.value)}
    className="p-1 rounded-xl border border-gray-300 bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  </div>

{/*REPAYMENT YEARS*/}
  <div className="flex flex-col">
    <label htmlFor="repaymentYears" className="mb-1 font-medium text-sm text-gray-900">Repayment Period (years):</label>
    <input type="number"
     id="repaymentYears"
     min="1"
     max="10"
     value={repaymentYears}
     onChange={(e) => setRepaymentYears(e.target.value)}
     className="p-1 rounded-xl border border-gray-300 bg-white text-gray-900
     focus:outline-none focus:ring-2 focus:ring-gray-400"
     />
  </div>

{/*COMMENTS*/}
  <div className="flex flex-col">
    <label htmlFor="comments" className="mb-1 font-medium text-sm text-gray-900">Additional Comments:
    </label>
    <textarea 
    id="comments" 
    rows={4}
    cols={40}
    value={comments}
    onChange={(e) => setComments(e.target.value)}
    className="p-1 rounded-xl border border-gray-300 bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  </div>
    
{/*Button shows loading text and is disabled while submitting*/}
<button
  type="submit"
  className="mt-4 w-1/3 mx-auto block bg-gray-400 text-white py-2 rounded-full hover:bg-gray-600 transition"
  disabled={loading} 
>
  {loading ? (
    <span className="animate-pulse">Sending...</span>
  ) : (
    "SEND"
  )}
</button>
</form>
</div>
    
)}
