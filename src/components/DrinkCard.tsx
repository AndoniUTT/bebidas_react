import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
    const selectRecipe = useAppStore(state => state.selectRecipe)

    return (
        <div className="border border-green-500 shadow-xl rounded-2xl overflow-hidden bg-white">
            <div className="overflow-hidden">
                <img 
                    src={drink.strDrinkThumb} 
                    alt={'Imagen de ' + drink.strDrink}
                    className="hover:scale-110 transition-transform hover:rotate-2 grayscale hover:grayscale-0 rounded-t-2xl"
                />
            </div>
            <div className="p-5">
                <h2 className="text-xl font-bold text-center text-blue-600 truncate">
                    {drink.strDrink}
                </h2>
                <button
                    type="button"
                    onClick={() => selectRecipe(drink.idDrink)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 mt-5 w-full p-3 font-bold text-white text-lg rounded-lg shadow-md transition-transform hover:scale-105"
                >
                    Ver Receta
                </button>
            </div>
        </div>
    )
}
