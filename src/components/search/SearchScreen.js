import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { getHeroesByName } from '../selectors/getHeroesByName';

export const SearchScreen = () => {

    const initialForm = {
        searchText: '',
    };

    const [ formValues, handleInputChange, reset ] = useForm( initialForm );
    const { searchText } = formValues;
    const heroesFilted = getHeroesByName('Algo por Aqui');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchText);
    }

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={ (e) => handleSearch(e) }>
                        <input 
                            type="text"
                            placeholder="Buscar un Héroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button 
                            type="submit"
                            className="btn btn-outline-primary mt-1"
                        >
                            Buscar ...
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr />

                    {
                        heroesFilted.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}