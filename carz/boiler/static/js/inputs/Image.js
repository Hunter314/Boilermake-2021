

class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className = "box">
                <img src = "/static/images/upload.png" />
                <div className = "upload-me">
                Click to Upload
                </div>
            </div>
        )
    }
}