import { Description } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { TextField, Button, Box } from "@mui/material";
import * as Yup from "yup";
import "./graneles.css"

const validationSchema = Yup.object({
    code: Yup.number().required("Obligatorio"),
    description: Yup.string().required("Obligatorio"),
    lotes: Yup.string().required("Obligatorio"),
    cuantity: Yup.number().required("Obligatorio"),
    state: Yup.string().required("Obligatorio"),
    lotesInStock: Yup.string(),
    toPacking: Yup.string(),
    cuantityPacking: Yup.number(),
    comments: Yup.string()
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

const handleSubmit = (values, preventdefault) => {
    console.log("Formulario enviado");
    console.log(values);
}

const Graneles = () => {
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
                            label="Codigo"
                            component={CustomTextField}
                            variant="outlined"
                            type="number"
                        />
                        <Field 
                            name="description"
                            label="Descripcion"
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
                            label="Lotes Stock"
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
                            label="Cant.Acondicionar"
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
        </>
    );
}

export default Graneles;