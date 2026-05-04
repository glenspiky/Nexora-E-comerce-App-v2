import { ErrorIcon } from "react-hot-toast";

interface Error {
  FError: string;
  setFError: string;
}
function FormError({ FError }: Error) {
  return (
    <div>
      {FError && (
        <div className="w-full rounded-sm transition-all ease-in-out duration-75  bg-red-600 flex justify-center py-1 items-center gap-4 mb-3 ">
          <div className="text-amber-300 ">
            {" "}
            <ErrorIcon />
          </div>

          <p className="text-white">{FError}</p>
        </div>
      )}
    </div>
  );
}

export default FormError;
