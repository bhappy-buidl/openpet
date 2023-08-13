"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const DoctorReviewForm: React.FC = () => {
  const sigCanvas = useRef(null);

  const clearSignature = () => {
    if (sigCanvas.current) {
      // @ts-ignore some issue with ts here not sure why
      sigCanvas.current.clear();
    }
  };
  const saveSignature = () => {
    if (sigCanvas.current) {
      // @ts-ignore some issue with ts here not sure why
      const signature = sigCanvas.current.toDataURL();
      console.log(signature);
      setFormData({ ...formData, signature: signature });
    }
  };

  type Vaccination = {
    date: string;
    vaxName: string;
    route: string;
    duration: string;
  };

  type Test = {
    name: string;
    result?: string;
  };

  type Pet = {
    name: string;
    description: string;
    species: string;
    breed: string;
    color: string;
    gender: string;
    spayedOrNeutered: string;
    microchipNumber: string;
    photo?: any; // You can replace 'any' with the appropriate type for photos
    vax: Vaccination[];
    tests: Test[];
    doctorLicenseNumber: string;
    signature: string;
  };

  const [formData, setFormData] = useState<Pet>({
    name: "Buddy",
    description: "Friendly and playful cat",
    species: "Cat",
    breed: "Maine Coon",
    color: "Brown Tabby",
    gender: "Male",
    spayedOrNeutered: "Neutered",
    microchipNumber: "123456789",
    vax: [
      {
        date: "2022-01-01",
        vaxName: "Rabies",
        route: "Oral",
        duration: "1 Year",
      },
      {
        date: "2022-06-15",
        vaxName: "FVRCP",
        route: "Subq",
        duration: "3 Years",
      },
    ],
    tests: [
      { name: "Feline AIDS", result: "Negative" },
      { name: "Feline Leukemia", result: "Negative" },
      { name: "Heart Worm", result: "Negative" },
    ],
    doctorLicenseNumber: "DVM-12345",
    signature: "Dr. Jane Smith",
  });

  // Placeholder for vaccination history and tests
  const vaxHistory = [
    {
      date: "2022-01-01",
      vaxName: "Rabies",
      route: "Oral",
      duration: "1 Year",
    },
  ];
  const tests = [
    { name: "Feline AIDS" },
    { name: "Feline Leukemia" },
    { name: "Heart Worm" },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    saveSignature();
    // Handle your blockchain logic here
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-300 relative font-sans">
      <h1 className="text-center text-3xl font-semibold mb-6">
        Pet Health Certificate
      </h1>
      <div className="mb-6">
        <img
          src="https://images.unsplash.com/photo-1561948955-570b270e7c36"
          alt="Pet"
          className="w-32 mx-auto rounded shadow-lg"
        />
        <div className="grid grid-cols-2 gap-4 text-lg py-4">
          <div>Name: {formData.name}</div>
          <div>Description: {formData.description}</div>
          <div>Species: {formData.species}</div>
          <div>Breed: {formData.breed}</div>
          <div>Color/Markings: {formData.color}</div>
          <div>Gender: {formData.gender}</div>
          <div>Spayed or Neutered: {formData.spayedOrNeutered}</div>
          <div>Microchip Number: {formData.microchipNumber}</div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Vaccination History</h2>
        {formData.vax.map((vax, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 gap-2 mb-2 text-md border-b pb-2"
          >
            <div>Date: {vax.date}</div>
            <div>Name: {vax.vaxName}</div>
            <div>Route: {vax.route}</div>
            <div>Duration: {vax.duration}</div>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Tests</h2>
        {formData.tests.map((test, idx) => (
          <div
            key={idx}
            className="grid grid-cols-2 gap-2 mb-2 text-md border-b pb-2"
          >
            <div>{test.name}</div>
            <div>Result: {test.result}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label className="text-lg font-medium mb-2">
          Doctors License Number:
        </label>
        <input
          type="text"
          className="p-2 border rounded w-full mb-4 text-md"
          value={formData.doctorLicenseNumber}
          onChange={(e) =>
            setFormData({ ...formData, doctorLicenseNumber: e.target.value })
          }
        />

        <div className="mb-4 flex flex-col items-center">
          <h2 className="mb-2">Signature</h2>
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className:
                "signature-canvas w-64 h-20 border rounded border-gray-300",
            }}
          />
          <div className="flex space-x-2 mt-4">
            <button
              type="button"
              onClick={clearSignature}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign & Finalize Certificate
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorReviewForm;
