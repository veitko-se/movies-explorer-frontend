import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__container">
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="button search__btn" />
      </div>
    <FilterCheckbox filterText='Короткометражки'/>
    </form>
  );
}

export default SearchForm;
