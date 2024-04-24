import FoodSingleCard from "./FoodSingleCard"


const FoodCard = ({ food }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px] mx-auto">
        {food.map((item) => (
            <FoodSingleCard key={item._id} food={item} />
        ))}
    </div>
  )
}

export default FoodCard