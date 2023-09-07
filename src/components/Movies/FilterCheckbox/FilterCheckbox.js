import "./FilterCheckbox.css";

function FilterCheckbox({ filterText }) {
  return (
    <div className="filter button">
      <label className="filter__tumbler">
        <input type="checkbox" className="filter__checkbox" />
        <span className="filter__slider"/>
      </label>
      <p className="filter__text">{filterText}</p>
    </div>
  );
}

export default FilterCheckbox;
