import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useMemo } from 'react';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);
    console.log(q);

    const initialForm = {
        searchText: q,
    };

    const [ formValues, handleInputChange ] = useForm( initialForm );
    const { searchText } = formValues;
    const heroesFilted = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchText);
        navigate(`?q=${ searchText }`);
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
                        (q === '')
                            ? <div className="alert alert-info">Buscar un Héroe</div>
                            : ( heroesFilted.length === 0 ) 
                                && <div className="alert alert-danger">No hay resultados: { q }</div>
                    }

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