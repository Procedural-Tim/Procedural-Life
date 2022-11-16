export function Base(props) {
  const { instance, typeName, build } = props

  return (
    <div>
      <div>
        <div></div>
        <div style={{ display: "flex" }}>
          <div>{instance.firstName}</div>
          <div>
            <div>
              <span>{instance.gender}</span>
              <span>{instance.race}</span>
            </div>
            <div>
              <span>{instance.alignment}</span>
              <span>{instance.profession}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
