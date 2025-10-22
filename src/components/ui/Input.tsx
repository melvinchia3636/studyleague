import React from 'react'
import { Icon } from '@iconify/react'

function Input({
	id,
	label,
	icon,
	value,
	setValue,
	...InputProps
}: {
	id: string
	label: string
	icon: string
	value: string
	setValue: (value: string) => void,
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange', 'className'>) {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
				{label}
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<Icon icon={icon} className="h-5 w-5 text-gray-400" />
				</div>
				<input
					id={id}
					name={id}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
					{...InputProps}
				/>
			</div>
		</div>
	)
}

export default Input