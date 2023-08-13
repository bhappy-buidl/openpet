import { useState, Dispatch, SetStateAction } from "react";

type AddVaxInfoFormProps = {
  setDisplayVaxForms: Dispatch<SetStateAction<boolean>>;
};

export function AddVaxInfoForm({ setDisplayVaxForms }: AddVaxInfoFormProps) {
  const [petInfo, setPetInfo] = useState([
    <VaxForm key="VaxForm" />,
    <TestForm key="TestForm" />,
    <CertsForm key="CertsForm" />,
  ]);

  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);

  const [vaxFormDetails, setVaxFormDetails] = useState();
  const [testFormDetails, setTestFormDetails] = useState();
  const [certFormDetails, setCertFormDetails] = useState();

  return (
    <div className="relative px-10 py-4 transition-all">
      <button
        className="absolute top-2 right-2 rounded-full border-2 py-1 px-2 button-grow"
        onClick={() => setDisplayVaxForms(false)}
      >
        ✖️
      </button>
      <div className="flex flex-row gap-6 pb-10 pt-8">
        <button onClick={() => setCurrentFormIndex(0)}>
          Submit Vaccination
        </button>
        <button onClick={() => setCurrentFormIndex(1)}>Submit Test</button>
        <button onClick={() => setCurrentFormIndex(2)}>
          Submit Certification
        </button>
      </div>
      <form>{petInfo[currentFormIndex]}</form>
    </div>
  );
}

type VaxFormProps = {};

function VaxForm({}: VaxFormProps) {
  return (
    <>
      <input type="date" />
    </>
  );
}

type TestFormProps = {};

function TestForm({}: TestFormProps) {
  return <p>Test Form</p>;
}

type CertFormProps = {};

function CertsForm({}: CertFormProps) {
  return <p>Certs Form</p>;
}
