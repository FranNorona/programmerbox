import { TextField } from "@mui/material";

const Seeker = () => {
    return (
        <div style={{ flexGrow: 1, margin: "0 16px" }}>
            <TextField label="Buscar" variant="filled" sx={{bgcolor:"white", borderRadius:"5px"}} fullWidth/>
        </div>
    );
};

export default Seeker;