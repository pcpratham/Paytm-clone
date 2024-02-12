import React from "react"

export function HeaderComponent({label}) {
    return (
        <div className="text-4xl font-bold pt-6 ">
            {label}
        </div>
    )
}