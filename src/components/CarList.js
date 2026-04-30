import { useSelector,useDispatch } from "react-redux"
import { createSelector } from "@reduxjs/toolkit";
import { removeCar } from "../store";

const memorizeCars = createSelector(
    [(state) => state.cars.data, (state) => state.cars.searchTerm],
    (data,searchTerm) => data.filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
     
);



function CarList() {
    const dispatch = useDispatch();

    const cars = useSelector(memorizeCars);
    const name = useSelector((state) =>state.form.name)


    const handleCarDelete = (car) => {
        dispatch(removeCar(car.id));
    }

    const renderedCars = cars.map((car) => {
        //DECIDE IF THIS CAR SHOUD BE BOLD

        const bold = name && car.name.toLowerCase().includes(name.toLowerCase())

        
        return <div className={`panel ${bold && 'bold'}`} key={car.id}>
                    <p>
                        {car.name} - ${car.cost}
                    </p>
                    <button className="button is-danger" onClick={() => handleCarDelete(car)}>Delete</button>
                </div>
    })

    
    return <div className="car-list">
        {renderedCars}
        <hr/>
    </div>
}

export default CarList