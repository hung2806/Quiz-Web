import React from 'react';
import { Link } from "react-router-dom";

export default class ListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search:'',
            questions: [
                
            ]
        };
    }
 
    async componentDidMount() {
        const res = await fetch("http://localhost:3001/questions")
        const questions = await res.json();
        this.setState ({
            questions : questions
        });
     }

     onChangeSearch = (event) => {
        const input = event.currentTarget;
        const value = input.value;
        this.setState({ search : value });
     }
     
     deleteQues = async(_id) => {
         const dshf = await fetch('http://localhost:3001/questions/' + _id,{
            method: 'DELETE'
         })
         if (dshf.status === 200){
            let  questions  = this.state.questions; 
            questions = questions.filter(question => question._id !== _id);
            this.setState({ questions });
            window.location.href="/";
         }
     }

    render () {
       
        const questions = this.state.questions;
        const search = this.state.search;
        let abc = search.toLowerCase();
        const filterQues = questions.filter(question => question.text.toLowerCase().includes(abc)) 


        let i = 0;  
        return  <>
            <div>
                <aside>
        <h3>WPR</h3>
        <header>
            <h2>HTML Quiz</h2>
        </header>
        
        <ul>
            <li><a class="active" href="/"><i class="far fa-question-circle"></i> All questions</a></li>
            <li><a href="/add"><i class="far fa-plus"></i> New question</a></li>
        </ul>
    </aside>
    <main>
        <div class="container">
            <h1>All questions</h1>

            <div id="search">
                <input type="text" placeholder="Search..." value = { this.state.search } onChange={this.onChangeSearch}/>
            </div>
           
            <table>
             <tbody>
                <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th width="210">Actions</th>
                </tr>
                
                  {filterQues.map(questions => {
                        i++;
                        return <tr key={questions._id}>
                                <td>{i}</td>
                                <td>{questions.text}</td>
                                <td>{questions.answers[questions.correctAnswer]}</td>
                                <td>
                                   <Link to={'/edit/'+questions._id} className="btn btn-blue" ><i className="far fa-edit"></i> Edit</Link>
                                   <button onClick= {() => this.deleteQues(questions._id)} href="#" class="btn btn-orange"><i class="far fa-trash-alt"></i> Delete</button>
                                </td>
                        </tr>
                      

                     })} 
            </tbody>
            </table>
            
            </div>
       
            </main>
    </div>
        </>

    }

}