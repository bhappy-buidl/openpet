"use client";
import { useState } from "react";

const pets = [
  { name: "buddy", signed: true },
  { name: "candus", signed: false },
  { name: "kitty", signed: false },
];

export default function MyPets() {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col place-content-center min-w-full max-w-screen-2xl">
      <div className="flex flex-row justify-between relative">
        <h1 className="text-7xl">My Pets</h1>
        <div className="absolute bottom-1 right-0">
          {pets.length ? <AddPetsButton /> : null}
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {pets.length ? (
            pets.map((pet) => <PetDisplayTile key={pet.name} name={pet.name} />)
          ) : (
            <div>
              You have no pets currently. Add one here. <AddPetsButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type PetDisplayTileProps = {
  name: string;
};

function PetDisplayTile({ name }: PetDisplayTileProps) {
  return (
    <div className="border-2 flex flex-col p-2 rounded-br-lg">
      <h2 className="text-5xl">{name}</h2>
      <h3>Attributes</h3>
    </div>
  );
}

function AddPetsButton() {
  return (
    <button className="bg-indigo-500 rounded-br-lg p-2 px-4 hover:bg-indigo-400 text-white">
      Add Pet
    </button>
  );
}

{
  /* <dialog className="border-2" open={openForm}>
<p>Greetings, one and all!</p>
<form method="dialog">
  <button onClick={() => setOpenForm(false)}>OK</button>
</form>
</dialog>
<button onClick={() => setOpenForm(true)}>Open Dialogue!</button> */
}
