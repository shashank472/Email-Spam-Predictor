import React,{useState} from 'react';
function PostForm(){
    const [data , setData] = useState({
       text: ""
    })


    function submit(e){
        e.preventDefault();
        let text = data.text;
        const entity = {text}
        fetch('http://localhost:8000/', {
            method: 'post',
            mode:'cors',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(entity)
           }).then(response=>{
               console.log(response.data);
               window.location.reload(false)
           })
    }

    function handle(e){
        const newdata = {...data};
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }

    return(
        <section className='Formd'>
            <form onSubmit = {(e)=>submit(e)}>
                <table  id="mytable" size="sm" className="striped">
                <tbody>
                    <tr>
                        <td style={{width:"250px",height:"20px",marginRight:"10px"}}>Enter Text</td>
                        <td style={{width:"250px",height:"20px",marginLeft:"10px"}}>
                            <input id ="text" onChange = {(e)=>handle(e)} value={data.text} type="text" name="text"/>
                        </td>
                    </tr>

                </tbody>
            </table>
            <button type="submit" className='btn btn-outline-secondary btn-lg' style={{width:'90px'}}>Add</button>
            </form>
        </section>
    );
}
export default PostForm;