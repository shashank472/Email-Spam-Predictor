import React from "react";

class Display extends React.Component{
    constructor(props){
        super(props)
        this.state = {list:[]}
        this.SAFE_componentWillMount()
        this.callAPI()
    }

    SAFE_componentWillMount() {
        this.mounted = true;
        this.callAPI = this.callAPI.bind(this)
       
    }
    
    callAPI(){
        fetch('http://localhost:8000/predict',{method:'get',mode:'cors', headers: {"Content-Type":"application/json"}}).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                list:data.data
            })
        });
    }

    render(){
        let tb_data = this.state.list.map((item)=>{
            return(
                <tr>
                    <td>{item.text}</td>
                    <td>{item.prediction}</td>
                </tr>

            )
        })
        return(
            <div className="viewtable">
                <table className="table table-striped">
                    <thead>
                        <th>Text</th>
                        <th>Prediction</th>
                    </thead>
                    <tbody>
                        {tb_data}
                    </tbody>
                </table>
            </div>
        )
    }


}

export default Display;