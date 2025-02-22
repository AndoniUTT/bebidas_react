import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''      
  });

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    setSearchFilters({
      ...searchFilters, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(searchFilters).includes('')){
      console.log('Debes llenar todo');
      return;
    }
    searchRecipes(searchFilters);
  };

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover h-96 relative' : 'bg-slate-800'}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> 
      <div className="relative mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>

          
          <nav className="flex gap-6">
            <NavLink 
              className={({isActive}) => 
                  isActive ? 'text-orange-500 font-bold transition duration-300' :
                  'text-white hover:text-orange-400 font-bold transition duration-300'
              }
              to='/'>Inicio
            </NavLink>
            <NavLink 
              className={({isActive}) => 
                isActive ? 'text-orange-500 font-bold transition duration-300' :
                'text-white hover:text-orange-400 font-bold transition duration-300'
            }
              to='/favoritos/'>Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form 
            onSubmit={handleSubmit}
            className="md:w-1/2 2xl:w-1/3 bg-white bg-opacity-90 backdrop-blur-md my-24 p-8 rounded-lg shadow-lg space-y-6">
            <div className="space-y-4">
              <label 
                htmlFor="ingredient"
                className="block text-gray-700 font-extrabold text-lg">
                  Nombre o Ingredientes
              </label>
              <input 
                id='ingredient'
                type="text" 
                name="ingredient"
                onChange={handleChange}
                value={searchFilters.ingredient}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring focus:ring-orange-300 outline-none"
                placeholder="Ej. Vodka, Tequila, Café"
              />
            </div>
            <div className="space-y-4">
              <label 
                htmlFor="category"
                className="block text-gray-700 font-extrabold text-lg">
                  Categoría
              </label>
              <select 
                id='category'
                name="category"
                onChange={handleChange}
                value={searchFilters.category}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring focus:ring-orange-300 outline-none"
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map(category => (
                  <option 
                    value={category.strCategory}
                    key={category.strCategory}>
                      {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input 
              type="submit"
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-extrabold w-full p-3 rounded-lg uppercase shadow-md transition-transform hover:scale-105" 
              value="Buscar Recetas"
            />
          </form>
        )}
      </div>
    </header>
  );
}
