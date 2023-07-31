import { FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from "@mui/material";

export const FormInput = ({ type, id, name, label, isError, value, onChange, errorMessage, ...others }) => {
    const theme = useTheme();

    return (
        <>
            <FormControl
                {...others}
                error={isError}
                sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInput
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    label={label}
                />
                {isError && (
                    <FormHelperText error id={`standard-weight-helper-text-${id}`}>
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    )
}