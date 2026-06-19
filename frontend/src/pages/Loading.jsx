import { VscLoading } from "react-icons/vsc";

export default function Loading({ message }) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-white">
      <VscLoading className={"h-12 w-12 animate-spin"} />
      <h3 className="mt-6 text-center text-2xl font-semibold">{message}</h3>
    </div>
  );
}
