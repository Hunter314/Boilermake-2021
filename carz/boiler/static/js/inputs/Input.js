
/*
* Required Props
*  changer - function that takes in a value and changes element in parent
*  value - current value from parent
*
*/
class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value:props.value,changer:props.changer}
    }
    //changer function that calls passed in changer
    changer(e) {
        let value = e.target.value
        this.changer(value)
    }
    componentDidUpdate(oldProp) {
        if (this.props.value != oldProp.value) {
            this.setState({value:this.props.value})
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.value != nextProps.value || this.state.value != nextState.value
    }
    render() {
        return (
            <input className = "text-field input-place" placeholder = "Enter License Plate" 
            value = {this.state.value} onChange = {this.changer.bind(this)}/>
        )
    }
}