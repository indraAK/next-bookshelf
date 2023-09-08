export default function Spinner() {
  return (
    <div className="w-12 h-12 rounded-full border-[4px] border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
