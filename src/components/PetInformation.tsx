import { Dispatch, SetStateAction } from "react";

type PetInformationProps = {
  name: string;
  photo: string;
  description: string;
  species: string;
  breed: string;
  markings: string[];
  gender: string;
  spayed: boolean;
  microchip: string;
  setPetDisplayIndex: Dispatch<SetStateAction<number>>;
};

export function PetInformation({
  name,
  photo,
  description,
  species,
  breed,
  markings,
  gender,
  spayed,
  microchip,
  setPetDisplayIndex,
}: PetInformationProps) {
  return (
    <div className="flex flex-col items-center p-4 rounded-br-lg rounded-tl-lg shadow-md gap-4 relative min-h-screen">
      <button
        onClick={() => setPetDisplayIndex(-1)}
        className="absolute top-1 right-2 rounded-full border-2 py-1 px-2 button-grow"
      >
        ✖️
      </button>
      <div className="">
        <img
          className="object-cover rounded-full w-32 h-32 object-cover rounded-full drop-shadow-lg"
          src={photo}
        />
      </div>
      <h2 className="text-5xl">{name}</h2>
      {microchip && (
        <p className="text-center leading-8">
          Chip Number <br />
          <span className="border-2 py-1 px-3 rounded-full shadow-md border-orange-500">
            {microchip}
          </span>
        </p>
      )}
      <div className="container md:w-1/3">
        <p className="font-light text-center">{description}</p>

        <div className="grid grid-cols-2 rounded-lg border-2 gap-2 p-4 my-4 bg-white">
          <p>Markings: </p>
          <div className="flex flex-wrap gap-2">
            {markings.map((marking) => (
              <p
                className="border-2 py-1 px-2 rounded-full shadow-md border-orange-500 text-xs"
                key={marking}
              >
                {marking}
              </p>
            ))}
          </div>
          <p>Species: </p> <p>{species}</p>
          <p>Breed: </p> <p>{breed}</p>
          <p>Gender: </p> <p>{gender}</p>
          <p>Spayed: </p> <p>{spayed.toString()}</p>
        </div>
      </div>
    </div>
  );
}
