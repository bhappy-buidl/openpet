"use client";

import { useState, useRef } from "react";

export function PetInputForm() {
  const [name, setName] = useState<string>();
  const [photo, setPhoto] = useState<any>();
  const [description, setDescription] = useState<string>();
  const [species, setSpecies] = useState<string>();
  const [breed, setBreed] = useState<string>();
  const [markings, setMarkings] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [spayed, setSpayed] = useState<boolean>(false);
  const [microchipNumber, setMicrochipNumber] = useState<string>();

  const imageInputRef = useRef(null);

  return (
    <form className="flex flex-col border-2 p-8">
      <label htmlFor="name">Name</label>
      <input
        required
        id="name"
        className="border-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="photo">Photo</label>
      <input
        accept="image/*"
        ref={imageInputRef}
        type="file"
        required
        id="photo"
        className="border-2"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPhoto(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }
        }}
      />
      {photo && <img src={photo} />}
      <label htmlFor="description">Description</label>
      <input
        required
        id="description"
        className="border-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="species">Species</label>
      <input
        required
        id="species"
        className="border-2"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />
      <label htmlFor="breed">Breed</label>
      <input
        required
        id="breed"
        className="border-2"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />
      <label htmlFor="markings">Markings</label>
      <input
        required
        id="markings"
        className="border-2"
        value={markings}
        onChange={(e) => setMarkings(e.target.value)}
      />
      <div>
        <label htmlFor="male">Male</label>
        <input
          name="gender"
          id="male"
          value="male"
          className=""
          type="radio"
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="female">Female</label>
        <input
          name="gender"
          id="female"
          value="female"
          className=""
          type="radio"
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <label htmlFor="spayed">Spayed</label>
      <input
        required
        type="checkbox"
        id="spayed"
        checked={spayed}
        className="border-2"
        onChange={(e) => setSpayed(e.target.checked)}
      />
      <label htmlFor="microchipNumber">Microchip Number</label>
      <input
        required
        id="microchipNumber"
        className="border-2"
        value={microchipNumber}
        onChange={(e) => setMicrochipNumber(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
