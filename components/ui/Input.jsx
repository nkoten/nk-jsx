/**
 * --- NK-Input ---
 * @param {string} label - Upper label text
 * @param {string} type - Input type (text, password, etc)
 * @param {string} iClassName - Input tag specific classes
 */
export function Input({ label, ...props }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      {label && <label-text className="text-sky-400 text-xs ml-1 font-bold uppercase tracking-widest">{label}</label-text>}
      <input
        type={props?.type || "text"}
        {...props}
        className={`
          p-2 rounded-xl bg-slate-800 
          border border-slate-700 
          text-white focus:ring-1 
          focus:ring-sky-500 
          outline-none 
          ${props.iClassName || ''}
        `}
      />
    </label>
  );
}
