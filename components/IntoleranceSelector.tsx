import React from "react";

interface IntoleranceSelectorProps {
  selectedIntolerance: string | null;
  onSelectIntolerance: (intolerance: string) => void;
}

const IntoleranceSelector: React.FC<IntoleranceSelectorProps> = ({
  selectedIntolerance,
  onSelectIntolerance,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="intolerance" className="block mb-2">
        Select Intolerance:
      </label>
      <select
        id="intolerance"
        className="border rounded px-2 py-1"
        value={selectedIntolerance || ""}
        onChange={(e) => onSelectIntolerance(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="gluten">Gluten Intolerance</option>
        <option value="lactose">Lactose Intolerance</option>
      </select>
    </div>
  );
};

export default IntoleranceSelector;
