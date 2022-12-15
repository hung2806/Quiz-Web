import React from "react";

export default class UpdateQues extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let stt=this.props.number;
        return <>
                <div class="answer">
                    <input type="text" id={stt} name="answers" value={this.props.updateAns.at(stt)} onChange={this.props.changeAns}/>
                        <div>
                            <input name="correctAnswer" id={stt} type="radio" onClick={this.props.Checked_Ans} defaultChecked={stt === this.props.correctAns}/> <label for="answer0">correct</label>
                        </div>
                        <button type="button" class="btn btn-orange" onClick={ () => this.props.delete_Ans(stt)}><i class="fas fa-times"></i> Remove</button>
                </div>
            </>
    }
}