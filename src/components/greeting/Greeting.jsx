const Greeting = ({ loggedUser }) => {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Buenos días";
    } else if (currentHour < 18) {
        greeting = "Buenas tardes";
    } else {
        greeting = "Buenas noches";
    }

    return (
        <div>
            <h1>{greeting}, {loggedUser}</h1>
        </div>
    );
};

export default Greeting; // Asegúrate de que esta línea esté presente
