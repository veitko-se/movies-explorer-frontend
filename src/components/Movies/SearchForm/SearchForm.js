import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Form from '../../Form/Form';
import './SearchForm.css';


function SearchForm({handleSubmit, onCheckBox, values, errors, isValid, handleChange, searchText, isShortFilm}) {
  return (
    <section className="search">
      <Form
        formName='search'
        title='Поиск фильма' buttonText=''
        values={values} errors={errors} isValid={isValid} handleChange={handleChange}
        handleSubmit={handleSubmit}
      >
        <input
          title=""
          aria-label="Фильм"
          name="search"
          type="search"
          className={`form__input form__input_type_search ${errors.email && 'form__input_type_error'}`}
          id="input-search"
          placeholder="Фильм"
          required
          minLength="1"
          maxLength="80"
          value={values.search || ''}
          onChange={handleChange}
        />
      </Form>
      <FilterCheckbox filterText='Короткометражки' onCheckBox={onCheckBox} isChecked={isShortFilm} />
    </section>
  )
}

export default SearchForm;
