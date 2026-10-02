import React from 'react'

export default function SectionTitle({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      <span className={`section-kicker font-bangla ${center ? 'justify-center' : ''}`}>{eyebrow}</span>
      <h2 className="mt-3 font-bangla text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description && <p className={`mt-3 max-w-2xl font-bangla text-base leading-7 text-slate-500 ${center ? 'mx-auto' : ''}`}>{description}</p>}
    </div>
  )
}
