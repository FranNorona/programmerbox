import { Button, Box, DialogActions } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth"
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
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user)  {
            alert("Debes iniciar sesion para agregar un pedido");
            return;
        };

        try {
            await addDoc(collection(db, "materials"), {
                ...values,
                createBy: user.uid,
                createByEmail: user.email,
                createAt: new Date(),
            });

            console.log("Pedido agregado con exito por:", user.email);
            alert("Pedido agregado con exito");
            onAddOrder();
            resetForm();
            onClose();
        } catch (error) {
            console.error("Error al agregar el pedido", error);
            alert("Error" + error.message);
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
