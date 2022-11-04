import { Section } from "./section.js"

function Build(props) {
  const [isCreating, setIsCreating] = React.useState(false)
  const { setBuilds } = props

  const createBuild = async () => {
    setIsCreating(true)
    await window.build.run()
    setIsCreating(false)

    const serverBuilds = await window.view.builds()
    setBuilds(serverBuilds)
  }

  return (
    <Section>
      <button onClick={createBuild} disabled={isCreating}>
        Build
      </button>
    </Section>
  )
}

export { Build }
