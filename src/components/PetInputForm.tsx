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
    <form className="flex flex-col border-2 p-8">
      <label htmlFor="vaccine">Vaccine</label>
      <input
        required
        id="vaccine"
        className="border-2"
        value={vaccine}
        onChange={(e) => setVaccine(e.target.value)}
      />
      <label htmlFor="vaccineDate">Vaccination Date</label>
      <input
        required
        type="date"
        id="vaccineDate"
        className="border-2"
        value={vaccineDate}
        onChange={(e) => setVaccineDate(e.target.value)}
      />
      <label htmlFor="vaccineRoute">Vaccination Route</label>
      <select
        required
        id="vaccineRoute"
        className="border-2"
        value={vaccineRoute}
        onChange={(e) => setVaccineRoute(e.target.value)}
      >
        <option value="oral">Oral</option>
        <option value="supq">Supq</option>
      </select>
      <label htmlFor="expirationDate">Expiration Date</label>
      <input
        required
        type="date"
        id="expirationDate"
        className="border-2"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <label htmlFor="vet">Vet</label>
      <input
        required
        id="vet"
        className="border-2"
        value={vet}
        onChange={(e) => setVet(e.target.value)}
      />
      <label htmlFor="clinic">Clinic</label>
      <input
        required
        id="clinic"
        className="border-2"
        value={clinic}
        onChange={(e) => setClinic(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
