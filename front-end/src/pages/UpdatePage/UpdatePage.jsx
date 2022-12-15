import React from 'react';
import UpdateQues from '../../components/updateQues/UpdateQues';
import update from 'react-addons-update';

export default class UpdatePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text:'',
            _id: '',
            correctAnswer: -1,
            answers: []
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const updateFet = await fetch('http://localhost:3001/questions/' + id);
        if(updateFet.status === 200){
            const updateData = await updateFet.json();
            this.AfterFetch(updateData)
        }
    }

    ChangeAns = (event) => {
        const input = event.currentTarget;
        const value = input.value;
        const index = input.id;
        this.setState(update(this.state, {
            answers: {
                [index]: {
                    $set:  value
                }
            }
        }));
    }

    checkAns = (event) =>{
        const input = event.currentTarget;
        const checked = input.checked;
        const index = parseInt(input.id);
        if (checked){
            this.setState({correctAnswer: index})
        }
        
    }

    addInput = () => {
        this.setState({ answers: [...this.state.answers, ''] })
    }

    AfterFetch = (data) => {
        const data_id = data._id;
        const data_text = data.text;
        const data_answers = data.answers;
        const data_correctAns = data.correctAnswer;
        this.setState({
            text: data_text,
            _id: data_id,
            correctAnswer: data_correctAns,
            answers: data_answers
        })
    }

    deleteAns = (stt) => {
        const answers = [...this.state.answers];
        answers.splice(stt,1);
        this.setState({answers});
    }

    handleChangeQues = (event) => {
        const { value } = event.currentTarget;
        this.setState({ text: value });
    }

    saveAns = async() => {
        const editQuestion =this.state
        const id = this.state._id
        if( editQuestion.text === '' ||editQuestion.answers.length === 0 || editQuestion.answers.includes('')) {
            alert('lacking information')
        }else{
            const update = await fetch('http://localhost:3001/questions/' + id, {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(editQuestion)
            });
            if (update.status === 200){
                alert("UPDATE successfully");
                window.location.href="/";
            } 
            else if (update.status === 404){
                alert("invalid id");
            }
         
        }
    }

    render(){
        console.log(this.state);
        let updateAns = this.state.answers
        return <>
            <body>
                <aside>
                    <h3>WPR</h3>
                    <header>
                        <h2>HTML Quiz</h2>
                    </header>
                    
                    <ul>
                        <li><a href="/"><i class="far fa-question-circle"></i> All questions</a></li>
                        <li><a href="/add"><i class="far fa-plus"></i> New question</a></li>
                    </ul>
                </aside>
                <main>
                    <div class="container">
                        <h1>Edit question</h1>
                        <form id="frm-create">
                            <div class="form-group">
                                <label for="text">Text</label>
                                <input type="text" value={this.state.text} name="text" onChange={this.handleChangeQues}  />
                            </div>
                            
                            <div class="form-group">
                                <label>Answers: </label>
                                {updateAns.map((updateAns,index) => <UpdateQues Checked_Ans = {this.checkAns} delete_Ans = {this.deleteAns} changeAns={this.ChangeAns} updateAns={this.state.answers} number={index} correctAns={this.state.correctAnswer} />)}
                                

                                <div class="text-right">
                                    <button type="button" class="btn btn-blue" onClick={this.addInput}><i class="fas fa-plus"></i> Add</button>
                                </div>
                            </div>

                            <div class="actions">
                                <button class="btn btn-blue btn-large"  type='button' onClick={ () => this.saveAns()}><i class="fas fa-save"></i> Save</button>
                            </div>
                        </form>
                    </div>
                </main>
            </body>
        </>
    }
}