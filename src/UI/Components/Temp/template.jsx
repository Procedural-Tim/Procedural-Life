function Field(props) {
  const { value, label } = props

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{value}</div>
      <div style={{ fontSize: 12 }}>{label}</div>
    </div>
  )
}

function Stat(props) {
  const { value, label } = props
  const modifier = Math.floor((value - 10) / 2)

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 12 }}>{label}</div>
      <div>{value}</div>
      <div style={{ border: "1px solid black", borderRadius: 8 }}>
        {modifier}
      </div>
    </div>
  )
}

export function Base(props) {
  const { instance, typeName, build } = props
  const {
    firstName,
    gender,
    race,
    alignment,
    profession,
    family,
    adjStr,
    adjDex,
    adjCon,
    adjInt,
    adjWis,
    adjCha,
  } = instance

  const [familyInstance, setFamilyInstance] = React.useState()

  React.useEffect(() => {
    async function fetchData() {
      const familyInstances = await window.view.instances(build, "Family")
      setFamilyInstance(familyInstances.find((fam) => fam._id === family))
    }
    fetchData()
  }, [])

  console.log("fi", familyInstance)

  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <Field
              value={`${firstName} ${familyInstance?.name}`}
              label="Name"
            />
          </div>
          <div
            style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <div>
              <div
                style={{
                  width: "50%",
                  display: "inline-block",
                }}
              >
                <Field value={gender} label="Gender" />
              </div>
              <div
                style={{
                  width: "50%",
                  display: "inline-block",
                }}
              >
                <Field value={race} label="Race" />
              </div>
            </div>
            <div>
              <div
                style={{
                  width: "50%",
                  display: "inline-block",
                }}
              >
                <Field value={alignment} label="Alignment" />
              </div>
              <div
                style={{
                  width: "50%",
                  display: "inline-block",
                }}
              >
                <Field value={profession} label="Profession" />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Stat value={adjStr} label="Strength" />
            <Stat value={adjDex} label="Dexterity" />
            <Stat value={adjCon} label="Constitution" />
            <Stat value={adjInt} label="Intelligence" />
            <Stat value={adjWis} label="Wisdom" />
            <Stat value={adjCha} label="Charisma" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}></div>
        </div>
      </div>
    </div>
  )
}
