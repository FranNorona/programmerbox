import { useState, useEffect } from "react";
import { addDoc, getDocs, deleteDoc, doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { format } from "date-fns";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";
import "./orders.css";

const validationSchema = Yup.object({
    code: Yup.number().required("Código es obligatorio"),
    description: Yup.string().required("Descripción es obligatoria"),
    provider: Yup.string().required("Proveedor es obligatorio"),
    dateAnnoun: Yup.date().required("Fecha Solicitada es obligatoria").nullable(),
    dateRequest: Yup.date().required("Fecha Requerida es obligatoria").nullable(),
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

const Orders = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentData, setCurrentData] = useState({});

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
            const docRef = await addDoc(collection(db, "data"), values);
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

    const handleUpdate = async (idToUpdate, newData) => {
        try {
            const docRef = doc(db, "data", idToUpdate);
            await updateDoc(docRef, newData);

            setData(prevData => prevData.map(item => 
                item.id === idToUpdate ? { ...item, ...newData } : item
            ));
            setOpen(false);
        } catch (error) {
            console.error("Error al actualizar documento: ", error);
        }
    };

    const handleOpen = (item) => {
        setCurrentId(item.id);
        setCurrentData(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModalSubmit = async (values) => {
        await handleUpdate(currentId, values);
    };

    const filteredData = data.filter(item =>
        (item.code && String(item.code).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.provider && item.provider.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.comments && item.comments.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <div className="form_global">
                <h1>Ingresar Datos del Pedido</h1>
                <Formik
                    initialValues={{
                        code: '',
                        description: '',
                        provider: '',
                        dateAnnoun: '', 
                        dateRequest: '', 
                        comments: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="form_container">
                            <Box sx={{ width: '12.5%', maxWidth: '100%' }}>
                                <Field
                                    name="code"
                                    label="Código"
                                    component={CustomTextField}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                />
                            </Box>
                            <Box sx={{ width: '13%', maxWidth: '100%' }}>
                                <Field
                                    name="description"
                                    label="Descripción"
                                    component={CustomTextField}
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{ width: '13%', maxWidth: '100%' }}>
                                <Field
                                    name="provider"
                                    label="Proveedor"
                                    component={CustomTextField}
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{ width: '14.5%', maxWidth: '100%' }}>
                                <Field
                                    name="dateAnnoun"
                                    label="Fecha Solicitada"
                                    component={CustomTextField}
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                            <Box sx={{ width: '14.5%', maxWidth: '100%' }}>
                                <Field
                                    name="dateRequest"
                                    label="Fecha Requerida"
                                    component={CustomTextField}
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                            <Box sx={{ width: '15%', maxWidth: '100%' }}>
                                <Field
                                    name="comments"
                                    label="Comentario"
                                    component={CustomTextField}
                                    variant="outlined"
                                />
                            </Box>
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
                <TextField
                    label="Buscar"
                    variant="filled"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>  

            <div>
                <h2>Pedidos Solicitados</h2>
                <div className="listpend_container">
                    <div className="listpend_header">
                        <div className="listpend_item listpend_header_item_2">Código</div>
                        <div className="listpend_item listpend_header_item">Descripción</div>
                        <div className="listpend_item listpend_header_item">Proveedor</div>
                        <div className="listpend_item listpend_header_item">Fecha Solicitada</div>
                        <div className="listpend_item listpend_header_item">Fecha Requerida</div>
                        <div className="listpend_item listpend_header_item">Comentario</div>
                        <div className="listpend_item listpend_header_item">Acciones</div>
                    </div>
                    <div className="listpend_body">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => {
                                const currentDate = new Date();
                                const dateRequest = new Date(item.dateRequest);
                                const isExpired = dateRequest < currentDate;

                                return (
                                    <div className="listpend_row" key={item.id}>
                                        <div className="listpend_item">{item.code}</div>
                                        <div className="listpend_item">{item.description}</div>
                                        <div className="listpend_item">{item.provider}</div>
                                        <div className="listpend_item">
                                            {item.dateAnnoun ? format(new Date(item.dateAnnoun), 'dd/MM/yyyy') : 'N/A'}
                                        </div>
                                        <div
                                            className="listpend_item"
                                            style={{ color: isExpired ? 'red' : 'green' }}
                                        >
                                            {item.dateRequest ? format(new Date(item.dateRequest), 'dd/MM/yyyy') : 'N/A'}
                                        </div>
                                        <div className="listpend_item">{item.comments}</div>
                                        <div className="listpend_item">
                                            <IconButton
                                                color="success"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <CheckCircleIcon />
                                            </IconButton>
                                            <IconButton
                                                color="default"
                                                onClick={() => handleOpen(item)}
                                            >
                                                <CheckCircleIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="listpend_row">No hay datos disponibles</div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Actualizar Pedido</DialogTitle>
                <Formik
                    initialValues={currentData}
                    validationSchema={validationSchema}
                    onSubmit={handleModalSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <DialogContent>
                                <Field
                                    name="code"
                                    label="Código"
                                    component={CustomTextField}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                />
                                <Field
                                    name="description"
                                    label="Descripción"
                                    component={CustomTextField}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Field
                                    name="provider"
                                    label="Proveedor"
                                    component={CustomTextField}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Field
                                    name="dateAnnoun"
                                    label="Fecha Solicitada"
                                    component={CustomTextField}
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                                <Field
                                    name="dateRequest"
                                    label="Fecha Requerida"
                                    component={CustomTextField}
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                                <Field
                                    name="comments"
                                    label="Comentario"
                                    component={CustomTextField}
                                    variant="outlined"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancelar</Button>
                                <Button type="submit" disabled={isSubmitting}>Actualizar</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};

export default Orders;

