import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import "./graneles.css";

const validationSchema = Yup.object({
    code: Yup.number().required("Obligatorio"),
    description: Yup.string().required("Obligatorio"),
    lotes: Yup.string().required("Obligatorio"),
    cuantity: Yup.number().required("Obligatorio"),
    state: Yup.string().required("Obligatorio"),
    lotesInStock: Yup.string(),
    toPacking: Yup.string(),
    cuantityPacking: Yup.number(),
    comments: Yup.string(),
});

const CustomTextField = ({ label, form, field, ...props }) => {
    const { name } = field;
    const { touched, errors } = form;
    const error = touched[name] && errors[name];

    return (
        <TextField
            label={label}
            error={!!error}
            helperText={error || ' '}
            {...field}
            {...props}
        />
    );
};

const Graneles = () => {
    const [granelesList, setGranelesList] = useState([]); // Estado para almacenar los graneles

    // Función para obtener los graneles de la base de datos
    const fetchGraneles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "graneles"));
            const granelesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setGranelesList(granelesData); // Actualiza el estado con los datos obtenidos
        } catch (error) {
            console.error("Error al obtener graneles: ", error);
        }
    };

    // useEffect para cargar los graneles al montar el componente
    useEffect(() => {
        fetchGraneles();
    }, []);

    // Función para manejar el envío del formulario
    const handleSubmit = async (values, { resetForm }) => {
        try {
            // Añade los datos a la colección "graneles" en Firestore
            await addDoc(collection(db, "graneles"), {
                code: values.code,
                description: values.description,
                lotes: values.lotes,
                cuantity: values.cuantity,
                state: values.state,
                lotesInStock: values.lotesInStock,
                toPacking: values.toPacking,
                cuantityPacking: values.cuantityPacking,
                comments: values.comments,
            });

            // Después de agregar el nuevo granel, vuelve a obtener los graneles actualizados
            fetchGraneles();
            resetForm(); // Resetea el formulario después de enviar
            console.log("Granel añadido correctamente");
        } catch (error) {
            console.error("Error añadiendo granel: ", error);
        }
    };

    return (
        <>
            <div>
                <h1>Ingresar Graneles</h1>
                <Formik
                    initialValues={{
                        code: '',
                        description: '',
                        lotes: '',
                        cuantity: '',
                        state: '',
                        lotesInStock: '',
                        toPacking: '',
                        cuantityPacking: '',
                        comments: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Field 
                            name="code"
                            label="Código"
                            component={CustomTextField}
                            variant="outlined"
                            type="number"
                        />
                        <Field 
                            name="description"
                            label="Descripción"
                            component={CustomTextField}
                            variant="outlined"
                        />
                        <Field 
                            name="lotes"
                            label="Lotes"
                            component={CustomTextField}
                            variant="outlined"
                        />
                        <Field 
                            name="cuantity"
                            label="Cantidad"
                            component={CustomTextField}
                            variant="outlined"
                            type="number"
                        />
                        <Field 
                            name="state"
                            label="Estado"
                            component={CustomTextField}
                            variant="outlined"
                        />
                        <Field 
                            name="lotesInStock"
                            label="Lotes en Stock"
                            component={CustomTextField}
                            variant="outlined"
                        />
                        <Field 
                            name="toPacking"
                            label="Acondicionar"
                            component={CustomTextField}
                            variant="outlined"
                        />
                        <Field 
                            name="cuantityPacking"
                            label="Cant. Acondicionar"
                            component={CustomTextField}
                            variant="outlined"
                            type="number"
                        />
                        <Field 
                            name="comments"
                            label="Comentarios"
                            component={CustomTextField}
                            variant="outlined"
                        />
                        <div className="addButton">
                            <Button
                                type="submit"
                                variant="contained"
                                color="inherit"
                            >
                                Agregar
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>

            {/* Mostrar los graneles ingresados debajo del formulario */}
            <div>
                <h2>Graneles ingresados:</h2>
                <div className="graneles-list">
                    {granelesList.map((granel) => (
                        <div key={granel.id} className="granel-item">
                            <Link to={`/graneles/${granel.id}`}>
                                <p><strong>Código:</strong> {granel.code}</p>
                                <p><strong>Descripción:</strong> {granel.description}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Graneles;

