import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Pruebas en <AppRouter />', () => {

    
    test('debe de mostrar el login si no está autenticado', () => {

        const contextValue = {
            user: {
                logged: false,
            }
        };
        
        const wrapper = mount( 
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login Screen');
        
    });


    test('debe de mostrar el componente de Marvel si está autenticado', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Edgard'
            }
        };
        
        const wrapper = mount( 
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
        
    });

});
