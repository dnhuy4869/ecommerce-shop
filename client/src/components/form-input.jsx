import { FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from "@mui/material";
import { useState } from "react";

export const FormInput = ({ type, id, name, label, isError, value, onChange, errorMessage, ...others }) => {
    const theme = useTheme();

    const [readOnly, setReadOnly] = useState(true)

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
                    readOnly={readOnly}
                    onFocus={e => setReadOnly(false)}
                    sx={{
                        '& input': {
                            textSecurity: 'disc',
                            '-moz-text-security': 'disc',
                            '-webkit-text-security': 'disc',
                        },
                    }}
                />
                {isError && (
                    <FormHelperText
                        error
                        id={`standard-weight-helper-text-${id}`}
                        sx={{
                            fontSize: "0.8rem"
                        }}>
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    )
}