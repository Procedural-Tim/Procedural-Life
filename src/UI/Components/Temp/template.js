function Field(props) {
  const { value, label } = props
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
      },
    },
    /*#__PURE__*/ React.createElement("div", null, value),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          fontSize: 12,
        },
      },
      label
    )
  )
}
function Stat(props) {
  const { value, label } = props
  const modifier = Math.floor((value - 10) / 2)
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
      },
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          fontSize: 12,
        },
      },
      label
    ),
    /*#__PURE__*/ React.createElement("div", null, value),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          border: "1px solid black",
          borderRadius: 8,
        },
      },
      modifier
    )
  )
}
export function Base(props) {
  const { instance, typeName, build } = props
  const {
    firstName,
    gender,
    race,
    goodOrEvil,
    lawOrChaos,
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
  const alignment = /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement("div", null, lawOrChaos),
    /*#__PURE__*/ React.createElement("div", null, goodOrEvil)
  )
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          style: {
            display: "flex",
          },
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              flexGrow: 1,
            },
          },
          /*#__PURE__*/ React.createElement(Field, {
            value: `${firstName} ${familyInstance?.name}`,
            label: "Name",
          })
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            },
          },
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  width: "50%",
                  display: "inline-block",
                },
              },
              /*#__PURE__*/ React.createElement(Field, {
                value: gender,
                label: "Gender",
              })
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  width: "50%",
                  display: "inline-block",
                },
              },
              /*#__PURE__*/ React.createElement(Field, {
                value: race,
                label: "Race",
              })
            )
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  width: "50%",
                  display: "inline-block",
                },
              },
              /*#__PURE__*/ React.createElement(Field, {
                value: alignment,
                label: "Alignment",
              })
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  width: "50%",
                  display: "inline-block",
                },
              },
              /*#__PURE__*/ React.createElement(Field, {
                value: profession,
                label: "Profession",
              })
            )
          )
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          style: {
            display: "flex",
          },
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
            },
          },
          /*#__PURE__*/ React.createElement(Stat, {
            value: adjStr,
            label: "Strength",
          }),
          /*#__PURE__*/ React.createElement(Stat, {
            value: adjDex,
            label: "Dexterity",
          }),
          /*#__PURE__*/ React.createElement(Stat, {
            value: adjCon,
            label: "Constitution",
          }),
          /*#__PURE__*/ React.createElement(Stat, {
            value: adjInt,
            label: "Intelligence",
          }),
          /*#__PURE__*/ React.createElement(Stat, {
            value: adjWis,
            label: "Wisdom",
          }),
          /*#__PURE__*/ React.createElement(Stat, {
            value: adjCha,
            label: "Charisma",
          })
        ),
        /*#__PURE__*/ React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
          },
        }),
        /*#__PURE__*/ React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
          },
        }),
        /*#__PURE__*/ React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
          },
        })
      )
    )
  )
}
