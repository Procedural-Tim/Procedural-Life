function TabBox() {
  const [activeTab, setActiveTab] = React.useState(0)
  const [isCreating, setIsCreating ] = React.useState(false)
  const [builds, setBuilds] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      setBuilds(await window.view.builds())
    }
    fetchData();
  }, [])

  const buildTabClasses = ["tb-tab", activeTab === 0 && "active"].filter(Boolean).join(" ");
    const viewTabClasses = ["tb-tab", activeTab === 1 && "active"].filter(Boolean).join(" ");
    
    
    const setBuildActive = () => {
        setActiveTab(0);
    }

    const setViewActive = () => {
        setActiveTab(1);
    }

    const createBuild = async () => {
      setIsCreating(true)
      await window.build.run()
      setIsCreating(false)
  
      const serverBuilds = await window.view.builds();
      setBuilds(serverBuilds)
    }

    return (
      <div>
        <div className="tb-tabs">
          <div className={buildTabClasses} onClick={setBuildActive}>
            Build
          </div>
          <div className={viewTabClasses} onClick={setViewActive}>
            View
          </div>
        </div>
        <div className="tb-panel">
          {activeTab === 0 && (
            <div>
              <button onClick={createBuild} disabled={isCreating}>Build</button>
            </div>
          )}
          {activeTab === 1 && <div>
              { builds.map(build => <button>{build}</button>)}
              </div>}
        </div>
      </div>
    )
}

export { TabBox }