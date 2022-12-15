import React from 'react';
import update from 'react-addons-update';
import AddQues from '../../components/addQues/AddQues';

export default class AddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            answers: [],
            correctAnswer: -1
        };
    }

    addInput = () => {
        this.setState({ answers: [...this.state.answers, ''] })
    }

    removeInput = (i) => {
        this.state.answers.splice(i, 1)
        this.setState({})

    }



    handleChangeQues = (event) => {
        const { value } = event.currentTarget;
        this.setState({ text: value });
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

    deleteAns = (idex) => {
        const answers = [...this.state.answers];
        answers.splice(idex,1);
        this.setState({answers});
    }

    saveAns = async() => {
        const test = this.state;
        if(test.text === '' || test.answers.length === 0 ||  test.answers.includes('') ||test.correctAnswer === -1) {
            alert('lacking information')
        }
        else{
            const add = await fetch('http://localhost:3001/questions', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(test)
            });
            if (add.status === 201){
                alert("ADD successfully");
                window.location.href="/"
            }
        }
    }

    render() {
        const answers =this.state.answers
        console.log(this.state.answers)
        return <> <aside>
            <h3>WPR</h3>
            <header>
                <h2>HTML Quiz</h2>
            </header>

            <ul>
                <li><a href="/"><i class="far fa-question-circle"></i> All questions</a></li>
                <li><a class="active" href="/add"><i class="far fa-plus"></i> New question</a></li>
            </ul>
        </aside>
            <main>
                <div class="container">
                    <h1>New question</h1>
                    <form id="frm-create">
                        <div class="form-group">
                            <label for="text">Text</label>
                            <input type="text" name="text" value={this.state.text} onChange={this.handleChangeQues} />
                        </div>

                        <div class="form-group">
                            <label>Answers: </label>

                            {answers.map((answers,index) => <AddQues answers={this.state.answers}
                                                             index={index}
                                                             ChangeAns={this.ChangeAns}   
                                                             checkAns = {this.checkAns} 
                                                             deleteAns = {this.deleteAns}    
                                                        />)}
                                    <div class="text-right">
                                        <button type="button" class="btn btn-blue" onClick={this.addInput}><i class="fas fa-plus"></i> Add</button>
                                    </div>
                        </div>
                        <div class="actions">
                            <button type="button" class="btn btn-blue btn-large" onClick={ () => this.saveAns()}><i class="fas fa-save"></i> Save</button>
                        </div>
                    </form>
                </div>
            </main>

        </>

    }

}