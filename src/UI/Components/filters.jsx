import { Section } from "./section.js"

function Filter(props) {
  const { name, values } = props
const [isOpen, setIsOpen] = React.useState(false)
const toggleOpen = () => setIsOpen(!isOpen)

  return <div className="facet" key={name} onClick={toggleOpen}>
    <span>{name}</span>
    { isOpen && values.map(value => <button key={value}>{value}</button>)}
  </div>
}

function Filters(props) {
  const { file = [{}] } = props
  const attributes = file.reduce((acc, inst) => {
    Object.entries(inst).forEach(([attr, value]) => {
      if (typeof value === "object") {
        return acc;
      }

      if (!acc[attr]) {
        acc[attr] = new Set()
      }
      acc[attr].add(value)
    })

    return acc
  }, {})

  return (
    <Section heading="Filters">
      {Object.entries(attributes).map(([name, values]) => (
        <Filter name={name} values={Array.from(values)} key={name} />
      ))}
    </Section>
  )
}

export { Filters }
