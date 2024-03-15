import InputRange from "../UI/InputRange";

export default function Filters({ applyFilter }) {
  const handleFilterChange = (filterType, value) => {
    applyFilter(filterType, parseInt(value, 10));
  };
  return (
    <div className="flex flex-col gap-10 px-7 pt-5">
      {["brightness", "contrast", "saturation"].map((filter) => (
        <div key={filter} className="flex flex-col">
          <label className="font-semibold">
            {filter.charAt(0).toUpperCase() + filter.slice(1)}:
          </label>
          <div className="flex gap-3">
            <InputRange
              min={0}
              max={200}
              defValue={100}
              onChange={(e) => handleFilterChange(filter, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
