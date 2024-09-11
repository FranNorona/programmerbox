import { useState, useEffect } from "react";
import { addDoc, getDocs, deleteDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";
import * as React from "react";
import "./form.css";

// Validación con Yup
const validationSchema = Yup.object({
    code: Yup.string().required("Código es obligatorio"),
    description: Yup.string().required("Proveedor es obligatorio"),
    dateAnnoun: Yup.date().required("Fecha Solicitada es obligatoria").nullable(),
    dateRequest: Yup.date().required("Fecha Requerida es obligatoria").nullable(),
    comments: Yup.string()
});

// Componente personalizado para TextField
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

const FormComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "data"));
                const loadedData = [];
                querySnapshot.forEach((doc) => {
                    loadedData.push({ id: doc.id, ...doc.data() });
                });
                setData(loadedData);
            } catch (error) {
                console.error("Error al obtener datos: ", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log("Valores del formulario en handleSubmit:", values); // Para depuración
            const docRef = await addDoc(collection(db, "data"), values);
            console.log("Documento añadido con ID:", docRef.id); // Para depuración
            setData(prevData => [...prevData, { id: docRef.id, ...values }]);
            resetForm();
        } catch (error) {
            console.error("Error al agregar documento: ", error);
        }
    };

    const handleDelete = async (idToDelete) => {
        try {
            await deleteDoc(doc(db, "data", idToDelete));
            setData(prevData => prevData.filter((item) => item.id !== idToDelete));
        } catch (error) {
            console.error("Error al eliminar documento: ", error);
        }
    };

    return (
        <>
            <div className="form_global">
                <h1>Ingresar Datos</h1>
                <Formik
                    initialValues={{
                        code: '',
                        description: '',
                        dateAnnoun: '',
                        dateRequest: '',
                        comments: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="form_container">
                            <div>
                                <Field
                                    name="code"
                                    label="Código"
                                    component={CustomTextField}
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <Field
                                    name="description"
                                    label="Proveedor"
                                    component={CustomTextField}
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <Field
                                    name="dateAnnoun"
                                    label="Fecha Solicitada"
                                    component={CustomTextField}
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div>
                                <Field
                                    name="dateRequest"
                                    label="Fecha Requerida"
                                    component={CustomTextField}
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div>
                                <Field
                                    name="comments"
                                    label="Comentario"
                                    component={CustomTextField}
                                    variant="outlined"
                                />
                            </div>
                            <div className="addButton">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="inherit"
                                    disabled={isSubmitting}
                                >
                                    Agregar
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div>
                <h2>Datos Ingresados</h2>
                <div className="listpend_container">
                    <div className="listpend_header">
                        <div className="listpend_item listpend_header_item">Código</div>
                        <div className="listpend_item listpend_header_item">Proveedor</div>
                        <div className="listpend_item listpend_header_item">Fecha Solicitada</div>
                        <div className="listpend_item listpend_header_item">Fecha Requerida</div>
                        <div className="listpend_item listpend_header_item">Comentario</div>
                        <div className="listpend_item listpend_header_item">Acciones</div>
                    </div>
                    <div className="listpend_body">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <div className="listpend_row" key={item.id}>
                                    <div className="listpend_item">{item.code}</div>
                                    <div className="listpend_item">{item.description}</div>
                                    <div className="listpend_item">{item.dateAnnoun}</div>
                                    <div className="listpend_item">{item.dateRequest}</div>
                                    <div className="listpend_item">{item.comments}</div>
                                    <div className="listpend_item">
                                        <IconButton
                                            color="success"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <CheckCircleIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="listpend_row">
                                <div className="listpend_item listpend_container_p" colSpan="6">
                                    No hay datos disponibles
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormComponent;

