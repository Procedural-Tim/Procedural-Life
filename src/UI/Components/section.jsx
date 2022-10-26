function Section(props) {
  const { children, heading } = props

  return (
    <div className="section">
      <div>{heading}</div>
      <div className="section-content">{children}</div>
    </div>
  )
}

export { Section }
