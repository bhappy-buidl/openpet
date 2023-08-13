import { Dispatch, SetStateAction, useState, useRef } from "react";

type PetInformationProps = {
  name: string;
  photo: string;
  description: string;
  species: string;
  breed: string;
  markings: string;
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
  const [editPetForm, setEditPetForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center p-4 rounded-br-lg rounded-tl-lg shadow-md gap-4 relative min-h-screen">
      <button
        onClick={() => setPetDisplayIndex(-1)}
        className="absolute top-1 right-2 rounded-full border-2 py-1 px-2 button-grow"
      >
        ✖️
      </button>

      <dialog
        className="z-200 drop-shadow-2xl rounded-lg dialog-animation w-full md:w-auto"
        open={editPetForm}
      >
        <div className="relative">
          <button
            onClick={() => setEditPetForm(false)}
            className="absolute top-2 right-2 rounded-full border-2 py-1 px-2 button-grow"
          >
            ✖️
          </button>
          <EditPetForm
            name={name}
            photo={photo}
            description={description}
            species={species}
            breed={breed}
            markings={markings}
            gender={gender}
            spayed={spayed}
            microchip={microchip}
            setEditPetForm={setEditPetForm}
          />
        </div>
      </dialog>

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
            {markings.split(",").map((marking) => (
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
        <button
          onClick={() => setEditPetForm(true)}
          className="flex-grow w-full text-sm border-orange-400 border-2 rounded-lg p-2 px-4 text-black button-grow drop-shadow-md"
        >
          Edit Pet Information
        </button>
      </div>
    </div>
  );
}

type EditPetFormProps = {
  name: string;
  photo: string;
  description: string;
  species: string;
  breed: string;
  markings: string;
  gender: string;
  spayed: boolean;
  microchip: string;
  setEditPetForm: Dispatch<SetStateAction<boolean>>;
};

function EditPetForm({
  name,
  photo,
  description,
  species,
  breed,
  markings,
  gender,
  spayed,
  microchip,
  setEditPetForm,
}: EditPetFormProps) {
  const [editPetFormState, setEditPetFormState] = useState({
    name,
    photo,
    description,
    species,
    breed,
    markings,
    gender,
    spayed,
    microchip,
  });
  const [previousTransactionId] = useState<string>(
    "B8EFUNxRElGi0wtPcD_Ex56Cfbz6Mz74VlBX8dQW5io"
  );

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name || "Default Name");

    if (imageInputRef.current?.files?.length) {
      formData.append("photo", imageInputRef.current.files[0]);
    } else {
      console.log("no file added for pet photo");
    }

    formData.append(
      "description",
      editPetFormState.description || "Default Description"
    );
    formData.append("species", editPetFormState.species || "Default Species");
    formData.append("breed", editPetFormState.breed || "Default Breed");
    formData.append(
      "markings",
      editPetFormState.markings || "Default Markings"
    );
    formData.append("gender", editPetFormState.gender || "Default Gender"); // Assuming gender is required, no default
    formData.append("spayed", editPetFormState.spayed?.toString() || "false"); // Default to false if not checked
    formData.append(
      "microchipNumber",
      editPetFormState.microchip || "Default MicrochipNumber"
    );
    formData.append(
      "previousTransactionId",
      previousTransactionId || "Default previousTransactionId"
    );

    try {
      console.log("gets here");
      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("SUCCESS!", response.json());
        setEditPetForm(false);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle fetch error
      console.log(error);
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
          value={editPetFormState.name}
          onChange={(e) =>
            setEditPetFormState({
              ...editPetFormState,
              name: e.target.value,
            })
          }
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
                  // setEditPetFormState({
                  //   ...editPetFormState,
                  //   photo: reader.result,
                  // })
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
          value={editPetFormState.description}
          onChange={(e) =>
            setEditPetFormState({
              ...editPetFormState,
              description: e.target.value,
            })
          }
        />
        <label htmlFor="species">Species</label>
        <input
          required
          id="species"
          className="border-2 rounded-lg"
          value={editPetFormState.species}
          onChange={(e) =>
            setEditPetFormState({
              ...editPetFormState,
              species: e.target.value,
            })
          }
        />
        <label htmlFor="breed">Breed</label>
        <input
          required
          id="breed"
          className="border-2 rounded-lg"
          value={editPetFormState.breed}
          onChange={(e) =>
            setEditPetFormState({
              ...editPetFormState,
              breed: e.target.value,
            })
          }
        />
        <label htmlFor="markings">Markings</label>
        <input
          required
          id="markings"
          className="border-2 rounded-lg"
          value={editPetFormState.markings}
          onChange={(e) =>
            setEditPetFormState({
              ...editPetFormState,
              markings: e.target.value,
            })
          }
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
            onChange={(e) =>
              setEditPetFormState({
                ...editPetFormState,
                gender: e.target.value,
              })
            }
          />
          <label htmlFor="female">Female</label>
          <input
            name="gender"
            id="female"
            value="female"
            className=""
            type="radio"
            onChange={(e) =>
              setEditPetFormState({
                ...editPetFormState,
                gender: e.target.value,
              })
            }
          />
        </div>
        <label>Spayed?</label>
        <div className="flex flex-row gap-2">
          <label htmlFor="spayed">Spayed</label>
          <input
            type="checkbox"
            id="spayed"
            checked={editPetFormState.spayed}
            className="border-2"
            onChange={(e) =>
              setEditPetFormState({
                ...editPetFormState,
                spayed: e.target.checked,
              })
            }
          />
        </div>
        <label htmlFor="microchipNumber">Microchip Number</label>
        <input
          required
          id="microchipNumber"
          className="border-2 rounded-lg mb-10"
          value={editPetFormState.microchip}
          onChange={(e) =>
            setEditPetFormState({
              ...editPetFormState,
              microchip: e.target.value,
            })
          }
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
