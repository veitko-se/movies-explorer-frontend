import "./FilterCheckbox.css";

function FilterCheckbox({ filterText, onCheckBox, isChecked }) {
  return (
    <div className="filter button">
      <label className="filter__tumbler">
        <input type="checkbox" className="filter__checkbox" onChange={onCheckBox} checked={isChecked ? '+true' : ''} />
        <span className="filter__slider"/>
      </label>
      <p className="filter__text">{filterText}</p>
    </div>
  );
}

export default FilterCheckbox;
