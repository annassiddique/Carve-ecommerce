interface FieldRowProps {
  label: string
  hint?: string
  children: React.ReactNode
}

export function FieldRow({ label, hint, children }: FieldRowProps) {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-6 items-start py-5 border-b border-carve-champagne last:border-0">
      <div>
        <p className="font-body text-xs tracking-widest uppercase text-carve-charcoal font-medium">{label}</p>
        {hint && <p className="font-body text-xs text-carve-mink mt-1 leading-relaxed">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (v: string) => void
}

export function TextInput({ value, onChange, ...rest }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/60 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
      {...rest}
    />
  )
}

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string
  onChange: (v: string) => void
  rows?: number
}

export function TextArea({ value, onChange, rows = 4, ...rest }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/60 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm resize-y"
      {...rest}
    />
  )
}
