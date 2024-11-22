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

const Orders = ({ setExpiredCount, setActiveCount }) => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentData, setCurrentData] = useState({});
    const [openForm, setOpenForm] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState({
        code: 'neutral',
        description: 'neutral'
    })
    const [currentPage, setCurrentPage] = useState(1);

    // Fetching data from Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "data"));
                const loadedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOriginalData(loadedData);
                setData(loadedData);
                setFilteredData(loadedData);
            } catch (error) {
                console.error("Error al obtener datos: ", error);
            }
        };
    
        fetchData();
    }, []);

    // Sorting data based on sortOrder
    useEffect(() => {
        const sortedData = () => {
            let sorted = [...data];
    
            if (sortOrder.code === 'asc') {
                sorted.sort((a, b) => a.code - b.code);
            } else if (sortOrder.code === 'desc') {
                sorted.sort((a, b) => b.code - a.code);
            }
    
            if (sortOrder.description === 'asc') {
                sorted.sort((a, b) => a.description.localeCompare(b.description));
            } else if (sortOrder.description === 'desc') {
                sorted.sort((a, b) => b.description.localeCompare(a.description));
            }

            if (sortOrder.provider === 'asc') {
                sorted.sort((a, b) => a.provider.localeCompare(b.provider));
            } else if (sortOrder.provider === 'desc') {
                sorted.sort((a, b) => b.provider.localeCompare(a.provider));
            }

            if (sortOrder.comments === 'asc') {
                sorted.sort((a, b) => a.comments.localeCompare(b.comments));
            } else if (sortOrder.comments === 'desc') {
                sorted.sort((a, b) => b.comments.localeCompare(a.comments))
            }

            if (sortOrder.dateRequest === 'asc') {
                sorted.sort((a, b) => new Date(a.dateRequest) - new Date(b.dateRequest));
            } else if (sortOrder.dateRequest === 'desc') {
                sorted.sort((a, b) => new Date(b.dateRequest) - new Date(a.dateRequest));
            }

            return sorted;
        };
    
        setFilteredData(sortedData());
    }, [sortOrder, data]);

    // Updating expired and active counts based on filteredData
    useEffect(() => {
        const expired = filteredData.filter(item => new Date(item.dateRequest) < new Date()).length;
        const active = filteredData.filter(item => new Date(item.dateRequest) >= new Date()).length;
        setExpiredCount(expired); 
        setActiveCount(active);
    }, [filteredData]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const docRef = await addDoc(collection(db, "data"), values);
            setData(prevData => [...prevData, { id: docRef.id, ...values }]);
            setOpenForm(false);
            resetForm();
        } catch (error) {
            console.error("Error al agregar documento: ", error);
        }
    };

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    }

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

    const handleSort = (column) => {
        setSortOrder(prev => {
            const newOrder = prev[column] === 'neutral' ? 'asc' : prev[column] === 'asc' ? 'desc' : 'neutral';
    
            const columns = ['code', 'description', 'provider', 'dateRequest', 'comments'];
            
            const newSortOrder = columns.reduce((acc, col) => {
                acc[col] = col === column ? newOrder : 'neutral';
                return acc;
            }, {});
    
            return newSortOrder;
        });
    };

    const applyFilter = (searchTerm) => {
        const filtered = originalData.filter(item => 
            (item.code && String(item.code).toLowerCase().includes(searchTerm.toLowerCase())) || 
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (item.provider && item.provider.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (item.comments && item.comments.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredData(filtered);
    };

    const ITEMS_PER_PAGE = 14;

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="main_container">
                <div className="add_order">
                    <Button variant="contained" onClick={handleOpenForm}>
                        Agregar Pedido
                    </Button>
                </div>
            
            <Dialog open={openForm} onClose={handleCloseForm}>
                <DialogTitle>Ingresar Datos del Pedido</DialogTitle>
                <DialogContent>
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
                            <Form>
                                <Field
                                    name="code"
                                    label="Código"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    variant="outlined"
                                />
                                <Field
                                    name="description"
                                    label="Descripción"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Field
                                    name="provider"
                                    label="Proveedor"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Field
                                    name="dateAnnoun"
                                    label="Fecha Solicitada"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                                <Field
                                    name="dateRequest"
                                    label="Fecha Requerida"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                                <Field
                                    name="comments"
                                    label="Comentarios"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <DialogActions>
                                    <Button onClick={handleCloseForm} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                        Agregar
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            
            <div>
                <TextField
                    label="Buscar"
                    variant="filled"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => {
                    setSearchTerm(e.target.value);
                    applyFilter(e.target.value);
                }}
                />
            </div>


            <div>
                <div className="listpend_container">
                    <div className="listpend_header">
                        <div className="listpend_item pointer" onClick={() => handleSort('code')}>
                        Código {sortOrder.code === 'asc' ? '↓' : sortOrder.code === 'desc' ? '↑' : ''}
                        </div>
                        <div className="listpend_item pointer" onClick={() => handleSort('description')}>
                        Descripción {sortOrder.description === 'asc' ? '↓' : sortOrder.description === 'desc' ? '↑' : ''}
                        </div>
                        <div className="listpend_item pointer" onClick={() => handleSort('provider')}>Proveedor {sortOrder.provider === 'asc' ? '↓' : sortOrder.provider === 'desc' ? '↑' : ''}</div>
                        <div className="listpend_item">Fecha Solicitada</div>
                        <div className="listpend_item pointer" onClick={() => handleSort('dateRequest')}>
                        Fecha Requerida {sortOrder.dateRequest === 'asc' ? '↓' : sortOrder.dateRequest === 'desc' ? '↑' : ''}
                        </div>
                        <div className="listpend_item pointer" onClick={() => handleSort('comments')}>Comentario {sortOrder.comments === 'asc' ? '↓' : sortOrder.comments === 'desc' ? '↑' : ''}</div>
                        <div className="listpend_item">Acciones</div>
                    </div>
                    <div className="listpend_body">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => {
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
                                                color="primary"
                                                onClick={() => handleOpen(item)}
                                                size="small"
                                            >
                                                Editar
                                            </IconButton>
                                            <IconButton
                                                color="success"
                                                onClick={() => handleDelete(item.id)}
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
                <div className="pagination_controls">
                    <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Anterior
                    </Button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Siguiente
                    </Button>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Actualizar Pedido</DialogTitle>
                <Formik
                    initialValues={currentData}
                    validationSchema={validationSchema}
                    onSubmit={handleModalSubmit}
                    enableReinitialize 
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
                                <Button variant="contained" type="submit" disabled={isSubmitting}>Actualizar</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default Orders;