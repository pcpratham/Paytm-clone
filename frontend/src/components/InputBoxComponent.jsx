export function InputBoxComponent({ label, placeholder, onChange }) {
    return (
        <div className="flex flex-col pb-4 ">
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
    )
}