import { Section } from "./section.js"

function InstanceList(props) {
  const { instances, fileName, setInstance } = props
  const heading = fileName && `${fileName.split(".json")[0]}s`

  if (!instances || !instances.length) {
    return <Section heading={heading} />
  }

  const attributes = Object.entries(instances[0])
    .filter(([key, value]) => {
      return typeof value !== "object"
    })
    .map(([key]) => key)

  const openInstance = () => {
    console.log("open instance")
  }

  return (
    <Section heading={heading}>
      <table>
        <thead>
          <tr key="heading">
            {attributes.map((attr) => (
              <td key={attr}>{attr}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => {
            const onClick = () => {
              setInstance(instance._id)
            }

            return (
              <tr key={instance._id} onClick={onClick}>
                {attributes.map((attr) => (
                  <td key={`${instance._id}-${attr}`}>{instance[attr]}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Section>
  )
}

export { InstanceList }
