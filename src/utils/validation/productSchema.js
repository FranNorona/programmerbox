import * as Yup from "yup";

const productSchema = Yup.object({
    code: Yup.number().required("Código es obligatorio"),
    description: Yup.string().required("Descripción es obligatoria"),
    provider: Yup.string().required("Proveedor es obligatorio"),
    dateAnnoun: Yup.date().required("Fecha Solicitada es obligatoria").nullable(),
    dateRequest: Yup.date().required("Fecha Requerida es obligatoria").nullable(),
    comments: Yup.string(),
});

export default productSchema;
