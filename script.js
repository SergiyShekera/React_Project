class Task extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      };
    };
    edit = () => {
      this.setState({edit: true});
    };
    save = () => {
    this.props.update_Text(this.refs.new_Txt.value, this.props.index);
    this.setState({edit: false});
    };
    remove = () => {
    this.props.delete_Block (this.props.index);
    };
  rend_Norm = ()=> {
    return (
      <div className="box">
        <div className="text">{this.props.children}</div>
        <button onClick={this.edit} className="btn btn-dark">Редактировать</button>
        <button onClick={this.remove} className="btn btn-dark">Удалить</button>
      </div>
    );
  };

  rend_Edit = () =>{
    return (
      <div className="box ">
        <textarea ref="new_Txt" defaultValue={this.props.children}></textarea>
        <button onClick={this.save} className="btn btn-success">Сохранить</button>
      </div>
    );
  };

 render(){
   if(this.state.edit){
     return this.rend_Edit();
   } else {
     return this.rend_Norm();
   }
 }
}

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        'First',
        'Second',
        'Third'
      ]
    };
  };

  add = (text) => {
    var arr = this.state.tasks;
    arr.push (text);
    this.setState ({tasks: arr});
  };

  delete_Block = (i) => {
    var arr = this.state.tasks;
    arr.splice (i, 1);
    this.setState ({tasks: arr});
  };
  update_Text = (text, i) => {
    var arr = this.state.tasks;
    arr[i] = text;
    this.setState ({tasks: arr});
  };
  each_Task = (item, i) => {
    return (
      <Task key={i} index={i}
        update_Text={this.update_Text}
        delete_Block={this.delete_Block}>
        {item}
      </Task>
    );
  };
  render() {
    return (
       <div className="field">
       <button onClick={this.add.bind(null, 'NEW TASK')} className="btn col-8">NEW TASK</button>
       {this.state.tasks.map (this.each_Task)}
       </div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Field />, app  );
