"use client";

import PetABI from "@/app/abi/OpenPetNFT.json";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getContract } from "viem";
import { useChainId } from "wagmi";
import { getWalletClient } from "wagmi/actions";
import { baseGoerli } from "wagmi/chains";

type PetInputFormProps = {
  setOpenForm: Dispatch<SetStateAction<boolean>>;
};

export function PetInputForm({ setOpenForm }: PetInputFormProps) {
  const [name, setName] = useState<string>();
  const [photo, setPhoto] = useState<any>();
  const [description, setDescription] = useState<string>();
  const [species, setSpecies] = useState<string>();
  const [breed, setBreed] = useState<string>();
  const [markings, setMarkings] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [spayed, setSpayed] = useState<boolean>(false);
  const [microchipNumber, setMicrochipNumber] = useState<string>();
  const [transactionId, setTransactionId] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const chainId = useChainId();

  useEffect(() => {
    async function mint() {
      const walletClient = await getWalletClient({
        chainId: baseGoerli.id,
      });

      const contract = getContract({
        address: "0xaB2D4c1892a9064d47252794e4810a8E098f04a2",
        abi: PetABI.abi,
        walletClient,
      });

      const hash = await contract.write.mintPet([name, transactionId]);
      return hash;
    }

    if (transactionId && name) {
      mint().then((hash) => console.log("transaction hash: ", hash));
    }
  }, [transactionId, name]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name || "Default Name");

    if (imageInputRef.current?.files?.length) {
      formData.append("photo", imageInputRef.current.files[0]);
    } else {
      console.log("no file added for pet photo");
    }

    formData.append("description", description || "Default Description");
    formData.append("species", species || "Default Species");
    formData.append("breed", breed || "Default Breed");
    formData.append("markings", markings || "Default Markings");
    formData.append("gender", gender || "Default Gender"); // Assuming gender is required, no default
    formData.append("spayed", spayed?.toString() || "false"); // Default to false if not checked
    formData.append(
      "microchipNumber",
      microchipNumber || "Default MicrochipNumber"
    );

    try {
      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      const r = await response.json();
      console.log("this is the response", r);

      if (response.ok) {
        setTransactionId(r.transactionId);
        setOpenForm(false);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle fetch error
    }
  };

  return (
    <div>
      <h1 className="pl-8 pt-8 text-4xl">Add Your Pet</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 grid grid-cols-2 gap-4"
      >
        <label htmlFor="name">Name</label>
        <input
          required
          id="name"
          className="border-2 rounded-lg"
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
          className=""
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
        <label htmlFor="description">Description</label>
        <input
          required
          id="description"
          className="border-2 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="species">Species</label>
        <input
          required
          id="species"
          className="border-2 rounded-lg"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />

        <label htmlFor="breed">Breed</label>
        <input
          required
          id="breed"
          className="border-2 rounded-lg"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />

        <label htmlFor="markings">Markings</label>
        <input
          required
          id="markings"
          className="border-2 rounded-lg"
          value={markings}
          onChange={(e) => setMarkings(e.target.value)}
        />
        <label>Gender:</label>
        <div className="flex flex-row gap-2">
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
        <label>Spayed?</label>
        <div className="flex flex-row gap-2">
          <label htmlFor="spayed">Spayed</label>
          <input
            type="checkbox"
            id="spayed"
            checked={spayed}
            className="border-2"
            onChange={(e) => setSpayed(e.target.checked)}
          />
        </div>
        <label htmlFor="microchipNumber">Microchip Number</label>
        <input
          id="microchipNumber"
          className="border-2 rounded-lg mb-10"
          value={microchipNumber}
          onChange={(e) => setMicrochipNumber(e.target.value)}
        />

        <button
          className="absolute bottom-2 right-2 text-sm bg-orange-500 rounded-lg p-2 px-4 hover:bg-orange-300 text-white button-grow drop-shadow-md"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
