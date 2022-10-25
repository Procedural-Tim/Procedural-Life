function TabBox() {
    const [activeTab, setActiveTab] = React.useState(0);
    const buildTabClasses = ["tb-tab", activeTab === 0 && "active"].filter(Boolean).join(" ");
    const viewTabClasses = ["tb-tab", activeTab === 1 && "active"].filter(Boolean).join(" ");
    
    const setBuildActive = () => {
        setActiveTab(0);
    }

    const setViewActive = () => {
        setActiveTab(1);
    }

    return <div>
        <div className="tb-tabs">
            <div className={buildTabClasses} onClick={setBuildActive}>Build</div>
            <div className={viewTabClasses} onClick={setViewActive}>View</div>
        </div>
        <div className="tb-panel">
            { activeTab === 0 && <div>
                <button>Build</button>
            </div> }
            { activeTab === 1 && <div>
                View Stuff
            </div>}
        </div>
    </div>
}

export { TabBox }