"use client";
import { useState } from "react";
import { PetInputForm } from "@/components/PetInputForm";

//Dummy data to build out the UI without fetching
const pets = [
  {
    name: "buddy",
    signed: true,
    image:
      "https://images.pexels.com/photos/3090875/pexels-photo-3090875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "candus",
    signed: false,
    image:
      "https://images.pexels.com/photos/982300/pexels-photo-982300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "kitty",
    signed: false,
    image:
      "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function MyPets() {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col place-content-center min-w-full max-w-screen-2xl">
      <div className="flex flex-row justify-between relative">
        <h1 className="text-7xl">My Pets</h1>
        <div className="absolute bottom-1 right-0">
          {pets.length ? (
            <AddPetsButton onClickHandler={(e) => setOpenForm(!openForm)} />
          ) : null}
        </div>
      </div>
      <dialog className="border-2 w-full" open={openForm}>
        <div className="relative">
          <button
            onClick={() => setOpenForm(false)}
            className="absolute top-1 right-2"
          >
            x
          </button>
          <PetInputForm />
        </div>
      </dialog>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {pets.length ? (
            pets.map((pet) => <PetDisplayTile key={pet.name} name={pet.name} />)
          ) : (
            <div>
              You have no pets currently. Add one here.{" "}
              <AddPetsButton onClickHandler={(e) => setOpenForm(!openForm)} />
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

type AddPetsButtonProps = {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
};

function AddPetsButton({ onClickHandler }: AddPetsButtonProps) {
  return (
    <button
      onClick={onClickHandler}
      className="bg-indigo-500 rounded-br-lg p-2 px-4 hover:bg-indigo-400 text-white"
    >
      Add Pet
    </button>
  );
}
