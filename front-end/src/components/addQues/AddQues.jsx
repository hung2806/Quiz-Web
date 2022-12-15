import React from "react";

export default class AddQues extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let stt= this.props.index;
        console.log(stt)
        return <>
        <div class="answer">
            <input type="text" id={stt} name="answers" value={this.props.answers.at(stt)} onChange= {this.props.ChangeAns} />
            <div>
                <input name="correctAnswer" type="radio" id={stt} onClick={this.props.checkAns} /> <label for="answer0">correct</label>
            </div>
            <button type="button" class="btn btn-orange" onClick={ () => this.props.deleteAns(stt)}><i class="fas fa-times"></i> Remove</button>
        </div>
   </>
    }
}