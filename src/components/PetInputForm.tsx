"use client";

import { useState } from "react";

export function PetInputForm() {
  const [vaccine, setVaccine] = useState<string>();
  const [vaccineDate, setVaccineDate] = useState<string>();
  const [vaccineRoute, setVaccineRoute] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [vet, setVet] = useState<string>();
  const [clinic, setClinic] = useState<string>();

  return (
    <form className="flex flex-col">
      <label htmlFor="vaccine">Vaccine:</label>
      <input
        id="vaccine"
        className="border-2"
        value={vaccine}
        onChange={(e) => setVaccine(e.target.value)}
      />
      <label htmlFor="vaccineDate">Vaccination Date</label>
      <input
        id="vaccineDate"
        className="border-2"
        value={vaccineDate}
        onChange={(e) => setVaccineDate(e.target.value)}
      />
      <label htmlFor="vaccineRoute">Vaccination Route</label>
      <input
        id="vaccineRoute"
        className="border-2"
        value={vaccineRoute}
        onChange={(e) => setVaccineRoute(e.target.value)}
      />
      <label htmlFor="expirationDate">Expiration Date</label>
      <input
        id="expirationDate"
        className="border-2"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <label htmlFor="vet">Vet</label>
      <input
        id="vet"
        className="border-2"
        value={vet}
        onChange={(e) => setVet(e.target.value)}
      />
      <label htmlFor="clinic">Clinic</label>
      <input
        id="clinic"
        className="border-2"
        value={clinic}
        onChange={(e) => setClinic(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Step 1: Pet characteristics
// Step 2: Choose from vaccines
// Step 3: Vaccination Date
// Step 4: Vaccination Route
// Step 5: Expiration date
// Step 6: Vet
// Step 7: Clinic
