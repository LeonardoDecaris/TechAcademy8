import { Controller } from "react-hook-form";
import type { Control, RegisterOptions } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    id?: string;
    type?: string;
    placeholder?: string;
    defaultValue?: string;
    error: string | undefined;
    name: string;
    control: Control<any>;
    rules?: RegisterOptions;
    label?: string;

    maxLength?: number;
}

const STYLE = {
    label: "pl-3 pb-1",
    span: "pl-3 text-sm text-red-500"
}

const InputCustom = (props: Props) => {
    return (
        <Controller
            name={props.name}
            rules={props.rules}
            control={props.control}
            defaultValue={props.defaultValue ?? ""}
            render={({ field }) => {
                return (
                    <div>
                        <Label className={STYLE.label} htmlFor={props.name}>{props.label}</Label>
                        <Input
                            id={props.id}
                            type={props.type}
                            placeholder={props.placeholder}
                            maxLength={props.maxLength}
                            {...field}
                        />
                        {props.error && ( <span className={STYLE.span}>{props.error}</span>)}
                    </div>
                );
            }}
        />
    );
}

export default InputCustom;