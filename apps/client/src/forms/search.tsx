export default function SearchBar() {
  return (
    <div className="flex flex-row flex-grow items-center space-x-1 border shadow-sm rounded-md px-2">
      <input
        type="search"
        name="query"
        placeholder="Search folders..."
        className="flex-grow p-2 text-neutral-700 border-none rounded-none shadow-none outline-none"
      />
    </div>
  );
}
