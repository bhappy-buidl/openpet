"use client";
import PetABI from "@/app/abi/OpenPetNFT.json";
import { AddVaxInfoForm } from "@/components/AddVaxInfoForm";
import { PetInformation } from "@/components/PetInformation";
import { PetInputForm } from "@/components/PetInputForm";
import { TopBar } from "@/components/TopBar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getContract } from "viem";
import { useAccount } from "wagmi";
import { getWalletClient } from "wagmi/actions";
import { baseGoerli } from "wagmi/chains";

//Dummy data to build out the UI without fetching
const pets = [
  {
    name: "buddy",
    photo:
      "https://images.pexels.com/photos/3090875/pexels-photo-3090875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    species: "cat",
    breed: "american shorthair",
    markings: "white paws, brown and black pattern",
    gender: "male",
    spayed: true,
    microchip: "sk72x9sjlx8",
  },
  {
    name: "buddy",
    photo:
      "https://images.pexels.com/photos/3090875/pexels-photo-3090875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    species: "cat",
    breed: "american shorthair",
    markings: "white paws, brown and black pattern",
    gender: "male",
    spayed: true,
    microchip: "sk72x9sjlx8",
  },
  {
    name: "candus",
    photo:
      "https://images.pexels.com/photos/982300/pexels-photo-982300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    species: "cat",
    breed: "maine coon",
    markings:
      "white spotted face, light brown and white stripes, light brown and white stripes",
    gender: "female",
    spayed: false,
    microchip: "j557x97dh53",
  },
  {
    name: "champ",
    photo:
      "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    species: "dog",
    breed: "english lab",
    markings: "black fur",
    gender: "male",
    spayed: true,
    microchip: "oi71qxsju72",
  },
];

type AddPetsButtonProps = {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
};
type PetDisplayTileProps = {
  name: string;
  photo: string;
  description: string;
  species: string;
  breed: string;
  markings: string;
  gender: string;
  spayed: boolean;
  microchip: string;
  index: number;
  setDisplayVaxForms: Dispatch<SetStateAction<boolean>>;
  setPetDisplayIndex: Dispatch<SetStateAction<number>>;
};

export default function MyPets() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [petDisplayIndex, setPetDisplayIndex] = useState<number>(-1);

  const [displayvaxForms, setDisplayVaxForms] = useState<boolean>(false);

  const [petTokenIDs, setPetTokenIDs] = useState<any>([]);

  const [petsArweaveLink, setArweavePetsLink] = useState<any>([]);

  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    fetch(
      "https://api.studio.thegraph.com/query/37243/open-pet/version/latest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        query GetPets($address: String!) {
          transfers(first: 10, where: {to: $address}) {
            tokenId
            transactionHash
          }}`,
          variables: {
            address: "0x05d0939eA98079C00Cc1e9646e14F60c6A801e29",
          },
        }),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((response: any) => {
        setPetTokenIDs(response.data.transfers);
      });
  }, []);

  useEffect(() => {
    async function getPets() {
      const walletClient = await getWalletClient({
        chainId: baseGoerli.id,
      });

      const contract = getContract({
        address: "0xaB2D4c1892a9064d47252794e4810a8E098f04a2",
        abi: PetABI.abi,
        walletClient,
      });

      return Promise.all(
        petTokenIDs.map(
          async (token: { tokenId: string; transactionHash: string }) => {
            console.log("TOKEN inside MAP", token);
            return contract.read.getPet([token.tokenId]); // Note: change to getPet
          }
        )
      );
    }

    if (petTokenIDs) {
      getPets().then((pets) => console.log("these are the pets!", pets));
    }
  }, [petTokenIDs]);

  if (petDisplayIndex == -1) {
    return (
      <div className="flex flex-col flex-grow place-content-center min-w-full max-w-2xl mx-auto">
        <TopBar />
        <div className="flex flex-col flex-grow justify-center max-w-screen-xl mx-auto">
          <div className="flex flex-row justify-between relative">
            <h1 className="text-7xl">My Pets</h1>
            <div className="absolute bottom-1 right-0">
              {pets.length ? (
                <AddPetsButton onClickHandler={(e) => setOpenForm(!openForm)} />
              ) : null}
            </div>
          </div>
          <div
            className={
              openForm
                ? "fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                : "hidden"
            }
          >
            <dialog
              className="z-10 drop-shadow-2xl rounded-lg dialog-animation w-full md:w-auto"
              open={openForm}
            >
              <div className="relative">
                <button
                  onClick={() => setOpenForm(false)}
                  className="absolute top-2 right-2 rounded-full border-2 py-1 px-2 button-grow"
                >
                  ✖️
                </button>
                <PetInputForm setOpenForm={setOpenForm} />
              </div>
            </dialog>
          </div>
          {displayvaxForms && (
            <div
              className={
                displayvaxForms
                  ? "fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                  : "hidden"
              }
            >
              <dialog
                className="z-30 drop-shadow-2xl rounded-lg dialog-animation w-full md:w-auto"
                open={displayvaxForms}
              >
                <AddVaxInfoForm setDisplayVaxForms={setDisplayVaxForms} />
              </dialog>
            </div>
          )}
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {pets.length ? (
                pets.map((pet, index) => (
                  <PetDisplayTile
                    key={index}
                    {...pet}
                    index={index}
                    setPetDisplayIndex={setPetDisplayIndex}
                    setDisplayVaxForms={setDisplayVaxForms}
                  />
                ))
              ) : (
                <div>
                  You have no pets currently. Add one here.
                  <AddPetsButton
                    onClickHandler={(e) => setOpenForm(!openForm)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <PetInformation
        {...pets[petDisplayIndex]}
        setPetDisplayIndex={setPetDisplayIndex}
      />
    );
  }
}

function PetDisplayTile({
  name,
  photo,
  description,
  species,
  breed,
  markings,
  gender,
  spayed,
  microchip,
  index,
  setDisplayVaxForms,
  setPetDisplayIndex,
}: PetDisplayTileProps) {
  return (
    <div className="flex flex-col p-4 rounded-br-lg rounded-tl-lg shadow-md gap-4 relative hover:bg-slate-50 transition-all bg-white">
      <div className="flex flex-row items-center gap-2">
        <div className="">
          <img
            className="object-cover rounded-full w-32 h-32 object-cover rounded-full"
            src={photo}
          />
        </div>
        <div>
          <h2 className="text-5xl">{name}</h2>
          {microchip && (
            <p className="">
              <b>Chip Number: </b>
              {microchip}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => setPetDisplayIndex(index)}
          className="text-sm border-orange-400 border-2 rounded-lg p-2 px-4 text-black button-grow drop-shadow-md flex-grow"
        >
          More Info
        </button>
        <button
          onClick={() => setDisplayVaxForms(true)}
          className="text-sm border-orange-400 border-2 rounded-lg p-2 px-4 text-black button-grow drop-shadow-md flex-grow"
        >
          Add Health Details
        </button>
      </div>
    </div>
  );
}

function AddPetsButton({ onClickHandler }: AddPetsButtonProps) {
  return (
    <button
      onClick={onClickHandler}
      className="bg-orange-500 rounded-lg p-2 px-4 hover:bg-orange-300 text-white button-grow drop-shadow-md"
    >
      Add Pet +
    </button>
  );
}
