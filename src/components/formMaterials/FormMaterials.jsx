import { Button, Box, DialogActions } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import CustomForm from "../customForm/CustomForm";
import validationSchema from "../../utils/validation/productSchema";

const initialValues = {
    code: "",
    description: "",
    provider: "",
    dateAnnoun: "",
    dateRequest: "",
    comments: "",
};

const FormMaterials = ({ onClose, onAddOrder }) => {

    const handleSubmit = async (values, {resetForm}) => {
        try {
            await addDoc(collection(db, "materials"), values);
            console.log("Datos enviados a Firestore:", values);
            alert("Pedido agregado con exito");
            resetForm();
            onClose();
            onAddOrder();
            
        } catch (error) {
            console.error("Error al enviar los datos a Firestore:", error);
            alert("Ocurrio un error al agregar el pedido")
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <Box sx={{p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                        <Field name="code" label="Código" component={CustomForm} />
                        <Field name="description" label="Descripción" component={CustomForm} />
                        <Field name="provider" label="Proveedor" component={CustomForm} />
                        <Field name="dateAnnoun" label="Fecha Solicitada" type="date" component={CustomForm} InputLabelProps={{ shrink: true }} />
                        <Field name="dateRequest" label="Fecha Requerida" type="date" component={CustomForm} InputLabelProps={{ shrink: true }} />
                        <Field name="comments" label="Comentarios" multiline rows={4} component={CustomForm} />
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary">
                                Agregar
                            </Button>
                            <Button type="button" variant="contained" color="primary" onClick={onClose}>
                                Cancelar
                            </Button>
                        </DialogActions>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default FormMaterials;
