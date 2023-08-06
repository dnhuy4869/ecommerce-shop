import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, useTheme } from "@mui/material";
import { useState } from "react";

export const FormInput = ({
    type, name, label, isError, value, onChange, errorMessage,
    readOnly, setReadOnly, selectItems,
    ...others }) => {
    const theme = useTheme();

    const renderInput = () => {
        switch (type) {
            case "text": {
                return (
                    <OutlinedInput
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        label={label}
                        readOnly={readOnly}
                        onFocus={e => setReadOnly(false)}
                    />
                )

                break;
            }
            case "select": {
                return (
                    <Select
                        name={name}
                        value={value}
                        label={label}
                        onChange={onChange}
                        onFocus={e => setReadOnly(false)}
                    >
                        {
                            selectItems && selectItems.map((optionData, index) => {
                                return (
                                    <MenuItem key={index} value={optionData.id}>{optionData.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                );

                break;
            }
            default:
                return (
                    <OutlinedInput
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        label={label}
                        readOnly={readOnly}
                        onFocus={e => setReadOnly(false)}
                    />
                )
        }

        return <></>
    }

    const inputStyle = type === "select" ? theme.typography.selectInput : theme.typography.customInput;

    return (
        <>
            <FormControl
                {...others}
                error={isError}
                sx={inputStyle}>
                <InputLabel>{label}</InputLabel>
                {renderInput()}
                {isError && (
                    <FormHelperText
                        error
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