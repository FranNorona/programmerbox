import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
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
    const [granelesList, setGranelesList] = useState([]);

    const fetchGraneles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "graneles"));
            const granelesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setGranelesList(granelesData);
        } catch (error) {
            console.error("Error al obtener graneles: ", error);
        }
    };

    useEffect(() => {
        fetchGraneles();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        try {

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

            fetchGraneles();
            resetForm();
        } catch (error) {
            console.error("Error añadiendo granel: ", error);
        }
    };

    return (
        <div className="main_container">
            <div className="form_global_graneles">
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
                    <Form className="form_graneles_inputs">
                        <Field 
                            name="code"
                            label="Código"
                            component={CustomTextField}
                            variant="outlined"
                            type="number"
                            className="form1"
                        />
                        <Field 
                            name="description"
                            label="Descripción"
                            component={CustomTextField}
                            variant="outlined"
                            className="form2"
                        />
                        <Field 
                            name="lotes"
                            label="Lotes"
                            component={CustomTextField}
                            variant="outlined"
                            className="form3"
                        />
                        <Field 
                            name="cuantity"
                            label="Cantidad"
                            component={CustomTextField}
                            variant="outlined"
                            type="number"
                            className="form4"
                        />
                        <Field 
                            name="state"
                            label="Estado"
                            component={CustomTextField}
                            variant="outlined"
                            className="form5"
                        />
                        <Field 
                            name="lotesInStock"
                            label="Lotes en Stock"
                            component={CustomTextField}
                            variant="outlined"
                            className="form6"
                        />
                        <Field 
                            name="toPacking"
                            label="Acondicionar"
                            component={CustomTextField}
                            variant="outlined"
                            className="form7"
                        />
                        <Field 
                            name="cuantityPacking"
                            label="Cant. Acondicionar"
                            component={CustomTextField}
                            variant="outlined"
                            type="number"
                            className="form8"
                        />
                        <Field 
                            name="comments"
                            label="Comentarios"
                            component={CustomTextField}
                            variant="outlined"
                            className="comments"
                        />
                        <div className="addButton">
                            <Button
                                type="submit"
                                variant="contained"
                                color="inherit"
                                fullWidth
                            >
                                Agregar
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>

            <div className="cards_global_view">
                <h2>Graneles ingresados</h2>
                <div className="graneles_list">
                    {granelesList.map((granel) => (
                        <div key={granel.id} className="granel_item">
                            <Link to={`/graneles/${granel.id}`} className="granel_link">
                                <p><strong>Código:</strong> {granel.code}</p>
                                <p><strong>Descripción:</strong> {granel.description}</p>
                                <p><strong>Lotes:</strong> {granel.lotes}</p>
                                <p><strong>Cantidad:</strong> {granel.cuantity}</p>
                                <p><strong>Estado:</strong> {granel.state}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Graneles;

