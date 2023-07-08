import "./Base.css"

const Base = ({children}) => {
    return (
        <div className="app-wrapper">
            <div className="title">
                TaskMaster
            </div>
            <div className="subtitle">
                Empower Your Productivity
            </div>
            {children}
        </div>
    );
}

export default Base;